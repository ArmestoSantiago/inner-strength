"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, CreditCard, MessageCircle, Wallet } from "lucide-react"
import { SectionHeading } from "@/components/dashboard/shared"

const paymentAlias = "agus.elputo.69"
const receiptLink = "https://wa.me/5493462666666?text=Hola%2C%20te%20env%C3%ADo%20el%20comprobante%20de%20la%20cuota"

export function PaymentScreen() {
  const [copied, setCopied] = useState(false)

  async function copyAlias() {
    try {
      await navigator.clipboard.writeText(paymentAlias)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="payment-page screen-stack">
      <Link className="payment-back-link" href="/">
        <ArrowLeft size={16} /> Volver al perfil
      </Link>

      <SectionHeading
        kicker="MEMBRESÍA · INNER STRENGTH"
        title="Pagar cuota"
        description="Elegí la forma que te quede más cómoda para mantener tu membresía al día."
      />

      <section className="panel payment-method-card">
        <span className="payment-method-icon"><CreditCard size={20} /></span>
        <p className="panel-kicker">TRANSFERENCIA BANCARIA</p>
        <h2>Transferí a este alias</h2>
        <p className="payment-method-description">Cuando termines, mandá el comprobante para que podamos registrarlo.</p>

        <div className="payment-alias-box">
          <div><span>ALIAS</span><strong>{paymentAlias}</strong></div>
          <button className="copy-alias-button" type="button" onClick={copyAlias} aria-label="Copiar alias de transferencia">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado" : "Copiar alias"}
          </button>
        </div>
        <p className="payment-copy-status" role="status">{copied ? "Alias copiado al portapapeles." : ""}</p>

        <a className="receipt-button" href={receiptLink} target="_blank" rel="noreferrer">
          <MessageCircle size={17} /> Enviar comprobante al 3462666666
        </a>
      </section>

      <section className="panel payment-cash-card">
        <span className="payment-method-icon"><Wallet size={20} /></span>
        <div>
          <p className="panel-kicker">PAGO EN EFECTIVO</p>
          <h2>También podés pagar en el gimnasio</h2>
          <p>Acercate a recepción y aboná tu cuota en efectivo.</p>
        </div>
      </section>

      <p className="payment-help-note">Si ya realizaste el pago, conservá el comprobante hasta que quede registrado.</p>
    </main>
  )
}
