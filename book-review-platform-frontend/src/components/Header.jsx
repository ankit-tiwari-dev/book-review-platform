import React, { useState } from "react";

const Navbar = () => {
  const [showBooksDropdown, setShowBooksDropdown] = useState(false);

  return (
    <nav className="bg-[#0B0F19] text-white py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="text-xl font-bold">📚 Book Review</div>

      {/* Navigation */}
      <ul className="hidden md:flex gap-6 text-sm items-center relative">
        {/* Books Dropdown Wrapper */}
        <div
          className="relative"
          onMouseEnter={() => setShowBooksDropdown(true)}
          onMouseLeave={() => setShowBooksDropdown(false)}
        >
          <li className="hover:text-gray-300 cursor-pointer">Books</li>

          {showBooksDropdown && (
            <ul className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-md z-[9999] w-48">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                All Books
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Top Rated
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Trending
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                By Category
              </li>
            </ul>
          )}
        </div>

        <li className="hover:text-gray-300 cursor-pointer">About</li>
        <li className="hover:text-gray-300 cursor-pointer">Contact</li>
      </ul>

      {/* CTA */}
      <button className="bg-[#7C3AED] hover:bg-[#6a28d9] px-4 py-2 rounded text-sm">
        Join Now
      </button>
    </nav>
  );
};

export default Navbar;
