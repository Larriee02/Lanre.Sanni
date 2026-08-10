import { Layers, LayoutDashboard, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Services({ darkMode }) {
    const navigate = useNavigate();

    const services = [
        {
            id: 1,
            title: "DYNAMIC ANIMATION, MOTION DESIGN",
            icon: <Layers size={32} color="white" />,
            bg: "bg-blue-600",
            pattern: "deep",
            textColor: "text-white",
            arrowStyle: "border-white/40 text-white hover:bg-white hover:text-blue-600 hover:border-white",
            path: "/experience",
        },
        {
            id: 2,
            title: "HTML & CSS, JAVASCRIPT, TYPESCRIPT, REACTJS, NEXTJS, GITHUB",
            icon: <LayoutDashboard size={32} color="black" />,
            bg: "bg-sky-300",
            pattern: "sky",
            textColor: "text-black",
            arrowStyle: "border-black/30 text-black hover:bg-black hover:text-sky-300 hover:border-black",
            path: "/projects",
        },
    ];

    return (
        <section className={`px-8 md:px-16 py-16 transition-colors duration-300 ${darkMode ? "bg-ink" : "bg-paper"}`}>
            <div className="flex flex-col gap-5">
                {services.map((service, i) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                        viewport={{ once: true }}
                        onClick={() => navigate(service.path)}
                        className={`relative flex-1 rounded-2xl p-6 flex flex-col justify-between min-h-[220px] overflow-hidden cursor-pointer ${service.bg}`}
                    >
                        {service.pattern === "deep" ? <DeepBluePattern /> : <SkyPattern />}

                        <div className="relative z-10">{service.icon}</div>

                        <div className="relative z-10 flex items-end justify-between gap-4 mt-8">
                            <h3 className={`text-lg font-black leading-tight uppercase font-display ${service.textColor}`}>
                                {service.title}
                            </h3>
                            <button
                                onClick={(e) => { e.stopPropagation(); navigate(service.path); }}
                                className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 ${service.arrowStyle}`}
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function DeepBluePattern() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
            <path d="M 300 0 Q 350 100 280 150 Q 220 200 300 250" stroke="white" strokeWidth="60" fill="none" />
            <path d="M 350 0 Q 400 100 330 150 Q 270 200 350 250" stroke="white" strokeWidth="40" fill="none" />
        </svg>
    );
}

function SkyPattern() {
    return (
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
            {[0, 1, 2, 3, 4].map((i) => (
                <polyline
                    key={i}
                    points={`${60 + i * 60},0 ${30 + i * 60},80 ${70 + i * 60},80 ${40 + i * 60},160 ${80 + i * 60},160 ${50 + i * 60},250`}
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    fill="none"
                />
            ))}
        </svg>
    );
}
