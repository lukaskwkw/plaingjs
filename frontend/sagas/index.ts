import { takeEvery } from "redux-saga/effects";
import TypeKeys, { AddMessageAction } from "../lib_chat/ActionTypes";

const handleNewMessage = function* handleNewMessage({ socket, username }) {
  yield takeEvery(TypeKeys.ADD_MESSAGE, (action: AddMessageAction) => {
    action.author = username;
    socket.send(JSON.stringify(action));
  });
};

export default handleNewMessage;
