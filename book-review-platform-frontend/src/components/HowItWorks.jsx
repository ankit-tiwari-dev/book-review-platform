import React from "react";

const steps = [
  {
    title: "Add books you love",
    desc: "Share your favorite reads and help our library grow. Every book you add brings new stories to our community.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mb-4 text-purple-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16a8 8 0 1116 0c0 2.21-1.79 4-4 4H12c-2.21 0-4-1.79-4-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: "Discover what’s popular",
    desc: "See which books are trending and join the conversation with other passionate readers.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mb-4 text-purple-400" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="7" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 11h10v10H11z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  {
    title: "Share your honest thoughts",
    desc: "Leave ratings and reviews to guide fellow readers. Your perspective helps others find their next page-turner.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mb-4 text-purple-400" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 17l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: "Explore by genre",
    desc: "Find mysteries, classics, and more. Filter by genre to match your current reading mood.",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="mb-4 text-purple-400" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4v24M4 16h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 4l4 8-4 4-4-4 4-8z" fill="currentColor" fillOpacity=".2"/>
      </svg>
    )
  }
];

export default function HowItWorks() {
  return (
    <section className="w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center py-16 md:py-24" style={{ background: '#0c182a' }}>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl text-white mb-20 mt-8 text-center">Your book community, your voice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl w-full px-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start text-left rounded-2xl shadow-lg p-10 bg-[#051023] hover:shadow-2xl transition-shadow duration-300 w-full min-h-[220px] border border-[#232e47]"
            >
              {step.icon}
              <h3 className="text-xl md:text-2xl font-medium mb-3 text-white">{step.title}</h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .custom-h2 {
          margin-top: 20px;
          margin-bottom: 10px;
          font-family: 'Manrope', 'DM Sans', Arial, sans-serif;
          font-size: 32px;
          line-height: 36px;
          font-weight: bold;
          letter-spacing: 0;
        }
      `}</style>
    </section>
  );
}
