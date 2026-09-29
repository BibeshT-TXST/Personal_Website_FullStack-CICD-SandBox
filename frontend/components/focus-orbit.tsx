"use client"

import { motion } from "motion/react"
import { BrainCircuitIcon, CloudIcon, HeartPulseIcon, ShieldCheckIcon, type LucideIcon } from "lucide-react"

const icons: Record<string, LucideIcon> = {
  Healthcare: HeartPulseIcon,
  AI: BrainCircuitIcon,
  Cloud: CloudIcon,
  Security: ShieldCheckIcon,
}

// Where each tag sits on the ring (desktop): the four diagonals around the photo.
const spots = [
  "top-[3%] left-[22%]",
  "top-[3%] left-[78%]",
  "top-[97%] left-[78%]",
  "top-[97%] left-[22%]",
]

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
// and the fields I'm focused on pinned to the ring (beside the photo on mobile).
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
        {focus.slice(0, spots.length).map((f, i) => (
          <span key={f} className={`absolute hidden -translate-x-1/2 -translate-y-1/2 md:block ${spots[i]}`}>
            <Chip label={f} delay={i * 1.25} />
          </span>
        ))}
      </div>
      <div className="flex flex-col items-start gap-1.5 md:hidden">
        {focus.map((f, i) => (
          <Chip key={f} label={f} delay={i * 1.25} />
        ))}
      </div>
    </div>
  )
}
