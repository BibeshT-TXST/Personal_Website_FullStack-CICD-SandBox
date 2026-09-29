"use client"

import { motion } from "motion/react"
import { HeartPulseIcon, ShieldCheckIcon, type LucideIcon } from "lucide-react"

const icons: Record<string, LucideIcon> = {
  Healthcare: HeartPulseIcon,
  "Secure AI": ShieldCheckIcon,
}

function Chip({ label, delay = 0 }: { label: string; delay?: number }) {
  const Icon = icons[label] ?? ShieldCheckIcon
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay }}
      className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-medium whitespace-nowrap"
    >
      <Icon className="size-3.5" /> {label}
    </motion.span>
  )
}

// The headshot sits inside a slow orbit: a turning dashed ring, one small satellite,
// and the two fields I'm focused on pinned to the ring (beside the photo on mobile).
export function FocusOrbit({ focus, children }: { focus: string[]; children: React.ReactNode }) {
  const spin = (duration: number, dir = 1) => ({
    animate: { rotate: 360 * dir },
    transition: { duration, ease: "linear" as const, repeat: Infinity },
  })

  return (
    <div className="flex items-center gap-6 md:block">
      <div className="relative shrink-0">
        <motion.div
          aria-hidden
          {...spin(90)}
          className="absolute -inset-3 rounded-full border border-dashed border-foreground/20 md:-inset-5"
        />
        <motion.div aria-hidden {...spin(24, -1)} className="absolute -inset-3 md:-inset-5">
          <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
        </motion.div>
        {children}
        <span className="absolute top-[3%] left-[22%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <Chip label={focus[0]} />
        </span>
        <span className="absolute top-[97%] left-[78%] hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <Chip label={focus[1]} delay={2.5} />
        </span>
      </div>
      <div className="flex flex-col items-start gap-2 md:hidden">
        {focus.map((f, i) => (
          <Chip key={f} label={f} delay={i * 2.5} />
        ))}
      </div>
    </div>
  )
}
