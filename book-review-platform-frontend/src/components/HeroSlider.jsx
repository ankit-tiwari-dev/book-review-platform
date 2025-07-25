import React from "react";
import img1 from "../assets/library2.jpg";
import img2 from "../assets/books.jpg";
import img3 from "../assets/lampFoucusedOnBook.jpg";
import img4 from "../assets/groupStudy.jpg";

const slides = [
  {
    image: img1,
    heading: (
      <>
        Share your next<br />great read<br />Connect through<br />honest reviews
      </>
    )
  },
  {
    image: img2,
    heading: (
      <>
        Discover trending<br />books<br />See what the community<br />is loving right now
      </>
    )
  },
  {
    image: img3,
    heading: (
      <>
        Write reviews,<br />rate, and explore<br />Your opinion helps others<br />find their next favorite
      </>
    )
  },
  {
    image: img4,
    heading: (
      <>
        Join the book<br />lovers community<br />Sign up and connect<br />with fellow readers today!
      </>
    )
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-black overflow-hidden">
      {/* Sliding Backgrounds */}
      {slides.map((slide, idx) => (
        <img
          key={idx}
          src={slide.image}
          alt="Book Review Hero"
          className={`absolute inset-0 w-full h-full object-cover object-center scale-105 z-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
          draggable={false}
        />
      ))}
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full pl-6 md:pl-24 max-w-4xl py-24">
        <h1 className="text-3xl md:text-7xl font-sans text-white mb-8 leading-tight drop-shadow-xl animate-fadeInUp" style={{lineHeight:1.1}} key={current}>
          {slides[current].heading}
        </h1>
        <div className="flex gap-4 mt-4">
          <a
            href="/signup"
            className="bg-[#7C3AED] hover:bg-[#6a28d9] text-white px-7 py-3 rounded-lg font-sans text-lg shadow-lg transition-all duration-300 animate-fadeInUp"
          >
            Get started
          </a>
          <a
            href="/books"
            className="bg-white/10 border border-white text-white px-7 py-3 rounded-lg font-sans text-lg shadow-lg hover:bg-white/20 transition-all duration-300 animate-fadeInUp"
          >
            Browse books
          </a>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-8 left-8 flex gap-2 z-40">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-white ${idx === current ? 'bg-white' : 'bg-transparent'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
