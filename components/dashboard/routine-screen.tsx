"use client"

import { useState } from "react"
import { Check, ChevronDown, Clock3, Dumbbell, Info, Play, Plus, Save } from "lucide-react"
import { routineDays } from "@/lib/fitness-demo-data"
import { SectionHeading } from "@/components/dashboard/shared"

type Exercise = (typeof routineDays)[number]["exercises"][number]
export type ExerciseSetValue = { weight: string; reps: string }
export type SavedExerciseValues = Record<string, ExerciseSetValue[]>

export function RoutineScreen({ completedSets, toggleSet, savedExerciseValues, saveExerciseValues }: {
  completedSets: Set<string>
  toggleSet: (setId: string) => void
  savedExerciseValues: SavedExerciseValues
  saveExerciseValues: (exerciseId: string, values: ExerciseSetValue[]) => void
}) {
  const [activeDay, setActiveDay] = useState(routineDays[0].id)
  const day = routineDays.find((item) => item.id === activeDay) ?? routineDays[0]
  const totalSets = day.exercises.reduce((total, exercise) => total + exercise.sets, 0)
  const completedForDay = day.exercises.reduce((total, exercise) => {
    return total + Array.from({ length: exercise.sets }, (_, index) => completedSets.has(`${exercise.id}-${index + 1}`) ? 1 : 0).reduce<number>((sum, value) => sum + value, 0)
  }, 0)

  return (
    <div className="screen-stack routine-screen">
      <SectionHeading kicker="PLAN DE ENTRENAMIENTO · 4 DÍAS" title="Mi rutina" description="Tu plan, claro y listo para entrenar." action={<span className="routine-plan-pill"><Dumbbell size={14} /> PLAN PERSONALIZADO</span>} />

      <section className="routine-session-banner panel">
        <div className="session-banner-copy">
          <h2>{day.focus}</h2>
          <p>{day.label} de 4 <span>·</span> {day.exercises.length} ejercicios <span>·</span> 55 min</p>
        </div>
        <div className="session-progress-circle" style={{ "--session-progress": `${Math.round(completedForDay / totalSets * 100)}%` } as React.CSSProperties}>
          <div><strong>{completedForDay}</strong><span>/{totalSets}</span><small>series</small></div>
        </div>
      </section>

      <section className="routine-day-section">
        <div className="routine-day-heading"><div><p className="panel-kicker">TU SEMANA</p><h2>Elegí un día</h2></div><span className="routine-days-count">4 entrenamientos</span></div>
        <div className="routine-day-tabs" role="tablist" aria-label="Días de rutina">
          {routineDays.map((item, index) => <button
            role="tab"
            aria-selected={activeDay === item.id}
            aria-controls="routine-exercises"
            key={item.id}
            className={`routine-day-tab ${activeDay === item.id ? "active" : ""}`}
            onClick={() => setActiveDay(item.id)}
          >
            <span className="routine-day-topline"><span>{item.label}</span><span className="day-dot">{index + 1}</span></span>
            <strong>{item.focus}</strong>
            <small>{item.exercises.length} ejercicios</small>
          </button>)}
        </div>
      </section>

      <section id="routine-exercises" className="routine-exercise-section" role="tabpanel">
        <div className="routine-exercise-heading"><div><p className="panel-kicker">{day.label.toUpperCase()} · {day.focus.toUpperCase()}</p><h2>Ejercicios <span>{day.exercises.length.toString().padStart(2, "0")}</span></h2></div><button className="secondary-action"><Plus size={15} /> Añadir ejercicio</button></div>
        <div className="exercise-list">
          {day.exercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} index={index} completedSets={completedSets} toggleSet={toggleSet} savedValues={savedExerciseValues[exercise.id]} onSave={(values) => saveExerciseValues(exercise.id, values)} />)}
        </div>
      </section>

      <div className="coach-note"><span className="coach-note-icon"><Info size={16} /></span><div><strong>Nota de tu entrenador</strong><p>Prioridad de esta semana: mantené 1–2 repeticiones en reserva en los ejercicios principales.</p></div><ChevronDown size={16} aria-hidden="true" /></div>
    </div>
  )
}

