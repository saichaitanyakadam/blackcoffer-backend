import express from "express";
import cors from "cors";
import router from "./routes/data.route.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

export { app };
