import CardProjects from "../components/CardProjects"

const ProjectsSection = () => {

    return (<section id="projects" className="w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8">
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                My Projects
            </h1>

            <p className="w-3/4 text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum laborum corporis tempore, fugit voluptas beatae maxime ut nemo vero, pariatur velit illo. Laudantium nihil aliquam laborum, quisquam ipsa consequatur.</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CardProjects
                    image={
                        <img src="src\assets\Haris.png" />
                    }
                    title="Software Engineer"
                    description="Building responsive, modern web interfaces with clean and scalable code."
                    tag={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                />
                <CardProjects
                    image={
                        <img src="src\assets\Haris.png" />
                    }
                    title="Software Engineer"
                    description="Building responsive, modern web interfaces with clean and scalable code."
                    tag={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                />
                <CardProjects
                    image={
                        <img src="src\assets\Haris.png" />
                    }
                    title="Software Engineer"
                    description="Building responsive, modern web interfaces with clean and scalable code."
                    tag={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                />
                <CardProjects
                    image={
                        <img src="src\assets\Haris.png" />
                    }
                    title="Software Engineer"
                    description="Building responsive, modern web interfaces with clean and scalable code."
                    tag={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                />
                <CardProjects
                    image={
                        <img src="src\assets\Haris.png" />
                    }
                    title="Software Engineer"
                    description="Building responsive, modern web interfaces with clean and scalable code."
                    tag={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                />
                <CardProjects
                    image={
                        <img src="src\assets\Haris.png" />
                    }
                    title="Software Engineer"
                    description="Building responsive, modern web interfaces with clean and scalable code."
                    tag={["React", "Tailwind CSS", "JavaScript", "Framer Motion"]}
                />
            </div>
        </div>
    </section>)
}

export default ProjectsSection