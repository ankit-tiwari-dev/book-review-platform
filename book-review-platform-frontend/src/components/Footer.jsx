import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0c182a] text-gray-300 font-sans px-6 py-10 text-center">
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {/* Replace with your logo image/icon if available */}
        <span className="text-white text-2xl font-bold">📘</span>
        <h1 className="text-white text-xl font-semibold uppercase">
          BookReviewPlatform
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
        <a href="/" className="hover:underline">Home</a>
        <a href="/books" className="hover:underline">Books</a>
        <a href="/genres" className="hover:underline">Genres</a>
        <a href="/reviews" className="hover:underline">Reviews</a>
        <a href="/about" className="hover:underline">About</a>
        <a href="/contact" className="hover:underline">Contact</a>
        <a href="/support" className="hover:underline">Support</a>
      </div>

      {/* Copyright */}
      <div className="text-xs text-gray-400">
        &copy; 2025 BookReviewPlatform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
