import { buildServer } from "./utils/buildServer";

const PORT = parseInt(process.env.PORT || "3001");
const HOST = process.env.HOST || "0.0.0.0";

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
