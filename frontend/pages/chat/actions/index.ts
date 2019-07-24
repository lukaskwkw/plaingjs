import TypeKeys, {
  AddMessage,
  AddUser,
  MessageReceived,
  PopulateUsersList
} from "../ActionTypes";

let nextMessageId = 0;
let nextUserId = 0;

export const addMessage: AddMessage = (message, author) => ({
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

export const alreadyTaken = () => ({
  type: TypeKeys.ALREADY_TAKEN
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
