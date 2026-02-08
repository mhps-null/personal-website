import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import HeroSection from "./pages/HeroSection"
import SkillsSection from "./pages/SkillsSection"
import ProjectsSection from "./pages/ProjectsSection"
import ContactSection from "./pages/ContactSection"
import { motion } from "framer-motion"

function App() {

  return (<div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-gray-950 dark:text-slate-100">

    <Header />
    <main className="grow">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <HeroSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </motion.div>

      </div>
    </main>
    <Footer />

  </div >)
}

export default App