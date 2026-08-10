import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAllWritings } from "../../lib/writing";

const MotionLink = motion(Link);

export default function RecentWritings({ darkMode }) {
    const writings = getAllWritings().slice(0, 3);

    return (
        <section className={`px-8 md:px-16 py-10 transition-colors duration-300 ${darkMode ? "bg-ink" : "bg-paper"}`}>

            <div className="mb-8 flex flex-col items-start gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`text-6xl sm:text-7xl md:text-8xl font-black font-display leading-none tracking-tight uppercase ${darkMode ? "text-white" : "text-black"}`}
                    >
                        Recent
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        viewport={{ once: true }}
                        className={`text-6xl sm:text-7xl md:text-8xl font-black font-display leading-none tracking-tight uppercase ${darkMode ? "text-ghost" : "text-blue-500"}`}
                    >
                        Writings
                    </motion.h1>
                </div>

                <MotionLink
                    to="/writings"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className={`text-sm font-semibold uppercase tracking-wide border-b-2 border-blue-500 pb-1 ${darkMode ? "text-white" : "text-black"}`}
                >
                    View All →
                </MotionLink>
            </div>

            {writings.length === 0 ? (
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    No posts yet — add a markdown file to src/content/writings to get started.
                </p>
            ) : (
                <div className="flex flex-col gap-4">
                    {writings.map((post, i) => (
                        <MotionLink
                            key={post.slug}
                            to={`/writings/${post.slug}`}
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className={`group flex items-center gap-6 rounded-2xl p-4 transition-all duration-300 cursor-pointer
                                ${darkMode
                                    ? "bg-ink-card hover:bg-ink-card-hover hover:scale-[1.02] hover:shadow-xl"
                                    : "bg-white hover:bg-gray-50 hover:scale-[1.02] hover:shadow-xl"
                                }`}
                        >
                            <div className="flex flex-col gap-1 flex-1">
                                <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                                    {post.title}
                                </h2>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {post.excerpt}
                                </p>
                                <p className="text-sm italic mt-1 text-blue-500">
                                    {post.date}
                                </p>
                            </div>

                            <div className="flex-shrink-0 pr-2">
                                <svg
                                    className="w-6 h-6 text-blue-500 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                                </svg>
                            </div>
                        </MotionLink>
                    ))}
                </div>
            )}
        </section>
    );
}