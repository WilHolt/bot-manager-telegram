declare type sendContact = {
    chatId?: string;
    phoneNumber: string;
    firstName: string;
};
declare type sendPoll = {
    question: string;
    options: string[];
    type?: string;
    correctOptionID?: number;
    chatId?: string;
    disableNotification?: boolean;
};
declare type sendMessage = {
    message: string;
    chatId?: string;
};
export default class TelegramBot {
    token: string;
    chatId: string;
    path: string;
    constructor(botToken: string, chatId: string);
    sendContact({ phoneNumber, firstName, chatId }: sendContact): Promise<any>;
    sendMessage({ message, chatId }: sendMessage): Promise<any>;
    sendPoll({ question, options, type, correctOptionID, chatId, disableNotification }: sendPoll): Promise<any>;
    sendDice(chatId?: string): Promise<any>;
    getUpdates(): Promise<any>;
    getFirstID(): Promise<any>;
}
export {};
