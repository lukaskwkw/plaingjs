import { User } from "../model";
import TypeKeys, {
  AddMessage,
  AddUser,
  MessageReceived,
  PopulateUsersList
} from "../ActionTypes";

let nextMessageId = 0;
let nextUserId = 0;

export const addMesage: AddMessage = (message, author) => ({
  type: TypeKeys.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
});

export const addUser: AddUser = name => ({
  type: TypeKeys.ADD_USER,
  id: nextUserId++,
  name
});

export const messageReceived: MessageReceived = (message, author) => ({
  type: TypeKeys.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author
});

export const populateUsersList: PopulateUsersList = users => ({
  type: TypeKeys.USERS_LIST,
  users
});
