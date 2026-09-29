"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { frame, mono } from "./shared"

// GitGud: requests flow client, nginx, one of two stateless API replicas, postgres.
// Every fourth request carries a revoked token and is stopped at the API.

type Pt = [number, number]
const SPEED = 190 // svg units per second
const CYCLE = 3.6 // seconds between repeats of the whole pattern

const nodes = [
  { label: "client", x: 16, y: 94 },
  { label: "nginx", x: 118, y: 94 },
  { label: "api 1", x: 226, y: 46 },
  { label: "api 2", x: 226, y: 142 },
  { label: "postgres", x: 326, y: 94 },
]
const W = 62
const H = 32

const wires = [
  "M76 110 H118",
  "M178 110 H204 V62 H226",
  "M178 110 H204 V158 H226",
  "M286 62 H306 V110 H326",
  "M286 158 H306 V110 H326",
]

const toApi = (y: number): Pt[] => [
  [46, 110],
  [148, 110],
  [204, 110],
  [204, y],
  [256, y],
]
const routes = {
  api1: [...toApi(62), [306, 62], [306, 110], [356, 110]] as Pt[],
  api2: [...toApi(158), [306, 158], [306, 110], [356, 110]] as Pt[],
  blocked: toApi(158),
}

// Keyframe times proportional to distance so dots move at a constant speed.
function timeline(pts: Pt[]) {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  const total = seg.reduce((a, b) => a + b, 0)
  let acc = 0
  const times = [0, ...seg.map((d) => (acc += d) / total)]
  return { times, duration: total / SPEED }
}

const requests = [
  { route: routes.api1, delay: 0, blocked: false },
  { route: routes.api2, delay: 0.9, blocked: false },
  { route: routes.api1, delay: 1.8, blocked: false },
  { route: routes.blocked, delay: 2.7, blocked: true },
]

export function LoadBalancer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-40px" })
  const reduce = useReducedMotion()
  const live = inView && !reduce
  const blockedAt = timeline(routes.blocked).duration / CYCLE

  return (
    <div ref={ref} className={cn(frame, "aspect-16/11 sm:aspect-2/1")}>
      <svg viewBox="0 0 400 220" className="absolute inset-0 size-full" aria-hidden>
        <g fill="none" className="stroke-foreground/20" strokeWidth="1">
          {wires.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {live &&
          requests.map(({ route, delay, blocked }, i) => {
            const { times, duration } = timeline(route)
            return (
              <motion.circle
                key={i}
                r="4"
                className={blocked ? "fill-background stroke-foreground" : "fill-foreground"}
                strokeWidth="1.5"
                initial={{ cx: route[0][0], cy: route[0][1], opacity: 0 }}
                animate={{
                  cx: route.map((p) => p[0]),
                  cy: route.map((p) => p[1]),
                  opacity: route.map((_, k) => (k === 0 || k === route.length - 1 ? 0 : 1)),
                }}
                transition={{ duration, times, ease: "linear", delay, repeat: Infinity, repeatDelay: CYCLE - duration }}
              />
            )
          })}

        {nodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x} y={n.y} width={W} height={H} rx="8" className="fill-background stroke-foreground/40" />
            <text
              x={n.x + W / 2}
              y={n.y + H / 2 + 3.5}
              textAnchor="middle"
              className="fill-foreground font-mono text-[11px]"
            >
              {n.label}
            </text>
          </g>
        ))}

        {live && (
          <motion.text
            x="256"
            y="192"
            textAnchor="middle"
            className="fill-foreground font-mono text-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{
              duration: CYCLE,
              times: [0, blockedAt, blockedAt + 0.03, blockedAt + 0.3, blockedAt + 0.36, 1],
              delay: 2.7,
              repeat: Infinity,
            }}
          >
            401 · token revoked
          </motion.text>
        )}
      </svg>
      <span className={cn(mono, "absolute bottom-3 left-4")}>round robin, 2 replicas</span>
      <span className={cn(mono, "absolute right-4 bottom-3 hidden sm:inline")}>argon2 + pepper · jwt · blacklist</span>
    </div>
  )
}
