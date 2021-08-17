"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const env_1 = require("../env");
function banner(log) {
    if (env_1.env.app.banner) {
        const route = () => `${env_1.env.app.schema}://${env_1.env.app.host}:${env_1.env.app.port}`;
        console.log(``);
        console.log(`Aloha, your app is ready on ${route()}${env_1.env.app.routePrefix}`);
        console.log(`To shut it down, press <CTRL> + C at any time.`);
        console.log(``);
        console.log('-------------------------------------------------------');
        console.log(`Environment  : ${env_1.env.node}`);
        console.log(`Version      : ${env_1.env.app.version}`);
        console.log(``);
        console.log(`API Info     : ${route()}${env_1.env.app.routePrefix}`);
        if (env_1.env.graphql.enabled) {
            console.log(`GraphQL      : ${route()}${env_1.env.graphql.route}`);
        }
        if (env_1.env.swagger.enabled) {
            console.log(`Swagger      : ${route()}${env_1.env.swagger.route}`);
        }
        if (env_1.env.monitor.enabled) {
            console.log(`Monitor      : ${route()}${env_1.env.monitor.route}`);
        }
        console.log('-------------------------------------------------------');
        console.log('');
    }
    else {
        console.log(`Application is up and running.`);
    }
}
exports.banner = banner;
//# sourceMappingURL=banner.js.map