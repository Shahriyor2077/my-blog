import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./hooks/useTheme";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import LandingPage from "./pages/LandingPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Support deep links like /#portfolio once content is mounted
  useEffect(() => {
    if (loading) return;
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, [loading]);

  if (loading) return <LoadingSpinner />;

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-ink text-bone">
          <div className="noise" aria-hidden="true" />
          <Navbar />
          <main>
            <LandingPage />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
