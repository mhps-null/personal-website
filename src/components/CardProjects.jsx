const CardProjects = ({ image, title, description, tag }) => {
    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800
                     overflow-hidden text-center shadow-lg">

            <div className="w-full overflow-hidden relative aspect-video mx-auto text-blue-600 dark:text-red-400">
                {image}
            </div>

            <div className="px-4 pb-4">
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {description}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {tag.map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 text-xs font-medium rounded-full
                       bg-slate-100 text-slate-700
                       dark:bg-slate-800 dark:text-slate-300"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default CardProjects