import { motion } from "framer-motion"
import CardProjects from "../components/CardProjects"
import projectImg from "../assets/Haris.png"

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const PROJECTS_DATA = [
    {
        title: "Portfolio Website",
        description:
            "Personal portfolio website built with modern frontend stack.",
        tags: ["React", "Tailwind CSS", "Framer Motion", "Edan"],
        image: projectImg,
    },
    {
        title: "UI Components",
        description:
            "Reusable UI components with responsive layout and animation.",
        tags: ["React", "Tailwind CSS"],
        image: projectImg,
    },
    {
        title: "Game Prototype",
        description:
            "Game prototype developed using Godot Engine.",
        tags: ["Godot", "GDScript"],
        image: projectImg,
    },
    {
        title: "Editing Showcase",
        description:
            "Image & video editing showcase for digital content.",
        tags: ["Editing", "Design"],
        image: projectImg,
    },
    {
        title: "PC Build Project",
        description:
            "Custom PC build with optimized airflow and performance.",
        tags: ["Hardware", "System"],
        image: projectImg,
    },
    {
        title: "Experimental UI",
        description:
            "UI experiments with animation and interaction.",
        tags: ["UI", "Animation"],
        image: projectImg,
    },
]

const ProjectsSection = () => {
    return (
        <section id="projects" className="w-full py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full mt-8 max-w-7xl mx-auto flex flex-col items-center">

                <h2 className="text-3xl lg:text-5xl font-black text-center text-gray-900 dark:text-white mb-4">
                    My Projects
                </h2>

                <p className="w-3/4 text-center text-slate-600 dark:text-slate-400 mb-12">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum laborum corporis tempore, fugit voluptas beatae maxime ut nemo vero, pariatur velit illo. Laudantium nihil aliquam laborum, quisquam ipsa consequatur.</p>

                <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {PROJECTS_DATA.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: index * 0.12, duration: 0.4 }}
                        >
                            <CardProjects
                                title={project.title}
                                description={project.description}
                                tags={project.tags}
                                image={
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                }
                            />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}

export default ProjectsSection