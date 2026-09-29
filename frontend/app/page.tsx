import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import { ArrowRightIcon, ArrowUpRightIcon, MailIcon, MapPinIcon } from "lucide-react"

import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { CountUp, Reveal } from "@/components/motion"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { education, experience, profile, projects, skills, stats, writing } from "@/lib/content"
import headshot from "@/public/headshot.jpg"

// Résumé link appears only once public/Resume.pdf is added.
const hasResume = fs.existsSync(path.join(process.cwd(), "public", "Resume.pdf"))
const resumeHref = hasResume ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Resume.pdf` : undefined

const container = "mx-auto max-w-5xl px-5 sm:px-8"

export default function Home() {
  return (
    <>
      <SiteHeader resumeHref={resumeHref} />
      <main id="top">
        <Hero />
        <Stats />
        <Section id="experience" label="Experience">
          <Experience />
        </Section>
        <Section id="projects" label="Projects">
          <Projects />
        </Section>
        <Section id="writing" label="Writing">
          <Writing />
        </Section>
        <Section id="about" label="About">
          <About />
        </Section>
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function Hero() {
  return (
    <section className={`${container} pt-10 pb-16 md:pt-20 md:pb-24`}>
      <div className="grid items-end gap-10 md:grid-cols-[1fr_300px] md:gap-16 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </p>
          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="h-11 rounded-full px-5 text-[15px]">
              <a href="#projects">
                View projects <ArrowRightIcon />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full px-5 text-[15px]">
              <a href={`mailto:${profile.email}`}>Get in touch</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4" /> {profile.location}
            </span>
            <a href={profile.links.github} className="transition-colors hover:text-foreground" aria-label="GitHub">
              <GitHubIcon className="size-[18px]" />
            </a>
            <a href={profile.links.linkedin} className="transition-colors hover:text-foreground" aria-label="LinkedIn">
              <LinkedInIcon className="size-[18px]" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Image
            src={headshot}
            alt={`Portrait of ${profile.name}`}
            priority
            placeholder="blur"
            sizes="(min-width: 768px) 340px, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover object-[50%_40%] md:aspect-[4/5]"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y bg-muted/50">
      <dl className={`${container} grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4 md:py-12`}>
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight md:text-4xl">
              <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dd aria-hidden className="mt-1.5 text-sm leading-snug text-muted-foreground">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${container} py-14 md:py-20`}>
      <div className="grid gap-8 md:grid-cols-[180px_1fr] md:gap-12">
        <h2 className="text-sm font-medium text-muted-foreground md:pt-1.5">{label}</h2>
        <div>{children}</div>
      </div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((p) => (
        <li key={p} className="relative pl-5 leading-relaxed text-foreground/85">
          <span className="absolute top-[0.7em] left-0 h-px w-2.5 bg-foreground/40" />
          {p}
        </li>
      ))}
    </ul>
  )
}

function Experience() {
  return (
    <div className="divide-y">
      {experience.map((role) => (
        <Reveal key={role.title} className="py-8 first:pt-0 last:pb-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-xl font-semibold tracking-tight">{role.title}</h3>
            <p className="shrink-0 text-sm text-muted-foreground tabular-nums">{role.period}</p>
          </div>
          <p className="mt-1 text-muted-foreground">
            {role.org} · {role.place}
          </p>
          <Bullets items={role.points} />
          {role.stack && <p className="mt-4 text-sm text-muted-foreground">{role.stack.join(" · ")}</p>}
        </Reveal>
      ))}
    </div>
  )
}

function Projects() {
  return (
    <div className="divide-y">
      {projects.map((p) => (
        <Reveal key={p.name} className="py-8 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
            {p.status && <Badge variant="secondary">{p.status}</Badge>}
            <span className="ml-auto text-sm text-muted-foreground tabular-nums">{p.period}</span>
          </div>
          <p className="mt-2 text-lg leading-snug">{p.tagline}</p>
          <Bullets items={p.points} />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <Badge key={t} variant="outline" className="font-normal text-muted-foreground">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                >
                  {l.label}
                  <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Writing() {
  return (
    <Reveal>
      <p className="max-w-xl leading-relaxed text-muted-foreground">
        I document what I build on{" "}
        <a href={profile.links.blog} className="font-medium text-foreground underline underline-offset-4">
          Dark Matters Tech
        </a>
        , mistakes included.
      </p>
      <ul className="mt-6 divide-y border-y">
        {writing.map((post) => (
          <li key={post.href}>
            <a
              href={post.href}
              className="group flex items-center justify-between gap-6 py-4 transition-colors hover:bg-muted/50 sm:px-2"
            >
              <span className="font-medium">{post.title}</span>
              <span className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground tabular-nums">
                <span className="hidden sm:inline">{post.date}</span>
                <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function About() {
  return (
    <Reveal>
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
        <p>
          I like solving problems, making existing solutions faster, and removing the hidden variables that make
          systems fragile.
        </p>
        <p className="text-muted-foreground">
          Right now I&apos;m focused on backend architecture, AWS, and serving models securely — with clean version
          control and tested code as the baseline.
        </p>
      </div>

      <div className="mt-10 border-t pt-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h3 className="font-semibold">{education.school}</h3>
          <p className="text-sm text-muted-foreground tabular-nums">{education.period}</p>
        </div>
        <p className="mt-1 text-muted-foreground">{education.degree}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{education.coursework}</p>
      </div>

      <dl className="mt-8 divide-y border-t">
        {skills.map((s) => (
          <div key={s.group} className="grid gap-1 py-3.5 sm:grid-cols-[160px_1fr] sm:gap-6">
            <dt className="text-sm font-medium">{s.group}</dt>
            <dd className="text-sm text-muted-foreground">{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-foreground text-background">
      <div className={`${container} py-20 md:py-28`}>
        <Reveal>
          <h2 className="max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
            Let&apos;s build something that holds up.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-background/70">
            Internships, full-time roles, or a project worth talking about — my inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-full bg-background px-5 text-[15px] text-foreground hover:bg-background/90">
              <a href={`mailto:${profile.email}`}>
                <MailIcon /> Email me
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-background/25 bg-transparent px-5 text-[15px] text-background hover:bg-background/10 hover:text-background"
            >
              <a href={profile.links.linkedin}>
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-background/25 bg-transparent px-5 text-[15px] text-background hover:bg-background/10 hover:text-background"
            >
              <a href={profile.links.github}>
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className={`${container} flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between`}>
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>
        Built with Next.js, shadcn/ui and Motion ·{" "}
        <a href={profile.links.source} className="underline underline-offset-4 hover:text-foreground">
          Source
        </a>
      </p>
    </footer>
  )
}
