import express from "express";
import {
  addBook,
  getAllBooks,
  getBookById,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllBooks);        
router.get("/:id", getBookById);      

router.post("/", verifyJWT, addBook); 

export default router;
