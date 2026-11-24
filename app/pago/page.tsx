import type { Metadata } from "next"
import { PaymentScreen } from "@/components/dashboard/payment-screen"

export const metadata: Metadata = {
  title: "Pagar cuota | Inner Strength",
  description: "Consultá las opciones para abonar tu cuota de Inner Strength.",
}

export default function PaymentPage() {
  return <PaymentScreen />
}
