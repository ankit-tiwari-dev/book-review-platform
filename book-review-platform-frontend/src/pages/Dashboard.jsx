import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const Dashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filters, setFilters] = useState({ genre: "", author: "", sort: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", author: "", genre: "" });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [filters, page]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page };
      if (filters.genre) params.genre = filters.genre;
      if (filters.author) params.author = filters.author;
      if (filters.sort) params.sort = filters.sort;
      const res = await axios.get("/books", { params });
      setBooks(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load books.");
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

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ genre: "", author: "", sort: "" });
    setPage(1);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    if (!form.title.trim() || !form.author.trim() || !form.genre.trim()) {
      setFormError("All fields are required.");
      return;
    }
    setFormLoading(true);
    try {
      await axios.post("/books", form);
      setFormSuccess("Book added successfully!");
      setForm({ title: "", author: "", genre: "" });
      fetchBooks();
      setTimeout(() => {
        setFormSuccess(null);
        setShowModal(false);
      }, 1200);
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || "Failed to add book");
      setTimeout(() => setFormError(null), 2000);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ background: '#051023' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 text-white py-8 px-6 shadow-2xl border-r border-gray-200" style={{ background: '#051023' }}>
        <h2 className="text-2xl font-bold mb-10 tracking-wide text-[#7C3AED]">📚 Book Platform</h2>
        <nav className="flex flex-col gap-4">
          <button className="text-left px-4 py-2 rounded-lg bg-[#7C3AED] bg-opacity-90 hover:bg-[#6a28d9] text-white transition font-semibold">Dashboard</button>
          <button
            onClick={() => navigate('/reviews')}
            className="text-left px-4 py-2 rounded-lg hover:bg-[#232e47] transition text-gray-300 font-light"
          >
            View Reviews
          </button>
        </nav>
        <div className="mt-auto pt-10 text-xs text-gray-400">&copy; {new Date().getFullYear()} Book Review Platform</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-2 sm:px-8 py-10" style={{ background: '#051023' }}>
        <div className="w-full max-w-4xl flex flex-col gap-8">
          {/* Header and Add Book Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-light tracking-tight text-white">Dashboard</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#7C3AED] hover:bg-[#6a28d9] text-white px-6 py-2 rounded-lg font-semibold shadow transition"
            >
              + Add Book
            </button>
          </div>
          {/* Filters */}
          <div className="rounded-xl shadow-lg p-6 flex flex-wrap gap-4 items-end justify-center border border-gray-800" style={{ background: '#0c182a' }}>
            <div>
              <label className="block text-sm mb-1 text-gray-300 font-light">Genre</label>
              <select
                className="bg-[#13233e] border border-gray-700 text-gray-100 px-4 py-2 rounded font-light"
                onChange={e => handleChange("genre", e.target.value)}
                value={filters.genre}
              >
                <option value="">All Genres</option>
                {genres.map((g, i) => (
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300 font-light">Author</label>
              <select
                className="bg-[#13233e] border border-gray-700 text-gray-100 px-4 py-2 rounded font-light"
                onChange={e => handleChange("author", e.target.value)}
                value={filters.author}
              >
                <option value="">All Authors</option>
                {authors.map((a, i) => (
                  <option key={i} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300 font-light">Sort By</label>
              <select
                className="bg-[#13233e] border border-gray-700 text-gray-100 px-4 py-2 rounded font-light"
                onChange={e => handleChange("sort", e.target.value)}
                value={filters.sort}
              >
                <option value="">Default</option>
                <option value="rating">Rating</option>
                <option value="date">Date Added</option>
              </select>
            </div>
            <button
              onClick={clearFilters}
              className="bg-[#232e47] text-gray-200 px-4 py-2 rounded-md font-medium mt-6 hover:bg-[#1e2f4a] transition border border-gray-700"
            >
              Clear Filters
            </button>
          </div>
          {/* Book List Section */}
          <section className="rounded-xl shadow-lg p-8 border border-gray-800" style={{ background: '#0c182a' }}>
            <h2 className="text-2xl font-light mb-6 flex items-center gap-2 text-white">
              <span>Books</span>
              <span className="text-base font-normal text-gray-400">({books.length})</span>
            </h2>
            {loading ? (
              <div className="text-center py-10">
                <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <div className="text-gray-400 font-light">Loading...</div>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-10 animate-pulse font-light">{error}</div>
            ) : books.length === 0 ? (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <svg className="h-16 w-16 text-gray-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="text-lg text-gray-400 font-light">No books found. Try adjusting your filters or add a new book!</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map(book => (
                  <div
                    key={book._id}
                    className="bg-[#13233e] rounded-xl p-6 shadow flex flex-col gap-2 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-800 hover:border-[#7C3AED]"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    <h3 className="text-xl font-light mb-1 truncate text-white">{book.title}</h3>
                    <div className="text-gray-300 text-sm mb-1 truncate font-light">by {book.author} | <span className="italic">{book.genre}</span></div>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating value={book.avgRating || 0} />
                      <span className="text-gray-400 text-sm font-light">{book.avgRating ? book.avgRating.toFixed(1) : "No ratings"}</span>
                    </div>
                    <span className="text-[#7C3AED] hover:underline text-sm font-light">View Details</span>
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
                  className={`px-4 py-2 rounded-md font-light transition-all ${page === i + 1 ? 'bg-[#7C3AED] text-white scale-110' : 'bg-[#232e47] text-gray-200 hover:bg-[#7C3AED] hover:text-white'}`}
                  disabled={loading}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
        {/* Add Book Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="rounded-xl p-8 shadow-2xl w-full max-w-lg relative animate-fade-in border border-gray-800" style={{ background: '#0c182a' }}>
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-light mb-6 text-center text-white">Add Book</h2>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Title"
                  className="w-full px-4 py-2 rounded-md bg-[#13233e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-white font-light"
                  required
                />
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleFormChange}
                  placeholder="Author"
                  className="w-full px-4 py-2 rounded-md bg-[#13233e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-white font-light"
                  required
                />
                <input
                  type="text"
                  name="genre"
                  value={form.genre}
                  onChange={handleFormChange}
                  placeholder="Genre"
                  className="w-full px-4 py-2 rounded-md bg-[#13233e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-white font-light"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#7C3AED] text-white font-medium py-2 rounded-md hover:bg-[#6a28d9] transition disabled:opacity-60"
                  disabled={formLoading}
                >
                  {formLoading ? "Adding..." : "Add Book"}
                </button>
                {formError && <p className="text-red-500 text-sm mt-2 text-center animate-shake font-light">{formError}</p>}
                {formSuccess && <p className="text-green-500 text-sm mt-2 text-center animate-fade-in font-light">{formSuccess}</p>}
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
