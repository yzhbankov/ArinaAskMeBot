import * as Controllers from './controllers/index.mjs';
import { BOT_COMMAND } from '../../system/index.mjs';
import { getCommand } from '../utils/index.mjs';

// Chain of responsibilities pattern. If error occurs in one of the handlers then all chain breaking
function Router(req, res) {
    function next(err) {
        if (err instanceof Error) {
            throw err;
        }
    }

    return async function (...handlers) {
        for await (const handler of handlers) {
            try {
                await handler(req, res, next);
            } catch (err) {
                res.sendMessage(JSON.stringify(err));
                break;
            }
        }
    };
}

export default async function (request, client) {
    const router = Router(request, client);
    const command = getCommand(request);

    switch (command) {
        case BOT_COMMAND.HELLO: {
            await router(Controllers.main.hello);
            break;
        }
        case BOT_COMMAND.QUESTION: {
            await router(Controllers.main.question);
            break;
        }
        case BOT_COMMAND.LIAM: {
            await router(Controllers.main.liam);
            break;
        }
        default: {
            await router(Controllers.main.unknown);
            break;
        }
    }

    return undefined;
}
