import TypeKeys, { MessageActionTypes } from "../ActionTypes";
import { Message } from "../model";

interface MessageReducer {
  (state: Required<Message>[], action: MessageActionTypes): Required<Message>[];
}

export const messages: MessageReducer = (
  state = [],
  { author, id, message, type }
) => {
  switch (type) {
    case TypeKeys.ADD_MESSAGE:
    case TypeKeys.MESSAGE_RECEIVED:
      return [...state, { id, author, message }];
    default:
      return state;
  }
};

export default messages;
