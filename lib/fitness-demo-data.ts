export type SectionKey = "inicio" | "rutina" | "progreso" | "perfil"
export type LiftKey = "bench" | "squat" | "deadlift"
export type PeriodKey = "1S" | "1M" | "3M" | "1A"

export const member = {
  firstName: "Agustin",
  fullName: "Agustin",
  bodyweight: 80.4,
  height: "1,78 m",
  joined: "18 abr 2023",
  rank: "Omega",
}

export const lifts: Array<{
  id: LiftKey
  name: string
  weight: number
  ratio: string
  change: string
  exampleTarget: string
  progress: number
}> = [
  { id: "bench", name: "Press banca", weight: 110, ratio: "1,37×", change: "+4 kg", exampleTarget: "1,50×", progress: 82 },
  { id: "squat", name: "Sentadilla", weight: 142, ratio: "1,77×", change: "+7 kg", exampleTarget: "1,90×", progress: 76 },
  { id: "deadlift", name: "Peso muerto", weight: 180, ratio: "2,24×", change: "+10 kg", exampleTarget: "2,40×", progress: 88 },
]

export const routineDays = [
  {
    id: "day-1",
    label: "Día 1",
    shortLabel: "LUN",
    focus: "Pecho y tríceps",
    exercises: [
      { id: "press-banca", name: "Press de banca", muscle: "Pecho · compuesto", sets: 4, reps: "8", target: 82.5, rest: "120 s", note: "Controlá la bajada. Pausa breve en el pecho." },
      { id: "press-inclinado", name: "Press inclinado con mancuernas", muscle: "Pecho superior", sets: 3, reps: "10", target: 26, rest: "90 s", note: "Mantené las escápulas estables." },
      { id: "aperturas", name: "Aperturas en polea", muscle: "Pecho · aislamiento", sets: 3, reps: "12", target: 17.5, rest: "60 s", note: "Buscá un recorrido amplio, sin perder tensión." },
      { id: "triceps", name: "Extensión de tríceps", muscle: "Tríceps", sets: 3, reps: "12", target: 25, rest: "60 s", note: "Codos quietos durante todo el movimiento." },
    ],
  },
  {
    id: "day-2",
    label: "Día 2",
    shortLabel: "MAR",
    focus: "Espalda y bíceps",
    exercises: [
      { id: "peso-muerto", name: "Peso muerto", muscle: "Espalda · compuesto", sets: 3, reps: "5", target: 140, rest: "180 s", note: "Tomá aire y afirmá el abdomen antes de cada repetición." },
      { id: "remo-barra", name: "Remo con barra", muscle: "Espalda media", sets: 4, reps: "8", target: 62.5, rest: "120 s", note: "Llevá los codos hacia la cadera." },
      { id: "jalon", name: "Jalón al pecho", muscle: "Dorsales", sets: 3, reps: "10", target: 55, rest: "90 s", note: "Evitá balancear el torso." },
      { id: "curl", name: "Curl de bíceps", muscle: "Bíceps", sets: 3, reps: "12", target: 14, rest: "60 s", note: "Controlá el regreso, sin impulso." },
    ],
  },
  {
    id: "day-3",
    label: "Día 3",
    shortLabel: "JUE",
    focus: "Piernas y core",
    exercises: [
      { id: "sentadilla", name: "Sentadilla trasera", muscle: "Cuádriceps · compuesto", sets: 4, reps: "6", target: 105, rest: "180 s", note: "Mantené una profundidad cómoda y consistente." },
      { id: "rumano", name: "Peso muerto rumano", muscle: "Isquiotibiales", sets: 3, reps: "10", target: 72.5, rest: "120 s", note: "Cadera atrás y espalda neutra." },
      { id: "prensa", name: "Prensa de piernas", muscle: "Cuádriceps", sets: 3, reps: "12", target: 140, rest: "90 s", note: "No bloquees las rodillas al extender." },
    ],
  },
  {
    id: "day-4",
    label: "Día 4",
    shortLabel: "SÁB",
    focus: "Hombros y brazos",
    exercises: [
      { id: "press-militar", name: "Press militar", muscle: "Hombros · compuesto", sets: 4, reps: "8", target: 42.5, rest: "120 s", note: "Apretá glúteos y abdomen para estabilizar." },
      { id: "elevaciones", name: "Elevaciones laterales", muscle: "Deltoides", sets: 3, reps: "15", target: 8, rest: "60 s", note: "Subí hasta la línea de los hombros." },
      { id: "face-pull", name: "Face pull", muscle: "Deltoides posterior", sets: 3, reps: "15", target: 20, rest: "60 s", note: "Separá las manos al final del recorrido." },
    ],
  },
]

const chartValues: Record<LiftKey, number[]> = {
  bench: [92.5, 95, 97.5, 97.5, 100, 102.5, 102.5, 105, 107.5, 107.5, 110],
  squat: [120, 122.5, 125, 127.5, 127.5, 130, 132.5, 135, 137.5, 140, 142],
  deadlift: [150, 155, 157.5, 160, 165, 167.5, 170, 172.5, 175, 177.5, 180],
}

