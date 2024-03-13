import { Socket } from "socket.io";
import {
  createRoomHandler,
  joinRoomHandler,
  sendMessageHandler,
} from "./message.controllers";

export const messageRoutes = (socket: Socket) => {
  createRoomHandler(socket);
  sendMessageHandler(socket);
  joinRoomHandler(socket);
};
