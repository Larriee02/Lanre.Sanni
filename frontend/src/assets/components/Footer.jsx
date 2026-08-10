import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Footer({ darkMode }) {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const socials = [
        {
            label: "WhatsApp",
            href: "https://wa.me/2348035120129",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            ),
        },
        {
            label: "Twitter",
            href: "https://x.com/_lanre__?s=11",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72c-.95.55-2 .95-3.12 1.19a4.92 4.92 0 00-8.38 4.49A13.97 13.97 0 011.64 3.16a4.92 4.92 0 001.52 6.57A4.9 4.9 0 01.96 9.1v.06a4.92 4.92 0 003.95 4.83 4.94 4.94 0 01-2.22.08 4.93 4.93 0 004.6 3.42A9.87 9.87 0 010 19.54a13.94 13.94 0 007.55 2.21c9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.01-.63A10 10 0 0024 4.59l-.05-.02z"/>
                </svg>
            ),
        },
        {
            label: "Instagram",
            href: "https://www.instagram.com/lanre.sanni_?igsh=NDBxNHZndHNzazdp&utm_source=qr",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
            ),
        },
        {
            label: "GitHub",
            href: "https://github.com/Larriee02",
            icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
            ),
        },
    ];

    const navLinks = [
        { label: "Home",       path: "/" },
        { label: "Projects",   path: "/projects" },
        { label: "Experience", path: "/experience" },
        { label: "Tools",      path: "/tools" },
        { label: "Writings",   path: "/writings" },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`px-8 md:px-16 py-12 transition-colors duration-300 border-t
                ${darkMode
                    ? "bg-ink border-white/10"
                    : "bg-paper border-black/10"
                }`}
        >
            <div className="flex flex-col gap-10">

                {/* top row — name + socials */}
                <div className="flex flex-col items-center text-center gap-6">
                    <div>
                        <h2 className={`text-2xl font-black uppercase tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
                            Lanre Sanni
                        </h2>
                        <p className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Full Stack Developer · Lagos, Nigeria
                        </p>
                    </div>

                    {/* socials */}
                    <div className="flex items-center gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200
                                    ${darkMode
                                        ? "bg-ink-card text-gray-400 hover:bg-blue-500 hover:text-white"
                                        : "bg-white text-gray-500 hover:bg-blue-500 hover:text-white"
                                    }`}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* divider */}
                <div className={`w-full h-px ${darkMode ? "bg-white/10" : "bg-black/10"}`} />

                {/* bottom row — nav links + copyright */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex flex-wrap gap-4">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => navigate(link.path)}
                                className={`text-sm transition-colors duration-200
                                    ${darkMode
                                        ? "text-gray-500 hover:text-blue-500"
                                        : "text-gray-400 hover:text-blue-500"
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    <p className={`text-sm ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                        © {currentYear} Lanre Sanni. All rights reserved.
                    </p>
                </div>

            </div>
        </motion.footer>
    );
}