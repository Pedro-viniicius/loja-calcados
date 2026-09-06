export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

/** "R$ 89,90 ou 3x de R$ 29,97" — parcelamento exibido sem juros no MVP. */
export function formatInstallment(cents: number, parts = 3): string {
  return `${parts}x de ${formatPrice(Math.ceil(cents / parts))}`;
}
