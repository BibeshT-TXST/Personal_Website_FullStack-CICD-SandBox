"use client"

import { useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { profile } from "@/lib/content"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
]

export function SiteHeader({ resumeHref }: { resumeHref?: string }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8))

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/90 backdrop-blur transition-colors",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="text-[15px] font-semibold tracking-tight">
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <Button asChild size="lg" className="ml-3 rounded-full px-4">
            <a href={resumeHref ?? "#contact"}>{resumeHref ? "Résumé" : "Contact"}</a>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="md:hidden" aria-label="Open menu">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs p-6 pt-14">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <nav className="flex flex-col">
              {[...nav, { label: "Contact", href: "#contact" }].map((item) => (
                <SheetClose asChild key={item.href}>
                  <a
                    href={item.href}
                    className="border-b py-4 text-lg font-medium tracking-tight last:border-b-0"
                  >
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            {resumeHref && (
              <Button asChild size="lg" className="mt-2 h-11 rounded-full">
                <a href={resumeHref}>Download résumé</a>
              </Button>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
