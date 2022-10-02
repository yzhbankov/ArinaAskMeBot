import '@in-contact/env/index.js'; // should be first import to read all env variables before config init
import { createLogger, LoggerTypes } from '@in-contact/logger';
import * as App from './lib/api/index.mjs';
import * as BotApi from './lib/api/bot-api/app.mjs';
import * as ConfigContainer from './lib/config.cjs';

export async function main() {
    // Init Logger
    const logger = createLogger({
        type: LoggerTypes.Winston,
        context: {
            logLevel: ConfigContainer.config.logLevel,
            serviceName: ConfigContainer.config.serviceName,
        },
    });
    App.setLogger(logger);

    // Init Controllers Layer (API)
    BotApi.startServer({
        auth: ConfigContainer.config.auth,
    });

    // Add Global Unhandled Errors Handlers
    async function exit() {
        await BotApi.stopServer();
        logger.info('Exit');

        process.exit(0);
    }

    process.on('SIGTERM', async () => {
        logger.error('SIGTERM signal caught');
        await exit();
    });

    process.on('SIGINT', async () => {
        logger.error('SIGINT signal caught');
        await exit();
    });

    process.on('unhandledRejection', (error) => {
        logger.error('unhandledRejection', error.stack);
    });

    process.on('uncaughtException', (error) => {
        logger.error('uncaughtException', error.stack);
    });
}
