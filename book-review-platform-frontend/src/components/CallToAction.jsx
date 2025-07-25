import React from "react";

export default function CallToAction() {
  return (
    <section className="w-full py-24 flex flex-col md:flex-row items-center justify-center gap-12 bg-[#051023] font-[DM_Sans,sans-serif]">
      <div className="flex-1 flex flex-col items-start md:items-center md:pl-32">
        <p className="text-2xl md:text-3xl font-light text-white mb-6 text-left md:text-center" style={{letterSpacing:0}}>
          Read. Review. Connect. Repeat.
        </p>
        <p className="text-lg text-gray-300 max-w-xl text-left md:text-center">
          Love books? Join our friendly community to discover, rate, and review your next great read. Share your thoughts and connect with fellow book lovers—your story matters here.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-xs md:pr-32">
        <a href="/signup" className="bg-[#7C3AED] hover:bg-[#6a28d9] text-white py-4 rounded-lg font-medium text-lg text-center shadow-lg transition-all duration-300">Join now</a>
        <a href="/login" className="bg-transparent border border-white text-white py-4 rounded-lg font-medium text-lg text-center shadow-lg transition-all duration-300">Sign in</a>
      </div>
    </section>
  );
}
