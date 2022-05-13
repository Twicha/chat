import { Pool } from "pg";
import { Socket } from "socket.io";
import { EChatEvt } from "../types";

const express = require("express");

const db: Pool = require("./db");

const http = require("http");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const useSocket = require("socket.io");

const userRouter = require("./routes/user.routes");

const roomRouter = require("./routes/room.routes");

const messageRouter = require("./routes/message.routes");

const app = express();

const server = http.Server(app);

const io: Socket = useSocket(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/api", userRouter);

app.use("/api", roomRouter);

app.use("/api", messageRouter);

io.on("connection", (socket) => {
  // socket.emit("user-connect-socket", { id: "432432" });

  socket.on(EChatEvt.JOIN, ({ chatId, userId }) => {
    socket.join(chatId);

    io.to(chatId).emit(EChatEvt.JOIN, userId);
  });

  socket.on("ROOM:NEW_MESSAGE", async ({ chatId, userId, text }) => {
    const messageData = await db.query(
      'INSERT INTO messages ("text", "userId", "chatId") values($1, $2, $3) RETURNING *',
      [text, userId, chatId]
    );

    console.log(messageData.rows[0]);

    // socket.emit("test", "sdfdsfsdf");

    io.to(chatId).emit("ROOM:NEW_MESSAGE_ADD", messageData.rows[0]);
  });

  // socket.on("disconnect", () => {
  //   rooms.forEach((room, roomId) => {
  //     if (room.get("users").delete(socket.id)) {
  //       const users = [...room.get("users").values()];
  //       socket.broadcast.to(roomId).emit("ROOM:LEAVE", users);
  //     }
  //   });
  // });
});

server.listen(5050, (err) => {
  if (err) {
    throw Error(err);
  }

  console.log("server started");
});
