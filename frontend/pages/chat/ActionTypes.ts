import { Message, User } from "./model";

enum TypeKeys {
  ADD_MESSAGE = "ADD_MESSAGE",
  MESSAGE_RECEIVED = "MESSAGE_RECEIVED",
  ADD_USER = "ADD_USER",
  USERS_LIST = "USERS_LIST"
}

export default TypeKeys;

export type AddMessageAction = {
  type: TypeKeys.ADD_MESSAGE;
} & Message;

type MessageReceivedAction = {
  type: TypeKeys.MESSAGE_RECEIVED;
} & Message;

type AddUserAction = {
  type: TypeKeys.ADD_USER;
} & User;

type PopulateUsersListAction = {
  type: TypeKeys.USERS_LIST;
} & { users: User[] };

export interface AddMessage {
  (message: Message["message"], author: Message["author"]): AddMessageAction;
}

export interface MessageReceived {
  (
    message: Message["message"],
    author: Message["author"]
  ): MessageReceivedAction;
}

export interface AddUser {
  (name: User["name"]): AddUserAction;
}

export interface PopulateUsersList {
  (users: User[]): PopulateUsersListAction;
}

export type MessageActionTypes = AddMessageAction | MessageReceivedAction;
export type UserActionTypes = AddUserAction | PopulateUsersListAction;

export type ActionTypes = MessageActionTypes | UserActionTypes;
