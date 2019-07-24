import * as WebSocket from "ws";

import TypeKeys, { ActionTypes } from "../frontend/pages/chat/ActionTypes";
import { addMessage, populateUsersList } from "../frontend/pages/chat/actions";
import { User } from "../frontend/pages/chat/model";

const wss = new WebSocket.Server({ port: 9124 });

const users: User[] = [];

const broadcast = (data: ActionTypes, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", ws => {
  let index;
  ws.on("message", message => {
    const data: ActionTypes = JSON.parse(message);

    switch (data.type) {
      case TypeKeys.ADD_USER: {
        if (users.find(user => user.name === data.name)) {
        }

        index = users.length;
        users.push({ name: data.name, id: index + 1 });

        const action = populateUsersList(users);

        ws.send(JSON.stringify(action));
        broadcast(action, ws);
        break;
      }
      case TypeKeys.ADD_MESSAGE:
        const { author, message } = data;
        const action = addMessage(message, author);

        broadcast(action, ws);
        break;
      default:
        break;
    }
  });

  ws.on("close", () => {
    users.splice(index, 1);
    broadcast(
      {
        type: TypeKeys.USERS_LIST,
        users
      },
      ws
    );
  });
});
