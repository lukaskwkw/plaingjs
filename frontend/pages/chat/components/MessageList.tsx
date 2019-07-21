import * as React from "react";
import { Message } from "../model";
import MessageItem from "./MessageItem";

const MessagesList = ({ messages }: { messages: Message[] }) => (
  <section id="messages-list">
    <ul>
      {messages.map(({ id, ...message }) => (
        <MessageItem key={id} {...message} />
      ))}
    </ul>
  </section>
);

export default MessagesList;
