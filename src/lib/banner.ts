import { env } from '../env';
import { Logger } from '../lib/logger';

export function banner(log: Logger): void {
    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`;
        console.log(``);
        console.log(`Aloha, your app is ready on ${route()}${env.app.routePrefix}`);
        console.log(`To shut it down, press <CTRL> + C at any time.`);
        console.log(``);
        console.log('-------------------------------------------------------');
        console.log(`Environment  : ${env.node}`);
        console.log(`Version      : ${env.app.version}`);
        console.log(``);
        console.log(`API Info     : ${route()}${env.app.routePrefix}`);
        if (env.graphql.enabled) {
            console.log(`GraphQL      : ${route()}${env.graphql.route}`);
        }
        if (env.swagger.enabled) {
            console.log(`Swagger      : ${route()}${env.swagger.route}`);
        }
        if (env.monitor.enabled) {
            console.log(`Monitor      : ${route()}${env.monitor.route}`);
        }
        console.log('-------------------------------------------------------');
        console.log('');
    } else {
        console.log(`Application is up and running.`);
    }
}
