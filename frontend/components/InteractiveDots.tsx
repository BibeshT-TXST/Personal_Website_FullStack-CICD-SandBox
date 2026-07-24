"use client";

import { useEffect, useState } from "react";

export default function InteractiveDots() {
  const [activeSection, setActiveSection] = useState("act-1");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["act-1", "act-2", "act-3"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {["act-1", "act-2", "act-3"].map((id, index) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={`nav-dot ${activeSection === id ? "active" : ""}`}
          aria-label={`Scroll to Act ${index + 1}`}
        />
      ))}
    </div>
  );
}
