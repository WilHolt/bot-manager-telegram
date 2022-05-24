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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBot = void 0;
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
require("./index");
var TelegramBot = /** @class */ (function () {
    function TelegramBot(botToken, chatId) {
        this.token = botToken;
        this.chatId = chatId;
        this.path = "https://api.telegram.org/bot".concat(this.token);
    }
    TelegramBot.prototype.publicCall = function (method, qs) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, axios_1.default)("".concat(this.path, "/").concat(method, "?").concat(qs))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    TelegramBot.prototype.sendMessage = function (message, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            text: message,
                            chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                            disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
                        });
                        return [4 /*yield*/, this.publicCall("sendMessage", messageParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.sendContact = function (firstName, phoneNumber, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                            phone_number: phoneNumber,
                            first_name: firstName,
                            disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
                        });
                        return [4 /*yield*/, this.publicCall("sendContact", messageParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.sendPoll = function (question, questionOptions, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                            question: question,
                            is_anonymous: (options === null || options === void 0 ? void 0 : options.isAnonymous) || true,
                            options: JSON.stringify(questionOptions),
                            type: (options === null || options === void 0 ? void 0 : options.type) || "regular",
                            correct_option_id: options === null || options === void 0 ? void 0 : options.correctOptionID,
                            disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
                        });
                        return [4 /*yield*/, this.publicCall("sendPoll", messageParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.sendDice = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                            disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
                        });
                        return [4 /*yield*/, this.publicCall("sendDice", messageParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.getUpdates = function (offsetNumber) {
        if (offsetNumber === void 0) { offsetNumber = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            offset: offsetNumber,
                        });
                        return [4 /*yield*/, this.publicCall("getUpdates", messageParams)];
                    case 1:
                        response = _a.sent();
                        if (!(response.result.length > 90)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getUpdates(response.result[response.result.length - 1].update_id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.sendPhotoString = function (photo, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            chat_id: (options === null || options === void 0 ? void 0 : options.chatId) || this.chatId,
                            disableNotification: (options === null || options === void 0 ? void 0 : options.disableNotification) || false,
                            photo: photo,
                        });
                        return [4 /*yield*/, this.publicCall("sendPhoto", messageParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.getChat = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var messageParams, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageParams = qs_1.default.stringify({
                            chat_id: chatId || this.chatId,
                        });
                        return [4 /*yield*/, this.publicCall("getChat", messageParams)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    TelegramBot.prototype.getMessages = function (chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, response, responseFromChat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getChat(chatId || this.chatId)];
                    case 1:
                        id = (_a.sent()).result.id;
                        return [4 /*yield*/, this.getUpdates()];
                    case 2:
                        response = _a.sent();
                        responseFromChat = response.result.filter(function (update) {
                            return update.message.chat.id == id;
                        });
                        return [2 /*return*/, responseFromChat];
                }
            });
        });
    };
    TelegramBot.prototype.clearInterval = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.interval)
                    clearInterval(this.interval);
                return [2 /*return*/];
            });
        });
    };
    TelegramBot.prototype.onMessage = function (waitForMessage, callback, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultTimestamp, intervalFunction;
            var _this = this;
            return __generator(this, function (_a) {
                defaultTimestamp = parseInt(new Date().getTime().toString().substring(0, 10));
                intervalFunction = function (timestampInterval, lastMessageID) { return __awaiter(_this, void 0, void 0, function () {
                    var allMessages, newMessages, arrID, newArray, _i, newArray_1, newMessage, newTimestamp, msgID;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getMessages(chatId || this.chatId)];
                            case 1:
                                allMessages = _a.sent();
                                newMessages = allMessages.filter(function (message) {
                                    return message.message.date > timestampInterval;
                                });
                                arrID = lastMessageID ? newMessages.map(function (i) { return i.message.message_id; }).indexOf(lastMessageID) : undefined;
                                newArray = arrID === undefined ? newMessages : newMessages.length <= 1 ? [] : newMessages.slice(arrID, newMessages.length - 1);
                                for (_i = 0, newArray_1 = newArray; _i < newArray_1.length; _i++) {
                                    newMessage = newArray_1[_i];
                                    if (newMessage.message.text === waitForMessage)
                                        callback();
                                }
                                newTimestamp = newArray.length > 0 ? newArray[newArray.length - 1].message.date : timestampInterval;
                                msgID = newArray.length > 0 ? newMessages[newMessages.length - 1].message.message_id : lastMessageID ? lastMessageID : undefined;
                                setTimeout(function () { return intervalFunction(newTimestamp - 1, msgID); }, 1000);
                                return [2 /*return*/];
                        }
                    });
                }); };
                intervalFunction(defaultTimestamp);
                return [2 /*return*/];
            });
        });
    };
    TelegramBot.prototype.onAnyMessage = function (callback, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultTimestamp, intervalFunction;
            var _this = this;
            return __generator(this, function (_a) {
                defaultTimestamp = parseInt(new Date().getTime().toString().substring(0, 10));
                intervalFunction = function (timestampInterval, lastMessageID) { return __awaiter(_this, void 0, void 0, function () {
                    var allMessages, newMessages, arrID, newArray, newTimestamp, msgID;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getMessages(chatId || this.chatId)];
                            case 1:
                                allMessages = _a.sent();
                                newMessages = allMessages.filter(function (message) {
                                    return message.message.date > timestampInterval;
                                });
                                arrID = lastMessageID ? newMessages.map(function (i) { return i.message.message_id; }).indexOf(lastMessageID) : undefined;
                                newArray = arrID === undefined ? newMessages : newMessages.length <= 1 ? [] : newMessages.slice(arrID, newMessages.length - 1);
                                newArray.map(function () { return callback(); });
                                newTimestamp = newArray.length > 0 ? newArray[newArray.length - 1].message.date : timestampInterval;
                                msgID = newArray.length > 0 ? newMessages[newMessages.length - 1].message.message_id : lastMessageID ? lastMessageID : undefined;
                                setTimeout(function () { return intervalFunction(newTimestamp - 1, msgID); }, 1000);
                                return [2 /*return*/];
                        }
                    });
                }); };
                intervalFunction(defaultTimestamp);
                return [2 /*return*/];
            });
        });
    };
    return TelegramBot;
}());
exports.TelegramBot = TelegramBot;
