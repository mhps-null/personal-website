import { useEffect } from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import HeroSection from "./pages/HeroSection";
import SkillsSection from "./pages/SkillsSection";
import ProjectsSection from "./pages/ProjectsSection";
import ScheduleSection from "./pages/ScheduleSection";
import ContactSection from "./pages/ContactSection";
import { motion as Motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Small delay to allow initial DOM rendering and animation to settle
    const timeoutId = setTimeout(scrollToHash, 150);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />

      <main className="grow pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <ScheduleSection />
            <ContactSection />
          </Motion.div>
        </div>
      </main>

      <Footer />

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;