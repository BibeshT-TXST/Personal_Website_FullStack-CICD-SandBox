"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const githubGridRef = useRef<HTMLDivElement>(null);

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

    // Act 2 Animations
    const act2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#act-2",
        start: "top 60%",
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
          ".act-2-content > :not(.terminal-type-act2)",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        )
        .fromTo(
          ".act-2-visual",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
          "-=1"
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

    // Generate GitHub Grid Squares
    if (githubGridRef.current && githubGridRef.current.children.length === 0) {
      const numSquares = 40;
      for (let i = 0; i < numSquares; i++) {
        const square = document.createElement("div");
        square.className = "github-square absolute";

        // Random positioning around the center Buddha
        const radius = 100 + Math.random() * 150;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        square.style.left = `calc(50% + ${x}px)`;
        square.style.top = `calc(50% + ${y}px)`;

        // Randomly vary color slightly (greens)
        const opacities = ["0.4", "0.6", "0.8", "1"];
        square.style.backgroundColor = `rgba(57, 211, 83, ${opacities[Math.floor(Math.random() * opacities.length)]
          })`;

        githubGridRef.current.appendChild(square);
      }
    }

    // Animate GitHub Squares locking in
    gsap.to(".github-square", {
      scrollTrigger: {
        trigger: "#act-2",
        start: "top center",
        end: "center center",
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      stagger: {
        amount: 1,
        from: "random",
      },
      ease: "power1.inOut",
    });

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
        <div className="absolute inset-0 z-0 opacity-50"></div>
        <div className="relative z-10 w-full max-w-content-max-width mx-auto px-gutter text-center flex flex-col items-center justify-center gap-narrative-gap">
          <h1
            className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary act-1-text font-label-mono terminal-type"
            data-text="> sudo init curiosity"
          ></h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant act-1-text max-w-2xl font-label-mono text-label-mono uppercase tracking-widest mt-8">
            To understand the whole, you must dismantle the parts.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
          <span className="font-label-mono text-label-mono text-on-surface-variant tracking-widest uppercase text-[10px]">
            Descend
          </span>
          <span className="material-symbols-outlined text-outline">arrow_downward</span>
        </div>
      </section>

      {/* Act II: The Discipline */}
      <section
        className="relative w-full min-h-[100vh] flex flex-col justify-center py-section-v-padding overflow-hidden z-20"
        id="act-2"
      >
        {/* Technical Overlay Background */}
        <div className="terminal-overlay top-20 left-10 hidden md:block">
          {`import sys\ndef modular_rhythm():\n    while True:\n        commit(code)\n        optimize(mind)\n        recover()`}
        </div>
        <div className="terminal-overlay bottom-20 right-10 hidden md:block text-right">
          {`const stack = new Set();\nstack.add('C++');\nstack.add('Python');\nstack.add('JavaScript');\nstack.add('SQL');`}
        </div>

        {/* Structural Outlines / Blueprint feel */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 md:grid-cols-12 gap-gutter px-gutter max-w-content-max-width mx-auto opacity-10">
          <div className="col-span-1 border-r border-warm-umber h-full"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
          <div className="col-span-1 border-r border-warm-umber h-full hidden md:block"></div>
        </div>

        <div className="w-full max-w-content-max-width mx-auto px-gutter grid grid-cols-4 md:grid-cols-12 gap-gutter items-center relative z-10">
          {/* Left Content */}
          <div className="col-span-4 md:col-span-4 flex flex-col gap-8 order-2 md:order-1 act-2-content">
            <h2
              className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-sandstone font-label-mono text-[32px] terminal-type-act2"
              data-text="Growth requires absolute stillness."
            ></h2>
            <div className="w-full h-px bg-warm-umber my-4"></div>
            <p className="font-label-mono text-label-mono text-on-secondary-container leading-relaxed">
              One atomic commit.<br />
              One heavy evening repetition.<br />
              One clean, plant-based recovery.<br />
              Progress is a daily, modular rhythm.
            </p>
            <div className="mt-8 border border-warm-umber p-4 bg-black/30">
              <h3 className="font-label-mono text-sandstone text-sm mb-4 border-b border-warm-umber/50 pb-2">
                {"> dev_stack.env"}
              </h3>
              <ul className="font-label-mono text-label-mono text-on-secondary-container space-y-2">
                <li>
                  <span className="text-secondary">LANGS=</span>[Python, JavaScript, C++, SQL]
                </li>
                <li>
                  <span className="text-secondary">TOOLS=</span>[Docker, Git, Linux, Vim]
                </li>
                <li>
                  <span className="text-secondary">STATE=</span>Continuous_Integration
                </li>
              </ul>
            </div>
          </div>

          {/* Center Visual (Buddha & Grid) */}
          <div className="col-span-4 md:col-span-4 relative flex justify-center items-center order-1 md:order-2 h-[60vh] md:h-auto my-12 md:my-0 act-2-visual">
            <div className="absolute inset-0 bg-deep-espresso blur-[40px] z-0 rounded-full scale-150 opacity-50"></div>
            <div className="relative z-10 p-2 border border-warm-umber bg-deep-espresso">
              <img
                alt="Buddha Statue"
                className="w-full max-w-[280px] object-cover mix-blend-luminosity opacity-80 filter contrast-125"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKMajJYx845Kf6fKE4U9y-h4SWYB75gTynR_1gWuzOexyQ7MW2MMjhddXeLBewBesf5-XnuaY4Os_JPRJrURPMK8jWJfixYBGwQjEwBKqBqKNu3hb6T12IwezwpNSkrHI0o31EJnF5LTYzTpUaULhcgG5eYEKPN_YsdNmG9qUvXwIQpnkTjTw3yyGHVnloLpkCMNMpCy03PyqHQQUIhO_9p_WLdLq-ddygl-wYN7B9RJVuBt5dffx-"
              />
            </div>
            {/* Cascading GitHub Squares */}
            <div
              className="absolute inset-0 z-20 flex justify-center items-center pointer-events-none mix-blend-screen"
              id="github-grid"
              ref={githubGridRef}
            ></div>
          </div>

          {/* Right Empty Space */}
          <div className="col-span-4 md:col-span-4 hidden md:block order-3"></div>
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