// src/components/StarRating.jsx
import React from "react";

export default function StarRating({ value }) {
  // Ensure value is a number between 0 and 5
  const safeValue = Math.max(0, Math.min(5, Number(value) || 0));
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} className={`inline w-5 h-5 ${i <= safeValue ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    );
  }
  return <span>{stars}</span>;
}
