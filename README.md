# A Simple bot manager for telegram

[![NPM](https://nodei.co/npm/telegram-bot-nodejs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/telegram-bot-nodejs)

[![npm version](https://badge.fury.io/js/telegram-bot-nodejs.svg)](https://badge.fury.io/js/telegram-bot-nodejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/alvaroBegnini/bot-manager-telegram/badge.svg?branch=main)](https://coveralls.io/github/alvaroBegnini/bot-manager-telegram?branch=main)
[![GitHub last commit](https://img.shields.io/github/last-commit/alvaroBegnini/bot-manager-telegram)](https://github.com/alvaroBegnini/bot-manager-telegram)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/alvaroBegnini/bot-manager-telegram)](https://github.com/alvaroBegnini/bot-manager-telegram)

## **Getting started**

```
$ npm install telegram-bot-nodejs
```

```
$ yarn add telegram-bot-nodejs
```

### First you will need a bot created with botFather and a chatId to send the messages

#

[How to create a new bot](https://core.telegram.org/bots#6-botfather)\
[How to get your chat id](https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id)

Copy the bot token and your chat id

#

# Start your bot here:

#### import syntax

```typescript
import { TelegramBot } from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");
```

#### require syntax

```typescript
const { TelegramBot } = require("telegram-bot-nodejs");

const bot = new TelegramBot("your token here", "chatId here");
```

The chatId is not mandatory but it's recommended to use.
Otherwise you will have to send the _chatId_ in every request

#

### **Callbacks on message**

```typescript
async function main() {
  await bot.onAnyMessage(async () => {
    await bot.sendMessage("Hello");
  });
}

main();
```

```typescript
async function main() {
  //The first argument is the matching text for the callback to be executed
  //The second argument is the callback function
  await bot.onMessage("Hi", async () => {
    await bot.sendMessage("Hello");
  });
}

main();
```

#

### **Sending message**

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function sendMessage() {
  const response = await bot.sendMessage("Hello world");
  console.log(response);
}

sendMessage();
```

#

### **Sending message to another chat**

If you want to send a message to another chat you can just add _chatId_ in your request

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function sendMessage() {
  const response = await bot.sendMessage("Hello world", {
    chatId: "your chatId here",
  });
  console.log(response);
}

sendMessage();
```

#

### **Sending contacts**

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function sendContact() {
  // First argument is the first name of the contact
  // The second argument is the phone number
  const response = await bot.sendContact("Alvaro", "+556599999999");

  console.log(response);
}

sendContact();
```

#

### **Get updates**

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function getUpdates() {
  const response = await bot.getUpdates();
  console.log(response);
}

getUpdates();
```

#

### **Send poll**

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function sendPoll() {
  const response = await bot.sendPoll("Some random question here", ["option1", "option2", "option3"]);
  console.log(response);

  sendPoll();
}

//By default the type of polling will be regular, but you can make a quiz with {type: "quiz"}
```

#

### **Silent notifications**

The user receives the notifications but without any sound

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function silentMessage() {
  const response = await bot.sendMessage("Silence!", {
    disableNotification: true,
  });
  console.log(response);
}

silentMessage();
```

#

### **Send dice**

send a dice that lands on a random number

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function sendDice() {
  const response = await bot.sendDice();
  console.log(response);
}

sendDice();
```

#

### **Send photo**

Send a photo from telegram servers / HTTP URL

```typescript
import TelegramBot from "telegram-bot-nodejs";

const bot = new TelegramBot("your token here", "chatId here");

async function sendPhoto() {
  const response = await bot.sendPhotoString("https://www.petlove.com.br/static/pets/dog/110696/hd_1529353218-photo-1529353182455.jpg");
  console.log(response);
}

sendPhoto();
```
