import axios from "axios"
import qs from "qs"



type sendPollReturnResultPoll = {
  id: string,
  question: string,
  options: {
    text: string,
    voter_count: number,
  }[],
  total_voter_count: number,
  is_closed: boolean,
  is_anonymous: boolean,
  type: string,
  allows_multiple_answers: boolean,
}

type sendPollReturnResult = {
  message_id: number,
  from: resultFrom,
  chat: resultChat,
  date: number,
  poll: sendPollReturnResultPoll
}

type sendPollReturn = {
  ok: boolean,
  result: sendPollReturnResult
}

type getUpdatesReturnFrom = {
  message_id: number,
  from: resultFrom,
  chat: resultChat,
  date: number,
  text: string
}

type getUpdatesReturn = {
  ok: boolean,
  result: {
    update_id: number,
    message: getUpdatesReturnFrom
  }[]
}

type sendDiceReturnResultDice = {
  emoji: string,
  value: number
}

type sendDiceReturnResult = {
  message_id: number,
  from: resultFrom,
  chat: resultChat,
  date: number,
  dice: sendDiceReturnResultDice
}

type sendDiceReturn = {
  ok: boolean,
  result: sendDiceReturnResult
}

type sendContactReturnResultContact = {
  phone_number: string,
  first_name: string,
}

type sendContactReturnResult = {
  message_id: number,
  from: sendContactReturnResultContact,
  chat: resultChat,
  date: number,
  contact: sendContactReturnResult,
}

type sendContactReturn = {
  ok: boolean,
  result: sendContactReturnResult,
}

type resultChat = {
  id: number,
  firstName: string,
  type: string
}

type resultFrom = {
  id: number,
  is_bot: boolean,
  firstName: string,
  username: string
}

type sendMessageResult = {
  message_id: number,
  from: resultFrom,
  chat: resultChat,
  date: number
  text: string
}

type sendMessageReturn = {
  ok: boolean,
  result: sendMessageResult
}

type sendContact = {
  chatId?: string,
  phoneNumber: string,
  firstName: string,
  disableNotification?: boolean,
}

type sendPoll = {
  question: string,
  options: string[],
  type?: string,
  correctOptionID?: number,
  chatId?: string,
  disableNotification?: boolean,
  isAnonymous?: boolean,
}

type sendMessage = {
  message: string,
  chatId?: string
  disableNotification?: boolean,
}


export default class TelegramBot {
  token: string
  chatId?: string
  path: string

  constructor(botToken: string, chatId?: string) {
    this.token = botToken
    this.chatId = chatId
    this.path = `https://api.telegram.org/bot${this.token}`
  }

  async publicCall(method: string, qs: string) {
    const response = await axios(`${this.path}/${method}?${qs}`)
    return response.data
  }

  async sendMessage({ message, chatId, disableNotification }: sendMessage): Promise<sendMessageReturn> {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      text: message,
      disableNotification: disableNotification || false,
    })
    const response = await this.publicCall("sendMessage", messageParams)
    return response
  }

  async sendContact({ phoneNumber, firstName, chatId, disableNotification }: sendContact): Promise<sendContactReturn> {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      phone_number: phoneNumber,
      first_name: firstName,
      disableNotification: disableNotification || false,
    })
    const response = await this.publicCall("sendContact", messageParams)
    return response
  }

  async sendPoll({ question, options, type, correctOptionID, chatId, disableNotification, isAnonymous }: sendPoll): Promise<sendPollReturn> {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      question: question,
      is_anonymous: isAnonymous || true,
      options: JSON.stringify(options),
      type: type || "regular",
      correct_option_id: correctOptionID,
      disableNotification: disableNotification || false,
    })

    const response = await this.publicCall("sendPoll", messageParams)
    return response
  }

  async sendDice(chatId?: string, disableNotification?: boolean): Promise<sendDiceReturn> {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      disableNotification: disableNotification || false,
    })
    const response = await this.publicCall("sendDice", messageParams)
    return response
  }

  async getUpdates(): Promise<getUpdatesReturn> {
    const response = (await axios(`${this.path}/getUpdates`)).data
    return response
  }
}