import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketRoutes } from "../api/v1/(SOCKET)/socket.routes";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3001");
const HOST = process.env.HOST || "0.0.0.0";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

export async function buildServer() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: CORS_ORIGIN,
    })
  );

  const server = createServer(app);
  const io = new Server(server);

  socketRoutes(io);

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", port: PORT });
  });

  return server;
}
