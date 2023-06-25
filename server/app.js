const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:9000",
  },
});

app.get("/", (req, res) => {
  return res.status(200).json({ status: "Ok" });
});

app.listen(3000, async () => {
  console.log("Server started");
});

io.on("connection", (socket) => {
  console.log("Подключен клиент", socket);
});

httpServer.listen(3001);
