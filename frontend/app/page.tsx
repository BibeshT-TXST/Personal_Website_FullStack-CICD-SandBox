import Image from "next/image"
import { FileTextIcon, MailIcon, MapPinIcon, MoonIcon, SunIcon } from "lucide-react"

import { FocusOrbit } from "@/components/focus-orbit"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { Reveal } from "@/components/motion"
import { ProjectExplorer } from "@/components/project-explorer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { about, chapters, contact, hero, profile, projects, writing } from "@/lib/content"
import { cn } from "@/lib/utils"
import headshot from "@/public/headshot.jpg"

const resumeHref = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${profile.resume}`
const container = "mx-auto max-w-5xl px-5 sm:px-8"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Section id="experience" label="What I am working on" title="">
          <Chapters />
        </Section>
        <Section id="projects" label="Projects" title="things I've built and why">
          <ProjectExplorer projects={projects} />
        </Section>
        <Section id="writing" label="Writing" title="notes from the build">
          <Writing />
        </Section>
        <Section id="about">
          <About />
        </Section>
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function ResumeButton({ className }: { className?: string }) {
  return (
    <Button asChild className={cn("h-11 rounded-full px-5 text-[15px]", className)}>
      <a href={resumeHref} download>
        <FileTextIcon /> Download Resume
      </a>
    </Button>
  )
}

function Hero() {
  return (
    <section className={`${container} pt-10 pb-8 md:pt-20 md:pb-12`}>
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
        <Reveal>
          <p className="text-lg text-muted-foreground">{hero.greeting}</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{hero.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ResumeButton />
            <Button asChild variant="outline" className="h-11 rounded-full bg-background/70 px-5 text-[15px]">
              <a href={`mailto:${profile.email}`}>
                <MailIcon /> Say hello
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4" /> {hero.meta}
            </span>
            <span className="flex items-center gap-4">
              <a href={profile.links.github} className="transition-colors hover:text-foreground" aria-label="GitHub">
                <GitHubIcon className="size-4.5" />
              </a>
              <a href={profile.links.linkedin} className="transition-colors hover:text-foreground" aria-label="LinkedIn">
                <LinkedInIcon className="size-4.5" />
              </a>
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-first md:order-last">
          <FocusOrbit focus={hero.focus}>
            <div className="relative size-32 rounded-full border bg-background p-1.5 sm:size-40 md:size-72 md:p-2 lg:size-80">
              <Image
                src={headshot}
                alt={`Portrait of ${profile.name}`}
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 160px"
                className="size-full rounded-full object-cover"
              />
            </div>
          </FocusOrbit>
        </Reveal>
      </div>
    </section>
  )
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string
  label?: string
  title?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`${container} py-16 md:py-24`}>
      {label && title && (
        <Reveal className="mb-10 md:mb-14">
          {/* One style for every heading: label, comma, the rest of the line. */}
          <h2 className="max-w-4xl text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
            {label}, {title}
          </h2>
        </Reveal>
      )}
      {children}
    </section>
  )
}

function Chapters() {
  const panels = [
    { ...chapters.day, Icon: SunIcon, dark: false },
    { ...chapters.night, Icon: MoonIcon, dark: true },
  ]
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {panels.map(({ label, where, since, body, Icon, dark }, i) => (
          <Reveal
            key={label}
            delay={i * 0.08}
            className={cn(
              "rounded-3xl p-7 md:p-9",
              dark ? "bg-foreground text-background" : "border bg-background/80 backdrop-blur-[2px]"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between text-sm",
                dark ? "text-background/60" : "text-muted-foreground"
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="size-4" /> {label}
              </span>
              <span>{since}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{where}</h3>
            <div className={cn("mt-4 space-y-4 leading-relaxed", dark ? "text-background/75" : "text-foreground/75")}>
              {body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 max-w-3xl leading-relaxed text-muted-foreground md:text-lg">{chapters.before}</p>
      </Reveal>
    </>
  )
}

function Writing() {
  return (
    <Reveal>
      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        {writing.intro}{" "}
        <a href={profile.links.blog} className="font-medium text-foreground underline underline-offset-4">
          Visit the blog
        </a>
      </p>
      <ul className="mt-8 border-t">
        {writing.posts.map((post) => (
          <li key={post.href} className="border-b">
            <a href={post.href} className="group flex items-baseline justify-between gap-6 py-5">
              <span className="text-lg font-medium tracking-tight decoration-foreground/30 underline-offset-[6px] group-hover:underline">
                {post.title}
              </span>
              <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{post.date}</span>
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
      <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl md:text-6xl">
        {about.values.map((v, i) => (
          <span key={v} className="block">
            {v}
            {i < about.values.length - 1 && ","}
          </span>
        ))}
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_280px] md:gap-16">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-foreground/80">
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="space-y-6 text-sm md:border-l md:pl-8">
          <div>
            <dt className="font-medium">Education</dt>
            <dd className="mt-1.5 leading-relaxed text-muted-foreground">{about.education}</dd>
          </div>
          <div>
            <dt className="font-medium">Toolbox</dt>
            <dd className="mt-1.5 leading-relaxed text-muted-foreground">{about.toolbox}</dd>
          </div>
        </dl>
      </div>
    </Reveal>
  )
}

function Contact() {
  const ghost =
    "h-11 rounded-full border-background/25 bg-transparent px-5 text-[15px] text-background hover:bg-background/10 hover:text-background"
  return (
    <section id="contact" className="bg-foreground text-background">
      <div className={`${container} py-20 md:py-28`}>
        <Reveal>
          <h2 className="max-w-2xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-background/70">{contact.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-full bg-background px-5 text-[15px] text-foreground hover:bg-background/90">
              <a href={`mailto:${profile.email}`}>
                <MailIcon /> Email me
              </a>
            </Button>
            <Button asChild variant="outline" className={ghost}>
              <a href={resumeHref} download>
                <FileTextIcon /> Resume
              </a>
            </Button>
            <Button asChild variant="outline" className={ghost}>
              <a href={profile.links.linkedin}>
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" className={ghost}>
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
    </footer>
  )
}
