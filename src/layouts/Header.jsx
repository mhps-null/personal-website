import { useState } from 'react';
import ThemeToggle from "./../components/ThemeToggle"

const NAV_LINKS = [
    { name: 'About me', href: '#aboutme' },
    { name: 'Skills', href: '#skills' },
    { name: 'Project', href: '#project' },
    { name: 'Contact', href: '#contact' },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-900/60 dark:border-gray-50/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                {/* TITLE */}
                <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">mhps-null</span>

                <div className="flex items-center gap-8 max-md:gap-4">
                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex md:gap-8 items-center">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg md:text-sm lg:text-md font-medium -colors dark:hover:text-[#FF6A6A] dark:hover:text-glow-red hover:text-indigo-600 hover:text-glow-indigo"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <ThemeToggle />

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="rounded-full p-2 text-gray-900 dark:text-gray-50 transition hover:bg-slate-200 dark:hover:bg-slate-800 md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full border-b border-gray-900 dark:border-gray-50 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 shadow-lg md:hidden">
                    <nav className="flex flex-col p-4 space-y-4">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block text-base font-medium text-slate-600 dark:text-slate-300 dark:hover:text-[#FF6A6A] dark:hover:text-glow-red hover:text-indigo-600 hover:text-glow-indigo"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;