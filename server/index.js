const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const MEMBER = {};
let MEMBER_COUNT = 1;

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 入室ボタンクリック後の処理
  socket.on("join_room", (data) => {
    socket.join(data.room);
    MEMBER = { name: data.username };
    console.log(`入室した人：${MEMBER.name}`);
    MEMBER_COUNT++;
    socket.to(data.room).emit("join_result", MEMBER);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
