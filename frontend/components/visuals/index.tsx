import { BreathingReset } from "./breathing-reset"
import { LoadBalancer } from "./load-balancer"
import { RetinaScan } from "./retina-scan"
import { ScrubxPipeline } from "./scrubx-pipeline"

export const visuals = {
  retina: RetinaScan,
  pipeline: ScrubxPipeline,
  cluster: LoadBalancer,
  breath: BreathingReset,
}

export type VisualKind = keyof typeof visuals

export function ProjectVisual({ kind }: { kind: VisualKind }) {
  const Visual = visuals[kind]
  return <Visual />
}
