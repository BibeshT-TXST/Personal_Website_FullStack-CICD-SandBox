"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { ShieldCheckIcon } from "lucide-react"

import { ease } from "@/components/motion"
import { cn } from "@/lib/utils"

const frame = "relative overflow-hidden rounded-2xl border bg-background/85 backdrop-blur-[2px]"
const mono = "font-mono text-[11px] tracking-tight text-muted-foreground"

// SightX: a retina whose vessels draw in, swept by a scan line that counts through
// the 108 test-time augmentation passes each prediction runs.
const PASSES = 108
const SWEEP = 2.6 // seconds per full pass cycle

// Loosely anatomical: the optic disc sits right of center, two vessel arcades sweep
// around the macula (left), with smaller nasal vessels and branches.
const DISC = { x: 252, y: 108 }
const vessels = [
  // superior and inferior arcades (artery and vein pairs)
  "M252 104 C232 62 178 44 124 70",
  "M252 100 C236 52 186 34 132 50",
  "M252 112 C232 154 178 172 124 148",
  "M252 116 C236 166 186 184 132 170",
  // nasal vessels
  "M256 102 C272 86 282 70 280 42",
  "M258 114 C274 130 284 148 280 176",
  "M260 108 C274 106 286 106 296 104",
  // branches toward the macula and periphery
  "M196 52 C190 70 186 84 190 94",
  "M196 164 C190 148 186 134 190 124",
  "M160 58 C150 46 140 40 128 38",
  "M160 160 C150 172 140 178 128 180",
  "M222 60 C220 44 226 32 236 24",
]

export function RetinaScan() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  const [pass, setPass] = useState(PASSES)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setPass((p) => (p >= PASSES ? 1 : p + 1)), (SWEEP * 1000) / PASSES)
    return () => clearInterval(id)
  }, [inView, reduce])

  return (
    <div ref={ref} className={cn(frame, "aspect-[16/11] sm:aspect-[2/1]")}>
      <svg viewBox="0 0 400 220" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <clipPath id="fundus">
            <circle cx="200" cy="110" r="90" />
          </clipPath>
        </defs>
        <circle cx="200" cy="110" r="90" className="fill-muted stroke-foreground/20" />
        <g clipPath="url(#fundus)" fill="none" strokeLinecap="round">
          {vessels.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              className="stroke-foreground/55"
              strokeWidth={i < 4 ? 1.8 : i < 7 ? 1.3 : 1}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease, delay: 0.1 + i * 0.07 }}
            />
          ))}
          <circle cx="178" cy="110" r="16" className="fill-foreground/[0.06]" />
          <circle cx="178" cy="110" r="5" className="fill-foreground/20" />
          <circle cx={DISC.x} cy={DISC.y} r="13" className="fill-background stroke-foreground/50" />
          {!reduce && (
            <motion.g
              initial={{ y: 0 }}
              animate={inView ? { y: 190 } : { y: 0 }}
              transition={{ duration: SWEEP, ease: "linear", repeat: Infinity }}
            >
              <rect x="100" y="10" width="200" height="10" className="fill-foreground/[0.06]" />
              <line x1="100" x2="300" y1="20" y2="20" className="stroke-foreground/40" strokeWidth="1" />
            </motion.g>
          )}
        </g>
      </svg>
      <span className={cn(mono, "absolute bottom-3 left-4 tabular-nums")}>
        TTA pass {String(pass).padStart(3, "0")}/{PASSES}
      </span>
      <span className={cn(mono, "absolute right-4 bottom-3")}>ResNet-50</span>
    </div>
  )
}

// ScrubX: a clinical note whose sensitive fields swap to tokens before leaving,
// looping between the raw note and what the model actually receives.
const fields = [
  { raw: "Maria Lopez", token: "[PATIENT_1]" },
  { raw: "58", token: "[AGE_1]" },
  { raw: "03/14/2026", token: "[DATE_1]" },
  { raw: "4410-2291", token: "[MRN_1]" },
]

function Field({ index, scrubbed }: { index: number; scrubbed: boolean }) {
  const f = fields[index]
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={scrubbed ? "t" : "r"}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.35, delay: index * 0.12 }}
        className={cn(
          "inline-block rounded px-1",
          scrubbed ? "bg-foreground text-background" : "bg-foreground/[0.07] text-foreground"
        )}
      >
        {scrubbed ? f.token : f.raw}
      </motion.span>
    </AnimatePresence>
  )
}

export function RedactionDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  const [scrubbed, setScrubbed] = useState(true)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => setScrubbed((s) => !s), 2600)
    return () => clearInterval(id)
  }, [inView, reduce])

  return (
    <div ref={ref} className={cn(frame, "flex min-h-60 flex-col justify-between gap-4 p-4 sm:aspect-[2/1] sm:p-6")}>
      <div className="flex items-center justify-between">
        <span className={mono}>outgoing prompt</span>
        <span className={cn(mono, "inline-flex items-center gap-1.5 text-foreground")}>
          <ShieldCheckIcon className="size-3.5" />
          {scrubbed ? "4 fields tokenized" : "scanning note"}
        </span>
      </div>
      <p className="font-mono text-[12.5px] leading-7 text-foreground/80 sm:text-sm sm:leading-8">
        Patient <Field index={0} scrubbed={scrubbed} />, age <Field index={1} scrubbed={scrubbed} />, seen on{" "}
        <Field index={2} scrubbed={scrubbed} />. MRN <Field index={3} scrubbed={scrubbed} />. Reports blurred vision;
        history of type 2 diabetes.
      </p>
      <span className={mono}>{scrubbed ? "safe to send to the model" : "contains patient data"}</span>
    </div>
  )
}

export function ProjectVisual({ kind }: { kind: "retina" | "redaction" }) {
  return kind === "retina" ? <RetinaScan /> : <RedactionDemo />
}
