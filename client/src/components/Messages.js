import React from "react";
import "./style.css";
import Message from "./message";

const Messages = ({ messages }) => {
  console.log("Messages: " + messages);
  return (
    <div className="messagesSection">
      {messages.map(message => {
        return (
          <div className="messagesContainer">
            <Message message={message} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;