import { useState, useEffect } from 'react';
import Sidenav from '../src/assets/components/Sidenav';
import Header from '../src/assets/components/Header';
import Projects from '../src/assets/components/ProjectsExt';
import Contact from '../src/assets/components/Contact';
import Footer from '../src/assets/components/Footer';

export default function ProjectPage() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") setDarkMode(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
    <div className={`flex flex-col md:flex-row md:h-screen md:overflow-hidden ${darkMode ? "bg-ink" : "bg-paper"}`}>

        {/* header on mobile */}
        <div className={`md:hidden w-full ${darkMode ? "bg-ink" : "bg-paper"}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <Sidenav darkMode={darkMode} />

        <main className={`flex-1 overflow-y-auto ${darkMode ? "bg-ink" : "bg-paper"}`}>
            <div className="hidden md:block">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <Projects darkMode={darkMode} />
            <Contact darkMode={darkMode} />
            <Footer darkMode={darkMode} />
        </main>
    </div>
);
}