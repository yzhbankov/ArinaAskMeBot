import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages } from '../models/index.mjs';

export class Question extends UseCaseBase {
    static validationRules = {};

    async execute() {
        return UserMessages.randomAnswer();
    }
}
