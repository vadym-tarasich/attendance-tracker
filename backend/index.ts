import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fastifyExpress from "@fastify/express";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Fastify();
const PORT = 3000;

if (process.env.NODE_ENV !== "production") {
  console.log(
    "\x1b[36m%s\x1b[0m",
    "=== Local development mode ===",
  );
  console.log("Setting up Vite middleware with local");
  const viteServer = await createServer({
    root: path.join(__dirname, "../frontend"),
    server: { middlewareMode: true },
    cacheDir: path.join(__dirname, ".vite-temp"), // Move .vite-temp to backend folder
  });

  await app.register(fastifyExpress);

  app.use((req, res, next) => {
    if (req.url.startsWith("/api")) {
      console.log(
        `Skipping Vite middleware for API call: ${req.url}`,
      );
      return next();
    }
    viteServer.middlewares(req, res, next);
  });
} else {
  console.log("Setting up static file serving");
  app.register(fastifyStatic, {
    root: path.join(__dirname, "../frontend/dist"),
  });
}

// Start the server
app.listen(
  { port: PORT },
  (err: Error | null, address: string) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is running at ${address}`);
  },
);
