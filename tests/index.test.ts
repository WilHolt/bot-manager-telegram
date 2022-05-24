import { TelegramBot } from "../src";

const bot = new TelegramBot("5118466828:AAGpZmebzzwTg_luVxP9OBgi_PteNgRg_Wk", "1341716338");

describe("Testing index.ts", () => {
  test("Send a message in a telegram chat", async () => {
    expect((await bot.sendMessage("Hello world")).ok).toBe(true);
  });

  test("Send a contact in a telegram chat", async () => {
    expect((await bot.sendContact("Alvaro", "9999999999")).ok).toBe(true);
  });

  test("Send a dice in a telegram chat", async () => {
    expect((await bot.sendDice()).ok).toBe(true);
  });
  test("Send a poll in a telegram chat", async () => {
    expect((await bot.sendPoll("Some random text", ["1", "2", "3", "4"])).ok).toBe(true);
  });

  test("Get updates from bot", async () => {
    expect((await bot.getUpdates()).ok).toBe(true);
  });

  test("Send a photo passing a string", async () => {
    expect((await bot.sendPhotoString("https://www.petlove.com.br/static/pets/dog/110696/hd_1529353218-photo-1529353182455.jpg")).ok).toBe(true);
  });
});
