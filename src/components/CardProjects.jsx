const CardProjects = ({ image, title, description, tags = [] }) => {
    return (
        <div
            className="rounded-xl border border-slate-200 dark:border-slate-800
                 overflow-hidden text-center shadow-lg
                 transition-transform duration-300 hover:-translate-y-1"
        >
            <div className="relative aspect-video w-full overflow-hidden">
                {image}
            </div>

            <div className="px-4 pb-4">
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {description}
                </p>

                {tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium rounded-full
                           bg-slate-100 text-slate-700
                           dark:bg-slate-800 dark:text-slate-300"
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
                    className="mt-4 inline-flex w-full items-center justify-center
             rounded-lg border border-blue-600
             px-4 py-2 text-sm font-semibold
             text-blue-600 transition
             hover:bg-blue-600 hover:text-white
             dark:border-red-400 dark:text-red-400
             dark:hover:bg-red-400 dark:hover:text-black"
                >
                    View Project
                </a>
            </div>
        </div>
    )
}

export default CardProjects