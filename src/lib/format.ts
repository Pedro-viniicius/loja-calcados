export function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

/** "R$ 169,00 ou 3x de R$ 56,33" — parcelamento exibido sem juros no MVP. */
export function formatInstallment(cents: number, parts = 3): string {
  return `${parts}x de ${formatPrice(Math.ceil(cents / parts))}`;
}
