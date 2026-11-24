"use client"

import { useState } from "react"
import { Activity, ArrowUpRight, Dumbbell, Flame, Trophy } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { getChartData, lifts, personalRecords, type LiftKey, type PeriodKey } from "@/lib/fitness-demo-data"
import { RankProgressPanel } from "@/components/dashboard/rank-progress-panel"
import { SectionHeading, StatCard } from "@/components/dashboard/shared"

const chartConfig = {
  weight: { label: "Carga", color: "var(--chart-1)" },
} satisfies ChartConfig

const periodOptions: PeriodKey[] = ["1S", "1M", "3M", "1A"]
const periodLabels: Record<PeriodKey, string> = { "1S": "1 sem", "1M": "1 mes", "3M": "3 meses", "1A": "1 año" }

export function ProgressScreen() {
  const [selectedLift, setSelectedLift] = useState<LiftKey>("bench")
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("3M")
  const lift = lifts.find((item) => item.id === selectedLift) ?? lifts[0]
  const data = getChartData(selectedLift, selectedPeriod)
  const minWeight = Math.min(...data.map((point) => point.weight))
  const maxWeight = Math.max(...data.map((point) => point.weight))
  const yDomain: [number, number] = [Math.floor(minWeight / 10) * 10 - 10, Math.ceil(maxWeight / 10) * 10 + 10]
  const yTicks = Array.from({ length: Math.floor((yDomain[1] - yDomain[0]) / 10) + 1 }, (_, index) => yDomain[0] + index * 10)
  const numericChange = Number.parseFloat(lift.change)
  const percentChange = `${((numericChange / (lift.weight - numericChange)) * 100).toFixed(1).replace(".", ",")}%`

  return (
    <div className="screen-stack progress-screen">
      <SectionHeading kicker="TU EVOLUCIÓN, EN DATOS" title="Progreso" description="Cada registro cuenta. Mirá lo que estás construyendo." />

      <div className="stats-grid">
        <StatCard label="PRESS BANCA · 1RM" value="110 kg" detail="+4 kg este mes" icon={Dumbbell} />
        <StatCard label="SENTADILLA · 1RM" value="142 kg" detail="+7 kg este mes" icon={Activity} />
        <StatCard label="PESO MUERTO · 1RM" value="180 kg" detail="+10 kg este mes" icon={Flame} />
        <StatCard label="RÉCORDS PERSONALES" value="08" detail="2 nuevos en noviembre" icon={Trophy} />
      </div>

      <section className="panel chart-panel">
        <div className="chart-panel-header">
          <div><p className="panel-kicker">EVOLUCIÓN DE CARGA · 1RM ESTIMADO</p><h2>{lift.name}</h2></div>
          <div className="chart-current-value"><strong>{lift.weight}<small> kg</small></strong><span><ArrowUpRight size={13} /> {lift.change} <i>·</i> {percentChange}</span></div>
        </div>
        <div className="chart-controls">
          <div className="lift-selector" role="tablist" aria-label="Seleccionar ejercicio">
            {lifts.map((item) => <button key={item.id} role="tab" aria-selected={selectedLift === item.id} onClick={() => setSelectedLift(item.id)} className={selectedLift === item.id ? "active" : ""}>{item.name}</button>)}
          </div>
          <div className="period-selector" aria-label="Período del gráfico">
            {periodOptions.map((period) => <button key={period} aria-pressed={selectedPeriod === period} onClick={() => setSelectedPeriod(period)} className={selectedPeriod === period ? "active" : ""}>{periodLabels[period]}</button>)}
          </div>
        </div>
        <div className="chart-frame">
          <div className="chart-y-label">KG</div>
          <ChartContainer config={chartConfig} className="strength-chart">
            <AreaChart accessibilityLayer data={data} margin={{ top: 14, right: 12, left: 2, bottom: 0 }}>
              <defs>
                <linearGradient id="strengthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-weight)" stopOpacity={0.24} />
                  <stop offset="92%" stopColor="var(--color-weight)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,.07)" strokeDasharray="3 5" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={12} minTickGap={26} />
              <YAxis tickLine={false} axisLine={false} tickMargin={9} width={38} domain={yDomain} ticks={yTicks} allowDecimals={false} tickFormatter={(value) => `${value}`} />
              <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => `Sesión · ${label}`} formatter={(value) => [`${value} kg`, "Carga"]} />} />
              <Area type="monotone" dataKey="weight" stroke="var(--color-weight)" strokeWidth={2.5} fill="url(#strengthFill)" activeDot={{ r: 5, fill: "var(--color-weight)", stroke: "#101310", strokeWidth: 2 }} dot={false} />
            </AreaChart>
          </ChartContainer>
          <div className="chart-latest-marker"><span /><small>ÚLTIMO REGISTRO</small></div>
        </div>
        <div className="chart-legend-row"><span><i className="legend-line" /> Carga máxima registrada</span><span>La línea representa el mejor registro por sesión</span></div>
      </section>

      <div className="progress-bottom-grid">
        <section className="panel records-panel">
          <div className="panel-heading-row"><div><p className="panel-kicker">MARCAS PERSONALES</p><h2>Últimos récords</h2></div><span className="record-count">03</span></div>
          <div className="records-list">{personalRecords.map((record) => <div className="record-row" key={record.name}>
            <span className="record-medal"><Trophy size={15} /></span><span className="record-name">{record.name}<small>{record.date}</small></span><strong>{record.value}<small>{record.change}</small></strong><span className="record-up"><ArrowUpRight size={15} /></span>
          </div>)}</div>
        </section>
        <section className="panel strength-total-panel">
          <p className="panel-kicker">SUMA DE FUERZA · 3 EJERCICIOS</p>
          <div className="strength-total"><strong>432</strong><span>kg</span></div>
          <div className="strength-total-delta"><ArrowUpRight size={14} /> +21 kg <span>en los últimos 90 días</span></div>
          <div className="stacked-strength-bar" aria-label="Contribución: press banca 25 por ciento, sentadilla 33 por ciento, peso muerto 42 por ciento"><span className="bar-bench" /><span className="bar-squat" /><span className="bar-deadlift" /></div>
          <div className="strength-legend"><span><i className="dot-bench" /> Banca <b>25%</b></span><span><i className="dot-squat" /> Sentadilla <b>33%</b></span><span><i className="dot-deadlift" /> Peso muerto <b>42%</b></span></div>
        </section>
      </div>

      <div className="progress-rank-layout">
        <RankProgressPanel />
        <section className="panel rank-explainer-panel">
          <div className="panel-heading-row"><div><p className="panel-kicker">CÓMO SE CALCULA</p><h2>Fuerza equilibrada</h2></div><span className="panel-icon"><Dumbbell size={17} /></span></div>
          <p className="rank-explainer-copy">El rango toma en cuenta tu <strong>1RM relativo al peso corporal</strong> en los tres levantamientos. No alcanza con un solo récord.</p>
          <div className="ratio-list">{lifts.map((item) => <div key={item.id}><span>{item.name}</span><strong>{item.ratio}</strong><span className="ratio-target">Objetivo {item.exampleTarget}</span></div>)}</div>
        </section>
      </div>
    </div>
  )
}
