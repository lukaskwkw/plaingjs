import { createStore, combineReducers, applyMiddleware } from "redux";
import chat from "./pages/chat/reducers/index";
import { Message, User } from "./pages/chat/model";

const reducer = combineReducers({ chat });

export type Store = { chat: { messages: Required<Message>[]; users: User[] } };

export function initializeStore(initialState = {}) {
  return createStore(reducer, initialState);
}
