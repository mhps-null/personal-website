const ContactSection = () => {

    return (<section
        id="contact"
        className="w-full flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
    >
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4 ">
                Contact me
            </h2>

            <p className="w-3/4 text-center text-slate-600 dark:text-slate-400 mb-12">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptatum laborum corporis tempore, fugit voluptas beatae maxime ut nemo vero, pariatur velit illo. Laudantium nihil aliquam laborum, quisquam ipsa consequatur.</p>

            <div
                className="
                          w-full
                          max-w-md sm:max-w-lg md:max-w-xl
                          rounded-xl
                          border border-slate-200 dark:border-slate-800 transition-colors duration-300
                          shadow-lg
                          flex flex-col
                          mx-auto
                        "
            >
                <div className="p-6">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Your name"
                                autoComplete="name"
                                className="w-full rounded-md border border-slate-300 dark:border-slate-700
                                placeholder-slate-400 dark:placeholder-slate-500
                                bg-white dark:bg-slate-900 px-3 py-2 text-sm
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full rounded-md border border-slate-300 dark:border-slate-700
                                placeholder-slate-400 dark:placeholder-slate-500
                                bg-white dark:bg-slate-900 px-3 py-2 text-sm
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                placeholder="Write your message..."
                                autoComplete="off"
                                className="w-full rounded-md border border-slate-300 dark:border-slate-700 
                                placeholder-slate-400 dark:placeholder-slate-500
                                bg-white dark:bg-slate-900 px-3 py-2 text-sm
                                resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="
                                      w-full rounded-md
                                      bg-blue-600 dark:bg-red-500
                                      hover:bg-blue-700 dark:hover:bg-red-600
                                      px-4 py-2 text-sm font-medium text-white
                                      focus:outline-none
                                      hover:glow-indigo
                                      dark:hover:glow-red
                                    "
                        >
                            Send Message
                        </button>
                        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                            Or email me directly at{" "}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://mail.google.com/mail/?view=cm&to=mharisputras.work@gmail.com"
                                className="
                                          font-medium
                                          text-indigo-600 dark:text-red-400
                                          hover:underline
                                          focus:outline-none focus:underline
                                        "
                            >
                                mharisputras.work@gmail.com
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    </section>)
}

export default ContactSection