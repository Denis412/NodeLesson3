require("dotenv").config({});

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const ChatService = require("./services/ChatService");

const chatService = new ChatService();

const app = express();

let onlineUsers = 0;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:9000"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  return res.status(200).json({ status: "Ok" });
});

app.listen(3000, async () => {
  console.log("Server started");
});

io.on("connection", async (socket) => {
  const history = await chatService.getMessages();
  const rooms = await chatService.getRooms();

  socket.emit("get-rooms", rooms);
  socket.emit("history", history);

  socket.on("createRoom", async (data) => {
    const room = await chatService.createRoom(data.name);

    socket.emit("rooms_list_changed", room);
    socket.broadcast.emit("rooms_list_changed", room);
  });

  socket.on("joinRoom", async (data) => {
    const history = await chatService.getMessages(data.room_id);
    socket.join("room-" + data.room_id);
    socket.emit("history", history);
  });

  socket.on("leaveRoom", (data) => {
    if (data.room_id) {
      socket.leave("room-" + data.room_id);
    }
  });

  socket.on("message", async (data) => {
    await chatService.saveMessage(data);

    // Отправить
    if (data.room_id) {
      io.to("room-" + data.room_id).emit("message", {
        name: data.name,
        message: data.message,
      });
    } else {
      socket.emit("message", {
        name: data.name,
        message: data.message,
      });
      socket.broadcast.emit("message", {
        name: data.name,
        message: data.message,
      });
    }
  });

  socket.on("disconnect", (data) => {
    socket.emit("refreshOnline", --onlineUsers);
  });
});

instrument(io, {
  auth: false,
  mode: "development",
});

httpServer.listen(3001);
