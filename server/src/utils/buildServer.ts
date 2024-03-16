import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketRoutes } from "../api/v1/(SOCKET)/socket.routes";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3001");
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3001";

export async function buildServer() {
  const app = express();
  app.use(express.json());

  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: CORS_ORIGIN,
    },
  });

  socketRoutes(io);

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", port: PORT });
  });

  return server;
}
