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
        "A computer science student doing what excites them and putting their best into it.",
}

const SOCIALS = [
    {
        name: 'GitHub',
        href: 'https://github.com/mhps-null',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/mharisputras',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        name: 'Email',
        href: 'https://mail.google.com/mail/?view=cm&to=mharisputras.work@gmail.com',
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v.243l-9.75 5.85-9.75-5.85V6.75Z" />
            <path d="M2.25 8.568v8.682A2.25 2.25 0 0 0 4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V8.568l-9.75 5.85-9.75-5.85Z" />
          </svg>
        ),
    },
]

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

                    <div className="pt-0 flex space-x-6 items-center max-md:flex-col max-md:space-x-0 max-md:space-y-4 max-md:w-full">
                      <a
                        href="#projects"
                        className="px-6 py-3 rounded-md w-fit shrink-0
                                   bg-blue-600 dark:bg-red-500
                                   hover:bg-blue-700 dark:hover:bg-red-600
                                   text-sm font-medium text-white
                                   inline-flex items-center gap-2
                                   focus:outline-none
                                   hover:glow-indigo
                                   dark:hover:glow-red"
                      >
                        View My Work
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 ml-2"
                        >
                          <line x1="3" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                      <div className="flex space-x-4 lg:space-x-6">
                {SOCIALS.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800
                        flex items-center justify-center
                        hover:glow-indigo dark:hover:glow-red
                        transition-[border-color] duration-300
                        text-gray-600 dark:text-gray-400
                        hover:text-black dark:hover:text-white"
                        aria-label={social.name}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
                    </div>
                </div>

                <div className="relative shrink-0">
                    <div className="w-64 h-64 lg:w-96 lg:h-96 relative">
                        <div className="absolute inset-0 bg-blue-600 dark:bg-red-400 rounded-full blur-2xl opacity-50"></div>

                        <img
                            src={profileImg}
                            alt={`Portrait of ${HERO_DATA.name}`}
                            className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 transition-colors duration-300 shadow-2xl z-10"
                            loading="eager"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HeroSection;