import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import Redis from "ioredis";
import { channel } from "diagnostics_channel";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3001");
const HOST = process.env.HOST || "0.0.0.0";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const REDIS_CACHE_URL = process.env.UPSTASH_REDIS_REST_URL;

const CONNECTION_COUNT_KEY = "chat:connection-count";
const CONNECTION_COUNT_UPDATE_CHANNEL = "chat:connection-count-update";

if (!REDIS_CACHE_URL) {
  console.error("REDIS CACHE IS MISSING");
  process.exit(1);
}

const publisher = new Redis(REDIS_CACHE_URL);
const subscriber = new Redis(REDIS_CACHE_URL);

async function buildServer() {
  const app = express();

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

    await publisher.publish(CONNECTION_COUNT_UPDATE_CHANNEL, String(incResult));

    socket.on("disconnect", async () => {
      console.log("Client disconnected");
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

  subscriber.on("message", (channel, text) => {
    if ((channel = "CONNECTION_COUNT_UPDATE_CHANNEL")) {
      io.emit(CONNECTION_COUNT_UPDATE_CHANNEL, {
        count: text,
      });

      return;
    }
  });

  return server;
}

async function main() {
  const app = await buildServer();

  try {
    app.listen(PORT, HOST, () =>
      console.log(`Server running at ${HOST}:${PORT}`)
    );
  } catch (e) {
    console.error(e);
    return process.exit(1);
  }
}

main();
