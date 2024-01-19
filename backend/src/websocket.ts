import { WebSocketServer, type WebSocket } from "ws";

let connections: WebSocket[] = [];

export function initWebSocket() {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on("connection", function connection(ws) {
    connections.push(ws);
    ws.on("error", console.error);
    ws.on("close", () => {
      connections = connections.filter((conn) => {
        return conn !== ws;
      });
    });
  });
}

export function sendMessage(text: string, username: string) {
  const time = new Date().toLocaleTimeString();
  const messagePayload = JSON.stringify({ text, username, time });

  connections.forEach((connection) => connection.send(messagePayload));
}
