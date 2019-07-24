import TypeKeys, { ActionTypes } from "./ActionTypes";
import { addUser, messageReceived, populateUsersList } from "./actions";

const setupSocket = (
  dispatch,
  username,
  resolve = undefined,
  reject = undefined
) => {
  const socket = new WebSocket("ws://localhost:9124");

  socket.onopen = () => {
    socket.send(JSON.stringify(addUser(username)));
  };

  socket.onmessage = event => {
    const data: ActionTypes = JSON.parse(event.data);
    switch (data.type) {
      case TypeKeys.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author));
        break;
      case TypeKeys.ADD_USER:
        dispatch(addUser(data.name));
        break;
      case TypeKeys.USERS_LIST:
        if (resolve) {
          resolve();
        }
        dispatch(populateUsersList(data.users));
        break;
      case TypeKeys.ALREADY_TAKEN:
        if (reject) {
          reject();
        }
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
