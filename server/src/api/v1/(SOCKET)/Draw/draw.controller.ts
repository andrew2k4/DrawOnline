import { Socket } from "socket.io";

const socketEvents = {
  CLIENT: {
    DRAW: "DRAW",
  },
  SERVER: {
    ROOM_DRAW: "room-draw",
  },
};

type draw = {
  positionX: number;
  positionY: number;
  type: "draw" | "erase";
};

export async function drawHandle(socket: Socket) {
  socket.on(
    socketEvents.CLIENT.DRAW,
    ({ roomName, draw }: { roomName: string; draw: draw }) => {
      console.log(roomName, draw);
      socket.to(roomName).emit(socketEvents.SERVER.ROOM_DRAW, draw);
    }
  );
}
