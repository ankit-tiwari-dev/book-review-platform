import img1 from "../assets/lampFoucusedOnBook.jpg";
import img2 from "../assets/laptop.jpg";
import img3 from "../assets/books.jpg";
import img4 from "../assets/groupStudy.jpg";
import img5 from "../assets/library2.jpg";
import img6 from "../assets/library.jpg";

const cards = [
  {
    img: img1,
    title: "Fresh reviews, real reader voices",
    desc: "See what fellow book lovers are saying about the latest reads. Honest opinions, thoughtful ratings, and lively discussions—your next favorite book awaits!"
  },
  {
    img: img2,
    title: "Discover new books every week",
    desc: "Browse the newest arrivals across every genre. Find trending titles, hidden gems, and join a community eager to share their latest literary adventures."
  },
  {
    img: img3,
    title: "Community favorites, top-rated reads",
    desc: "Explore the books everyone's talking about. Check out top picks, see what's sparking conversation, and add your own must-reads to the list."
  },
  {
    img: img4,
    title: "Personalized recommendations",
    desc: "Get book suggestions tailored to your tastes. Our smart system learns what you love and helps you discover your next great read."
  },
  {
    img: img5,
    title: "Track your reading journey",
    desc: "Keep a record of books you've read, want to read, and are currently reading. Set goals and celebrate your reading milestones!"
  },
  {
    img: img6,
    title: "Connect with fellow readers",
    desc: "Join discussions, follow friends, and share your thoughts. Build your own book-loving community and make reading social."
  }
];

export default function FeaturesGrid() {
  return (
    <section className="w-full py-16 md:py-24 flex items-center justify-center font-[Manrope,sans-serif]" style={{ background: '#051023' }}>
      <style>{`
        .custom-h2 {
          margin-top: 20px;
          margin-bottom: 10px;
          font-family: 'Manrope', 'DM Sans', Arial, sans-serif;
          font-size: 32px;
          line-height: 36px;
          font-weight: 300;
          letter-spacing: 0;
        }
      `}</style>
      <div className="w-full max-w-7xl px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          {cards.map((card, idx) => (
            <div key={idx} className="flex flex-col bg-[#0c182a] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 font-[Manrope,sans-serif]">
              <div className="h-96 w-full bg-gray-900 flex items-center justify-center overflow-hidden">
                <img src={card.img} alt={card.title} className="object-cover w-full h-full" />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-light text-white mb-3">{card.title}</h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
