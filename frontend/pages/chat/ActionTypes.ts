import { Message, User } from "./model";

enum TypeKeys {
  ADD_MESSAGE = "ADD_MESSAGE",
  MESSAGE_RECEIVED = "MESSAGE_RECEIVED",
  ADD_USER = "ADD_USER",
  USERS_LIST = "USERS_LIST"
}

export default TypeKeys;

export interface AddMessage extends Message {
  type: TypeKeys.ADD_MESSAGE;
}

export interface MessageReceived extends Message {
  type: TypeKeys.MESSAGE_RECEIVED;
}

export interface AddUser extends User {
  type: TypeKeys.ADD_USER;
}

export interface PopulateUsersList {
  type: TypeKeys.USERS_LIST;
  users: User[];
}

export type MessageActionTypes = AddMessage | MessageReceived;
export type UserActionTypes = AddUser | PopulateUsersList;

export type ActionTypes =
  | AddMessage
  | MessageReceived
  | AddUser
  | PopulateUsersList;
