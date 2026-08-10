import { Home, Folder, Briefcase, Wrench, PenLine, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
    const [hovered, setHovered] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const links = [
        { id: "home",       label: "Home",       icon: <Home size={20} />,     path: "/" },
        { id: "projects",   label: "Projects",   icon: <Folder size={20} />,   path: "/projects" },
        { id: "experience", label: "Experience", icon: <Briefcase size={20} />, path: "/experience" },
        { id: "tools",      label: "Tools",      icon: <Wrench size={20} />,   path: "/tools" },
        { id: "writings",   label: "Writings",   icon: <PenLine size={20} />,  path: "/writings" },
    ];

    return (
        <div className="flex justify-center items-center gap-4 pt-6 pb-2 w-full">

            <nav className="relative flex items-center gap-2 bg-black rounded-full px-4 py-3 shadow-lg">
                {links.map((link) => (
                    <div
                        key={link.id}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHovered(link.id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <button
                            onClick={() => navigate(link.path)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                                ${location.pathname === link.path
                                    ? "text-blue-400"
                                    : darkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {link.icon}
                        </button>

                        {hovered === link.id && (
                            <span className="absolute top-full mt-2 text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap z-50 bg-black text-white">
                                {link.label}
                            </span>
                        )}
                    </div>
                ))}
            </nav>

            <div
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHovered("theme")}
                onMouseLeave={() => setHovered(null)}
            >
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-10 h-10 rounded-full bg-black flex items-center justify-center transition-all duration-200 text-gray-400 hover:text-white"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {hovered === "theme" && (
                    <span className="absolute top-full mt-2 text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap z-50 bg-black text-white">
                        {darkMode ? "Light mode" : "Dark mode"}
                    </span>
                )}
            </div>

        </div>
    );
}