import express from "express";
import { getAllReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getAllReviews);

export default router;
