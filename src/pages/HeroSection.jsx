import { useState, useEffect } from 'react';
import profileImg from '../assets/Haris.png';
import { motion, AnimatePresence } from "framer-motion"

const HERO_DATA = {
    name: "Muhammad Haris Putra Sulastianto",
    roles: [
        "Web Developer",
        "Game Developer",
        "Computer Systems Enthusiast",
        "Gamer",
    ],
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
};

const HeroSection = () => {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % HERO_DATA.roles.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="about"
            className="w-full min-h-[60vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
                    <div className="space-y-2">
                        <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                            Hi, I'm <span className="dark:text-red-400 text-blue-600">{HERO_DATA.name}</span>
                        </h1>

                        <h2 className="text-xl lg:text-3xl font-bold tracking-tight text-gray-700 dark:text-gray-300">
                            I'm a <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    className="text-gradient-red text-gradient-blue inline-block"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {HERO_DATA.roles[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </h2>
                    </div>

                    <p className="text-base lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                        {HERO_DATA.description}
                    </p>

                    <div className="pt-0">
                        <button className="px-6 py-3 rounded-md
                                      bg-blue-600 dark:bg-red-500
                                      hover:bg-blue-700 dark:hover:bg-red-600
                                      text-sm font-medium text-white
                                      transition duration-300
                                      focus:outline-none
                                      hover:glow-indigo
                                      dark:hover:glow-red">
                            Contact Me
                        </button>
                    </div>
                </div>

                <div className="relative shrink-0">
                    <div className="w-64 h-64 lg:w-96 lg:h-96 relative">
                        <div className="absolute inset-0 bg-blue-600 dark:bg-red-400 rounded-full blur-2xl opacity-50"></div>

                        <img
                            src={profileImg}
                            alt={`Portrait of ${HERO_DATA.name}`}
                            className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800  shadow-2xl z-10"
                            loading="eager"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HeroSection;