import * as WebSocket from "ws";

import TypeKeys, { ActionTypes } from "../frontend/pages/chat/ActionTypes";
import { addMessage, populateUsersList } from "../frontend/pages/chat/actions";
import { User } from "../frontend/pages/chat/model";
import { alreadyTaken } from "../frontend/pages/chat/actions/index";

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
        index = users.length;
        let currIndex = index + 1;
        users.push({ name: undefined, id: currIndex });

        if (users.find(user => user.name === data.name)) {
          const action = alreadyTaken();
          ws.send(JSON.stringify(action));
          return;
        }

        users[index].name = data.name;

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
