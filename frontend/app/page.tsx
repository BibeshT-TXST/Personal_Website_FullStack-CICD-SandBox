"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";

//Test
const act1Slides = [
  { type: 'image', src: './ME.jpg', text: '...a Traveler & Explorer' },
  { type: 'image', src: './Work.jpg', text: '...a Developer who loves GitHub & Teamwork' },
  { type: 'image', src: './Belief_Books.jpg', text: '...a Reader of Books, Old & New.' },
  { type: 'image', src: './Boyz.jpg', text: '...someone who believes friendship is everything.' },
  { type: 'video', src: './IMG_9265.mov', text: '...a Videographer' },
  { type: 'video', src: './Window.mov', text: '...and I believe every tool has its purpose.' },
];

export default function Home() {
  const books = [
    { title: "Bhagavad Gita", img: "./Books/bhagavad-gita.jpg" },
    { title: "Count of Monte Cristo", img: "./Books/count of montecristo.jpeg" },
    { title: "White Nights", img: "./Books/WHite_knights.jpeg" },
    { title: "12 Rules for Life", img: "./Books/12 rules for life.png" },
    { title: "A Song of Ice and Fire", img: "./Books/Song of ice and fire.webp" },
    { title: "The Great Gatsby", img: "./Books/the great gatsby.jpeg" },
    { title: "Diary of a Wimpy Kid", img: "./Books/Diary of the wimpy.jpg" },
    { title: "How to Do Nothing", img: "./Books/Will do nothing.jpg" }
  ];

  const games = [
    { title: "GTA Vice City", img: "./Games & Movies/vice city.png" },
    { title: "Assassin's Creed 2", img: "./Games & Movies/Assassins_Creed_2.jpeg" },
    { title: "Red Dead Redemption II", img: "./Games & Movies/Red_Dead_Redemption_II.jpg" },
    { title: "GTA V", img: "./Games & Movies/grove-gang-gta-v.webp" },
    { title: "Detroit Become Human", img: "./Games & Movies/Detroit_Become_Human_Cover.webp" }
  ];

  const movies = [
    { title: "The Dark Knight", img: "./Games & Movies/Dark Knight.jpeg" },
    { title: "Pirates of the Caribbean", img: "./Games & Movies/At The Words End.jpeg" },
    { title: "Django Unchained", img: "./Games & Movies/django unchained.jpeg" },
    { title: "The Shawshank Redemption", img: "./Games & Movies/sawshank_redemption.jpeg" },
    { title: "Interstellar", img: "./Games & Movies/Interstellar.jpeg" },
    { title: "The Prestige", img: "./Games & Movies/The prestiage.jpeg" }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAct1Slide, setCurrentAct1Slide] = useState(0);
  const [expandedBento, setExpandedBento] = useState<string | null>(null);

  const toggleBento = (id: string) => {
    setExpandedBento(prev => prev === id ? null : id);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentAct1Slide((prev) => (prev + 1) % act1Slides.length);
    }, 3500);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Act 1 Background Parallax
    gsap.to(".act-1-bg", {
      scrollTrigger: {
        trigger: "#act-1",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 200,
      ease: "none",
    });

    // Fade out Descend arrow on scroll
    gsap.to(".descend-arrow", {
      scrollTrigger: {
        trigger: "#act-1",
        start: "top top",
        end: "30% top",
        scrub: true,
      },
      opacity: 0,
      ease: "none",
    });

    // Act 1 Typing Animation
    const act1Title = document.querySelector(".terminal-type");
    if (act1Title) {
      gsap.to(act1Title, {
        duration: 2,
        text: act1Title.getAttribute("data-text") || "",
        ease: "none",
        delay: 0.5,
        onComplete: () => act1Title.classList.add("cursor-blink"),
      });
    }

    gsap.fromTo(
      ".act-1-text:not(.terminal-type)",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 2.5,
      }
    );

    // Act 2 Animations (Bento Box fade-in)
    const act2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#act-2",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    const act2Title = document.querySelector(".terminal-type-act2");
    if (act2Title) {
      act2Tl
        .to(act2Title, {
          duration: 1.5,
          text: act2Title.getAttribute("data-text") || "",
          ease: "none",
          onComplete: () => act2Title.classList.add("cursor-blink"),
        })
        .fromTo(
          ".bento-box",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
    }

    // Machine Room Animations
    gsap.fromTo(
      ".machine-content > div",
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: "#machine-room",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
      }
    );

    // Act 3 Body Background Wipe & Elements
    gsap.to(document.body, {
      scrollTrigger: {
        trigger: "#act-3",
        start: "top 50%",
        end: "top 20%",
        scrub: true,
        onEnter: () => (document.body.style.backgroundColor = "#E1DCC9"),
        onLeaveBack: () => (document.body.style.backgroundColor = "#000000"),
      },
      backgroundColor: "#E1DCC9",
      duration: 1,
    });

    const act3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#act-3",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    act3Tl
      .fromTo(
        ".act-3-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
      .fromTo(
        ".act-3-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.5"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative w-full" ref={containerRef}>

      {/* Act I: The Explorer */}
      <section
        className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden"
        id="act-1"
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-black act-1-bg">
          {act1Slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentAct1Slide ? "opacity-50" : "opacity-0"
                }`}
            >
              {slide.type === 'image' ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image src={slide.src} alt="Background slide" fill className="object-cover" />
                </div>
              ) : (
                <video src={slide.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>

        {/* Backdrop for text to ensure readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none mix-blend-multiply"></div>

        <div className="relative z-10 w-full max-w-content-max-width mx-auto px-gutter text-center flex flex-col items-center justify-center gap-narrative-gap drop-shadow-2xl h-full mt-12">
          <h1
            className="font-display-xl text-display-xl text-primary act-1-text font-label-mono terminal-type -translate-y-12 md:-translate-y-20 hero-title"
            data-text="Hello, I am Bibesh"
          ></h1>
          <div className="relative w-full max-w-2xl mt-8 h-[140px] md:h-[100px] flex items-center justify-center mx-auto act-1-text hero-subtitle-box">
            {act1Slides.map((slide, index) => (
              <p
                key={index}
                className={`absolute inset-0 font-body-lg text-body-lg text-on-surface-variant font-label-mono text-label-mono uppercase tracking-widest flex items-center justify-center transition-opacity duration-1000 hero-subtitle-text ${index === currentAct1Slide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
              >
                <span className="bg-black/60 md:bg-black/40 p-3 md:p-6 rounded-lg backdrop-blur-md border border-warm-umber/20 text-[0.7rem] md:text-sm">
                  {slide.text}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50 descend-arrow">
          <span className="font-label-mono text-label-mono text-on-surface-variant tracking-widest uppercase text-[10px]">
            Descend
          </span>
          <span className="material-symbols-outlined text-outline">arrow_downward</span>
        </div>
      </section>

      {/* Act II: Experience & Projects (Bento Box) */}
      <section
        className="relative w-full min-h-[100vh] flex flex-col justify-center py-section-v-padding overflow-hidden z-20"
        id="act-2"
      >
        <div className="w-full max-w-content-max-width mx-auto px-gutter relative z-10">
          <div className="mb-12">
            <h2
              className="font-headline-lg text-headline-lg text-deep-espresso font-label-mono terminal-type-act2 inline-block"
              data-text="As A Student & Software Developer I Have Done..."
            ></h2>
            <div className="w-full max-w-sm h-px bg-pitch-black/30 my-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side: Work Experience */}
            <div className="flex flex-col gap-6">
              <h3 className="font-label-mono text-deep-espresso uppercase tracking-widest text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">work</span> Work
              </h3>

              {/* Bento Box 1 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div
                  className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-4 md:p-6 overflow-hidden group rounded-sm bento-hover-effect cursor-pointer md:cursor-default"
                  onClick={() => toggleBento('work-1')}
                >
                  <div className="flex justify-between items-start gap-2 md:gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black text-sm md:text-base">Full-Stack Dev, Student Worker</h4>
                    <span className="font-label-mono text-[10px] md:text-xs text-deep-espresso whitespace-nowrap glass-badge bg-pitch-black/5 px-2 py-1 rounded">Dec 2025 - Present</span>
                  </div>
                  <p className="font-label-mono text-xs md:text-sm text-deep-espresso mb-2 md:mb-4">Texas State University Libraries</p>

                  {/* Desktop: hover-to-expand */}
                  <div className="bento-details-desktop grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Built and shipped a production Next.js asset management web application, replacing a legacy .exe application and manual logs, saving ~13 hrs/week across 7 staff managing 500+ devices.</li>
                        <li>Built a JWT cookie-based authentication system with a custom Next.js proxy, Argon2 client-side hashing, and session guards across 4 route groups.</li>
                        <li>Built a 14-column MUI DataGrid with inline row editing, debounced search, and batch edit/cancel.</li>
                        <li>Co-designed a SQL guardrail patching a live production data-integrity vulnerability in a Flask backend.</li>
                        <li>Co-deployed the application to a Red Hat Enterprise Linux server via a custom GitHub Actions CI/CD pipeline.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mobile: tap-to-expand */}
                  <div className={`bento-details-mobile ${expandedBento === 'work-1' ? 'expanded' : ''}`}>
                    <div>
                      <ul className="font-label-mono text-xs leading-relaxed text-deep-espresso/80 space-y-2 list-disc pl-4 mt-2">
                        <li>Built and shipped a production Next.js asset management web application, replacing a legacy .exe application and manual logs, saving ~13 hrs/week across 7 staff managing 500+ devices.</li>
                        <li>Built a JWT cookie-based authentication system with a custom Next.js proxy, Argon2 client-side hashing, and session guards across 4 route groups.</li>
                        <li>Built a 14-column MUI DataGrid with inline row editing, debounced search, and batch edit/cancel.</li>
                        <li>Co-designed a SQL guardrail patching a live production data-integrity vulnerability in a Flask backend.</li>
                        <li>Co-deployed the application to a Red Hat Enterprise Linux server via a custom GitHub Actions CI/CD pipeline.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`bento-tap-hint font-label-mono text-deep-espresso ${expandedBento === 'work-1' ? 'expanded' : ''}`}>
                    <span className="chevron">▼</span> {expandedBento === 'work-1' ? 'Tap to collapse' : 'Tap to expand'}
                  </div>
                </div>
              </div>

              {/* Bento Box 2 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div
                  className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-4 md:p-6 overflow-hidden group rounded-sm bento-hover-effect cursor-pointer md:cursor-default"
                  onClick={() => toggleBento('work-2')}
                >
                  <div className="flex justify-between items-start gap-2 md:gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black text-sm md:text-base">QA Tester, Intern</h4>
                    <span className="font-label-mono text-[10px] md:text-xs text-deep-espresso whitespace-nowrap glass-badge bg-pitch-black/5 px-2 py-1 rounded">Jun 2024 - Sep 2024</span>
                  </div>
                  <p className="font-label-mono text-xs md:text-sm text-deep-espresso mb-2 md:mb-4">MySQUEGG</p>

                  {/* Desktop: hover-to-expand */}
                  <div className="bento-details-desktop grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Built 12 unit tests using JavaScript, WebDriverIO, and Appium server; used Android Studio to validate UI functionality, identifying 31 bugs across 2 mobile applications.</li>
                        <li>Flagged 37 missing accessibility identifiers through automated testing.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mobile: tap-to-expand */}
                  <div className={`bento-details-mobile ${expandedBento === 'work-2' ? 'expanded' : ''}`}>
                    <div>
                      <ul className="font-label-mono text-xs leading-relaxed text-deep-espresso/80 space-y-2 list-disc pl-4 mt-2">
                        <li>Built 12 unit tests using JavaScript, WebDriverIO, and Appium server; used Android Studio to validate UI functionality, identifying 31 bugs across 2 mobile applications.</li>
                        <li>Flagged 37 missing accessibility identifiers through automated testing.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`bento-tap-hint font-label-mono text-deep-espresso ${expandedBento === 'work-2' ? 'expanded' : ''}`}>
                    <span className="chevron">▼</span> {expandedBento === 'work-2' ? 'Tap to collapse' : 'Tap to expand'}
                  </div>
                </div>
              </div>

              {/* Bento Box 3 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div
                  className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-4 md:p-6 overflow-hidden group rounded-sm bento-hover-effect cursor-pointer md:cursor-default"
                  onClick={() => toggleBento('work-3')}
                >
                  <div className="flex justify-between items-start gap-2 md:gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black text-sm md:text-base">Research Consultant</h4>
                    <span className="font-label-mono text-[10px] md:text-xs text-deep-espresso whitespace-nowrap glass-badge bg-pitch-black/5 px-2 py-1 rounded">Dec 2023 - May 2025</span>
                  </div>
                  <p className="font-label-mono text-xs md:text-sm text-deep-espresso mb-2 md:mb-4">Texas State University Libraries</p>

                  {/* Desktop: hover-to-expand */}
                  <div className="bento-details-desktop grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Coached 700+ undergraduate students on research techniques and finding relevant research papers.</li>
                        <li>Co-developed a structured Research Coach FAQ with 3 colleagues using Texas State University's CMS.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mobile: tap-to-expand */}
                  <div className={`bento-details-mobile ${expandedBento === 'work-3' ? 'expanded' : ''}`}>
                    <div>
                      <ul className="font-label-mono text-xs leading-relaxed text-deep-espresso/80 space-y-2 list-disc pl-4 mt-2">
                        <li>Coached 700+ undergraduate students on research techniques and finding relevant research papers.</li>
                        <li>Co-developed a structured Research FAQ with 3 colleagues using Texas State University's CMS.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`bento-tap-hint font-label-mono text-deep-espresso ${expandedBento === 'work-3' ? 'expanded' : ''}`}>
                    <span className="chevron">▼</span> {expandedBento === 'work-3' ? 'Tap to collapse' : 'Tap to expand'}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Projects */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-0">
              <h3 className="font-label-mono text-deep-espresso uppercase tracking-widest text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">rocket_launch</span> Projects
              </h3>

              {/* Project Bento Box 1 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div
                  className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-4 md:p-6 overflow-hidden group rounded-sm bento-hover-effect cursor-pointer md:cursor-default"
                  onClick={() => toggleBento('project-1')}
                >
                  <div className="flex justify-between items-start gap-2 md:gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black text-sm md:text-base">Med-AI-Vision <a href="https://github.com/Bibesh-T/MedAi_Vision" target="_blank" className="inline-block hover:scale-110 transition-transform"><div className="github-square ml-1 -mt-1 opacity-100 transform-none relative top-0.5 inline-block"></div></a></h4>
                    <span className="font-label-mono text-[10px] md:text-xs text-deep-espresso whitespace-nowrap glass-badge bg-pitch-black/5 px-2 py-1 rounded">Feb 2026 - Present</span>
                  </div>
                  <div className="font-label-mono text-xs md:text-sm text-deep-espresso mb-2 md:mb-4 flex flex-col gap-2">
                    <p>Computer Vision, Machine Learning, Fullstack & Cloud</p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://github.com/BibeshT-TXST/SightX" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-deep-espresso text-sandstone font-bold rounded active:bg-[#238636] active:text-white transition-colors duration-300 text-xs tracking-wider" onClick={(e) => e.stopPropagation()}>GitHub</a>
                    </div>
                  </div>

                  {/* Desktop: hover-to-expand */}
                  <div className="bento-details-desktop grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Trained a ResNet-50 V2 diabetic retinopathy classifier on 35K retinal images, achieving κ = 0.6454 on a personal MacBook (no cloud compute) using CLAHE preprocessing.</li>
                        <li>Built a post-processing safety pipeline using temperature scaling, Bayesian prior correction, and an asymmetric cost matrix converting raw model logits into 3 actionable triage tiers.</li>
                        <li>Built a 108-iteration test-time augmentation ensemble running stochastic transforms per inference pass for robustness to camera artifacts.</li>
                        <li>Built and shipped a 3-container Docker microservices stack (React, Node.js, FastAPI) with JWT + row-level security via Supabase, deployed to Red Hat Linux.</li>
                        <li>Documented the entire system in a comprehensive blog, showcasing SightX as an educational sandbox with full architectural documentation.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mobile: tap-to-expand */}
                  <div className={`bento-details-mobile ${expandedBento === 'project-1' ? 'expanded' : ''}`}>
                    <div>
                      <ul className="font-label-mono text-xs leading-relaxed text-deep-espresso/80 space-y-2 list-disc pl-4 mt-2">
                        <li>Trained a ResNet-50 V2 diabetic retinopathy classifier on 35K retinal images, achieving κ = 0.6454 on a personal MacBook (no cloud compute) using CLAHE preprocessing.</li>
                        <li>Built a post-processing safety pipeline using temperature scaling, Bayesian prior correction, and an asymmetric cost matrix converting raw model logits into 3 actionable triage tiers.</li>
                        <li>Built a 108-iteration test-time augmentation ensemble running stochastic transforms per inference pass for robustness to camera artifacts.</li>
                        <li>Built and shipped a 3-container Docker microservices stack (React, Node.js, FastAPI) with JWT + row-level security via Supabase, deployed to Red Hat Linux.</li>
                        <li>Documented the entire system in a comprehensive blog, showcasing SightX as an educational sandbox with full architectural documentation.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`bento-tap-hint font-label-mono text-deep-espresso ${expandedBento === 'project-1' ? 'expanded' : ''}`}>
                    <span className="chevron">▼</span> {expandedBento === 'project-1' ? 'Tap to collapse' : 'Tap to expand'}
                  </div>
                </div>
              </div>

              {/* Project Bento Box 2 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div
                  className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-4 md:p-6 overflow-hidden group rounded-sm bento-hover-effect cursor-pointer md:cursor-default"
                  onClick={() => toggleBento('project-2')}
                >
                  <div className="flex justify-between items-start gap-2 md:gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black text-sm md:text-base">Personal Website <a href="https://github.com/Bibesh-T/Personal_Website_FullStack-CICD" target="_blank" className="inline-block hover:scale-110 transition-transform"><div className="github-square ml-1 -mt-1 opacity-100 transform-none relative top-0.5 inline-block"></div></a></h4>
                    <span className="font-label-mono text-[10px] md:text-xs text-deep-espresso whitespace-nowrap glass-badge bg-pitch-black/5 px-2 py-1 rounded">2026 - Present</span>
                  </div>
                  <div className="font-label-mono text-xs md:text-sm text-deep-espresso mb-2 md:mb-4 flex flex-col gap-2">
                    <p>Frontend & CI/CD Sandbox</p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://github.com/BibeshT-TXST/Personal_Website_FullStack-CICD-SandBox" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-deep-espresso text-sandstone font-bold rounded active:bg-[#238636] active:text-white transition-colors duration-300 text-xs tracking-wider w-max" onClick={(e) => e.stopPropagation()}>GitHub</a>
                    </div>
                  </div>

                  {/* Desktop: hover-to-expand */}
                  <div className="bento-details-desktop grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Developing a digital portfolio that serves as an active engineering sandbox to experiment with modern frontend architectures.</li>
                        <li>Exploring advanced UI/UX concepts, including scroll-driven narratives and dynamic grid layouts, to craft a unique and engaging user experience.</li>
                        <li>Establishing continuous integration and deployment workflows to create a reliable foundation for rapid, ongoing feature iteration.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Mobile: tap-to-expand */}
                  <div className={`bento-details-mobile ${expandedBento === 'proj-2' ? 'expanded' : ''}`}>
                    <div>
                      <ul className="font-label-mono text-xs leading-relaxed text-deep-espresso/80 space-y-2 list-disc pl-4 mt-2">
                        <li>Developing a digital portfolio that serves as an active engineering sandbox to experiment with modern frontend architectures.</li>
                        <li>Exploring advanced UI/UX concepts, including scroll-driven narratives and dynamic grid layouts, to craft a unique and engaging user experience.</li>
                        <li>Establishing continuous integration and deployment workflows to create a reliable foundation for rapid, ongoing feature iteration.</li>
                      </ul>
                    </div>
                  </div>
                  <div className={`bento-tap-hint font-label-mono text-deep-espresso ${expandedBento === 'proj-2' ? 'expanded' : ''}`}>
                    <span className="chevron">▼</span> {expandedBento === 'proj-2' ? 'Tap to collapse' : 'Tap to expand'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Act III: The Impact */}
      <section
        className="relative w-full min-h-[100vh] flex flex-col py-section-v-padding z-30 transition-colors duration-1000"
        id="act-3"
      >
        <div className="w-full max-w-content-max-width mx-auto px-gutter mb-8 act-3-header">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-sandstone max-w-4xl act-3-heading">
            But at the end of the day books, movies & video games <span className="text-warm-umber">are my escape</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-warm-umber mt-4 md:mt-6 mb-6"></div>
          <p className="font-label-mono text-sandstone/70 max-w-2xl text-sm leading-relaxed">
            The narratives, architectures, and worlds within these pieces of media deeply influence how I approach building digital experiences and solving complex problems.
          </p>
        </div>

        {/* Media Marquees */}
        <div className="w-full flex flex-col gap-8 overflow-hidden relative z-10 py-8 marquee-container marquee-mask bg-pitch-black border-y border-warm-umber/30">

          {/* Row 1: Books (Scroll Left) */}
          <div className="flex w-max whitespace-nowrap animate-marquee-left marquee-speed-1">
            {[...Array(6)].map((_, i) => (
              <div key={`books-${i}`} className="flex gap-3 md:gap-6 px-2 md:px-3 min-w-max">
                {books.map((book, idx) => (
                  <div key={`book-${i}-${idx}`} className="group relative w-48 h-72 flex-shrink-0 cursor-pointer marquee-card">
                    <Image src={book.img} alt={book.title} fill sizes="(max-width: 767px) 128px, 192px" className="object-cover rounded-sm transition-all duration-500 border border-warm-umber/30" />
                    <div className="absolute inset-0 bg-pitch-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-sm marquee-overlay">
                      <span className="font-label-mono text-sandstone text-center text-sm break-words whitespace-normal">{book.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Row 2: Games & Movies (Scroll Right) */}
          <div className="flex w-max whitespace-nowrap animate-marquee-right marquee-speed-2">
            {[...Array(6)].map((_, i) => (
              <div key={`games-movies-${i}`} className="flex gap-3 md:gap-6 px-2 md:px-3 min-w-max">
                {[...games, ...movies].map((item, idx) => (
                  <div key={`item-${i}-${idx}`} className="group relative w-48 h-72 flex-shrink-0 cursor-pointer marquee-card">
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 767px) 128px, 192px" className="object-cover rounded-sm transition-all duration-500 border border-warm-umber/30" />
                    <div className="absolute inset-0 bg-pitch-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-sm z-20 marquee-overlay">
                      <span className="font-label-mono text-sandstone text-center text-sm break-words whitespace-normal">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>




        </div>
      </section>

      {/* Footer */}
      <footer className="w-full h-auto py-12 bg-tertiary dark:bg-surface border-t border-outline-variant dark:border-outline relative z-40">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-content-max-width mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm text-center md:text-left font-label-mono leading-relaxed">
              Want more info? Please reach out.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 font-label-mono text-label-mono">
            <a
              className="text-on-tertiary-container dark:text-on-surface-variant transition-transform duration-300 cursor-pointer active:opacity-70 flex items-center gap-2 footer-link"
              href="https://github.com/BibeshT-TXST"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GITHUB</span>
            </a>
            <a
              className="text-on-tertiary-container dark:text-on-surface-variant transition-transform duration-300 cursor-pointer active:opacity-70 flex items-center gap-2 footer-link"
              href="https://www.linkedin.com/in/bibesh-timalsina-a7a9482b9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LINKEDIN</span>
            </a>
            <a
              className="text-on-tertiary-container dark:text-on-surface-variant transition-transform duration-300 cursor-pointer active:opacity-70 flex items-center gap-2 footer-link"
              href="mailto:timaslinabibesh747@gmail.com"
            >
              <span>GMAIL</span>
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}