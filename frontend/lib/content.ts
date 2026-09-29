// Single source of truth for site copy. Edit here, not in components.

export const profile = {
  name: "Bibesh Timalsina",
  role: "Software Engineer",
  location: "San Marcos, Texas",
  email: "timalsinabibesh747@gmail.com",
  headline: "I build systems at work and train models at home.",
  summary:
    "Computer Science and Data Analytics student at Texas State. On the University Libraries systems team I ship backend services, CI/CD pipelines and secure auth used by real staff every day.",
  availability: "Open to internships and relocation",
  links: {
    github: "https://github.com/BibeshT-TXST",
    linkedin: "https://www.linkedin.com/in/bibesh-timalsina-a7a9482b9/",
    blog: "https://darkmatterstech.blogspot.com/",
    source: "https://github.com/BibeshT-TXST/Personal_Website_FullStack-CICD-SandBox",
  },
} as const

export const stats = [
  { value: 0.857, decimals: 3, prefix: "κ ", suffix: "", label: "SightX model accuracy (quadratic kappa)" },
  { value: 35, decimals: 0, prefix: "", suffix: "K", label: "Retinal images trained on, zero cloud compute" },
  { value: 100, decimals: 0, prefix: "", suffix: "+", label: "Library staff using software I help build" },
  { value: 700, decimals: 0, prefix: "", suffix: "+", label: "Students coached on research" },
] as const

export type Role = {
  title: string
  org: string
  place: string
  period: string
  points: string[]
  stack?: string[]
}

export const experience: Role[] = [
  {
    title: "Systems Support Assistant",
    org: "Texas State University Libraries",
    place: "San Marcos, TX",
    period: "Dec 2025 — Present",
    points: [
      "Build OpenAPI specs, controllers and services with two senior engineers for the Libraries Travel App, used by 100+ staff. Requests now process ~30% faster.",
      "Rebuilt a legacy inventory tool as a 4-container app (Nginx, Next.js, Flask, PostgreSQL) behind TXST SSO, shipped to RHEL via GitHub Actions.",
      "Designed a reusable JWT cookie auth system with a Next.js proxy and Argon2 hashing, now used across 3 projects.",
      "Traced a live data-duplication bug in a Flask backend and fixed it with WHERE NOT EXISTS subqueries.",
    ],
    stack: ["TypeScript", "Next.js", "Flask", "PostgreSQL", "Docker", "Nginx", "GitHub Actions", "RHEL"],
  },
  {
    title: "STEM Research Coach",
    org: "Texas State University Libraries",
    place: "San Marcos, TX",
    period: "Feb 2024 — Dec 2025",
    points: [
      "Coached 700+ undergraduates on database search strategy and finding peer-reviewed literature.",
      "Advised three graduate students on machine learning research projects.",
      "Co-authored the Research Coach FAQ in the Libraries CMS.",
    ],
  },
  {
    title: "IT Support & Web Developer",
    org: "Association of Statistics & Analytics",
    place: "Volunteer",
    period: "Aug 2026 — Present",
    points: [
      "Primary developer of the club's public site: Next.js, React 19, shadcn/ui and Framer Motion.",
      "Set up CI/CD with separate dev and production deployments on Vercel and GitHub Pages.",
    ],
  },
]

export type Project = {
  name: string
  tagline: string
  period: string
  status?: string
  points: string[]
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    name: "SightX",
    tagline: "Diabetic retinopathy screening, from model to deployed clinical tool.",
    period: "Feb 2026 — Present",
    status: "Migrating to AWS",
    points: [
      "Trained a ResNet-50 classifier on 35K retinal images to κ = 0.857 on an Apple M4 laptop.",
      "108-pass test-time augmentation and a cost matrix that penalizes missed diagnoses.",
      "3-container stack (React, Node.js, FastAPI) on RHEL; moving to CloudFront, Lambda, SQS and RDS.",
    ],
    stack: ["PyTorch", "FastAPI", "React", "Node.js", "Docker", "AWS"],
    links: [
      { label: "GitHub", href: "https://github.com/BibeshT-TXST/SightX" },
      { label: "Build log", href: "https://darkmatterstech.blogspot.com/" },
    ],
  },
  {
    name: "ScrubX",
    tagline: "A security gateway that lets clinical apps use LLMs without leaking patient data.",
    period: "Jul 2026 — Present",
    status: "In progress",
    points: [
      "Tokenizes sensitive patient details before a prompt reaches the model, restores them on the way back.",
      "Staged pipeline — normalize, detect, decide, tokenize, call, restore — with an off-path audit trail.",
    ],
    stack: ["Python", "LLMs", "Security", "Healthcare"],
    links: [{ label: "GitHub", href: "https://github.com/BibeshT-TXST/ScrubX" }],
  },
  {
    name: "GitGud",
    tagline: "A containerized inventory platform with hardened auth.",
    period: "Dec 2025 — Apr 2026",
    points: [
      "Nginx, Node.js and PostgreSQL containers with a load balancer across stateless replicas.",
      "Argon2 + pepper, JWT auth and a token blacklist against brute-force and token reuse.",
      "Jest tests run in GitHub Actions on every pull request.",
    ],
    stack: ["Node.js", "PostgreSQL", "Nginx", "Docker", "MUI"],
    links: [{ label: "GitHub", href: "https://github.com/BibeshT-TXST/Project_GitGud" }],
  },
  {
    name: "Lets Build Us",
    tagline: "A 60-second wellness app built at a hackathon, powered by Gemini.",
    period: "Mar 2026",
    points: ["No logins, instant value: reflections mapped to real-time wellness interventions."],
    stack: ["JavaScript", "Gemini", "React"],
    links: [{ label: "GitHub", href: "https://github.com/BibeshT-TXST/NH2026" }],
  },
]

export const writing = [
  {
    title: "LLM Gateway: Day 1",
    date: "Jul 25, 2026",
    href: "https://darkmatterstech.blogspot.com/2026/07/llm-gateway-blog-day-1.html",
  },
  {
    title: "SightX V2: A New Hope",
    date: "May 25, 2026",
    href: "https://darkmatterstech.blogspot.com/2026/05/sightx-v2-new-hope.html",
  },
  {
    title: "SightX: We Shipped It",
    date: "Apr 7, 2026",
    href: "https://darkmatterstech.blogspot.com/2026/04/sightx-we-shipped-it-journey-comes-to.html",
  },
  {
    title: "Trained My First AI Model on a Laptop",
    date: "Mar 5, 2026",
    href: "https://darkmatterstech.blogspot.com/2026/03/sightx-i-trained-my-first-ai-model-on.html",
  },
]

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "SQL", "C++"] },
  { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Flask", "FastAPI", "OpenAPI"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Supabase", "Vector DBs"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "Nginx", "GitHub Actions", "RHEL", "Vercel"] },
  { group: "AI / ML", items: ["PyTorch", "Transfer learning", "RAG", "Evaluations", "MCP"] },
]

export const education = {
  school: "Texas State University",
  degree: "B.S. Computer Science and Data Analytics",
  period: "Jan 2024 — Dec 2027",
  coursework:
    "Software Engineering, Algorithms, Machine Learning, Artificial Intelligence, Computer Systems Security, Parallel Programming",
}
