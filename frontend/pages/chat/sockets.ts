import TypeKeys, { ActionTypes } from "./ActionTypes";
import { addUser, messageReceived, populateUsersList } from "./actions";

const setupSocket = (
  dispatch,
  username,
  resolve = undefined,
  reject = undefined
) => {
  let socket: WebSocket;
  socket = new WebSocket("ws://localhost:9124");

  socket.onerror = () => {
    reject("Connection error");
  };

  let resolved = false;

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
        if (!resolved) {
          if (resolve) resolve(socket);
          resolved = true;
        }
        dispatch(populateUsersList(data.users));
        break;
      case TypeKeys.ALREADY_TAKEN:
        if (reject) {
          socket.close();
          reject();
        }
        break;
      default:
        break;
    }
  };
};

export default setupSocket;
