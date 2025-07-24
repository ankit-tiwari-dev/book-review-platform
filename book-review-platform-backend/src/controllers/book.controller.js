import { Book } from "../models/book.model.js";
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const addBook = asyncHandler(async (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    throw new ApiError(400, "All fields (title, author, genre) are required");
  }

  const newBook = await Book.create({ title, author, genre, addedBy: req.user._id });

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: newBook,
  });
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;

  const query = {};
  if (author) query.author = new RegExp(author, "i");
  if (genre) query.genre = new RegExp(genre, "i");
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const books = await Book.find(query)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  const booksWithAvgRating = await Promise.all(
    books.map(async (book) => {
      const reviews = await Review.find({ book: book._id });
      const avgRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(2)
        : null;
      return {
        ...book.toObject(),
        averageRating: avgRating ? Number(avgRating) : null,
        reviewCount: reviews.length,
      };
    })
  );

  const total = await Book.countDocuments(query);

  res.status(200).json({
    success: true,
    data: booksWithAvgRating,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  const reviews = await Review.find({ book: book._id }).populate("reviewer", "username");
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(2)
    : null;

  res.status(200).json({
    success: true,
    data: {
      ...book.toObject(),
      averageRating: avgRating ? Number(avgRating) : null,
      reviews,
    },
  });
});
