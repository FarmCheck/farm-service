"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
const routing_controllers_1 = require("routing-controllers");
const authorizationChecker_1 = require("../auth/authorizationChecker");
const currentUserChecker_1 = require("../auth/currentUserChecker");
// import { currentUserChecker } from '../auth/currentUserChecker';
const env_1 = require("../env");
const expressLoader = (settings) => {
    if (settings) {
        const connection = settings.getData('connection');
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controll ers to an existing express instance.
         */
        const expressApp = routing_controllers_1.createExpressServer({
            cors: {
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            },
            classTransformer: true,
            /**
             * Not working, dont know why
             */
            validation: {
                forbidNonWhitelisted: true,
                forbidUnknownValues: true,
                always: true,
            },
            routePrefix: env_1.env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env_1.env.app.dirs.controllers,
            middlewares: env_1.env.app.dirs.middlewares,
            interceptors: env_1.env.app.dirs.interceptors,
            /**
             * Authorization features
             */
            authorizationChecker: authorizationChecker_1.authorizationChecker(connection),
            currentUserChecker: currentUserChecker_1.currentUserChecker(connection),
        });
        // Run application to listen on given port
        if (!env_1.env.isTest) {
            const server = expressApp.listen(env_1.env.app.port);
            settings.setData('express_server', server);
        }
        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
exports.expressLoader = expressLoader;
//# sourceMappingURL=expressLoader.js.map