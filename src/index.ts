import * as types from "./types";
import axios from "axios";
import qs from "qs";
import "./index";

export class TelegramBot {
  token: string;
  chatId?: string;
  path: string;
  interval?: NodeJS.Timeout;

  constructor(botToken: string, chatId?: string) {
    this.token = botToken;
    this.chatId = chatId;
    this.path = `https://api.telegram.org/bot${this.token}`;
  }

  async publicCall(method: string, qs: string) {
    const response = await axios(`${this.path}/${method}?${qs}`);
    return response.data;
  }

  async sendMessage(message: string, options?: types.defaultMessage): Promise<types.sendMessageReturn> {
    const messageParams = qs.stringify({
      text: message,
      chat_id: options?.chatId || this.chatId,
      disableNotification: options?.disableNotification || false,
    });
    const response = await this.publicCall("sendMessage", messageParams);
    return response;
  }

  async sendContact(firstName: string, phoneNumber: string, options?: types.defaultMessage): Promise<types.sendContactReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      phone_number: phoneNumber,
      first_name: firstName,
      disableNotification: options?.disableNotification || false,
    });
    const response = await this.publicCall("sendContact", messageParams);
    return response;
  }

  async sendPoll(question: string, questionOptions: string[], options?: types.sendPoll): Promise<types.sendPollReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      question: question,
      is_anonymous: options?.isAnonymous || true,
      options: JSON.stringify(questionOptions),
      type: options?.type || "regular",
      correct_option_id: options?.correctOptionID,
      disableNotification: options?.disableNotification || false,
    });

    const response = await this.publicCall("sendPoll", messageParams);
    return response;
  }

  async sendDice(options?: types.defaultMessage): Promise<types.sendDiceReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      disableNotification: options?.disableNotification || false,
    });
    const response = await this.publicCall("sendDice", messageParams);
    return response;
  }

  async getUpdates(offsetNumber = 0): Promise<types.getUpdatesReturn> {
    const messageParams = qs.stringify({
      offset: offsetNumber,
    });
    const response: types.getUpdatesReturn = await this.publicCall("getUpdates", messageParams);
    if (response.result.length > 90) await this.getUpdates(response.result[response.result.length - 1].update_id);
    return response;
  }

  async sendPhotoString(photo: string, options?: types.defaultMessage): Promise<types.sendPhotoReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      disableNotification: options?.disableNotification || false,
      photo: photo,
    });
    const response = await this.publicCall("sendPhoto", messageParams);
    return response;
  }

  async getChat(chatId?: string) {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
    });
    const response = await this.publicCall("getChat", messageParams);
    return response;
  }

  async getMessages(chatId?: string): Promise<types.getUpdatesReturnResult[]> {
    const id = (await this.getChat(chatId || this.chatId)).result.id;
    const response = await this.getUpdates();
    const responseFromChat = response.result.filter((update: types.getUpdatesReturnResult) => {
      return update.message.chat.id == id;
    });
    return responseFromChat;
  }

  async clearInterval() {
    if (this.interval) clearInterval(this.interval);
  }

  async onMessage(waitForMessage: string, callback: any, chatId?: string): Promise<void> {
    const defaultTimestamp = parseInt(new Date().getTime().toString().substring(0, 10));
    const intervalFunction = async (timestampInterval: number, lastMessageID?: number | undefined) => {
      const allMessages = await this.getMessages(chatId || this.chatId);
      const newMessages = allMessages.filter((message) => {
        return message.message.date > timestampInterval;
      });
      const arrID = lastMessageID ? newMessages.map((i) => i.message.message_id).indexOf(lastMessageID) : undefined;
      const newArray = arrID === undefined ? newMessages : newMessages.length <= 1 ? [] : newMessages.slice(arrID, newMessages.length - 1);
      for (const newMessage of newArray) {
        if (newMessage.message.text === waitForMessage) callback();
      }
      const newTimestamp = newArray.length > 0 ? newArray[newArray.length - 1].message.date : timestampInterval;
      const msgID = newArray.length > 0 ? newMessages[newMessages.length - 1].message.message_id : lastMessageID ? lastMessageID : undefined;
      setTimeout(() => intervalFunction(newTimestamp - 1, msgID), 1000);
    };
    intervalFunction(defaultTimestamp);
  }

  async onAnyMessage(callback: any, chatId?: string): Promise<void> {
    const defaultTimestamp = parseInt(new Date().getTime().toString().substring(0, 10));
    const intervalFunction = async (timestampInterval: number, lastMessageID?: number | undefined) => {
      const allMessages = await this.getMessages(chatId || this.chatId);
      const newMessages = allMessages.filter((message) => {
        return message.message.date > timestampInterval;
      });
      const arrID = lastMessageID ? newMessages.map((i) => i.message.message_id).indexOf(lastMessageID) : undefined;
      const newArray = arrID === undefined ? newMessages : newMessages.length <= 1 ? [] : newMessages.slice(arrID, newMessages.length - 1);
      newArray.map(() => callback());
      const newTimestamp = newArray.length > 0 ? newArray[newArray.length - 1].message.date : timestampInterval;
      const msgID = newArray.length > 0 ? newMessages[newMessages.length - 1].message.message_id : lastMessageID ? lastMessageID : undefined;
      setTimeout(() => intervalFunction(newTimestamp - 1, msgID), 1000);
    };
    intervalFunction(defaultTimestamp);
  }
}
