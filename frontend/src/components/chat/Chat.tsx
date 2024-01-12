import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatApi from "../../api/ChatApi";

type Message = {
  id: string;
  text: string;
  time: string;
  userid: string;
  chatid: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const initMessages = async () => {
      const fetchedMessages = await ChatApi.fetchMessages();
      setMessages(fetchedMessages);
    };

    initMessages();

    // WebSocket setup
    const socket = new WebSocket("ws://localhost:8080");
    socket.addEventListener("open", () => {
      console.log("Socket connected");
    });
    socket.addEventListener("error", (event: Event) => {
      console.error("WebSocket error:", event);
    });
    socket.addEventListener("message", (event: MessageEvent) => {
      const incomingMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    await ChatApi.sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div>Message ID: {message.id}</div>
            <div>Text: {message.text}</div>
            <div>Time: {new Date(message.time).toLocaleString()}</div>
            <div>User ID: {message.userid}</div>
            <div>Chat ID: {message.chatid}</div>
          </div>
        ))}
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