const chartDates = ["02 sep", "11 sep", "19 sep", "28 sep", "07 oct", "16 oct", "25 oct", "03 nov", "11 nov", "16 nov", "22 nov"]
const monthDates = ["25 oct", "01 nov", "08 nov", "15 nov", "22 nov"]
const yearDates = ["nov 25", "ene 26", "mar 26", "may 26", "jul 26", "sep 26", "oct 26", "nov 26"]
const yearValues: Record<LiftKey, number[]> = {
  bench: [75, 77.5, 80, 85, 87.5, 92.5, 102.5, 110],
  squat: [100, 105, 110, 115, 120, 127.5, 137.5, 142],
  deadlift: [130, 135, 140, 145, 150, 160, 172.5, 180],
}

export function getChartData(lift: LiftKey, period: PeriodKey) {
  if (period === "1S") {
    return [8, 9, 10].map((index, item) => ({
      date: ["17 nov", "19 nov", "22 nov"][item],
      weight: chartValues[lift][index],
    }))
  }

  if (period === "1M") {
    return [6, 7, 8, 9, 10].map((index, item) => ({
      date: monthDates[item],
      weight: chartValues[lift][index],
    }))
  }

  if (period === "1A") {
    return yearDates.map((date, index) => ({ date, weight: yearValues[lift][index] }))
  }

  return chartDates.map((date, index) => ({ date, weight: chartValues[lift][index] }))
}

export const rankSteps = [
  { name: "Cachorro", state: "done" },
  { name: "Beta", state: "done" },
  { name: "Omega", state: "current" },
  { name: "Alfa", state: "next" },
]

export const personalRecords = [
  { name: "Peso muerto", value: "180 kg", date: "22 nov 2026", change: "+10 kg" },
  { name: "Sentadilla", value: "142 kg", date: "18 nov 2026", change: "+7 kg" },
  { name: "Press banca", value: "110 kg", date: "14 nov 2026", change: "+4 kg" },
]

const routineCalendarWeekdays = [
  { shortLabel: "L", label: "lunes", routineLabel: "LUN" },
  { shortLabel: "M", label: "martes", routineLabel: "MAR" },
  { shortLabel: "X", label: "miércoles", routineLabel: "MIE" },
  { shortLabel: "J", label: "jueves", routineLabel: "JUE" },
  { shortLabel: "V", label: "viernes", routineLabel: "VIE" },
  { shortLabel: "S", label: "sábado", routineLabel: "SÁB" },
  { shortLabel: "D", label: "domingo", routineLabel: "DOM" },
] as const

const routineWorkoutDayIndexes = new Set(
  routineDays.flatMap((day) => {
    const weekdayIndex = routineCalendarWeekdays.findIndex((weekday) => weekday.routineLabel === day.shortLabel)
    return weekdayIndex >= 0 ? [weekdayIndex] : []
  })
)

const monthNames: Record<number, { name: string; shortName: string }> = {
  9: { name: "octubre", shortName: "oct" },
  10: { name: "noviembre", shortName: "nov" },
}

export const routineWeekCount = 4
export const routineDaysPerWeek = routineDays.length

export const routineCalendarWeeks = Array.from({ length: routineWeekCount }, (_, weekIndex) => ({
  weekNumber: weekIndex + 1,
  days: Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(2026, 9, 26 + weekIndex * 7 + dayIndex, 12)
    const month = monthNames[date.getMonth()]
    const weekday = routineCalendarWeekdays[dayIndex]
    const id = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

    return {
      id,
      dayIndex,
      weekday: weekday.shortLabel,
      weekdayName: weekday.label,
      date: date.getDate(),
      month: month.name,
      monthShort: month.shortName,
      isWorkoutDay: routineWorkoutDayIndexes.has(dayIndex),
    }
  }),
}))

export const initialCompletedRoutineDayIds = routineCalendarWeeks.flatMap(({ weekNumber, days }) =>
  days
    .filter((day) => day.isWorkoutDay && (weekNumber < routineWeekCount || day.dayIndex < 5))
    .map((day) => day.id)
)

export type RoutineWeekProgress = {
  weekNumber: number
  completedTrainingDays: number
  isComplete: boolean
}

export type RoutineProgress = {
  completedWeeks: number
  currentWeek: number
  currentWeekCompletedDays: number
  isComplete: boolean
  weeks: RoutineWeekProgress[]
}

export function getRoutineProgress(completedDayIds: ReadonlySet<string>): RoutineProgress {
  const weeks = routineCalendarWeeks.map(({ weekNumber, days }) => {
    const completedTrainingDays = days.filter((day) => day.isWorkoutDay && completedDayIds.has(day.id)).length

    return {
      weekNumber,
      completedTrainingDays,
      isComplete: completedTrainingDays >= routineDaysPerWeek,
    }
  })
  const completedWeeks = weeks.filter((week) => week.isComplete).length
  const currentWeek = weeks.find((week) => !week.isComplete) ?? weeks[weeks.length - 1]

  return {
    completedWeeks,
    currentWeek: currentWeek.weekNumber,
    currentWeekCompletedDays: currentWeek.completedTrainingDays,
    isComplete: completedWeeks === routineWeekCount,
    weeks,
  }
}
