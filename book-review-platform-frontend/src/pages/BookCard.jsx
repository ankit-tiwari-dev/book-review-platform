import React from "react";
import StarRating from "./StarRating";

const BookCard = ({ book, onView, onReview }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-600">by {book.author}</p>
      <p className="text-sm italic mt-1">{book.genre}</p>

      <div className="flex items-center mt-2">
        <StarRating rating={book.avgRating || 0} />
        <span className="ml-2 text-sm text-gray-700">
          {book.avgRating ? book.avgRating.toFixed(1) : "No rating"}
        </span>
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={onReview} className="btn btn-outline btn-sm">Add Review</button>
        <button onClick={onView} className="btn btn-primary btn-sm">View Reviews</button>
      </div>
    </div>
  );
};

export default BookCard;
