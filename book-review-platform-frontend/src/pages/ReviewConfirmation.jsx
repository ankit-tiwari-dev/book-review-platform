import { useNavigate } from "react-router-dom";

const ReviewConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-blue-800 font-sans p-6">
      <h1 className="text-3xl font-bold mb-4">🎉 Review Submitted Successfully!</h1>
      <p className="mb-6 text-lg">Thank you for sharing your thoughts. Your review helps others find great books.</p>
      <button
        onClick={() => navigate("/my-reviews")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        View My Reviews
      </button>
    </div>
  );
};

export default ReviewConfirmation;
