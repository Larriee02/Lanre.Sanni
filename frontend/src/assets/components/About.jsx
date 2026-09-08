import { motion } from "framer-motion";

export default function About({ darkMode }) {
    return (
        <section className={`px-8 md:px-16 py-10 transition-colors duration-300 ${darkMode ? "bg-ink" : "bg-paper"}`}>
            <div className="flex flex-col items-center gap-10 max-w-4xl">

                {/* text side — from left */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <div>
                        <h1 className={`text-5xl sm:text-7xl md:text-8xl font-black font-display leading-tight tracking-tight uppercase ${darkMode ? "text-white" : "text-black"}`}>
                            About
                        </h1>
                        <h1 className={`text-5xl sm:text-7xl md:text-8xl font-black font-display leading-tight tracking-tight uppercase ${darkMode ? "text-ghost" : "text-blue-500"}`}>
                            Me
                        </h1>
                    </div>

                    <p className={`text-sm sm:text-base leading-relaxed max-w-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        <p>I got into development the way a lot of people do, curiosity turned into obsession. </p>
                        <p>What kept me here is the craft: taking an idea, a business problem, or a rough proposal document and turning it into something real people can click through, trust, and use. </p>
                        <p>I recently completed TechCrush's Backend Development program (Node.js/Express track), sharpening my backend fundamentals, and I've carried that into a portfolio of full stack projects that mirror real world problems, from fintech dashboards to healthcare booking systems to logistics platforms for local businesses here in Lagos.</p>
                    </p>

                    <p className={`text-sm sm:text-base leading-relaxed max-w-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                       <ul> I'm currently open to remote frontend roles and freelance projects.
                        <li><span style={{ fontWeight: "bold" }}>Frontend:</span> React, Tailwind CSS, Framer Motion. I lean toward editorial, intentional design over generic templates. Typography and motion aren't afterthoughts for me.</li>
                        <li><span style={{ fontWeight: "bold" }}>Backend:</span> Node.js, Express, RESTful APIs, JWT authentication, email services (Nodemailer)</li>
                        <li><span style={{ fontWeight: "bold" }}>Databases:</span> MongoDB and PostgreSQL, depending on what the project actually needs</li>
                        <li><span style={{ fontWeight: "bold" }}>Deployment:</span> GitHub Pages, Render, Vercel. </li>
                        </ul>
                        <p>I've built and shipped projects like a dispatch and landing platform for a Lagos based towing service, a fintech dashboard with real time analytics, an apartment rental platform for World Cup visitors, and a healthcare booking system each one an exercise in solving a real problem, not just checking a technical box.</p>
                            When I'm not writing codes, I'm usually thinking about how tech can solve very specific, very local problems, the kind that don't show up in generic SaaS templates but matter a lot to the people dealing with them.
                    </p>

                    <p className={`text-sm sm:text-base leading-relaxed max-w-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        I'm currently open to remote frontend roles and freelance projects.
                        If you have something interesting, let's build it together.
                    </p>

                    {/* CV buttons */}
                    <div className="flex items-center gap-4 mt-2">
                        <a
                            href="Lanre.Sanni.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors duration-200"
                        >
                            View CV
                        </a>
                        <a
                            href="Lanre.Sanni.pdf"
                            download
                            className={`px-6 py-3 text-sm font-bold rounded-xl border transition-colors duration-200
                                ${darkMode
                                    ? "border-white/20 text-white hover:bg-white/10"
                                    : "border-black/20 text-black hover:bg-black/10"
                                }`}
                        >
                            Download CV
                        </a>
                    </div>
                </motion.div>

                {/* image side — from right */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="shrink-0"
                >
                    <div className={`w-64 h-72 rounded-2xl overflow-hidden ${darkMode ? "bg-ink-input" : "bg-paper-muted"}`}>
                        <img
                            src="/images/L.S.png"
                            alt="Lanre Sanni"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
