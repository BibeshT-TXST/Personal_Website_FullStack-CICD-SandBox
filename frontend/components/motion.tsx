"use client"

import { useEffect, useRef } from "react"
import { animate, MotionConfig, motion, useInView, useReducedMotion } from "motion/react"

const ease = [0.22, 1, 0.36, 1] as const

// Honor the OS "reduce motion" setting across every animation on the site.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

// One restrained entrance: a short fade-up, played once when scrolled into view.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const node = ref.current
    if (!node || !inView || reduce) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease,
      onUpdate: (n) => {
        node.textContent = format(n)
      },
    })
    return () => controls.stop()
    // format is derived from props already listed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value])

  // Server-rendered with the final value so it reads correctly without JS.
  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  )
}
