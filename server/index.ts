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

  io.on("connection", (socket: socketio.Socket) => {
    console.log("connection");
    socket.emit("hello", "Hello from Socket.io");

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
    socket.on("emit", (data) => {
      console.log(data);
    });
  });

  app.all("*", (req: Request, res: Response) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
