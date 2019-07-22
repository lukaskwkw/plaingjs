import { Store, createStore, combineReducers, applyMiddleware } from "redux";
import chat from "./pages/chat/reducers/index";

const reducer = combineReducers({ chat });

export type StoreState = ReturnType<typeof reducer>;
export type AppStore = Store<StoreState>;

export function initializeStore(initialState = {}) {
  return createStore(reducer, initialState);
}
