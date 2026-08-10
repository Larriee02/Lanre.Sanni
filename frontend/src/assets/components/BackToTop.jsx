import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollContainer = document.querySelector("main");
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      setVisible(scrollTop > 300);
    };

    const scrollContainer = document.querySelector("main");
    const targets = [window];

    if (scrollContainer) {
      targets.push(scrollContainer);
    }

    toggleVisibility();

    targets.forEach((target) => {
      target.addEventListener("scroll", toggleVisibility, { passive: true });
    });

    return () => {
      targets.forEach((target) => {
        target.removeEventListener("scroll", toggleVisibility);
      });
    };
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector("main");

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600"
      >
        ↑
      </button>
    )
  );
}