function ExerciseCard({ exercise, index, completedSets, toggleSet, savedValues, onSave }: {
  exercise: Exercise
  index: number
  completedSets: Set<string>
  toggleSet: (setId: string) => void
  savedValues?: ExerciseSetValue[]
  onSave: (values: ExerciseSetValue[]) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasSavedChanges, setHasSavedChanges] = useState(Boolean(savedValues))
  const [setValues, setSetValues] = useState<ExerciseSetValue[]>(() =>
    savedValues ?? Array.from({ length: exercise.sets }, () => ({ weight: String(exercise.target), reps: exercise.reps }))
  )
  const exerciseComplete = Array.from({ length: exercise.sets }, (_, setIndex) => completedSets.has(`${exercise.id}-${setIndex + 1}`)).every(Boolean)
  const detailsId = `${exercise.id}-details`

  function updateSetValue(index: number, field: "weight" | "reps", value: string) {
    setSetValues((current) => current.map((set, setIndex) => setIndex === index ? { ...set, [field]: value } : set))
    setHasSavedChanges(false)
  }

  return (
    <article className={`exercise-card ${exerciseComplete ? "exercise-complete" : ""}`}>
      <div className="exercise-card-header">
        <span className="exercise-card-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="exercise-card-title"><h3>{exercise.name}</h3><p>{exercise.muscle}</p></div>
        <div className="exercise-prescription"><strong>{exercise.sets}<span> × </span>{exercise.reps}</strong><small><Clock3 size={12} /> {exercise.rest}</small></div>
        <button className="exercise-more" type="button" aria-label={`${isExpanded ? "Ocultar" : "Ver"} series de ${exercise.name}`} aria-expanded={isExpanded} aria-controls={detailsId} onClick={() => setIsExpanded((expanded) => !expanded)}>
          <ChevronDown size={16} />
        </button>
      </div>
      <div className={`exercise-details ${isExpanded ? "is-expanded" : ""}`} id={detailsId}>
        <div className="set-header"><span>SERIE</span><span>PESO (KG)</span><span>REPS</span><span>HECHO</span></div>
        <div className="sets-list">
          {Array.from({ length: exercise.sets }, (_, setIndex) => {
            const setId = `${exercise.id}-${setIndex + 1}`
            const isComplete = completedSets.has(setId)
            return <div className={`set-row ${isComplete ? "set-complete" : ""}`} key={setId}>
              <span className="set-number">{String(setIndex + 1).padStart(2, "0")}</span>
              <label className="visually-hidden" htmlFor={`${setId}-weight`}>Peso utilizado en la serie {setIndex + 1} de {exercise.name}</label>
              <div className="set-input-wrap"><input id={`${setId}-weight`} type="number" inputMode="decimal" value={setValues[setIndex].weight} onChange={(event) => updateSetValue(setIndex, "weight", event.target.value)} step="0.5" aria-label={`Peso, serie ${setIndex + 1}`} /><span>kg</span></div>
              <label className="visually-hidden" htmlFor={`${setId}-reps`}>Repeticiones realizadas en la serie {setIndex + 1} de {exercise.name}</label>
              <div className="set-input-wrap reps-input"><input id={`${setId}-reps`} type="number" inputMode="numeric" value={setValues[setIndex].reps} onChange={(event) => updateSetValue(setIndex, "reps", event.target.value)} aria-label={`Repeticiones, serie ${setIndex + 1}`} /><span>rep</span></div>
              <button className="set-complete-button" type="button" onClick={() => toggleSet(setId)} aria-pressed={isComplete} aria-label={`${isComplete ? "Desmarcar" : "Marcar"} serie ${setIndex + 1} de ${exercise.name} como completada`}>
                {isComplete ? <Check size={15} strokeWidth={2.7} /> : <span />}
              </button>
            </div>
          })}
        </div>
        <div className="exercise-card-footer"><span><Info size={13} /> {exercise.note}</span></div>
        <div className="exercise-save-row">
          <span aria-live="polite">{hasSavedChanges ? "Cambios guardados" : ""}</span>
          <button className="exercise-save-button" type="button" onClick={() => { onSave(setValues); setHasSavedChanges(true) }}>
            {hasSavedChanges ? <Check size={15} /> : <Save size={15} />}
            {hasSavedChanges ? "Guardado" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </article>
  )
}
