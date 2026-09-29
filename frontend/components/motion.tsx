"use client"

import { MotionConfig, motion } from "motion/react"

export const ease = [0.22, 1, 0.36, 1] as const

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
