"use client"

import { motion } from "motion/react"

import { ease } from "@/components/motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Project } from "@/lib/content"

// One project at a time instead of a long list: pills on mobile, an index on desktop.
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  return (
    <Tabs defaultValue={projects[0].name} className="gap-8 md:grid md:grid-cols-[220px_1fr] md:gap-14">
      <TabsList className="-mx-5 w-[calc(100%+2.5rem)] justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 px-5 [scrollbar-width:none] group-data-horizontal/tabs:h-auto sm:mx-0 sm:w-full sm:px-0 md:flex-col md:items-stretch md:gap-1 md:self-start">
        {projects.map((p, i) => (
          <TabsTrigger
            key={p.name}
            value={p.name}
            className="h-9 flex-none rounded-full border-border px-4 text-foreground/60 group-data-[variant=default]/tabs-list:data-active:shadow-none data-active:border-foreground data-active:bg-foreground data-active:text-background md:h-auto md:justify-start md:gap-3 md:rounded-none md:border-0 md:px-0 md:py-2 md:text-2xl md:font-semibold md:tracking-tight md:text-foreground/35 md:data-active:bg-transparent md:data-active:text-foreground"
          >
            <span className="hidden text-xs font-normal tabular-nums md:inline">0{i + 1}</span>
            {p.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {projects.map((p) => (
        <TabsContent key={p.name} value={p.name} className="text-base">
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{p.kind}</span>
              <Badge variant="secondary">{p.status}</Badge>
            </div>
            <p className="mt-5 text-xl leading-snug font-medium tracking-tight text-balance md:text-2xl">{p.summary}</p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{p.detail}</p>
            <p className="mt-6 text-sm text-muted-foreground">{p.stack.join(" · ")}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium underline decoration-foreground/25 underline-offset-[6px] transition-colors hover:decoration-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.article>
        </TabsContent>
      ))}
    </Tabs>
  )
}
