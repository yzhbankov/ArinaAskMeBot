import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages } from '../models/index.mjs';

export class Liam extends UseCaseBase {
    static validationRules = {};

    async execute() {
        return UserMessages.liamAnwar();
    }
}
