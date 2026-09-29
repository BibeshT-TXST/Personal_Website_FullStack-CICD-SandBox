// Generates public/topography.svg: faint contour lines used as the page background.
// Deterministic (seeded), so the output only changes when this script does.
// Run: npm run gen:topography

import fs from "node:fs"
import path from "node:path"
import { contours } from "d3-contour"
import { createNoise2D } from "simplex-noise"

const SEED = 1027
const W = 1600
const H = 1000
const CELL = 5 // px per grid cell
const PAD = 12 // extra cells beyond the viewBox so contour edges fall outside it
const LEVELS = 16

// Small seeded PRNG (mulberry32) so the noise field is stable across runs.
function mulberry32(a) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const noise = createNoise2D(mulberry32(SEED))
const cols = W / CELL + PAD * 2
const rows = H / CELL + PAD * 2

// Fractal noise with a gentle ridge running diagonally, like a mountain range.
const values = new Float64Array(cols * rows)
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < cols; i++) {
    const x = i / cols
    const y = j / rows
    let v = 0
    let amp = 1
    let freq = 1.05
    for (let o = 0; o < 3; o++) {
      v += amp * noise(x * freq * 1.6, y * freq)
      amp *= 0.5
      freq *= 2
    }
    const ridge = Math.exp(-(((y - 0.35 - x * 0.35) / 0.28) ** 2))
    values[j * cols + i] = v + ridge * 0.9
  }
}

let min = Infinity
let max = -Infinity
for (const v of values) {
  if (v < min) min = v
  if (v > max) max = v
}
const thresholds = Array.from({ length: LEVELS }, (_, k) => min + ((k + 1) * (max - min)) / (LEVELS + 1))

const toPx = ([gx, gy]) => [(gx - PAD) * CELL, (gy - PAD) * CELL]
const fmt = (n) => Math.round(n * 10) / 10

// Smooth each ring with quadratic curves through segment midpoints.
function ringToPath(ring) {
  const pts = ring.filter((_, k) => k % 3 === 0).map(toPx)
  if (pts.length < 7) return "" // skip tiny islands
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const n = pts.length
  const start = mid(pts[0], pts[1])
  let d = `M${fmt(start[0])} ${fmt(start[1])}`
  for (let k = 1; k <= n; k++) {
    const p = pts[k % n]
    const m = mid(p, pts[(k + 1) % n])
    d += `Q${fmt(p[0])} ${fmt(p[1])} ${fmt(m[0])} ${fmt(m[1])}`
  }
  return d + "Z"
}

const paths = contours()
  .size([cols, rows])
  .thresholds(thresholds)(values)
  .map((level, k) => {
    const d = level.coordinates.flatMap((poly) => poly.map(ringToPath)).join("")
    // Every fifth line is an "index contour", drawn slightly heavier, as on real topo maps.
    const width = (k + 1) % 5 === 0 ? 1.4 : 0.8
    return d ? `<path d="${d}" stroke-width="${width}"/>` : ""
  })
  .join("")

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#000" stroke-linejoin="round">${paths}</svg>\n`

const out = path.join(import.meta.dirname, "..", "public", "topography.svg")
fs.writeFileSync(out, svg)
console.log(`wrote ${path.relative(process.cwd(), out)} (${(svg.length / 1024).toFixed(0)} KB)`)
