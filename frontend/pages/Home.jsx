import { useState, useEffect } from 'react';
import Sidenav from '../src/assets/components/Sidenav';
import Header from '../src/assets/components/Header';
import Hero from '../src/assets/components/Hero';
import Projects from '../src/assets/components/ProjectsExt';
import Experience from '../src/assets/components/ExperienceExt';
import Tools from '../src/assets/components/Tools';
import RecentWritings from '../src/assets/components/WritingsIndex';
import Contact from '../src/assets/components/Contact';
import About from '../src/assets/components/About';
import Footer from '../src/assets/components/Footer';
import BackToTop from '../src/assets/components/BackToTop';

export default function Home() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window === 'undefined') return true;
        const savedTheme = localStorage.getItem("theme");
        return savedTheme !== "light";
    });

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
            <div id="home">
                <Hero darkMode={darkMode} />
            </div>
            <div id="about">
                <About darkMode={darkMode} />
            </div>
            <div id="projects">
                <Projects darkMode={darkMode} />
            </div>
            <div id="experience">
                <Experience darkMode={darkMode} />
            </div>
            <div id="tools">
                <Tools darkMode={darkMode} />
            </div>
            <div id="writings">
                <RecentWritings darkMode={darkMode} />
            </div>
            <div id="contact">
                <Contact darkMode={darkMode} />
            </div>
            <BackToTop />
            <Footer darkMode={darkMode} />
        </main>

    </div>
);
}