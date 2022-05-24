/// <reference types="node" />
import * as types from "./types";
import "./index";
export declare class TelegramBot {
    token: string;
    chatId?: string;
    path: string;
    interval?: NodeJS.Timeout;
    constructor(botToken: string, chatId?: string);
    publicCall(method: string, qs: string): Promise<any>;
    sendMessage(message: string, options?: types.defaultMessage): Promise<types.sendMessageReturn>;
    sendContact(firstName: string, phoneNumber: string, options?: types.defaultMessage): Promise<types.sendContactReturn>;
    sendPoll(question: string, questionOptions: string[], options?: types.sendPoll): Promise<types.sendPollReturn>;
    sendDice(options?: types.defaultMessage): Promise<types.sendDiceReturn>;
    getUpdates(offsetNumber?: number): Promise<types.getUpdatesReturn>;
    sendPhotoString(photo: string, options?: types.defaultMessage): Promise<types.sendPhotoReturn>;
    getChat(chatId?: string): Promise<any>;
    getMessages(chatId?: string): Promise<types.getUpdatesReturnResult[]>;
    clearInterval(): Promise<void>;
    onMessage(waitForMessage: string, callback: any, chatId?: string): Promise<void>;
    onAnyMessage(callback: any, chatId?: string): Promise<void>;
}
