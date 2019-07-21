import { Message, User } from "./model";

enum TypeKeys {
  ADD_MESSAGE = "ADD_MESSAGE",
  MESSAGE_RECEIVED = "MESSAGE_RECEIVED",
  ADD_USER = "ADD_USER",
  USERS_LIST = "USERS_LIST"
}

export default TypeKeys;

type AddMessageAction = {
  type: TypeKeys.ADD_MESSAGE;
};

type MessageReceivedAction = {
  type: TypeKeys.MESSAGE_RECEIVED;
};

type AddUserAction = {
  type: TypeKeys.ADD_USER;
};

type PopulateUsersListAction = {
  type: TypeKeys.USERS_LIST;
};

export interface AddMessage {
  (message: Message["message"], author: Message["author"]): Message &
    AddMessageAction;
}

export interface MessageReceived {
  (message: Message["message"], author: Message["author"]): Message &
    MessageReceivedAction;
}

export interface AddUser {
  (name: User["name"]): User & AddUserAction;
}

export interface PopulateUsersList {
  (users: User[]): { users: User[] } & PopulateUsersListAction;
}

export type MessageActionTypes = AddMessageAction | MessageReceivedAction;
export type UserActionTypes = AddUserAction | PopulateUsersListAction;

export type ActionTypes = MessageActionTypes | UserActionTypes;
