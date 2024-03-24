import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    joinRoom: (state, action: PayloadAction<string>) => {
      return {
        value: {
          roomName: action.payload,
          socketId: action.payload,
        },
      };
    },
  },
});

export const { leaveRoom, joinRoom } = room.actions;
export default room.reducer;
