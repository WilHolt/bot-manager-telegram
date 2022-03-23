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
class TelegramBot {
    constructor(botToken, chatId) {
        this.token = botToken;
        this.chatId = chatId;
        this.path = `https://api.telegram.org/bot${this.token}`;
    }
    sendContact({ phoneNumber, firstName, chatId, disableNotification }) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: chatId || this.chatId,
                phone_number: phoneNumber,
                first_name: firstName,
                disableNotification: disableNotification || false,
            });
            const url = `${this.path}/sendContact?${messageParams}`;
            const response = (yield (0, axios_1.default)(url)).data;
            return response;
        });
    }
    sendMessage({ message, chatId, disableNotification }) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: chatId || this.chatId,
                text: message,
                disableNotification: disableNotification || false,
            });
            const url = `${this.path}/sendMessage?${messageParams}`;
            const response = (yield (0, axios_1.default)(url)).data;
            return response;
        });
    }
    sendPoll({ question, options, type, correctOptionID, chatId, disableNotification, isAnonymous }) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: chatId || this.chatId,
                question: question,
                is_anonymous: isAnonymous || true,
                options: JSON.stringify(options),
                type: type || "regular",
                correct_option_id: correctOptionID,
                disableNotification: disableNotification || false,
            });
            const url = `${this.path}/sendPoll?${messageParams}`;
            const response = (yield (0, axios_1.default)(url)).data;
            return response;
        });
    }
    sendDice(chatId, disableNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageParams = qs_1.default.stringify({
                chat_id: chatId || this.chatId,
                disableNotification: disableNotification || false,
            });
            const url = `${this.path}/sendDice?${messageParams}`;
            const response = (yield (0, axios_1.default)(url)).data;
            return response;
        });
    }
    getUpdates() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield (0, axios_1.default)(`${this.path}/getUpdates`)).data.result;
            return response;
        });
    }
    getFirstID() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield (0, axios_1.default)(`${this.path}/getUpdates`)).data.result[0].message.from;
            return response;
        });
    }
}
exports.default = TelegramBot;
