import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "./StarRating";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [sort, setSort] = useState("");
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [page, genre, author, sort]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page };
      if (genre) params.genre = genre;
      if (author) params.author = author;
      if (sort) params.sort = sort;
      const res = await axios.get("/books", { params });
      setBooks(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await axios.get("/books/filters");
      setGenres(res.data.genres || []);
      setAuthors(res.data.authors || []);
    } catch {
      // ignore filter errors
    }
  };

  const clearFilters = () => {
    setGenre("");
    setAuthor("");
    setSort("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0c182a] text-white font-[Manrope] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-light mb-2">Books</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <select value={genre} onChange={e => { setGenre(e.target.value); setPage(1); }} className="bg-[#1e2f4a] border border-gray-600 text-white px-3 py-2 rounded-md">
              <option value="">All Genres</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select value={author} onChange={e => { setAuthor(e.target.value); setPage(1); }} className="bg-[#1e2f4a] border border-gray-600 text-white px-3 py-2 rounded-md">
              <option value="">All Authors</option>
              {authors.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={sort} onChange={e => { setSort(e.target.value); setPage(1); }} className="bg-[#1e2f4a] border border-gray-600 text-white px-3 py-2 rounded-md">
              <option value="">Sort By</option>
              <option value="rating">Rating</option>
              <option value="date">Date Added</option>
            </select>
            <button onClick={clearFilters} className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium">Clear Filters</button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-10">
            <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <div>Loading...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : books.length === 0 ? (
          <div className="text-center py-10">No books found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map(book => (
              <div
                key={book._id}
                className="bg-[#13233e] rounded-xl p-6 shadow-lg flex flex-col gap-2 cursor-pointer hover:shadow-2xl transition"
                onClick={() => navigate(`/books/${book._id}`)}
              >
                <h3 className="text-xl font-light mb-1">{book.title}</h3>
                <div className="text-gray-400 text-sm mb-1">by {book.author} | <span className="italic">{book.genre}</span></div>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating value={book.avgRating || 0} />
                  <span className="text-gray-400 text-sm">{book.avgRating ? book.avgRating.toFixed(1) : "No ratings"}</span>
                </div>
                <span className="text-blue-400 hover:underline text-sm">View Details</span>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-md ${page === i + 1 ? 'bg-[#7C3AED] text-white' : 'bg-[#232e47] text-gray-300'} font-medium`}
              disabled={loading}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
