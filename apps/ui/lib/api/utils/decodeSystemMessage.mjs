import { BOT_COMMAND, BOT_COMMAND_UI } from '../../system/index.mjs';
import { isQuestion } from './isQuestion.mjs';

export function getCommand(message) {
    const { text } = message;
    if (isQuestion(text)) return BOT_COMMAND.QUESTION;
    if (text === 'Привет' || text === BOT_COMMAND_UI.START) return BOT_COMMAND.HELLO;
    if (text === BOT_COMMAND_UI.LIAM) return BOT_COMMAND.LIAM;

    return undefined;
}
