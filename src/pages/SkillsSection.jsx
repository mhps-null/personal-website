import { motion } from "framer-motion"
import CardSkills from "../components/CardSkills"

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const SKILLS_DATA = [
    {
        title: "Software Engineering",
        description:
            "Desid scalable logic.",
        skills: ["Programming", "Problem Solving", "Debugging"],
        icon: (
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
        ),
    },
    {
        title: "Image & Video Editing",
        description:
            "Editing visual content with attention to composition and clarity.",
        skills: ["Photo Editing", "Video Editing", "Color Grading"],
        icon: (
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
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <circle cx="9" cy="9" r="1.5" />
                <path d="M21 15l-5-5-4 4-2-2-5 5" />
                <path d="M8 20h8" />
            </svg>
        ),
    },
    {
        title: "PC Builder & System",
        description:
            "Assembling, configuring, and troubleshooting computer systems.",
        skills: ["PC Assembly", "Hardware Setup", "Troubleshooting"],
        icon: (
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
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M9 7h6" />
                <path d="M9 11h6" />
                <circle cx="12" cy="16" r="1" />
            </svg>
        ),
    },
    {
        title: "Game Development",
        description:
            "Developing games with structured logic and scene-based systems.",
        skills: ["Godot Engine", "GDScript", "Game Logic"],
        icon: (
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
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" />
                <path d="M3 9h6" />
                <path d="M15 15h6" />
            </svg>
        ),
    },
]

const SkillsSection = () => {
    return (
        <section
            id="skills"
            className="w-full py-16 px-4 sm:px-6 lg:px-8 flex justify-center"
        >
            <div className="w-full max-w-7xl mt-8 mx-auto flex flex-col items-center">
                <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                    My Skills
                </h2>

                <p className="w-3/4 text-center text-slate-600 dark:text-slate-400 mb-12">
                I focus on building structured, efficient, and maintainable solutions across software, systems, and creative domains. My skill set combines logical problem-solving, hands-on technical work, and practical experience in development tools and workflows.
                </p>

                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {SKILLS_DATA.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: index * 0.12, duration: 0.4 }}
                        >
                            <CardSkills {...item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default SkillsSection