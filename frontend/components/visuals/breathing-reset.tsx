"use client"

import { AnimatePresence, motion } from "motion/react"

import { ease } from "@/components/motion"
import { cn } from "@/lib/utils"
import { frame, mono, useStepper } from "./shared"

// Lets Build Us: a breathing circle keeps pace while a short reflection is matched
// with one small thing to do right now. Examples are illustrative.
const BREATH = 8 // seconds for one full in and out

const pairs = [
  { feeling: "can't focus today", action: "Close your eyes and breathe with the circle for sixty seconds." },
  { feeling: "too much on my plate", action: "Write down the one thing that matters most this hour." },
  { feeling: "feeling a little low", action: "Step outside and give yourself a minute of daylight." },
]

export function BreathingReset() {
  const { ref, step, reduce } = useStepper<HTMLDivElement>(pairs.length, BREATH * 1000)
  const pair = pairs[step]

  return (
    <div ref={ref} className={cn(frame, "flex min-h-72 flex-col items-center gap-6 p-5 sm:aspect-2/1 sm:min-h-0 sm:flex-row sm:gap-10 sm:p-8")}>
      <div className="relative grid size-32 shrink-0 place-items-center sm:size-40">
        <span className="absolute inset-0 rounded-full border border-dashed border-foreground/20" />
        <motion.span
          className="absolute inset-6 rounded-full bg-foreground/[0.06]"
          animate={reduce ? undefined : { scale: [0.7, 1.25, 0.7] }}
          transition={{ duration: BREATH, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.span
          className="absolute inset-12 rounded-full bg-foreground"
          animate={reduce ? undefined : { scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: BREATH, ease: "easeInOut", repeat: Infinity }}
        />
        <BreathLabel reduce={reduce} />
      </div>

      <div className="w-full flex-1 space-y-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pair.feeling}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease }}
            className="space-y-4"
          >
            <div>
              <span className={mono}>you wrote</span>
              <p className="mt-1 font-mono text-sm">&ldquo;{pair.feeling}&rdquo;</p>
            </div>
            <div>
              <span className={mono}>try this</span>
              <p className="mt-1 text-base leading-snug font-medium tracking-tight">{pair.action}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <span className={cn(mono, "block")}>no account, about sixty seconds</span>
      </div>
    </div>
  )
}

function BreathLabel({ reduce }: { reduce: boolean }) {
  if (reduce) return <span className={cn(mono, "relative text-background")}>breathe</span>
  return (
    <span className="relative font-mono text-[10px] text-background">
      <motion.span
        className="absolute inset-0 grid place-items-center"
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: BREATH, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity }}
      >
        in
      </motion.span>
      <motion.span
        className="grid place-items-center"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: BREATH, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity }}
      >
        out
      </motion.span>
    </span>
  )
}
