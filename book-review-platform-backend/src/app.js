import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Routers
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js";
import reviewRouter from "./routes/review.routes.js";
import globalReviewRoutes from "./routes/review.global.routes.js";

// Mount routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/books/:bookId/reviews", reviewRouter);
app.use("/api/v1/reviews", globalReviewRoutes);        

// Static frontend serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

export { app };
