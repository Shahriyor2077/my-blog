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

  if (loading) return <LoadingSpinner />;

  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white">
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
