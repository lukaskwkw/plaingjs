const express = require("express");
const next = require("next");
const https = require("https");
const fs = require("fs");

var ssl_options = {
  key: fs.readFileSync("../chat-webserver/server.key"),
  cert: fs.readFileSync("../chat-webserver/server.cert")
};

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3007, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3007");
    });

    var httpsServer = https
      .createServer(ssl_options, server)
      .listen("4707", err => {
        if (err) throw err;
        console.log("> Ready on https://localhost:4707");
      });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
