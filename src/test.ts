import TelegramBot from "../src/index";

const bot = new TelegramBot("5118466828:AAGpZmebzzwTg_luVxP9OBgi_PteNgRg_Wk", "1341716338")

async function main(){
  console.log(await bot.sendContact("test", "15621562", {chatId: "-704689888"}))
}

main()