"use client"

import { SubjectNodeCard } from "./subject-node-card"
import type { SubjectStatus } from "./subject-node-card"
import { Maximize2 } from "lucide-react"

interface Subject {
  id: string
  title: string
  courseId: string
  credits: number
  status: SubjectStatus
}

const sampleSubjects: Subject[] = [
  { id: "1", title: "Calculus I", courseId: "MAT-101", credits: 6, status: "approved" },
  { id: "2", title: "Linear Algebra", courseId: "MAT-201", credits: 6, status: "approved" },
  { id: "3", title: "Physics I", courseId: "PHY-101", credits: 4, status: "approved" },
  { id: "4", title: "Programming Fundamentals", courseId: "CS-101", credits: 8, status: "regular" },
  { id: "5", title: "Data Structures", courseId: "CS-201", credits: 6, status: "regular" },
  { id: "6", title: "Algorithms", courseId: "CS-301", credits: 6, status: "pending" },
  { id: "7", title: "Database Systems", courseId: "CS-302", credits: 4, status: "pending" },
  { id: "8", title: "Operating Systems", courseId: "CS-303", credits: 6, status: "pending" },
  { id: "9", title: "Software Engineering", courseId: "CS-401", credits: 6, status: "pending" },
]

export function DegreeMapCanvas() {
  return (
    <section id="map" className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Degree Map</h2>
          <p className="text-sm text-muted-foreground">Visualize your academic path</p>
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative min-h-[480px] overflow-auto rounded-xl border border-border/60 bg-card/30 glass-border">
        <div className="absolute inset-0 dot-grid" />

        <div className="relative z-10 flex flex-wrap items-start justify-center gap-6 p-8">
          <div className="flex flex-col items-center gap-4">
            <span className="rounded-full bg-emerald-glow/10 px-3 py-1 text-xs font-medium text-emerald-glow">
              Year 1 - Approved
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              {sampleSubjects
                .filter((s) => s.status === "approved")
                .map((subject) => (
                  <SubjectNodeCard key={subject.id} {...subject} />
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span className="rounded-full bg-amber-glow/10 px-3 py-1 text-xs font-medium text-amber-glow">
              Year 2 - In Progress
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              {sampleSubjects
                .filter((s) => s.status === "regular")
                .map((subject) => (
                  <SubjectNodeCard key={subject.id} {...subject} />
                ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <span className="rounded-full bg-slate-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground">
              Year 3 - Pending
            </span>
            <div className="flex flex-wrap justify-center gap-4">
              {sampleSubjects
                .filter((s) => s.status === "pending")
                .map((subject) => (
                  <SubjectNodeCard key={subject.id} {...subject} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
