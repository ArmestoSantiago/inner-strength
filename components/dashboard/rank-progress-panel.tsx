import { ArrowRight } from "lucide-react"
import { lifts, rankSteps, type SectionKey } from "@/lib/fitness-demo-data"
import { RankEmblem } from "@/components/dashboard/shared"

export function RankProgressPanel({ onNavigate }: { onNavigate?: (section: SectionKey) => void }) {
  return (
    <section className="panel rank-panel">
      <div className="rank-panel-glow" aria-hidden="true" />
      <div className="rank-panel-top">
        <div className="rank-title-group">
          <RankEmblem />
          <div>
            <span className="panel-kicker">TU RANGO ACTUAL</span>
            <h2>Omega <span className="rank-tag">NIVEL 03</span></h2>
            <p>Fuerza construida con constancia.</p>
          </div>
        </div>
        <div className="rank-level-indicator"><span>03</span><i>/ 04</i></div>
      </div>

      <div className="rank-lift-grid">
        {lifts.map((lift) => (
          <div className="rank-lift-item" key={lift.id}>
            <div className="rank-lift-heading"><span>{lift.name}</span><strong>{lift.ratio}</strong></div>
            <div className="rank-lift-track"><span style={{ width: `${lift.progress}%` }} /></div>
            <div className="rank-lift-foot"><span>{lift.weight} kg · 1RM</span><span>{lift.progress}%</span></div>
          </div>
        ))}
      </div>

      <div className="rank-panel-bottom">
        <div className="rank-steps" aria-label="Cachorro, Beta, Omega, Alfa">
          {rankSteps.map(({ name, state }) => (
            <div className={`rank-step ${state}`} key={name}>
              <RankEmblem rank={name} size="small" />
              <span>{name}</span>
            </div>
          ))}
        </div>
        <button className="text-action" onClick={() => onNavigate?.("progreso")}>
          Ver criterios <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
