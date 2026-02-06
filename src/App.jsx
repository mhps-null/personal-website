import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import HeroSection from "./pages/HeroSection"

function App() {

  return (<div className="flex min-h-screen flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-gray-950 dark:text-slate-100">
    <Header />
    <main className="grow">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <section id="HeroSection" className="scroll-mt-24">
          <HeroSection />
        </section>

      </div>
    </main>
    <Footer />
  </div >)
}

export default App