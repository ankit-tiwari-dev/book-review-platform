import React, { useEffect, useState } from "react";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-blue-700 text-2xl font-semibold mb-6">All User Reviews</h2>
      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg shadow-sm p-4 bg-blue-50 hover:shadow-md transition"
            >
              <h3 className="text-blue-800 text-lg font-light">
                [{review.book?.title || "Unknown Book"}] - by {review.reviewer?.fullName || "Anonymous"}
              </h3>
              <p className="text-gray-700 mt-2 font-light">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
