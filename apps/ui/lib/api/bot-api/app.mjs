import TelegramBot from 'node-telegram-bot-api';
import Controller from './controller.mjs';
import logger from '../logger.mjs';
// import { BOT_COMMANDS } from '../../system/constants.mjs';

let service = null;
const CONNECT_ATTEMPTS = 10;
let connectionAttempt = 0;

export function startServer({ auth }) {
    service = startService({ auth });
}

export async function stopServer() {
    if (!service) return;

    service.close();
    logger.info('Service stopped');
}

function startService({ auth }) {
    try {
        const bot = new TelegramBot(auth.botToken, { polling: true });
        logger.info('Telegram Bot started');

        bot.on('message', (msg) => {
            console.log(msg);
            Controller(msg, bot);
        });

        return bot;
    } catch (err) {
        logger.error('Bot Service try init');
        logger.error('Bot Service connection', err);
        if (connectionAttempt <= CONNECT_ATTEMPTS) {
            connectionAttempt += 1;
            setTimeout(function () {
                startService({ auth });
            }, 5000 * connectionAttempt);
        } else {
            logger.info(`Stop trying connect to Bot Service after ${connectionAttempt} attempts`);
        }
    }
}
