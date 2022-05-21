import express, { Request, Response } from "express";
import * as http from "http";
import next from "next";
import * as socketio from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();
  const server = http.createServer(app);
  const io = new socketio.Server();
  io.attach(server);

  io.on("connection", (socket) => {
    console.log("connection");
    socket.on("disconnect", () => {
      console.log("client disconnected");
    });

    socket.on("join", (roomId) => {
      socket.join(roomId);
      console.log(`joined to ${roomId}`);
    });

    socket.on("message", (data) => {
      console.log(JSON.stringify(data));
      io.to(data.roomId).emit("message", {
        content: data.content,
        userName: data.userName,
      });
    });
  });

  app.all("*", (req: Request, res: Response) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
