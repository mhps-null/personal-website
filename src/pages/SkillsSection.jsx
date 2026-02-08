import CardSkills from "../components/CardSkills"

const SkillsSection = () => {

    return (
        <section id="skills" className="w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8">
                <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                    My Skills
                </h1>

                <p className="w-3/4 text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum laborum corporis tempore, fugit voluptas beatae maxime ut nemo vero, pariatur velit illo. Laudantium nihil aliquam laborum, quisquam ipsa consequatur.</p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <CardSkills
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full"
                            >
                                <path d="M8 9l-4 3 4 3" />
                                <path d="M16 9l4 3-4 3" />
                                <path d="M14 4l-4 16" />
                            </svg>
                        }
                        title="Software Engineering"
                        description="Building responsive, modern web interfaces with clean and scalable code."
                        skills={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                    />
                    <CardSkills
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="14" rx="2" />
                                <circle cx="9" cy="9" r="1.5" />
                                <path d="M21 15l-5-5-4 4-2-2-5 5" />
                                <path d="M8 20h8" />
                            </svg>
                        }
                        title="Image and Video Editing"
                        description="Building responsive, modern web interfaces with clean and scalable code."
                        skills={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                    />
                    <CardSkills
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round">
                                <rect x="4" y="3" width="16" height="18" rx="2" />
                                <path d="M9 7h6" />
                                <path d="M9 11h6" />
                                <circle cx="12" cy="16" r="1" />
                            </svg>
                        }
                        title="PC Builder and System"
                        description="Building responsive, modern web interfaces with clean and scalable code."
                        skills={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                    />
                    <CardSkills
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-full h-full">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <path d="M9 9h6v6H9z" />
                                <path d="M3 9h6" />
                                <path d="M15 15h6" />
                            </svg>
                        }
                        title="Game Development"
                        description="Building responsive, modern web interfaces with clean and scalable code."
                        skills={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                    />
                </div>
            </div>
        </section >)
}

export default SkillsSection