"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import "./globals.css";
import { useSocket } from "@/hooks/useSocket";
import { FormEvent, useEffect, useState } from "react";

const socketEvents = {
  CLIENT: {
    CREATE_ROOM: "create-room",
    SEND_MESSAGE: "send-message",
    JOIN_ROOM: "join-room",
  },
  SERVER: {
    ROOM: "room",
    JOINED_ROOM: "joined-room",
    ROOM_MESSAGE: "room-message",
    HAS_JOIN_ROOM: "has-join-room",
  },
};

export default function Home() {
  const [room, setRoom] = useState<string>("");
  const [roomJoin, setRoomJoin] = useState<string>("");
  const socket = useSocket();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("socket is connected");
    });

    socket?.on(socketEvents.SERVER.ROOM, ({ roomName }) => {
      console.log("roomName:", roomName);
    });

    socket?.on(socketEvents.SERVER.JOINED_ROOM, (payload) => {
      console.log("You joined the room:", payload);
    });

    // Écoutez l'événement has-join-room
    socket?.on(socketEvents.SERVER.HAS_JOIN_ROOM, (payload) => {
      console.log("Someone else joined the room:", payload);
    });
  }, [socket]);

  function handleOnCreate(e: FormEvent) {
    e.preventDefault();

    socket?.emit(socketEvents.CLIENT.CREATE_ROOM, {
      roomName: room,
    });

    setRoom("");
  }

  function handleOnJoin(e: FormEvent) {
    e.preventDefault();

    socket?.emit(socketEvents.CLIENT.JOIN_ROOM, { roomName: roomJoin });
    setRoomJoin("");
  }

  return (
    <main className=" flex flex-col w-full  items-center gap-32">
      <div className="space-y-10 text-center">
        <h1 className="header-h1 header-h1-gradient ">Online Draw</h1>
        <h2 className="header-h2 text-center text-muted-foreground">
          Discover a whole new way to connect with your friends through art with
          our interactive online drawing platform! Dive into exciting drawing
          sessions where you guess what your friends are drawing in real time.
          Whether you&apos;are a seasoned artist or an enthusiastic beginner,
          our user-friendly platform offers you a fun and challenging
          experience. Expand your creativity, challenge your friends, and create
          unforgettable memories by exploring the world of art together,
          wherever you are!
        </h2>
      </div>
      <div className="flex justify-between ">
        {/* create room */}
        <div className="bg-slate-500 shadow-lg shadow-slate-600 w-fit rounded-2xl space-y-8 p-6   ">
          <h3 className="header-h3 text-center text-white ">Create Room!</h3>
          <form onSubmit={handleOnCreate} className="flex gap-3 self-center">
            <Input
              className="text-white text-lg placeholder:text-slate-300"
              color="#"
              placeholder="Name of the room"
              value={room}
              onChange={(text) => setRoom(text.target.value)}
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-300 to-violet-900"
            >
              Create room
            </Button>
          </form>
        </div>
        {/* join room */}
        <div className="bg-slate-500 shadow-lg shadow-slate-600 w-fit rounded-2xl space-y-8 p-6   ">
          <h3 className="header-h3 text-center text-white ">join Room!</h3>
          <form onSubmit={handleOnJoin} className="flex gap-3 self-center">
            <Input
              className="text-white text-lg placeholder:text-slate-300"
              color="#"
              placeholder="Name of the room"
              value={roomJoin}
              onChange={(text) => setRoomJoin(text.target.value)}
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-300 to-violet-900"
            >
              Join room
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
