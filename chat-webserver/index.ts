import * as WebSocket from "ws";

import { StoreState } from "../frontend/store";
import TypeKeys from "../frontend/pages/chat/ActionTypes";

// const WebSocket = require("ws");

// const wss = new WebSocket("ws://localhost:9124/");
const wss = new WebSocket.Server({ port: 9124 });

wss.on("connection", ws => {
  ws.on("message", message => {
    console.log("received: %s", message);
  });

  ws.send("something");
});
