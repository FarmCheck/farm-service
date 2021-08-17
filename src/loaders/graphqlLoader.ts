import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { getConnection } from 'typeorm';
import { env } from '../env';
import { getErrorCode, getErrorMessage, handlingErrors } from '../lib/graphql';
import { v4 as uuidv4 } from 'uuid';
import { exampleQuery } from '../lib/graphql/example';

export const graphqlLoader: MicroframeworkLoader = async (
    settings: MicroframeworkSettings | undefined
) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app');

        const schema = await buildSchema({
            resolvers: env.app.dirs.resolvers as [string, ...string[]],
            // automatically create `schema.gql` file with schema definition in current folder
            emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
            validate: true,
            authMode: 'error',
            container: Container,
        });

        handlingErrors(schema);

        // Add graphql layer to the express app
        expressApp.use(
            env.graphql.route,
            (request: express.Request, response: express.Response) => {
                // Build GraphQLContext
                const requestId = uuidv4();
                const container = Container.of(requestId); // get scoped container
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
                        typeormGetConnection: getConnection,
                    },
                }; // create our context
                container.set('context', context); // place context or other data in container

                // Setup GraphQL Server
                graphqlHTTP({
                    schema,
                    context,
                    graphiql: env.graphql.editor ? {
                        headerEditorEnabled: true,
                        defaultQuery: exampleQuery,
                    } : false,
                    customFormatErrorFn: (error) => ({
                        code: getErrorCode(error.message),
                        message: getErrorMessage(error.message),
                        path: error.path,
                        extensions: error.extensions,
                        locations: error.locations,
                    }),
                })(request, response).finally(() => {
                    Container.reset(requestId);
                });
            }
        );
    }
};
