import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages } from '../models/index.mjs';

export class Hello extends UseCaseBase {
    static validationRules = {
        firstName: ['string'],
        lastName: ['string'],
        userId: ['required', 'positive_integer'],
        idBot: ['boolean'],
        chatId: ['positive_integer'],
    };

    async execute(params) {
        const name = `${params.firstName} ${params.lastName}`;

        return UserMessages.welcomeMessage(name);
    }
}
