"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlLoader = void 0;
const tslib_1 = require("tslib");
const express_graphql_1 = require("express-graphql");
const path = tslib_1.__importStar(require("path"));
const type_graphql_1 = require("type-graphql");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const typeorm_1 = require("typeorm");
const env_1 = require("../env");
const graphql_1 = require("../lib/graphql");
const uuid_1 = require("uuid");
const example_1 = require("../lib/graphql/example");
const graphqlLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (settings && env_1.env.graphql.enabled) {
        const expressApp = settings.getData('express_app');
        const schema = yield type_graphql_1.buildSchema({
            resolvers: env_1.env.app.dirs.resolvers,
            // automatically create `schema.gql` file with schema definition in current folder
            emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
            validate: true,
            authMode: 'error',
            container: typedi_1.default,
        });
        graphql_1.handlingErrors(schema);
        // Add graphql layer to the express app
        expressApp.use(env_1.env.graphql.route, (request, response) => {
            // Build GraphQLContext
            const requestId = uuid_1.v4();
            const container = typedi_1.default.of(requestId); // get scoped container
            const context = {
                requestId,
                container,
                request,
                response,
                /**
                 * For `type-graphql-dataloader`'s context.
                 * [Read code here](https://github.com/slaypni/type-graphql-dataloader/blob/master/src/plugins/apollo-server/ApolloServerLoaderPlugin.ts)
                 */
                _tgdContext: {
                    requestId,
                    typeormGetConnection: typeorm_1.getConnection,
                },
            }; // create our context
            container.set('context', context); // place context or other data in container
            // Setup GraphQL Server
            express_graphql_1.graphqlHTTP({
                schema,
                context,
                graphiql: env_1.env.graphql.editor ? {
                    headerEditorEnabled: true,
                    defaultQuery: example_1.exampleQuery,
                } : false,
                customFormatErrorFn: (error) => ({
                    code: graphql_1.getErrorCode(error.message),
                    message: graphql_1.getErrorMessage(error.message),
                    path: error.path,
                    extensions: error.extensions,
                    locations: error.locations,
                }),
            })(request, response).finally(() => {
                typedi_1.default.reset(requestId);
            });
        });
    }
});
exports.graphqlLoader = graphqlLoader;
//# sourceMappingURL=graphqlLoader.js.map