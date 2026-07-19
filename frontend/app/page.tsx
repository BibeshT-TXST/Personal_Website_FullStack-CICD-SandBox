"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const act1Slides = [
  { type: 'image', src: '/ME.jpg', text: '...a Traveler & Explorer' },
  { type: 'image', src: '/Work.jpg', text: '...a Developer who loves GitHub & Teamwork' },
  { type: 'image', src: '/Belief_Books.jpg', text: '...a Reader of Books, Old & New.' },
  { type: 'image', src: '/Boyz.jpg', text: '...someone who believes friendship is everything.' },
  { type: 'video', src: '/IMG_9265.mov', text: '...a Videographer' },
  { type: 'video', src: '/Window.mov', text: '...and I believe every tool has its purpose.' },
];
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAct1Slide, setCurrentAct1Slide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentAct1Slide((prev) => (prev + 1) % act1Slides.length);
    }, 3500);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Progress Pip Animation
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = window.scrollY / scrollTotal;
      const pip = document.getElementById("progress-pip");
      if (pip) {
        // Max movement distance based on container height (300) minus pip height (40)
        const maxTranslate = 300 - 40;
        pip.style.top = `${scrollPercent * maxTranslate}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);

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
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative w-full" ref={containerRef}>
      {/* Vertical Progress Indicator */}
      <div className="progress-indicator hidden md:block">
        <div className="progress-pip" id="progress-pip"></div>
      </div>

      {/* Act I: The Explorer */}
      <section
        className="relative w-full h-[100vh] flex flex-col justify-center items-center overflow-hidden"
        id="act-1"
      >
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          {act1Slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentAct1Slide ? "opacity-50" : "opacity-0"
                }`}
            >
              {slide.type === 'image' ? (
                <img src={slide.src} alt="Background slide" className="w-full h-full object-cover" />
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
            className="font-display-xl text-display-xl text-primary act-1-text font-label-mono terminal-type -translate-y-12 md:-translate-y-20"
            data-text="Hello, I am Bibesh"
          ></h1>
          <div className="relative w-full max-w-2xl mt-8 h-[140px] md:h-[100px] flex items-center justify-center mx-auto act-1-text">
            {act1Slides.map((slide, index) => (
              <p
                key={index}
                className={`absolute inset-0 font-body-lg text-body-lg text-on-surface-variant font-label-mono text-label-mono uppercase tracking-widest flex items-center justify-center transition-opacity duration-1000 ${index === currentAct1Slide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
              >
                <span className="bg-black/60 md:bg-black/40 p-4 md:p-6 rounded-lg backdrop-blur-md border border-warm-umber/20">
                  {slide.text}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
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
              <h3 className="font-label-mono text-deep-espresso uppercase tracking-widest text-lg mb-4">Work</h3>

              {/* Bento Box 1 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.03] hover:bg-[#d5d0bc] overflow-hidden group hover:border-pitch-black rounded-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black">Full-Stack Dev, Student Worker</h4>
                    <span className="font-label-mono text-xs text-deep-espresso whitespace-nowrap bg-pitch-black/10 px-2 py-1 rounded">Dec 2025 - Present</span>
                  </div>
                  <p className="font-label-mono text-sm text-deep-espresso mb-4">Texas State University Libraries</p>

                  {/* Expanded details */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
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
                </div>
              </div>

              {/* Bento Box 2 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.03] hover:bg-[#d5d0bc] overflow-hidden group hover:border-pitch-black rounded-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black">QA Automation Intern</h4>
                    <span className="font-label-mono text-xs text-deep-espresso whitespace-nowrap bg-pitch-black/10 px-2 py-1 rounded">Dec 2024 - Apr 2025</span>
                  </div>
                  <p className="font-label-mono text-sm text-deep-espresso mb-4">MySQUEGG</p>

                  {/* Expanded details */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Built 12 unit tests using JavaScript, WebDriverIO, and Appium server; used Android Studio to validate UI functionality, identifying 31 bugs across 2 mobile applications.</li>
                        <li>Flagged 37 missing accessibility identifiers through automated testing.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Box 3 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.03] hover:bg-[#d5d0bc] overflow-hidden group hover:border-pitch-black rounded-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black">STEM Research Coach</h4>
                    <span className="font-label-mono text-xs text-deep-espresso whitespace-nowrap bg-pitch-black/10 px-2 py-1 rounded">Feb 2024 - Dec 2025</span>
                  </div>
                  <p className="font-label-mono text-sm text-deep-espresso mb-4">Texas State University Libraries</p>

                  {/* Expanded details */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Coached 700+ undergraduate students on research techniques and finding relevant research papers.</li>
                        <li>Co-developed a structured Research Coach FAQ with 3 colleagues using Texas State University's CMS.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: Projects */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-0">
              <h3 className="font-label-mono text-deep-espresso uppercase tracking-widest text-lg mb-4">Projects</h3>

              {/* Project Bento Box 1 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.03] hover:bg-[#d5d0bc] overflow-hidden group hover:border-pitch-black rounded-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black">SightX: Diabetic Retinopathy Detection System</h4>
                    <span className="font-label-mono text-xs text-deep-espresso whitespace-nowrap bg-pitch-black/10 px-2 py-1 rounded">Feb 2026 - Present</span>
                  </div>
                  <div className="font-label-mono text-sm text-deep-espresso mb-4 flex flex-col gap-2">
                    <p>Computer Vision, Machine Learning, Fullstack & Cloud</p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://github.com/BibeshT-TXST/SightX" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-deep-espresso text-sandstone font-bold rounded hover:bg-[#238636] hover:text-white transition-colors duration-300 text-xs tracking-wider">GitHub</a>
                      <a href="https://darkmatterstech.blogspot.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-warm-umber text-sandstone font-bold rounded hover:bg-[#B32821] hover:text-white transition-colors duration-300 text-xs tracking-wider">Blog</a>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
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
                </div>
              </div>

              {/* Project Bento Box 2 */}
              <div className="relative w-full h-[140px] md:h-[160px] bento-box opacity-0 hover:z-50">
                <div className="absolute top-0 left-0 w-full min-h-full bg-sandstone border border-pitch-black p-6 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.03] hover:bg-[#d5d0bc] overflow-hidden group hover:border-pitch-black rounded-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-display-sm text-pitch-black">Personal Website Sandbox</h4>
                    <span className="font-label-mono text-xs text-deep-espresso whitespace-nowrap bg-pitch-black/10 px-2 py-1 rounded">2026 - Present</span>
                  </div>
                  <div className="font-label-mono text-sm text-deep-espresso mb-4 flex flex-col gap-2">
                    <p>Frontend & CI/CD Sandbox</p>
                    <div className="flex gap-3 mt-1">
                      <a href="https://github.com/BibeshT-TXST/Personal_Website_FullStack-CICD-SandBox" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-deep-espresso text-sandstone font-bold rounded hover:bg-[#238636] hover:text-white transition-colors duration-300 text-xs tracking-wider w-max">GitHub</a>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="font-label-mono text-sm leading-relaxed text-deep-espresso/80 space-y-3 list-disc pl-4 mt-2">
                        <li>Developing a digital portfolio that serves as an active engineering sandbox to experiment with modern frontend architectures.</li>
                        <li>Exploring advanced UI/UX concepts, including scroll-driven narratives and dynamic grid layouts, to craft a unique and engaging user experience.</li>
                        <li>Establishing continuous integration and deployment workflows to create a reliable foundation for rapid, ongoing feature iteration.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Machine Room: System Architecture */}
      <section
        className="relative w-full min-h-[100vh] flex flex-col justify-center py-section-v-padding z-25 bg-pitch-black border-y border-warm-umber/30"
        id="machine-room"
      >
        <div className="w-full max-w-content-max-width mx-auto px-gutter">
          <div className="machine-header mb-16">
            <h2 className="font-label-mono text-sandstone text-[24px] cursor-blink">
              {"> cd /machine_room/architecture"}
            </h2>
            <div className="w-full h-px bg-warm-umber/30 mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 machine-content">
            <div>
              <h3 className="font-headline-lg-mobile text-sandstone mb-6">Complexity Analysis</h3>
              <p className="font-label-mono text-label-mono text-on-secondary-container leading-relaxed mb-6">
                Before writing a line of code, the system must be dismantled into its theoretical constraints. Big O is not just for interviews; it dictates the scalable bounds of reality.
              </p>
              <div className="bg-deep-espresso border border-warm-umber p-6 font-label-mono text-sm text-sandstone/80">
                Time Complexity: O(log n)<br />
                Space Complexity: O(1)<br />
                Objective: Optimal Resource Allocation
              </div>
            </div>
            <div>
              <h3 className="font-headline-lg-mobile text-sandstone mb-6">First Principles</h3>
              <p className="font-label-mono text-label-mono text-on-secondary-container leading-relaxed mb-6">
                Assuming nothing. Building from the ground up. Whether it's designing a database schema or structuring an API, stripping away the dogma reveals the most efficient path forward.
              </p>
              <ul className="font-label-mono text-label-mono text-on-secondary-container space-y-4 list-disc pl-4">
                <li>Identify the core problem.</li>
                <li>Break it down to fundamental truths.</li>
                <li>Construct the solution modularly.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Act III: The Impact */}
      <section
        className="relative w-full min-h-[100vh] flex flex-col py-section-v-padding z-30 transition-colors duration-1000"
        id="act-3"
      >
        <div className="w-full max-w-content-max-width mx-auto px-gutter mb-24 act-3-header">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-deep-espresso max-w-4xl">
            Discipline builds the foundation.<br />
            <span className="text-warm-umber">Empathy builds the impact.</span>
          </h2>
          <div className="w-24 h-1 bg-deep-espresso mt-8"></div>
        </div>

        <div className="w-full max-w-content-max-width mx-auto px-gutter grid grid-cols-4 md:grid-cols-12 gap-6 relative z-10">
          <div className="col-span-4 md:col-span-7 bg-sandstone border border-pitch-black p-8 md:p-12 act-3-card hover:bg-[#d5d0bc] transition-colors duration-500 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 font-label-mono text-label-mono text-warm-umber">01</div>
            <div className="flex flex-col h-full justify-between gap-12">
              <div>
                <h3 className="font-display-xl-mobile md:font-display-xl-mobile text-display-xl-mobile md:text-display-xl-mobile text-pitch-black tracking-tight mb-4">SightX</h3>
                <p className="font-body-md text-body-md text-on-secondary-fixed-variant mb-4">
                  Automated market research platform utilizing advanced NLP and statistical analysis to uncover consumer insights instantly.
                </p>
                <div className="font-label-mono text-xs text-deep-espresso/80 bg-warm-umber/10 p-3 rounded inline-block">
                  {"> Performance: 98% accuracy on validation set"}
                </div>
              </div>
              <div className="flex items-center gap-4 font-label-mono text-label-mono text-pitch-black group-hover:translate-x-2 transition-transform duration-300">
                <span>VIEW ARCHITECTURE</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-5 bg-sandstone border border-pitch-black p-8 md:p-12 act-3-card hover:bg-[#d5d0bc] transition-colors duration-500 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 font-label-mono text-label-mono text-warm-umber">02</div>
            <div className="flex flex-col h-full justify-between gap-12">
              <div>
                <h3 className="font-display-xl-mobile md:font-display-xl-mobile text-display-xl-mobile md:text-display-xl-mobile text-pitch-black tracking-tight mb-4">Libraries</h3>
                <p className="font-body-md text-body-md text-on-secondary-fixed-variant mb-4">
                  Digital archiving and retrieval systems for extensive university library networks.
                </p>
                <div className="font-label-mono text-xs text-deep-espresso/80 bg-warm-umber/10 p-3 rounded inline-block">
                  {"> Patch: Resolved critical data-integrity vulnerability in legacy indexers"}
                </div>
              </div>
              <div className="flex items-center gap-4 font-label-mono text-label-mono text-pitch-black group-hover:translate-x-2 transition-transform duration-300">
                <span>VIEW SYSTEM</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-12 bg-pitch-black border border-pitch-black p-8 md:p-12 act-3-card hover:bg-surface-dim transition-colors duration-500 group cursor-pointer relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-6">
            <div className="absolute top-0 right-0 p-6 font-label-mono text-label-mono text-warm-umber">03</div>
            <div className="max-w-2xl">
              <h3 className="font-display-xl-mobile md:font-display-xl-mobile text-display-xl-mobile md:text-display-xl-mobile text-sandstone tracking-tight mb-4">RescueOps</h3>
              <p className="font-body-md text-body-md text-outline">
                Real-time coordination and logistics platform for emergency response and rescue operations.
              </p>
            </div>
            <button className="bg-sandstone text-pitch-black font-label-mono text-label-mono px-8 py-4 rounded-none hover:bg-secondary transition-colors duration-300 flex items-center gap-2">
              <span>EXPLORE CASE STUDY</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full h-auto py-12 bg-tertiary dark:bg-surface border-t border-outline-variant dark:border-outline relative z-40">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-content-max-width mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-label-caps text-label-caps text-on-surface dark:text-on-background">
              © 2024 ARCHITECT OF DISCOVERY
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm text-center md:text-left mt-2 font-label-mono">
              Hi, I'm Bibesh Timalsina.<br />I build systems from first principles.
            </p>
          </div>
          <nav className="flex gap-8 font-label-mono text-label-mono">
            <a
              className="text-on-tertiary-container dark:text-on-surface-variant hover:translate-x-2 transition-transform duration-300 cursor-pointer active:opacity-70 flex items-center gap-2"
              href="https://github.com/BibeshT-TXST"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GITHUB</span>
            </a>
            <a
              className="text-on-tertiary-container dark:text-on-surface-variant hover:translate-x-2 transition-transform duration-300 cursor-pointer active:opacity-70 flex items-center gap-2"
              href="https://www.linkedin.com/in/bibesh-timalsina-a7a9482b9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LINKEDIN</span>
            </a>
            <a
              className="text-on-tertiary-container dark:text-on-surface-variant hover:translate-x-2 transition-transform duration-300 cursor-pointer active:opacity-70 flex items-center gap-2"
              href="#"
            >
              <span>CONTACT</span>
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}