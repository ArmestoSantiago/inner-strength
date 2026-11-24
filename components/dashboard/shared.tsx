import type { ReactNode } from "react"
import { ArrowUpRight, Check, Crown, Medal, PawPrint, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { member } from "@/lib/fitness-demo-data"

export function SectionHeading({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string
  title: ReactNode
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  )
}

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "lime",
}: {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  tone?: "lime" | "neutral" | "red"
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon tone-${tone}`}><Icon size={17} strokeWidth={1.8} aria-hidden="true" /></div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span className={tone === "red" ? "negative-detail" : tone === "lime" ? "positive-detail" : "stat-detail"}>{detail}</span>
    </article>
  )
}

const rankIcons: Record<string, LucideIcon> = {
  Cachorro: PawPrint,
  Beta: Shield,
  Omega: Medal,
  Alfa: Crown,
}

export function RankEmblem({ rank = member.rank, size = "large" }: { rank?: string; size?: "small" | "large" }) {
  const Icon = rankIcons[rank] ?? Medal
  return (
    <span className={`rank-emblem rank-${rank.toLowerCase()} emblem-${size}`} aria-hidden="true">
      <Icon size={size === "large" ? 25 : 20} strokeWidth={1.65} />
      <span className="rank-emblem-inner"><Check size={size === "large" ? 10 : 8} strokeWidth={3} /></span>
    </span>
  )
}

export function ChangeLabel({ children, down = false }: { children: ReactNode; down?: boolean }) {
  return <span className={`change-label ${down ? "change-down" : ""}`}><ArrowUpRight size={13} aria-hidden="true" />{children}</span>
}
