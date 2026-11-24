"use client"

import { useState } from "react"
import {
  Activity,
  Bell,
  ChartNoAxesCombined,
  Dumbbell,
  Home,
  UserRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  getRoutineProgress,
  initialCompletedRoutineDayIds,
  member,
  type SectionKey,
} from "@/lib/fitness-demo-data"
import { OverviewScreen } from "@/components/dashboard/overview-screen"
import { ProfileScreen } from "@/components/dashboard/profile-screen"
import { ProgressScreen } from "@/components/dashboard/progress-screen"
import { RoutineScreen, type ExerciseSetValue, type SavedExerciseValues } from "@/components/dashboard/routine-screen"

const navigation: Array<{ id: SectionKey; label: string; icon: LucideIcon }> = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "rutina", label: "Mi rutina", icon: Dumbbell },
  { id: "progreso", label: "Progreso", icon: ChartNoAxesCombined },
  { id: "perfil", label: "Mi perfil", icon: UserRound },
]

const logoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inner%20Strength%20-%20Logo_8%403x-100-lag0NDFkMCqhf80RD7WXmGsIE6RfJJ.jpg"

export function InnerStrengthApp() {
  const [activeSection, setActiveSection] = useState<SectionKey>("inicio")
  const [completedSets, setCompletedSets] = useState<Set<string>>(
    () => new Set(["press-banca-1", "press-banca-2", "press-inclinado-1"])
  )
  const [completedRoutineDays, setCompletedRoutineDays] = useState<Set<string>>(
    () => new Set(initialCompletedRoutineDayIds)
  )
  const [savedExerciseValues, setSavedExerciseValues] = useState<SavedExerciseValues>({})
  const routineProgress = getRoutineProgress(completedRoutineDays)

  function toggleRoutineDay(dayId: string) {
    setCompletedRoutineDays((current) => {
      const next = new Set(current)
      if (next.has(dayId)) next.delete(dayId)
      else next.add(dayId)
      return next
    })
  }

  function toggleSet(setId: string) {
    setCompletedSets((current) => {
      const next = new Set(current)
      if (next.has(setId)) next.delete(setId)
      else next.add(setId)
      return next
    })
  }

  function saveExerciseValues(exerciseId: string, values: ExerciseSetValue[]) {
    setSavedExerciseValues((current) => ({ ...current, [exerciseId]: values.map((value) => ({ ...value })) }))
  }

  const activeLabel = navigation.find((item) => item.id === activeSection)?.label ?? "Inicio"

  return (
    <div className="app-shell">
      <aside className="desktop-sidebar" aria-label="Navegación principal">
        <a className="brand-lockup" href="#inicio" onClick={() => setActiveSection("inicio")} aria-label="Inner Strength, ir a inicio">
          <span className="brand-logo"><img src={logoUrl} alt="" /></span>
          <span className="brand-copy"><strong>INNER STRENGTH</strong><small>MEMBER CLUB</small></span>
        </a>

        <div className="sidebar-label">MENÚ</div>
        <nav className="sidebar-nav">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              className={`nav-item ${activeSection === id ? "active" : ""}`}
              key={id}
              onClick={() => setActiveSection(id)}
              aria-current={activeSection === id ? "page" : undefined}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {id === "progreso" && <span className="nav-live-dot" aria-label="Hay nuevos récords" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-challenge">
          <div className="challenge-topline"><Activity size={14} /> <span>RUTINA · 4 SEMANAS</span></div>
          <strong>{routineProgress.completedWeeks} <span>/ 4 semanas</span></strong>
          <p>{routineProgress.isComplete ? "Rutina completada." : "Semanas completas de rutina."}</p>
        </div>

        <button className="sidebar-profile" onClick={() => setActiveSection("perfil")}>
          <span className="member-avatar" aria-hidden="true">A</span>
          <span><strong>{member.fullName}</strong><small>Alumno Omega</small></span>
          <span className="profile-menu-dot" aria-hidden="true">···</span>
        </button>
      </aside>

      <div className="app-main-column">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="brand-logo"><img src={logoUrl} alt="" /></span>
            <span className="brand-copy"><strong>INNER STRENGTH</strong><small>MEMBER CLUB</small></span>
          </div>
          <div className="topbar-context"><span>ALUMNO</span><span className="topbar-slash">/</span><strong>{activeLabel}</strong></div>
          <div className="topbar-actions">
            <span className="topbar-date">DOMINGO, 22 NOV 2026</span>
            <button className="icon-button notification-button" aria-label="Notificaciones">
              <Bell size={18} strokeWidth={1.8} />
              <span className="notification-dot" />
            </button>
            <button className="topbar-avatar" onClick={() => setActiveSection("perfil")} aria-label={`Ver perfil de ${member.fullName}`}>
              <span className="member-avatar" aria-hidden="true">A</span>
            </button>
          </div>
        </header>

        <main className="main-content" id={activeSection}>
          {activeSection === "inicio" && (
            <OverviewScreen
              onNavigate={setActiveSection}
              completedSets={completedSets.size}
              completedRoutineDays={completedRoutineDays}
              onToggleRoutineDay={toggleRoutineDay}
              routineProgress={routineProgress}
            />
          )}
          {activeSection === "rutina" && <RoutineScreen completedSets={completedSets} toggleSet={toggleSet} savedExerciseValues={savedExerciseValues} saveExerciseValues={saveExerciseValues} />}
          {activeSection === "progreso" && <ProgressScreen />}
          {activeSection === "perfil" && <ProfileScreen />}
        </main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Navegación principal">
        {navigation.map(({ id, label, icon: Icon }) => (
          <button
            className={`mobile-nav-item ${activeSection === id ? "active" : ""}`}
            key={id}
            onClick={() => setActiveSection(id)}
            aria-current={activeSection === id ? "page" : undefined}
          >
            <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
