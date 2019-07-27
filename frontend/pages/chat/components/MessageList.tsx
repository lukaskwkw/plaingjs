import { Message } from "../../../lib_chat/model";
import MessageItem from "./MessageItem";
import { useRef, useEffect } from "react";

const MessagesList = ({ messages }: { messages: Message[] }) => {
  const ref = useRef();

  useEffect(() => {
    const { current }: { current: HTMLElement } = ref;
    current.scrollTo(0, current.scrollHeight - current.offsetHeight);
  });

  return (
    <section ref={ref} id="messages-list">
      <ul>
        {messages &&
          messages.map(({ id, ...message }) => (
            <MessageItem key={id + Math.random()} {...message} />
          ))}
      </ul>
    </section>
  );
};

export default MessagesList;
