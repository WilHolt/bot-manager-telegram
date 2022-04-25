import axios from "axios"
import qs from "qs"
import "./index"


type sendPhotoReturnResult = {
  message_id: number,
  from: {id: number, is_bot: boolean, first_name: string, username: string}
  chat: {id: number, first_name: string, type: string,}
  date: number,
  photo: {file_id: string, file_unique_id: string, file_size: number, width: number, height: number}[]
}

type sendPhotoReturn = {
  ok: boolean,
  result: sendPhotoReturnResult
}

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

type sendPoll = {
  type?: string,
  correctOptionID?: number,
  chatId?: string,
  disableNotification?: boolean,
  isAnonymous?: boolean,
}

type defaultMessage = {
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

  async sendMessage(message: string, options?: defaultMessage): Promise<sendMessageReturn> {
    const messageParams = qs.stringify({
      text: message,
      chat_id: options?.chatId || this.chatId,
      disableNotification: options?.disableNotification || false,
    })
    const response = await this.publicCall("sendMessage", messageParams)
    return response
  }

  async sendContact(firstName: string, phoneNumber: string,  options?: defaultMessage): Promise<sendContactReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      phone_number: phoneNumber,
      first_name: firstName,
      disableNotification: options?.disableNotification || false,
    })
    const response = await this.publicCall("sendContact", messageParams)
    return response
  }

  async sendPoll(question: string, questionOptions: string[], options?: sendPoll): Promise<sendPollReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      question: question,
      is_anonymous: options?.isAnonymous || true,
      options: JSON.stringify(questionOptions),
      type: options?.type || "regular",
      correct_option_id: options?.correctOptionID,
      disableNotification: options?.disableNotification || false,
    })

    const response = await this.publicCall("sendPoll", messageParams)
    return response
  }

  async sendDice(options?: defaultMessage): Promise<sendDiceReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      disableNotification: options?.disableNotification || false,
    })
    const response = await this.publicCall("sendDice", messageParams)
    return response
  }

  async getUpdates(): Promise<getUpdatesReturn> {
    const response = (await axios(`${this.path}/getUpdates`)).data
    return response
  }

  async sendPhotoString(photo: string, options?: defaultMessage ): Promise<sendPhotoReturn> {
    const messageParams = qs.stringify({
      chat_id: options?.chatId || this.chatId,
      disableNotification: options?.disableNotification || false,
      photo: photo
    })
    const response = await this.publicCall("sendPhoto", messageParams)
    return response
  }
}