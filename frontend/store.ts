import { createStore, combineReducers, applyMiddleware } from "redux";
import chat from "./pages/chat/reducers/index";

const reducer = combineReducers({ chat });

export function initializeStore(initialState = {}) {
  return createStore(reducer, initialState, applyMiddleware());
}
