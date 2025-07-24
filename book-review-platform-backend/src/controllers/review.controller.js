import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const addReview = asyncHandler(async (req, res) => {
  const { review_text, rating } = req.body;
  const { bookId } = req.params;

  if (!rating || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const review = await Review.create({
    review_text,
    rating,
    reviewer: req.user._id,
    book: bookId,
  });

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: review,
  });
});

export const getReviewsByBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const reviews = await Review.find({ book: bookId }).populate("reviewer", "username");

  res.status(200).json({
    success: true,
    data: reviews,
  });
});
