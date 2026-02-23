"use client"

import { BookOpen, Clock, CheckCircle2 } from "lucide-react"

export type SubjectStatus = "pending" | "regular" | "approved"

interface SubjectNodeCardProps {
  title: string
  courseId: string
  credits: number
  status: SubjectStatus
}

const statusConfig = {
  pending: {
    borderClass: "border-slate-muted/60",
    glowClass: "",
    bgClass: "bg-card/60",
    badgeClass: "bg-slate-muted/30 text-muted-foreground",
    icon: <Clock className="h-3.5 w-3.5" />,
    label: "Pending",
  },
  regular: {
    borderClass: "border-amber-glow/30",
    glowClass: "glow-amber",
    bgClass: "bg-card/80",
    badgeClass: "bg-amber-glow/10 text-amber-glow",
    icon: <BookOpen className="h-3.5 w-3.5" />,
    label: "In Progress",
  },
  approved: {
    borderClass: "border-emerald-glow/30",
    glowClass: "glow-emerald",
    bgClass: "bg-card/80",
    badgeClass: "bg-emerald-glow/10 text-emerald-glow",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    label: "Approved",
  },
}

export function SubjectNodeCard({ title, courseId, credits, status }: SubjectNodeCardProps) {
  const config = statusConfig[status]

  return (
    <div
      className={`group relative w-56 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer glass ${config.borderClass} ${config.glowClass} ${config.bgClass}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h3 className="text-sm font-semibold leading-tight text-foreground truncate" title={title}>
            {title}
          </h3>
          <p className="text-xs font-mono text-muted-foreground">{courseId}</p>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${config.badgeClass}`}>
          {credits}cr
        </span>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${config.badgeClass}`}>
          {config.icon}
          {config.label}
        </span>
      </div>

      <div
        className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none ${
          status === "approved"
            ? "shadow-[0_0_30px_oklch(0.72_0.19_155/0.2)]"
            : status === "regular"
            ? "shadow-[0_0_30px_oklch(0.8_0.15_85/0.2)]"
            : "shadow-[0_0_20px_oklch(0.35_0.01_260/0.3)]"
        }`}
      />
    </div>
  )
}
