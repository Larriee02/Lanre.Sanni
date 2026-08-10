import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function CountUp({ target, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();
                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return <span ref={ref}>+{count}</span>;
}

export default function Hero({ darkMode }) {
    const stats = [
        { value: 22, label: "MONTHS OF EXPERIENCE" },
        { value: 15, label: "PROJECTS COMPLETED" },
        { value: 7, label: "WORLDWIDE CLIENTS" },
    ];

    return (
        <section className={`min-h-screen flex flex-col justify-center px-8 md:px-16 py-20 transition-colors duration-300 ${darkMode ? "bg-ink" : "bg-paper"}`}>

            <div className="mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`text-5xl sm:text-7xl md:text-8xl font-black font-display leading-tight tracking-tight uppercase ${darkMode ? "text-white" : "text-black"}`}
                >
                    Full Stack
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    viewport={{ once: true }}
                    className={`text-5xl sm:text-7xl md:text-8xl font-black font-display leading-tight tracking-tight uppercase ${darkMode ? "text-ghost" : "text-blue-500"}`}
                >
                    Developer
                </motion.h1>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
                className={`text-sm sm:text-base max-w-md leading-relaxed mb-16 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
                <p>Full Stack Developer, based in Lagos, Nigeria.</p>

                <p>I'm Lanre Sanni, a full stack developer who likes shipping things that actually feel finished, clean interfaces, solid backends, and the small details that make a product feel human instead of generic. </p>
                <p>I work across React, Node.js/Express, Tailwind CSS, and both MongoDB and PostgreSQL, and I care as much about how something feels to use as how well it runs under the hood.</p>
            </motion.p>

            <div className="flex flex-col gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-baseline gap-3"
                    >
                        <span className={`text-4xl sm:text-5xl font-black font-display ${darkMode ? "text-white" : "text-black"}`}>
                            <CountUp target={stat.value} />
                        </span>
                        <span className={`text-xs font-mono tracking-wide leading-tight ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            {stat.label}
                        </span>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}