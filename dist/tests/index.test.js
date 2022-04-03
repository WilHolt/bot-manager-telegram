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
const index_1 = __importDefault(require("../src/index"));
const bot = new index_1.default("5118466828:AAGpZmebzzwTg_luVxP9OBgi_PteNgRg_Wk", "1341716338");
describe("Testing index.ts", () => {
    test("Send a message in a telegram chat", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield bot.sendMessage("Hello world")).ok).toBe(true);
    }));
    test("Send a contact in a telegram chat", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield bot.sendContact("Alvaro", "9999999999")).ok).toBe(true);
    }));
    test("Send a dice in a telegram chat", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield bot.sendDice()).ok).toBe(true);
    }));
    test("Send a poll in a telegram chat", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield bot.sendPoll("Some random text", ["1", "2", "3", "4"])).ok).toBe(true);
    }));
    test("Get updates from bot", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield bot.getUpdates()).ok).toBe(true);
    }));
    test("Send a photo passing a string", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield bot.sendPhotoString("https://www.petlove.com.br/static/pets/dog/110696/hd_1529353218-photo-1529353182455.jpg")).ok).toBe(true);
    }));
});
