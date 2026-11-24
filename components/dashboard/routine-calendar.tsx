import { Check } from "lucide-react"
import { routineCalendarWeeks } from "@/lib/fitness-demo-data"

export function RoutineCalendar({
  completedDayIds,
  onToggleDay,
}: {
  completedDayIds: ReadonlySet<string>
  onToggleDay: (dayId: string) => void
}) {
  return (
    <table className="routine-calendar">
      <caption className="sr-only">
        Calendario de octubre y noviembre de 2026. Selecciona una fecha de entrenamiento para marcarla como completada.
      </caption>
      <thead>
        <tr>
          {routineCalendarWeeks[0].days.map((day) => (
            <th scope="col" aria-label={day.weekdayName} key={day.weekday}>{day.weekday}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {routineCalendarWeeks.map(({ weekNumber, days }) => (
            <tr key={weekNumber}>
              {days.map((day) => {
                const isComplete = completedDayIds.has(day.id)

                return (
                  <td key={day.id}>
                    {day.isWorkoutDay ? (
                      <button
                        type="button"
                        className={`routine-day-button session-day ${isComplete ? "is-complete" : ""}`}
                        aria-label={`${isComplete ? "Desmarcar" : "Marcar"} entrenamiento del ${day.weekdayName} ${day.date} de ${day.month}, semana ${weekNumber}`}
                        aria-pressed={isComplete}
                        onClick={() => onToggleDay(day.id)}
                      >
                        <span>{day.date}</span>
                        {isComplete && <Check className="routine-day-check" aria-hidden="true" />}
                      </button>
                    ) : (
                      <span className="calendar-rest-day" aria-label={`${day.weekdayName}, ${day.date} de ${day.month}`}>
                        {day.date}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
        ))}
      </tbody>
    </table>
  )
}
