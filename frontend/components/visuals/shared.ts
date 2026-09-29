import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

export const frame = "relative overflow-hidden rounded-2xl border bg-background/85 backdrop-blur-[2px]"
export const mono = "font-mono text-[11px] tracking-tight text-muted-foreground"

// Steps through 0..count-1 on an interval while the element is on screen.
// Returns a ref for the element, the current step, and a setter that pauses autoplay.
export function useStepper<T extends HTMLElement>(count: number, ms: number) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!inView || reduce || paused) return
    const id = setInterval(() => setStep((s) => (s + 1) % count), ms)
    return () => clearInterval(id)
  }, [inView, reduce, paused, count, ms])

  const select = (i: number) => {
    setPaused(true)
    setStep(i)
  }
  return { ref, step, select, inView, reduce: !!reduce }
}
