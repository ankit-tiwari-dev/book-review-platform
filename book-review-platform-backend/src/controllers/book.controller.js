import { Book } from "../models/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const addBook = asyncHandler(async (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    throw new ApiError(400, "All fields (title, author, genre) are required");
  }

  const newBook = await Book.create({ title, author, genre, createdBy: req.user._id });

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: newBook,
  });
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;

  const query = {};
  if (author) query.author = author;
  if (genre) query.genre = genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await Book.countDocuments(query);

  res.status(200).json({
    success: true,
    data: books,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews.reviewer", "username");

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});
