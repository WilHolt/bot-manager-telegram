export type getUpdatesDataMessage = {
  message_id: number;
  from: { id: number; is_bot: boolean; first_name: string; language_code: string };
  chat: { id: number; first_name: string; type: string; language_code: string };
  date: number;
  text: string;
};

export type getUpdatesData = {
  update_id: number;
  message: getUpdatesDataMessage;
};

export type sendPhotoReturnResult = {
  message_id: number;
  from: { id: number; is_bot: boolean; first_name: string; username: string };
  chat: { id: number; first_name: string; type: string };
  date: number;
  photo: {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    width: number;
    height: number;
  }[];
};

export type sendPhotoReturn = {
  ok: boolean;
  result: sendPhotoReturnResult;
};

export type sendPollReturnResultPoll = {
  id: string;
  question: string;
  options: {
    text: string;
    voter_count: number;
  }[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: string;
  allows_multiple_answers: boolean;
};

export type sendPollReturnResult = {
  message_id: number;
  from: resultFrom;
  chat: resultChat;
  date: number;
  poll: sendPollReturnResultPoll;
};

export type sendPollReturn = {
  ok: boolean;
  result: sendPollReturnResult;
};

export type getUpdatesReturnFrom = {
  message_id: number;
  from: resultFrom;
  chat: resultChat;
  date: number;
  text: string;
};

export type getUpdatesReturnResult = {
  update_id: number;
  message: getUpdatesReturnFrom;
};

export type getUpdatesReturn = {
  ok: boolean;
  result: getUpdatesReturnResult[];
};

export type sendDiceReturnResultDice = {
  emoji: string;
  value: number;
};

export type sendDiceReturnResult = {
  message_id: number;
  from: resultFrom;
  chat: resultChat;
  date: number;
  dice: sendDiceReturnResultDice;
};

export type sendDiceReturn = {
  ok: boolean;
  result: sendDiceReturnResult;
};

export type sendContactReturnResultContact = {
  phone_number: string;
  first_name: string;
};

export type sendContactReturnResult = {
  message_id: number;
  from: sendContactReturnResultContact;
  chat: resultChat;
  date: number;
  contact: sendContactReturnResult;
};

export type sendContactReturn = {
  ok: boolean;
  result: sendContactReturnResult;
};

export type resultChat = {
  id: number;
  firstName: string;
  type: string;
};

export type resultFrom = {
  id: number;
  is_bot: boolean;
  firstName: string;
  username: string;
};

export type sendMessageResult = {
  message_id: number;
  from: resultFrom;
  chat: resultChat;
  date: number;
  text: string;
};

export type sendMessageReturn = {
  ok: boolean;
  result: sendMessageResult;
};

export type sendPoll = {
  type?: string;
  correctOptionID?: number;
  chatId?: string;
  disableNotification?: boolean;
  isAnonymous?: boolean;
};

export type defaultMessage = {
  chatId?: string;
  disableNotification?: boolean;
};
