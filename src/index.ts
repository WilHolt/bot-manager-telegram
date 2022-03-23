import axios from "axios"
import qs from "qs"


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

  async sendContact({ phoneNumber, firstName, chatId, disableNotification }: sendContact) {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      phone_number: phoneNumber,
      first_name: firstName,
      disableNotification: disableNotification || false,
    })
    const url = `${this.path}/sendContact?${messageParams}`
    const response = (await axios(url)).data
    return response
  }

  async sendMessage({ message, chatId, disableNotification }: sendMessage) {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      text: message,
      disableNotification: disableNotification || false,
    })
    const url = `${this.path}/sendMessage?${messageParams}`
    const response = (await axios(url)).data
    return response
  }

  async sendPoll({ question, options, type, correctOptionID, chatId, disableNotification }: sendPoll) {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      question: question,
      options: JSON.stringify(options),
      type: type || "regular",
      correct_option_id: correctOptionID,
      disableNotification: disableNotification || false,
    })

    const url = `${this.path}/sendPoll?${messageParams}`
    const response = (await axios(url)).data
    return response

  }

  async sendDice(chatId?: string, disableNotification?: boolean) {
    const messageParams = qs.stringify({
      chat_id: chatId || this.chatId,
      disableNotification: disableNotification || false,
    })
    const url = `${this.path}/sendDice?${messageParams}`
    const response = (await axios(url)).data
    return response
  }

  async getUpdates() {
    const response = (await axios(`${this.path}/getUpdates`)).data.result
    return response
  }

  async getFirstID() {
    const response = (await axios(`${this.path}/getUpdates`)).data.result[0].message.from
    return response
  }
}