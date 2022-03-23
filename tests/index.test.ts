import TelegramBot from "../src/index"

const bot = new TelegramBot("5118466828:AAGpZmebzzwTg_luVxP9OBgi_PteNgRg_Wk", "1341716338")



describe("Testing index.ts", () => {
  test("Send a message in a telegram chat", async () => {
    expect((await bot.sendMessage({ message: "Hello world" })).ok).toBe(true)
  })

  test("Send a contact in a telegram chat", async () => {
    expect((await bot.sendContact({ phoneNumber: "65999999999", firstName: "Alvaro" })).ok).toBe(true)
  })

  test("Send a dice in a telegram chat", async () => {
    expect((await bot.sendDice()).ok).toBe(true)
  })
  test("Send a poll in a telegram chat", async () => {
    expect((await bot.sendPoll({ question: "Some random text", options: ["1", "2", "3", "4"] })).ok).toBe(true)
  })

  test("Get updates from bot", async () => {
    expect((await bot.getUpdates()).ok).toBe(true)
  })
})

