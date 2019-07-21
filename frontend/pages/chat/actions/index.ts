import { User } from "../model";
import TypeKeys, {
  AddMessage,
  AddUser,
  MessageReceived,
  PopulateUsersList
} from "../ActionTypes";

let nextMessageId = 0;
let nextUserId = 0;

export const addMesage = (message, author): AddMessage => ({
  type: TypeKeys.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author
});

export const addUser = (name): AddUser => ({
  type: TypeKeys.ADD_USER,
  id: nextUserId++,
  name
});

export const messageReceived = (message, author): MessageReceived => ({
  type: TypeKeys.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author
});

export const populateUsersList = (users: User[]): PopulateUsersList => ({
  type: TypeKeys.USERS_LIST,
  users
});
