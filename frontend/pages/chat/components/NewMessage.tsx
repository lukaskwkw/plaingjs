// import * as React from "react";
import { useState } from "react";

const NewMessage = ({ addMessage }: { addMessage: Function }) => {
  const [message, setMessage] = useState("");

  return (
    <div id="new-message">
      <textarea
        placeholder="Type here..."
        onKeyPress={event => {
          if (event.key === "Enter") {
            addMessage(message, "Me");
            setMessage("");
            event.preventDefault();
          }
        }}
        onChange={({ target: { value } }) => setMessage(value)}
        value={message}
      />
    </div>
  );
};

export default NewMessage;
