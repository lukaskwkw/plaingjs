import { combineReducers } from "redux";
import messsages from "./messages";
import users from "./users";

const chat = combineReducers({ messsages, users });

export default chat;
