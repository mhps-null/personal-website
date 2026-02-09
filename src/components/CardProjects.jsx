const CardProjects = ({ image, title, description, tags = [] }) => {
    return (
        <div
            className="rounded-xl border border-slate-200 dark:border-slate-800
                transition-colors duration-300
                 overflow-hidden text-center shadow-lg
                  hover:-translate-y-1 hover:glow-indigo dark:hover:glow-red
                 h-full flex flex-col"
        >
            <div className="relative aspect-video w-full overflow-hidden shrink-0">
                {image}
            </div>

            <div className="px-4 pb-4 flex flex-col flex-1 gap-4">

                <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4 ">
                    {title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 ">
                    {description}
                </p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-full
                           bg-slate-100 text-slate-700 transition-colors duration-300
                           dark:bg-slate-800 dark:text-slate-300 "
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center
             rounded-lg border border-blue-600
             px-4 py-2 text-sm font-semibold
             text-blue-600
             hover:bg-blue-600 hover:text-white
             dark:border-red-400 dark:text-red-400
             dark:hover:bg-red-400 dark:hover:text-black "
                >
                    View Project
                </a>
            </div>
        </div>
    )
}

export default CardProjects