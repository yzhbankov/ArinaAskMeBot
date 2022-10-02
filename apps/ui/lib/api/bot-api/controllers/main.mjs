import { makeRequestHandler } from '../../utils/index.mjs';
import { UnknownMessage, Hello, Question } from '../../../usecases/index.mjs';

export const main = {
    hello: makeRequestHandler(
        Hello,
        (req) => ({
            firstName: req.from.first_name,
            lastName: req.from.last_name,
            userId: req.from.id,
            idBot: req.from.is_bot,
            chatId: req.chat.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    question: makeRequestHandler(
        Question,
        (req) => ({
            firstName: req.from.first_name,
            lastName: req.from.last_name,
            userId: req.from.id,
            idBot: req.from.is_bot,
            chatId: req.chat.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    unknown: makeRequestHandler(
        UnknownMessage,
        () => ({}),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
};
