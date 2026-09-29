import type { VisualKind } from "@/components/visuals"

// Single source of truth for site copy. Edit here, not in components.
// House style: first person, short paragraphs, no em dashes, no arrows.

export const profile = {
  name: "Bibesh Timalsina",
  role: "Software Engineer",
  location: "San Marcos, Texas",
  email: "timalsinabibesh747@gmail.com",
  resume: "/Bibesh-Timalsina-Resume.pdf",
  links: {
    github: "https://github.com/BibeshT-TXST",
    linkedin: "https://www.linkedin.com/in/bibesh-timalsina-a7a9482b9/",
    blog: "https://darkmatterstech.blogspot.com/",
    source: "https://github.com/BibeshT-TXST/Personal_Website_FullStack-CICD-SandBox",
  },
} as const

export const hero = {
  focus: ["Healthcare", "AI", "Cloud", "Security"] as string[],
  greeting: "Hi, I'm Bibesh.",
  headline: "I like the parts of software nobody notices until they break",
  intro:
    "I study Computer Science and Data Analytics at Texas State as a first generation college student. I spend my days on the university library's systems team and my nights teaching models to see. Lately both have pulled me toward healthcare, AI and the cloud, with security built in.",
  meta: "San Marcos, Texas",
}

export const chapters = {
  day: {
    label: "By day",
    where: "Systems team, Texas State University Libraries",
    since: "Since Dec 2025",
    body: [
      "I work alongside two senior engineers on the tools the library runs on. My first real assignment was the backend for a travel request app that more than a hundred staff now use, and it cut their wait by about a third.",
      "Since then I've rebuilt an aging inventory tool into a proper web app behind campus sign on, and written the login system three of our projects now share. My favorite afternoon so far was chasing duplicate records through a live database until one query gave itself away.",
    ],
  },
  night: {
    label: "By night",
    where: "Personal projects and a build blog",
    since: "Always",
    body: [
      "At home I get to be a researcher. I trained an eye disease classifier on my own laptop without renting a single GPU, turned it into a working screening app, and I'm now rebuilding it on AWS one service at a time.",
      "I write about every step, including the ones that failed. Those tend to be the most useful posts.",
    ],
  },
  before:
    "Before this I spent two years as a STEM research coach at the library, helping more than 700 students find sources worth trusting. It taught me to explain hard things simply, which I still lean on every time I open a pull request. These days I also look after the website for my campus statistics club.",
}

export type Project = {
  name: string
  visual?: VisualKind
  kind: string
  status: string
  summary: string
  detail: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    name: "SightX",
    visual: "retina",
    kind: "Healthcare · Computer vision",
    status: "Live, moving to AWS",
    summary:
      "Diabetic retinopathy can take someone's sight before they notice a single symptom. SightX is my attempt at an early warning: upload a photo of the retina and get a screening result a clinician can act on.",
    detail:
      "I trained the model on 35,000 retinal images on an M4 MacBook. A missed diagnosis costs more than a false alarm, so every prediction runs through 108 augmented passes and a cost matrix that leans toward caution.",
    stack: ["PyTorch", "FastAPI", "React", "Node.js", "Docker", "AWS"],
    links: [
      { label: "View the code", href: "https://github.com/BibeshT-TXST/SightX" },
      { label: "Read the build log", href: "https://darkmatterstech.blogspot.com/" },
    ],
  },
  {
    name: "ScrubX",
    visual: "pipeline",
    kind: "Healthcare · AI security",
    status: "In progress",
    summary:
      "Hospitals want to use large language models, but patient data can't leave the building. ScrubX sits in the middle and swaps sensitive details for tokens before a prompt goes out, then puts them back when the answer returns.",
    detail:
      "Every request leaves an audit trail and anything risky is stopped at the gate. Each stage is its own module, so any piece can be swapped out without touching the rest.",
    stack: ["Python", "LLMs", "Privacy", "Audit logging"],
    links: [{ label: "View the code", href: "https://github.com/BibeshT-TXST/ScrubX" }],
  },
  {
    name: "GitGud",
    visual: "cluster",
    kind: "Full stack · Security",
    status: "Completed",
    summary:
      "My onboarding project on the systems team, and the place I learned to take security personally.",
    detail:
      "A book inventory platform split into three containers behind a load balancer, with peppered password hashing, signed tokens and a blacklist for stolen ones. Tests run on every pull request before anything reaches main.",
    stack: ["Node.js", "PostgreSQL", "Nginx", "Docker", "Material UI"],
    links: [{ label: "View the code", href: "https://github.com/BibeshT-TXST/Project_GitGud" }],
  },
  {
    name: "Lets Build Us",
    visual: "breath",
    kind: "Hackathon · Wellness",
    status: "Hackathon build",
    summary: "A wellness app built around one question: can we help someone feel better in sixty seconds, no account required?",
    detail:
      "Built with my team over a hackathon weekend. Gemini reads a short reflection and matches it with a small, real thing you can do right now.",
    stack: ["JavaScript", "React", "Gemini"],
    links: [{ label: "View the code", href: "https://github.com/BibeshT-TXST/NH2026" }],
  },
]

export const writing = {
  intro: "I keep a build log called Dark Matters Tech. It's where the experiments go, especially the failed ones.",
  posts: [
    {
      title: "SightX V2: A New Hope",
      date: "May 2026",
      href: "https://darkmatterstech.blogspot.com/2026/05/sightx-v2-new-hope.html",
    },
    {
      title: "We shipped it",
      date: "Apr 2026",
      href: "https://darkmatterstech.blogspot.com/2026/04/sightx-we-shipped-it-journey-comes-to.html",
    },
    {
      title: "Training my first model on a laptop",
      date: "Mar 2026",
      href: "https://darkmatterstech.blogspot.com/2026/03/sightx-i-trained-my-first-ai-model-on.html",
    },
    {
      title: "Freezing layers and the 65% paradox",
      date: "Mar 2026",
      href: "https://darkmatterstech.blogspot.com/2026/03/sightx-architecture-assembly-freezing.html",
    },
  ],
}

export const about = {
  values: ["Honor", "Authenticity", "Consistency"],
  body: [
    "Those three words sit at the top of my GitHub, and they're the standard I try to hold my work to. I would rather ship something small and solid than something big and fragile, then come back to redesign, rethink and refine it.",
    "Away from the keyboard I'm usually outside, somewhere old and quiet: a temple, a trail, a tree that has been standing for centuries. The line in my Instagram bio says it better than I can. Seek the temple within.",
  ],
  education: "B.S. Computer Science and Data Analytics, Texas State University, class of 2027",
  toolbox: "Python, TypeScript, SQL, React, Next.js, Node.js, Flask, FastAPI, PostgreSQL, Docker, AWS, PyTorch",
}

export const contact = {
  heading: "Have something worth building?",
  body: "I'm looking for early career roles, and I'm always up for a team project or a hackathon. Email is the fastest way to reach me.",
}
