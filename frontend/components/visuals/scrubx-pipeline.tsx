"use client"

import { AnimatePresence, motion } from "motion/react"
import { ShieldCheckIcon } from "lucide-react"

import { ease } from "@/components/motion"
import { cn } from "@/lib/utils"
import { frame, mono, useStepper } from "./shared"

// ScrubX: one request walked through the pipeline from the architecture diagram,
// a stage at a time, ending with the answer the clinician actually sees.

type Mode = "raw" | "plain" | "detect" | "token"

const steps: { name: string; caption: string; mode: Mode; view: "question" | "decide" | "answer" }[] = [
  { name: "Receive", caption: "REST API checks auth and role, and tags the request.", mode: "raw", view: "question" },
  { name: "Normalize", caption: "Unicode cleaned up and markup stripped.", mode: "plain", view: "question" },
  { name: "Detect", caption: "Regex rules, a semantic scan and a PHI classifier flag 4 fields.", mode: "detect", view: "question" },
  { name: "Decide", caption: "Risk engine sees no injection signals and allows it.", mode: "detect", view: "decide" },
  { name: "Tokenize", caption: "Patient details are swapped for tokens.", mode: "token", view: "question" },
  { name: "Model", caption: "Retrieval is filtered by role and the answer is checked for leaks.", mode: "token", view: "answer" },
  { name: "Restore", caption: "Tokens are swapped back. The audit log keeps no PHI.", mode: "plain", view: "answer" },
]

const fields = {
  name: { raw: "MARIA LOPEZ", plain: "Maria Lopez", token: "[PATIENT_1]" },
  age: { raw: "58", plain: "58", token: "[AGE_1]" },
  date: { raw: "03/14/2026", plain: "03/14/2026", token: "[DATE_1]" },
  mrn: { raw: "4410-2291", plain: "4410-2291", token: "[MRN_1]" },
}

function Field({ f, mode, i = 0 }: { f: (typeof fields)[keyof typeof fields]; mode: Mode; i?: number }) {
  const text = mode === "raw" ? f.raw : mode === "token" ? f.token : f.plain
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={`${mode === "detect" ? "plain" : mode}-${text}`}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.3, delay: i * 0.08 }}
        className={cn(
          "inline-block rounded border px-1 transition-colors duration-300",
          mode === "token" && "border-foreground bg-foreground text-background",
          mode === "detect" && "border-dashed border-foreground/60 bg-foreground/[0.04]",
          (mode === "raw" || mode === "plain") && "border-transparent"
        )}
      >
        {text}
      </motion.span>
    </AnimatePresence>
  )
}

function Question({ mode }: { mode: Mode }) {
  const tag = (t: string) => mode === "raw" && <span className="text-foreground/35">{t}</span>
  return (
    <p>
      {tag("<p>")}Patient <Field f={fields.name} mode={mode} />, age <Field f={fields.age} mode={mode} i={1} />, seen{" "}
      <Field f={fields.date} mode={mode} i={2} />. MRN <Field f={fields.mrn} mode={mode} i={3} />. Blurred vision, type
      2 diabetes. What should happen next?{tag("</p>")}
    </p>
  )
}

export function ScrubxPipeline() {
  const { ref, step, select } = useStepper<HTMLDivElement>(steps.length, 2400)
  const s = steps[step]

  return (
    <div ref={ref} className={cn(frame, "flex min-h-80 flex-col gap-5 p-4 sm:min-h-72 sm:p-6")}>
      <div className="flex items-center justify-between">
        <span className={cn(mono, "tabular-nums")}>
          stage {step + 1}/{steps.length} · <span className="text-foreground">{s.name.toLowerCase()}</span>
        </span>
        <span className={cn(mono, "hidden sm:inline")}>req_7f3a · role: physician</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5" role="tablist" aria-label="Pipeline stages">
        {steps.map((st, i) => (
          <button
            key={st.name}
            role="tab"
            aria-selected={i === step}
            onClick={() => select(i)}
            className="group flex flex-col gap-1.5 text-left"
          >
            <span className="relative h-1 overflow-hidden rounded-full bg-foreground/10">
              <motion.span
                className="absolute inset-0 origin-left bg-foreground"
                initial={false}
                animate={{ scaleX: i <= step ? 1 : 0 }}
                transition={{ duration: 0.4, ease }}
              />
            </span>
            <span
              className={cn(
                "hidden text-[11px] transition-colors sm:block",
                i === step ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {st.name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 font-mono text-[12.5px] leading-7 text-foreground/85 sm:text-[13px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
          >
            {s.view === "question" && <Question mode={s.mode} />}
            {s.view === "decide" && (
              <div className="space-y-4">
                <Question mode={s.mode} />
                <div className="flex gap-2">
                  {["block", "flag", "allow"].map((v) => (
                    <span
                      key={v}
                      className={cn(
                        "rounded-full border px-3 py-0.5 text-[11px]",
                        v === "allow" ? "border-foreground bg-foreground text-background" : "text-muted-foreground"
                      )}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {s.view === "answer" && (
              <div className="space-y-2">
                <span className={mono}>{step === steps.length - 1 ? "answer to clinician" : "model answer"}</span>
                <p>
                  Refer <Field f={fields.name} mode={s.mode} /> for a dilated eye exam to screen for diabetic
                  retinopathy.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-foreground" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={s.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {s.caption}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
