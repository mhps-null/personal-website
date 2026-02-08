const CardSkills = ({ icon, title, description, skills }) => {
    return (
        <div className="w-64 h-70 rounded-xl border border-slate-200 dark:border-slate-800
                 p-4 text-center shadow-lg flex flex-col">

            <div className="w-12 h-12 mx-auto text-blue-600 dark:text-red-400">
                {icon}
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {title}
            </h3>

            <p className="mt-auto text-sm text-slate-600 dark:text-slate-400">
                {description}
            </p>

            <div className="mt-auto flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
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
    )
}

export default CardSkills