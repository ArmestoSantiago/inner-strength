import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Dumbbell, Flame, Footprints, Scale, Trophy } from "lucide-react"
import { routineDaysPerWeek, routineWeekCount, lifts, member, type RoutineProgress, type SectionKey } from "@/lib/fitness-demo-data"
import { RankProgressPanel } from "@/components/dashboard/rank-progress-panel"
import { RoutineCalendar } from "@/components/dashboard/routine-calendar"
import { SectionHeading } from "@/components/dashboard/shared"

export function OverviewScreen({
  onNavigate,
  completedSets,
  completedRoutineDays,
  onToggleRoutineDay,
  routineProgress,
}: {
  onNavigate: (section: SectionKey) => void
  completedSets: number
  completedRoutineDays: ReadonlySet<string>
  onToggleRoutineDay: (dayId: string) => void
  routineProgress: RoutineProgress
}) {

  return (
    <div className="screen-stack overview-screen">
      <SectionHeading
        kicker="DOMINGO, 22 DE NOVIEMBRE"
        title={<>Buen día, {member.firstName}<span className="lime-period">.</span></>}
        description="Tu constancia de hoy construye la fuerza de mañana."
      />

      <div className="overview-grid overview-top-grid">
        <RankProgressPanel onNavigate={onNavigate} />
        <section className="panel bodyweight-panel">
          <div className="panel-heading-row">
            <div><p className="panel-kicker">PESO CORPORAL</p><h2>Tu base</h2></div>
            <span className="panel-icon"><Scale size={17} /></span>
          </div>
          <div className="bodyweight-value">{member.bodyweight.toFixed(1).replace(".", ",")}<span>kg</span></div>
          <div className="weight-change"><span><ArrowUpRight size={14} /> −0,6 kg</span><small>vs. mes anterior</small></div>
          <div className="bodyweight-spark" aria-label="Tendencia estable del peso corporal">
            <svg viewBox="0 0 280 62" role="img" aria-hidden="true">
              <defs><linearGradient id="weightFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b7f75b" stopOpacity=".18" /><stop offset="100%" stopColor="#b7f75b" stopOpacity="0" /></linearGradient></defs>
              <path d="M0 42 C20 39 25 31 44 34 S70 42 91 30 S122 20 139 29 S169 40 190 24 S223 32 242 17 S265 21 280 10 L280 62 L0 62Z" fill="url(#weightFill)" />
              <path d="M0 42 C20 39 25 31 44 34 S70 42 91 30 S122 20 139 29 S169 40 190 24 S223 32 242 17 S265 21 280 10" fill="none" stroke="#b7f75b" strokeWidth="2" />
            </svg>
          </div>
          <div className="mini-chart-axis"><span>OCT 22</span><span>NOV 22</span></div>
          <button className="text-action bodyweight-link" onClick={() => onNavigate("perfil")}>Ver perfil <ArrowRight size={14} /></button>
        </section>
      </div>

      <div className="overview-grid overview-middle-grid">
        <section className="panel next-workout-panel">
          <div className="panel-heading-row">
            <div><p className="panel-kicker">TU PRÓXIMA SESIÓN</p><h2>Espalda y bíceps</h2></div>
            <span className="date-badge"><CalendarDays size={15} /> DÍA 2</span>
          </div>
          <div className="workout-meta"><span><Dumbbell size={14} /> 4 ejercicios</span><span><Clock3 size={14} /> 55 min aprox.</span><span><Footprints size={14} /> Tirón</span></div>
          <div className="workout-preview-list">
            <div><span className="exercise-index">01</span><span>Peso muerto</span><small>3 × 5</small></div>
            <div><span className="exercise-index">02</span><span>Remo con barra</span><small>4 × 8</small></div>
            <div><span className="exercise-index">03</span><span>Jalón al pecho</span><small>3 × 10</small></div>
          </div>
          <button className="primary-action" onClick={() => onNavigate("rutina")}>
            <Dumbbell size={16} /> Abrir mi rutina <ArrowRight size={15} />
          </button>
        </section>

        <section className="panel weekly-panel">
          <div className="panel-heading-row">
            <div>
              <p className="panel-kicker">CALENDARIO MENSUAL · OCT–NOV 2026</p>
              <h2>Octubre — noviembre 2026</h2>
            </div>
            <span className="routine-completion-badge">
              <strong>{routineProgress.completedWeeks}</strong>
              <span>de {routineWeekCount}<br />semanas</span>
            </span>
          </div>
          <RoutineCalendar
            completedDayIds={completedRoutineDays}
            onToggleDay={onToggleRoutineDay}
          />
          <div className="routine-week-summary">
            <div className="routine-week-summary-heading">
              <span>Semana {routineProgress.currentWeek} · entrenamientos</span>
              <strong>{routineProgress.currentWeekCompletedDays}<small> / {routineDaysPerWeek}</small></strong>
            </div>
            <div
              className="routine-week-progress-track"
              role="progressbar"
              aria-label={`Entrenamientos completados de la semana ${routineProgress.currentWeek}`}
              aria-valuemin={0}
              aria-valuemax={routineDaysPerWeek}
              aria-valuenow={routineProgress.currentWeekCompletedDays}
            >
              <span style={{ width: `${(routineProgress.currentWeekCompletedDays / routineDaysPerWeek) * 100}%` }} />
            </div>
            <div className="routine-calendar-footer">
              <span>Sesiones: lun · mar · jue · sáb</span>
              <span>{completedSets} series</span>
            </div>
            <p className="routine-calendar-instruction">Tocá una fecha para marcarla como hecha.</p>
          </div>
        </section>
      </div>

      <div className="overview-grid overview-bottom-grid">
        <section className="panel lift-summary-panel">
          <div className="panel-heading-row">
            <div><p className="panel-kicker">FUERZA · 1RM ESTIMADO</p><h2>Marcas principales</h2></div>
            <button className="text-action" onClick={() => onNavigate("progreso")}>Ver progreso <ArrowRight size={14} /></button>
          </div>
          <div className="lift-summary-list">
            {lifts.map((lift) => <div className="lift-summary-row" key={lift.id}>
              <span className="lift-summary-icon"><Dumbbell size={15} /></span>
              <span className="lift-summary-name">{lift.name}<small>{lift.ratio} de tu peso corporal</small></span>
              <strong>{lift.weight}<small> kg</small></strong>
              <span className="lift-change"><ArrowUpRight size={12} />{lift.change}</span>
            </div>)}
          </div>
        </section>

        <section className="panel personal-best-panel">
          <div className="panel-heading-row">
            <div><p className="panel-kicker">CONSTANCIA QUE SE NOTA</p><h2>Este mes</h2></div>
            <span className="panel-icon"><Flame size={17} /></span>
          </div>
          <div className="month-highlight"><Trophy size={20} /><strong>2<span> récords personales</span></strong></div>
          <div className="mini-stats-row">
            <div><strong>12</strong><span>entrenamientos</span></div>
            <div><strong>8.420<span> kg</span></strong><span>volumen total</span></div>
          </div>
          <div className="personal-best-footer"><span>Nuevo mejor registro</span><span className="record-tag">PESO MUERTO <b>+10 kg</b></span></div>
        </section>
      </div>
    </div>
  )
}
