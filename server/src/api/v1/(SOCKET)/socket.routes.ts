import { Server, Socket } from "socket.io";
import { messageRoutes } from "./Messages/message.routes";
import { drawRoutes } from "./Draw/draw.routes";

export const socketRoutes = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    console.log("A new client is connected");

    messageRoutes(socket);
    drawRoutes(socket);

    socket.on("disconnect", async () => {
      console.log("A  client is disconnected");
    });
  });
};
