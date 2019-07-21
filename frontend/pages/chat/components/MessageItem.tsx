import * as React from "react";
import { Message } from "../model";

interface MessageItemProps extends Message {
  key?: number;
}

const MessageItem = ({ message, author }: MessageItemProps) => (
  <p>
    <i>{author}</i>: {message}
  </p>
);

export default MessageItem;
