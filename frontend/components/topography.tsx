"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const src = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/topography.svg`
const layer = {
  backgroundImage: `url(${src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}

// Faint contour map behind the whole page. It drifts slowly with scroll, and on
// devices with a mouse a soft spotlight makes the lines a little clearer near the cursor.
export function Topography() {
  const spotlight = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])

  useEffect(() => {
    const el = spotlight.current
    if (!el || !window.matchMedia("(pointer: fine)").matches) return
    const move = (e: PointerEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`)
      el.style.setProperty("--y", `${e.clientY}px`)
      el.style.opacity = "1"
    }
    const leave = () => (el.style.opacity = "0")
    window.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", leave)
    }
  }, [])

  const mask = "radial-gradient(280px circle at var(--x) var(--y), #000 0%, transparent 70%)"

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ ...layer, y }} className="absolute -top-[8%] -left-[20%] h-[125%] w-[140%] opacity-[0.055]" />
      <div
        ref={spotlight}
        style={{ maskImage: mask, WebkitMaskImage: mask, opacity: 0 }}
        className="absolute inset-0 transition-opacity duration-500"
      >
        <motion.div style={{ ...layer, y }} className="absolute -top-[8%] -left-[20%] h-[125%] w-[140%] opacity-[0.16]" />
      </div>
    </div>
  )
}
