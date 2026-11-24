import Link from "next/link"
import { ArrowUpRight, CalendarDays, ChevronRight, CreditCard, Crown, Ruler, Scale, Settings2, ShieldCheck, Trophy, UserRound } from "lucide-react"
import { member, personalRecords } from "@/lib/fitness-demo-data"
import { RankEmblem, SectionHeading } from "@/components/dashboard/shared"

export function ProfileScreen() {
  const today = new Date()
  const nextDueDate = new Date(today.getFullYear(), today.getMonth(), 10, 12)
  if (today.getDate() > 10) nextDueDate.setMonth(nextDueDate.getMonth() + 1)
  const todayAtNoon = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12)
  const daysUntilDue = Math.max(0, Math.round((nextDueDate.getTime() - todayAtNoon.getTime()) / 86_400_000))
  const dueMonth = new Intl.DateTimeFormat("es-AR", { month: "short" }).format(nextDueDate).replace(".", "").toUpperCase()
  return (
    <div className="screen-stack profile-screen">
      <SectionHeading kicker="TU ESPACIO PERSONAL" title="Mi perfil" description="Tu recorrido, tus datos y cada marca que te ganaste." action={<button className="icon-button settings-button" aria-label="Configuración de perfil"><Settings2 size={17} /></button>} />

      <section className="panel profile-hero">
        <div className="profile-cover-glow" aria-hidden="true" />
        <div className="profile-identity">
          <div className="profile-photo-wrap"><span className="member-avatar" aria-hidden="true">A</span><span className="profile-status" /></div>
          <div className="profile-name-block"><span className="member-since">SOCIO DESDE {member.joined.toUpperCase()}</span><h2>{member.fullName}</h2><p>Entrenando para ser más fuerte. Cada semana.</p></div>
        </div>
        <div className="profile-rank-badge"><RankEmblem /><span><small>RANGO ACTUAL</small><strong>OMEGA</strong><i><Crown size={11} /> NIVEL 03</i></span></div>
        <div className="profile-quick-stats">
          <div><span><Scale size={14} /> Peso actual</span><strong>{member.bodyweight.toFixed(1).replace(".", ",")}<small> kg</small></strong><i>−0,6 kg este mes</i></div>
          <div><span><Ruler size={14} /> Altura</span><strong>{member.height}</strong><i>Última actualización · 15 nov</i></div>
          <div><span><CalendarDays size={14} /> Fecha de ingreso</span><strong>18.04.23</strong><i>Miembro desde hace 3 años</i></div>
        </div>
      </section>

      <div className="profile-content-grid">
        <section className="panel profile-records-panel">
          <div className="panel-heading-row"><div><p className="panel-kicker">TU HISTORIAL</p><h2>Marcas personales</h2></div><button className="text-action">Ver historial <ChevronRight size={14} /></button></div>
          <div className="profile-records-list">{personalRecords.map((record, index) => <article className="profile-record-card" key={record.name}>
            <span className="profile-record-icon">{index === 0 ? <Trophy size={16} /> : <ShieldCheck size={16} />}</span>
            <div className="profile-record-copy"><span>{record.name}</span><small>Mejor marca · {record.date}</small></div>
            <strong>{record.value}</strong><span className="record-gain"><ArrowUpRight size={12} />{record.change}</span>
          </article>)}</div>
        </section>

        <aside className="profile-side-stack">
          <section className="panel membership-card">
            <div className="membership-card-top"><span className="panel-kicker">MEMBRESÍA</span><span className="membership-active"><i /> ACTIVA</span></div>
            <div className="membership-mark"><span className="brand-logo"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Inner%20Strength%20-%20Logo_8%403x-100-lag0NDFkMCqhf80RD7WXmGsIE6RfJJ.jpg" alt="" /></span><div><small>INNER STRENGTH</small><strong>Socio fundador</strong></div></div>
            <div className="membership-due">
              <div><span>PRÓXIMO VENCIMIENTO</span><strong>10 {dueMonth}</strong></div>
              <p>La cuota vence el día 10 de cada mes.</p>
              <b>{daysUntilDue === 0 ? "Vence hoy" : `Faltan ${daysUntilDue} días`}</b>
            </div>
            <Link className="membership-pay-button" href="/pago"><CreditCard size={16} /> Pagar cuota <ChevronRight size={16} /></Link>
            <div className="membership-card-bottom"><span>ID SOCIO <b>IS-02384</b></span><span>RENOVACIÓN <b>10 {dueMonth}</b></span></div>
            <button className="profile-settings-row"><span className="settings-row-icon"><UserRound size={16} /></span><span><strong>Datos personales</strong><small>Información y preferencias</small></span><ChevronRight size={16} /></button>
          </section>
        </aside>
      </div>
    </div>
  )
}
