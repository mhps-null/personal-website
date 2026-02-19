import { motion } from "framer-motion"
import CardProjects from "../components/CardProjects"
import projectImg from "../assets/Haris.png"
import queensImg from "../assets/QueensSolver.png"
import pcImg from "../assets/PC1.jpg"
import osImg from "../assets/OS.png"
import rplImg from "../assets/RPL.png"
import algeo1Img from "../assets/ALGEO1.png"
import algeo2Img from "../assets/ALGEO2.png"

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
        title: "Queens LinkedIn Solver",
        description:
            "Dekstop app game solver uses brute-force algorithm.",
        tags: ["C++", "Qt", "CMake", "Ninja"],
        link: "https://github.com/mhps-null/Tucil1_13524053",
        image: queensImg,
    },
    {
        title: "Built & Configured Custom PC",
        description:
            "Personally built and configured my custom PC from the ground up.",
        tags: ["RTX 5070", "R7 9700X", "H24G30Q"],
        link: "#", // WIP
        image: pcImg,
    },
    {
        title: "Minimal x86 OS",
        description:
            "Built a basic operating system in C with custom kernel and low-level system handling.",
        tags: ["C", "x86", "OSDev", "QEMU"],
        link: "https://github.com/mhps-null/Operating-System",
        image: osImg,
    },
    {
        title: "Marketplace & Donation App",
        description:
            "Marketplace and donation system using MVC architecture and relational data modeling.",
        tags: ["Flet", "PostgreSQL", "MVC"],
        link: "https://github.com/mhps-null/Software-Engineering-ITB",
        image: rplImg,
    },
    {
        title: "Matrix Computation System",
        description:
            "Matrix computation system implementing core linear algebra algorithms and numerical methods.",
        tags: ["Java", "JavaFX", "Maven", "Scene Builder"],
        link: "https://github.com/mhps-null/Matrix-Computation-System",
        image: algeo1Img,
    },
    {
        title: "Digital Library System",
        description:
            "Semantic book retrieval system using LSA and PCA for search and recommendation.",
        tags: ["Next.js", "FastAPI", "Docker", "Python"],
        link: "https://github.com/mhps-null/Semantic-Digital-Library",
        image: algeo2Img,
    },
]

const ProjectsSection = () => {
    return (
        <section id="projects" className="w-full py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full mt-8 max-w-7xl mx-auto flex flex-col items-center">

                <h2 className="text-3xl lg:text-5xl font-black text-center text-gray-900 dark:text-white mb-4">
                    My Projects
                </h2>

                <p className="w-3/4 text-center text-slate-600 dark:text-slate-400 mb-12">
                    Here are selected projects I’ve built.
                </p>

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
                                link={project.link}
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