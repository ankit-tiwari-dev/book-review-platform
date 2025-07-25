import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ review_text: "", rating: 5 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchBookDetail = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/books/${id}`);
      const data = await res.json();
      setBook(data.book || {});
      setReviews(data.reviews || []);
    } catch (err) {
      setError("Failed to load book details");
    }
    setLoading(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
  
    try {
      const res = await fetch(`http://localhost:8000/api/v1/books/${id}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit review");
  
      setNewReview({ review_text: "", rating: 5 });
      navigate("/review-confirmation");
  
    } catch (err) {
      setError(err.message);
    }
  
    setSubmitting(false);
  };
  
  
  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#051023] text-white font-sans text-lg">Loading book...</div>;
  if (!book) return <div className="min-h-screen flex items-center justify-center bg-[#051023] text-white font-sans text-lg">Book not found.</div>;

  return (
    <div className="min-h-screen bg-[#051023] text-white font-sans py-10 px-2 flex flex-col items-center">
      {/* Book Info */}
      <div className="w-full max-w-2xl bg-[#0c182a] p-8 rounded-xl shadow-lg border border-gray-800 mb-10">
        <h1 className="text-3xl font-light mb-2">{book.title}</h1>
        <p className="text-gray-300 mb-1 font-light">by {book.author}</p>
        <p className="text-sm italic text-gray-400 mb-4 font-light">{book.genre}</p>
        <div className="flex items-center gap-2 mb-2">
          <StarRating value={book.avgRating || 0} />
          <span className="text-gray-400 font-light">{book.avgRating?.toFixed(1) || "No rating yet"}</span>
        </div>
      </div>

      {/* Reviews */}
      <div className="w-full max-w-2xl mb-10">
        <h2 className="text-2xl font-light mb-6 flex items-center gap-2">🗣 Reviews</h2>
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-8 bg-[#0c182a] rounded-xl border border-gray-800 shadow">
            <svg className="h-12 w-12 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="text-gray-400 font-light">No reviews yet. Be the first!</div>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-[#0c182a] text-white p-5 rounded-xl shadow border border-gray-800">
                <div className="flex justify-between items-center">
                  <StarRating value={rev.rating} />
                  <span className="text-xs text-gray-400 font-light">{rev.reviewerName}</span>
                </div>
                <p className="mt-3 text-gray-200 font-light">{rev.review_text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Review */}
      <div className="w-full max-w-2xl bg-[#0c182a] p-8 rounded-xl shadow-lg border border-gray-800">
        <h3 className="text-xl font-light mb-4">➕ Add a Review</h3>
        {error && <p className="text-red-400 mb-2 font-light animate-shake">{error}</p>}
        {isAuthenticated ? (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <textarea
              className="w-full rounded-md bg-[#13233e] border border-gray-700 text-white p-3 font-light focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              rows={4}
              placeholder="Write your review..."
              name="review_text"
              value={newReview.review_text}
              onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
              required
            />
            <div>
              <label className="block mb-2 text-gray-300 font-light">Rating (1 to 5)</label>
              <select
                className="w-full rounded-md bg-[#13233e] border border-gray-700 text-white p-2 font-light"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#7C3AED] text-white font-medium py-2 rounded-md hover:bg-[#6a28d9] transition disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-2 text-red-400 font-light">You must be logged in to add a review.</p>
            <button
              className="bg-[#7C3AED] text-white px-4 py-2 rounded-md font-medium hover:bg-[#6a28d9] transition"
              onClick={() => navigate("/login")}
            >
              Login to Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
