import express from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
  getBookFilters,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/filters", getBookFilters);
router.get("/:id", getBookById);
router.post("/", verifyJWT, addBook);

export default router;
