"use client"

import { BookOpen, Clock, CheckCircle2 } from "lucide-react"

interface KpiCardProps {
  title: string
  value: number
  icon: React.ReactNode
  glowClass: string
  iconBgClass: string
  iconColorClass: string
  borderColorClass: string
}

function KpiCard({ title, value, icon, glowClass, iconBgClass, iconColorClass, borderColorClass }: KpiCardProps) {
  return (
    <div
      className={`group relative flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 glass glass-border ${glowClass} ${borderColorClass}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBgClass} transition-transform duration-300 group-hover:scale-110`}>
          <span className={iconColorClass}>{icon}</span>
        </div>
      </div>
      <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
    </div>
  )
}

interface KpiCardsProps {
  total: number
  pending: number
  approved: number
}

export function KpiCards({ total, pending, approved }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <KpiCard
        title="Total Subjects"
        value={total}
        icon={<BookOpen className="h-4 w-4" />}
        glowClass="glow-primary"
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        borderColorClass="border-primary/20"
      />
      <KpiCard
        title="Pending Subjects"
        value={pending}
        icon={<Clock className="h-4 w-4" />}
        glowClass="glow-amber"
        iconBgClass="bg-amber-glow/10"
        iconColorClass="text-amber-glow"
        borderColorClass="border-amber-glow/20"
      />
      <KpiCard
        title="Approved Subjects"
        value={approved}
        icon={<CheckCircle2 className="h-4 w-4" />}
        glowClass="glow-emerald"
        iconBgClass="bg-emerald-glow/10"
        iconColorClass="text-emerald-glow"
        borderColorClass="border-emerald-glow/20"
      />
    </div>
  )
}
