import React from "react";

const faqs = [
  {
    question: "How do I add a book?",
    answer: "After logging in, click on 'Add Book' and fill in the details—title, author, genre, and anything else you'd like to share. It's a simple way to help others discover new reads."
  },
  {
    question: "Can I review unread books?",
    answer: "We encourage reviews from readers who've finished the book. Sharing your honest thoughts helps others find stories they'll truly enjoy."
  },
  {
    question: "How do I rate a book?",
    answer: "Once you've finished a book, visit its page to select a star rating and add your review. Your feedback helps guide fellow readers."
  },
  {
    question: "Who can see my review?",
    answer: "All users can see your review once it's posted. Your perspective adds value and helps build our reading community."
  },
  {
    question: "Can I change my review?",
    answer: "Yes! You can edit or delete your review anytime from your profile. We want you to feel comfortable sharing and updating your thoughts."
  },
  {
    question: "Forgot your password?",
    answer: "Just click 'Forgot Password?' on the login page and follow the instructions. We'll help you reset it so you can get back to reading and reviewing."
  }
];

export default function FAQSection() {
  return (
    <section className="w-full py-20 md:py-28 flex items-center justify-center font-[DM_Sans,sans-serif]" style={{ background: '#0c182a' }}>
      <div className="w-full max-w-7xl px-4 mx-auto">
        <div className="mb-12 text-center">
          <div className="text-sm md:text-base text-gray-400 mb-2 tracking-wide">GOT QUESTIONS? WE’RE HERE TO HELP</div>
          <h2 className="text-3xl md:text-4xl text-white mb-4">Book lovers’ most asked questions</h2>
          <p className="text-gray-300 text-lg  max-w-2xl mx-auto">Wondering how to add books, write reviews, or manage your account? Find friendly answers to help you get started and feel at home.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="pl-6 border-l-4 border-[#232e47]">
              <h3 className="text-xl font-medium text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300 text-base leading-relaxed font-normal">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
