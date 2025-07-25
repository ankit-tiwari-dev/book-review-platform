import express from "express";
import {
  addReview,
  getReviewsByBookId
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", getReviewsByBookId);
router.post("/", verifyJWT, addReview);

export default router;
