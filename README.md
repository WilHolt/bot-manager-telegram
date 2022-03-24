# A Simple bot manager for telegram

```
$ npm install telegram-bot-nodejs
```

[![npm version](https://badge.fury.io/js/telegram-bot-nodejs.svg)](https://badge.fury.io/js/telegram-bot-nodejs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![npm](https://img.shields.io/npm/dw/telegram-bot-nodejs)
![GitHub last commit](https://img.shields.io/github/last-commit/alvaroBegnini/bot-manager-telegram)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/alvaroBegnini/bot-manager-telegram)


## **Getting started**

#### you will need a bot created with botFather

Create a bot using the botFather of telegram [here](https://t.me/botfather)\
Copy the bot token and your chat id

## Start your bot here:

```typescript
const bot = new TelegramBot("your token here", "chatId here");
```

The chatId is not mandatory but it's recommended to use.
Otherwise you will have to send the _chatId_ in every request

## **Sending message**

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function sendMessage() {
  const response = bot.sendMessage({ message: "Hello world" });
  console.log(response);
}
```

## **Sending message to another chat**

If you want to send a message to another chat you can just add _chatId_ in your request

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function sendMessage() {
  const response = bot.sendMessage({
    message: "Hello world",
    chatId: "your chatId here",
  });
  console.log(response);
}
```

## **Sending contacts**

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function sendContact() {
  const response = bot.sendContact({
    phoneNumber: "+556599999999",
    firstName: "Alvaro",
  });
  console.log(response);
}
```

## **Get updates**

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function getUpdates() {
  const response = bot.getUpdates();
  console.log(response);
}
```

## **Send poll**

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function sendPoll() {
  const response = bot.sendPoll({
    question: "Some question here",
    options: ["option1", "option2", "option3"],
  });
  console.log(response);
}

//By default the type of polling will be regular, but you can make a quiz with {type: "quiz"}
```

## **Silent notifications**

The user receives the notifications but without any sound

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function silentMessage() {
  const response = bot.sendMessage({
    message: "Silence!",
    disableNotification: true,
  });
  console.log(response);
}
```

## **Send dice**

send a dice that lands on a random number

```typescript
const bot = new TelegramBot("your token here", "chatId here");

async function silentMessage() {
  const response = bot.sendDice();
  console.log(response);
}
```
