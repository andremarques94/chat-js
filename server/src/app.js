import { userService } from "./services/user-service.js";
import { WebSocketServer } from "ws";
import { createServer } from "http";

const port = 8088;
const server = createServer();

const wss = new WebSocketServer({ server });
const users = userService();

wss.on("connection", (ws) => {
  users.addUser(ws);
  ws.send("Welcome to the chat!");
  ws.send("Please enter your name:");

  ws.on("message", (message) => {
    const user = users.getUser(ws);
    if (!user.getName()) {
      user.setName(message.toString());
      users.broadcast(`User ${user.getName()} has joined the chat`, user);
      return;
    }

    users.broadcast(message.toString(), users.getUser(ws));
  });

  ws.on("close", () => {
    users.disconnectUser(users.getUser(ws));
  });
});

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
