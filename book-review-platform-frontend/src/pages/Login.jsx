import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", 
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c182a] text-white font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#13233e] rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-4 py-2 rounded-md bg-[#1e2f4a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-4 py-2 rounded-md bg-[#1e2f4a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] text-white"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#60a5fa] text-black font-semibold py-2 rounded-md hover:bg-blue-400 transition"
          >
            Login
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>

        {/* ✅ Link to Register */}
        <p className="text-sm text-white mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
