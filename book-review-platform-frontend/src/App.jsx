import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HeroSlider from "./components/HeroSlider";
import HowItWorks from "./components/HowItWorks";
import FeaturesGrid from "./components/FeaturesGrid";
import FAQSection from "./components/FAQSection";
import CallToAction from "./components/CallToAction";
import ProtectedRoute from "./components/ProtectedRoute";
import ReviewConfirmation from "./pages/ReviewConfirmation"; 
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSlider />
      <HowItWorks />
      <FeaturesGrid />
      <FAQSection />
      <CallToAction />
              </>
            } />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/review-confirmation" element={<ReviewConfirmation />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
