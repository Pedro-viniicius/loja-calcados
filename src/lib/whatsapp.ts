import { site } from "@/data/site";
import { formatPrice } from "./format";

export type OrderLine = {
  name: string;
  color: string;
  size: number;
  quantity: number;
  priceCents: number;
};

/**
 * Checkout do MVP: em vez de gateway, montamos a mensagem do pedido e
 * entregamos ao WhatsApp. A operação é manual de propósito — ver
 * docs/ESTRATEGIA.md, Etapa 8.
 *
 * Quando houver checkout real, só este módulo precisa mudar.
 */
export function buildOrderLink(
  lines: OrderLine[],
  totalCents: number,
  discountCents = 0,
): string {
  const items = lines
    .map(
      (l) =>
        `• ${l.name} ${l.color} — nº ${l.size}${l.quantity > 1 ? ` (${l.quantity}x)` : ""} — ${formatPrice(l.priceCents * l.quantity)}`,
    )
    .join("\n");

  const message = [
    "Olá! Quero fechar este pedido na Légua:",
    "",
    items,
    ...(discountCents > 0
      ? ["", `Kit O Par de Pares: −${formatPrice(discountCents)}`]
      : []),
    "",
    `Total: ${formatPrice(totalCents)} (frete grátis)`,
  ].join("\n");

  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Link de dúvida, sem pedido montado. */
export function buildQuestionLink(context?: string): string {
  const message = context
    ? `Olá! Tenho uma dúvida sobre o modelo ${context}.`
    : "Olá! Tenho uma dúvida sobre os modelos da Légua.";
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
