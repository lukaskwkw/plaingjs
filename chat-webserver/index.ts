import * as WebSocket from "ws";
const https = require("https");
const fs = require("fs");

import TypeKeys, { ActionTypes } from "../frontend/lib_chat/ActionTypes";
import { addMessage, populateUsersList } from "../frontend/lib_chat/actions";
import { alreadyTaken } from "../frontend/lib_chat/actions/index";
import { webServerPort, serverHost } from "../frontend/config";
import { User } from "../frontend/lib_chat/model";

const server = https.createServer({
  cert: fs.readFileSync("./server.cert"),
  key: fs.readFileSync("./server.key")
});

const wss = new WebSocket.Server({
  server,
  rejectUnauthorized: false
});

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

server.listen({ port: webServerPort }, () => {
  //
  // If the `rejectUnauthorized` option is not `false`, the server certificate
  // is verified against a list of well-known CAs. An 'error' event is emitted
  // if verification fails.
  //
  // The certificate used in this example is self-signed so `rejectUnauthorized`
  // is set to `false`.
  //

  console.info(`Listening on: ${server.address().port}`);

  const ws = new WebSocket(`wss://${serverHost}:${server.address().port}`, {
    rejectUnauthorized: false
  });

  ws.on("open", () => {
    const action = addMessage("start", "ja");
    ws.send(JSON.stringify(action));
  });
});
