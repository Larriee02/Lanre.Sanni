import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

// Static fallback so the section still renders if the backend is
// unreachable (e.g. static hosting with no API deployed).
const FALLBACK_PROJECTS = [
    {
        id: 1,
        name: "Spa Website",
        description: "E-commerce Spa Services",
        image: "/images/Extreme-flow.png",
        link: "https://larriee02.github.io/Extreme-flow2/",
    },
    {
        id: 2,
        name: "Medicare",
        description: "Healthcare appointment booking platform",
        image: "/images/Medicare.png",
        link: "https://larriee02.github.io/Health-care-appointment-system/",
    },
    {
        id: 3,
        name: "LSM rescue and towing",
        description: "Dispatch and landing platform for a Lagos based towing service",
        image: "/images/LSM.png",
        link: "https://sanniabdulroheem-sketch.github.io/LSM-tow/",
    },
];

export default function Projects({ darkMode }) {
    const [projects, setProjects] = useState(FALLBACK_PROJECTS);

    useEffect(() => {
        let cancelled = false;
        api.getProjects()
            .then((data) => {
                if (!cancelled && Array.isArray(data) && data.length) setProjects(data);
            })
            .catch((err) => {
                console.error("Falling back to static projects:", err.message);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section className={`px-8 md:px-16 py-10 transition-colors duration-300 ${darkMode ? "bg-ink" : "bg-paper"}`}>

            <div className="mb-8">
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
                    Projects
                </motion.h1>
            </div>

            <div className="flex flex-col gap-4">
                {projects.map((project, i) => (
                    <motion.a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                        viewport={{ once: true }}
                        className={`group flex items-center gap-3 sm:gap-6 rounded-2xl p-3 sm:p-4 transition-all duration-300 cursor-pointer
                            ${darkMode
                                ? "bg-ink-card hover:bg-ink-card-hover hover:scale-[1.02] hover:shadow-xl"
                                : "bg-white hover:bg-gray-50 hover:scale-[1.02] hover:shadow-xl"
                            }`}
                    >
                        <div className="shrink-0 w-25 h-18.75 sm:w-40 sm:h-27.5 rounded-xl overflow-hidden bg-gray-800">
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <h2 className={`text-lg sm:text-2xl font-bold leading-tight ${darkMode ? "text-white" : "text-black"}`}>
                                {project.name}
                            </h2>
                            <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {project.description}
                            </p>
                        </div>

                        <div className="shrink-0">
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}