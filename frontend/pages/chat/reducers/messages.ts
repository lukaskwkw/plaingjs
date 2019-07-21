import TypeKeys, { MessageActionTypes } from "../ActionTypes";
import { Message } from "../model";

export const messages = (
  state: Required<Message>[] = [],
  { author, id, message, type }: MessageActionTypes
): Required<Message>[] => {
  switch (type) {
    case TypeKeys.ADD_MESSAGE:
    case TypeKeys.MESSAGE_RECEIVED:
      return [...state, { id, author, message }];
    default:
      return state;
  }
};

export default messages;
