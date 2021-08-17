import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import basicAuth from 'express-basic-auth';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';

import { env } from '../env';
import { SwaggerUIOptions } from 'swagger-ui';

export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.swagger.enabled) {
        const expressApp = settings.getData('express_app');

        const schemas = validationMetadatasToSchemas({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/',
        });

        const swaggerFile = routingControllersToSpec(
            getMetadataArgsStorage(),
            undefined,
            {
                components: {
                    securitySchemes: {
                        // basicAuth: {
                        //     type: 'http',
                        //     scheme: 'basic',
                        // },
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        },
                    },
                    schemas,
                },
            }
        );

        // Add npm infos to the swagger doc
        swaggerFile.info = {
            title: env.app.name,
            description: env.app.description,
            version: env.app.version,
        };

        swaggerFile.servers = [
            {
                url: `${env.app.schema}://${env.app.host}:${env.app.port}${env.app.routePrefix}`,
            },
            {
                url: `${env.app.schema}://${env.app.host}${env.app.routePrefix}`,
            },
        ];

        swaggerFile.security = [{bearerAuth: []}];

        expressApp.use(
            env.swagger.route,
            env.swagger.username ? basicAuth({
                users: {
                    [`${env.swagger.username}`]: env.swagger.password,
                },
                challenge: true,
            }) : (req, res, next) => next(),
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile, {
                explorer: true,
                swaggerOptions: {
                    docExpansion: 'none',
                    persistAuthorization: true,
                } as SwaggerUIOptions,
            })
        );

    }
};
