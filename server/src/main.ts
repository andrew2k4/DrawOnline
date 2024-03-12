import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import Redis from "ioredis";
import closeWithGrace from "close-with-grace";
import { randomUUID } from "crypto";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3001");
const HOST = process.env.HOST || "0.0.0.0";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const REDIS_CACHE_URL = process.env.UPSTASH_REDIS_REST_URL;

const CONNECTION_COUNT_KEY = "chat:connection-count";
const CONNECTION_COUNT_UPDATE_CHANNEL = "chat:connection-count-update";
const NEW_MESSAGE_CHANNEL = "chat:new-message";

if (!REDIS_CACHE_URL) {
  console.error("REDIS CACHE IS MISSING");
  process.exit(1);
}

const publisher = new Redis(REDIS_CACHE_URL);
const subscriber = new Redis(REDIS_CACHE_URL);

let connectedClients = 0;

async function buildServer() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: CORS_ORIGIN,
    })
  );

  // create socket server
  const server = createServer(app);
  const io = new Server(server);

  const currentCount = await publisher.get(CONNECTION_COUNT_KEY);
  if (!currentCount) {
    await publisher.set("CONNECTION_COUNT", 0);
  }

  io.on("connection", async (socket) => {
    console.log("Client connected");
    const incResult = await publisher.incr(CONNECTION_COUNT_KEY);
    connectedClients++;

    await publisher.publish(CONNECTION_COUNT_UPDATE_CHANNEL, String(incResult));

    socket.on(NEW_MESSAGE_CHANNEL, async (payload) => {
      const message = payload.message;

      if (!message) {
        return;
      }

      console.log("rest", message);
      await publisher.publish(NEW_MESSAGE_CHANNEL, message.toString());
    });

    socket.on("disconnect", async () => {
      console.log("Client disconnected");

      connectedClients--;
      const decrResult = await publisher.decr(CONNECTION_COUNT_KEY);

      await publisher.publish(
        CONNECTION_COUNT_UPDATE_CHANNEL,
        String(decrResult)
      );
    });
  });

  subscriber.subscribe(CONNECTION_COUNT_UPDATE_CHANNEL, (err, count) => {
    if (err) {
      console.error(
        "Error subscribe" + { CONNECTION_COUNT_UPDATE_CHANNEL } + err
      );
      return;
    }

    console.log(
      `${count} client connected to ${CONNECTION_COUNT_UPDATE_CHANNEL} channel`
    );
  });

  subscriber.subscribe(NEW_MESSAGE_CHANNEL, (err, count) => {
    if (err) {
      console.error(
        "Error subscribe" + { CONNECTION_COUNT_UPDATE_CHANNEL } + err
      );
      return;
    }

    console.log(
      `${count} clients subscribes to ${NEW_MESSAGE_CHANNEL} channel`
    );
  });

  subscriber.on("message", (channel, text) => {
    if (channel === CONNECTION_COUNT_UPDATE_CHANNEL) {
      io.emit(CONNECTION_COUNT_UPDATE_CHANNEL, {
        count: text,
      });
      return;
    }

    if (channel === NEW_MESSAGE_CHANNEL) {
      io.emit(NEW_MESSAGE_CHANNEL, {
        message: text,
        id: randomUUID(),
        createdAt: new Date(),
        port: PORT,
      });
      return;
    }
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", port: PORT });
  });

  return server;
}

async function main() {
  const app = await buildServer();

  try {
    await app.listen({
      port: PORT,
      host: HOST,
    });

    console.log(`Server started at http://${HOST}:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
