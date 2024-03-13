import { Socket } from "socket.io";

const socketEvents = {
  CLIENT: {
    CREATE_ROOM: "create-room",
    SEND_MESSAGE: "send-message",
    JOIN_ROOM: "join-room",
  },
  SERVER: {
    ROOM: "room",
    JOIN_ROOM: "join-room",
    ROOM_MESSAGE: "room-message",
    HAS_JOIN_ROOM: "has-join-room",
  },
};

export const sendMessageHandler = (socket: Socket) => {
  socket.on(socketEvents.CLIENT.SEND_MESSAGE, ({ roomName, message }) => {
    socket.to(roomName).emit(socketEvents.SERVER.ROOM_MESSAGE, message);
  });
};

export const createRoomHandler = (socket: Socket) => {
  socket.on(socketEvents.CLIENT.CREATE_ROOM, ({ roomName }) => {
    socket.join(roomName);
    console.log("The socket has join: ", roomName);
    socket.emit(socketEvents.SERVER.ROOM, roomName);
    console.log("The socket has receive the joinMessage");
  });
};

export const joinRoomHandler = (socket: Socket) => {
  socket.on(
    socketEvents.CLIENT.JOIN_ROOM,
    ({ roomName }: { roomName: string }) => {
      socket.join(roomName);
      console.log("A user has join the room: ", roomName);

      socket.emit(socketEvents.SERVER.JOIN_ROOM, roomName);
      socket.in(roomName).emit(socketEvents.SERVER.HAS_JOIN_ROOM, roomName);
    }
  );
};
