const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

let onlineUsers = 0;

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
  socket.emit("refreshOnline", ++onlineUsers);

  socket.on("roomConnect", async (roomId) => {
    const roomSockets = io.sockets.adapter.rooms.get(`room:${roomId}`);

    if (roomSockets && roomSockets.size >= 2 && roomId !== 1) {
      socket.emit("roomFull", "Комната заполнена");
    } else {
      socket.emit("roomFree", "Комната свободна");
      socket.join(`room:${roomId}`);
    }
  });

  socket.on("roomDisconnect", async (roomId) => {
    socket.leave(`room:${roomId}`);
  });

  socket.on("message", (data) => {
    console.log("message server", data);
    io.to(`room:${data.room_id}`).emit("sendedMessage", data);
  });

  socket.on("disconnect", (data) => {
    socket.emit("refreshOnline", --onlineUsers);
  });
});

setInterval(() => {
  io.emit("ping", {
    ts: new Date(),
  });
}, 10_000);

httpServer.listen(3001);
