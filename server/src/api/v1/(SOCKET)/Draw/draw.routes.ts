import { Socket } from "socket.io";
import { drawHandle } from "./draw.controller";

export const drawRoutes = (socket: Socket) => {
  drawHandle(socket);
};
