import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import ChatApi from "../../api/ChatApi";
import { tokenContext, userContext } from "../../InfoProvider";

type Message = {
  text: string;
  time: string;
  username: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [token] = useContext(tokenContext);
  const [user] = useContext(userContext);

  useEffect(() => {
    const initMessages = async () => {
      const fetchedMessages = await ChatApi.fetchMessages(token);
      setMessages(fetchedMessages);
    };

    initMessages();

    const socket = new WebSocket(`ws://localhost:8080`);
    socket.addEventListener("open", () => {});
    socket.addEventListener("error", (event: Event) => {
      console.error("WebSocket error:", event);
    });
    socket.addEventListener("message", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      const incomingMessage: Message = {
        text: data.text,
        time: data.time,
        username: data.username,
      };

      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await ChatApi.sendMessage(newMessage, user.username, token);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages ? (
          messages.map((message, index) => (
            <div key={index} className="message">
              <div>{message.text}</div>
              <div>{message.username}</div>
              <div>{message.time}</div>
            </div>
          ))
        ) : (
          <div>No Messages</div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
