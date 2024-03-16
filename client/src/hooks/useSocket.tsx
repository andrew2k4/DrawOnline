import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";

const SOCKET_URL = "ws://localhost:3001"; // Adjust the address and port as needed

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
}
