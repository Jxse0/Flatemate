import React, { useContext, useEffect, useState, useRef } from "react";
import "./Chat.css";
import ChatApi from "../../api/ChatApi";
import { tokenContext, userContext } from "../../InfoProvider";

type Message = {
  text: string;
  time: string;
  username: string;
};

function formatMessageDate(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Monate beginnen bei 0
  const year = date.getFullYear().toString().substr(-2); // Letzten zwei Ziffern des Jahres
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [token] = useContext(tokenContext);
  const [user] = useContext(userContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initMessages = async () => {
      const fetchedMessages = await ChatApi.fetchMessages(token);
      const formattedMessages = fetchedMessages.map((message: Message) => ({
        ...message,
        time: formatMessageDate(message.time),
      }));
      setMessages(Array.isArray(formattedMessages) ? formattedMessages : []);
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

      setMessages((prevMessages) =>
        Array.isArray(prevMessages)
          ? [...prevMessages, incomingMessage]
          : [incomingMessage]
      );
    });

    return () => {
      socket.close();
    };
  }, [token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await ChatApi.sendMessage(newMessage, user.username, token);
    setNewMessage("");
  };
  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="message">
              <div className="message-header">
                <div className="message-username">{message.username}</div>
                <div className="message-time">{message.time}</div>
              </div>
              <div className="message-text">{message.text}</div>
            </div>
          ))
        ) : (
          <div>No Messages</div>
        )}
        <div ref={messagesEndRef} />
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
