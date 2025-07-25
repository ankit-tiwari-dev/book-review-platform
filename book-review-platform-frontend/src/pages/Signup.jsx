import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
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
      const res = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c182a] text-white font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#13233e] rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block mb-1 text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
              className="w-full px-4 py-2 rounded-md bg-[#1e2f4a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] text-white"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full px-4 py-2 rounded-md bg-[#1e2f4a] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] text-white"
              required
            />
          </div>

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
            className="w-full bg-[#60a5fa] text-white font-semibold py-2 rounded-md hover:bg-blue-400 transition"
          >
            Register
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>

        {/* ✅ Link to Login */}
        <p className="text-sm text-white mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
