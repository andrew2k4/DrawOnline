import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

type InitialState = {
  value: RoomState;
};

type RoomState = {
  roomName: string;
  socketId: string;
};
const initialState: InitialState = {
  value: {
    roomName: "",
    socketId: "",
  },
};

export const room = createSlice({
  name: "auth",
  initialState,
  reducers: {
    leaveRoom: () => {
      return initialState;
    },
    joinRoom: (
      state,
      action: PayloadAction<{ roomName: string; socketId: string }>
    ) => {
      const { roomName, socketId } = action.payload;
      return {
        value: {
          roomName,
          socketId,
        },
      };
    },
    createRoom: (
      state,
      action: PayloadAction<{ roomName: string; socketId: string }>
    ) => {
      const { roomName, socketId } = action.payload;
      return {
        value: {
          roomName,
          socketId,
        },
      };
    },
  },
});

export const { leaveRoom, joinRoom, createRoom } = room.actions;
export default room.reducer;
