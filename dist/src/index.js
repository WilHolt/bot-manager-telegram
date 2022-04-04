"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
require("./index");
class TelegramBot {
    constructor(botToken, chatId) {
        this.token = botToken;
        this.chatId = chatId;
        this.path = `https://api.telegram.org/bot${this.token}`;
    }
    publicCall(method, qs) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, axios_1.default)(`${this.path}/${method}?${qs}`);
            return response.data;
        });
    }
    sendMessage(message, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                text: message,
                chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
            });
            const response = yield this.publicCall("sendMessage", messageParams);
            return response;
        });
    }
    sendContact(firstName, phoneNumber, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                phone_number: phoneNumber,
                first_name: firstName,
                disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
            });
            const response = yield this.publicCall("sendContact", messageParams);
            return response;
        });
    }
    sendPoll(question, choices, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                question: question,
                is_anonymous: (options === null || options === void 0 ? void 0 : options.isAnonymous) || true,
                options: JSON.stringify(choices),
                type: (options === null || options === void 0 ? void 0 : options.type) || "regular",
                correct_option_id: options === null || options === void 0 ? void 0 : options.correctOptionID,
                disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
            });
            const response = yield this.publicCall("sendPoll", messageParams);
            return response;
        });
    }
    sendDice(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
            });
            const response = yield this.publicCall("sendDice", messageParams);
            return response;
        });
    }
    getUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield (0, axios_1.default)(`${this.path}/getUpdates`)).data;
            return response;
        });
    }
    sendPhotoString(photo, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
                photo: photo
            });
            const response = yield this.publicCall("sendPhoto", messageParams);
            return response;
        });
    }
}
exports.default = TelegramBot;
