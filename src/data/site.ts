/**
 * Configuração da loja.
 * Ponto único de ajuste para nome, contato e regras comerciais do MVP.
 */
export const site = {
  name: "Légua",
  tagline: "Calçados para quem passa o dia em pé.",
  description:
    "Dois mocassins sem cadarço, de bico largo e solado flexível, para quem fica de pé oito, dez, doze horas por dia.",
  url: "https://legua.example.com",

  /** Checkout do MVP: o pedido é fechado por WhatsApp, sem backend. */
  whatsapp: {
    // TODO: trocar pelo número real antes de publicar (formato: 55DDDNÚMERO).
    number: "5535999999999",
    label: "(35) 99999-9999",
  },

  freeShippingLabel: "Frete grátis para todo o Brasil",
  shippingEstimate: "Envio em até 2 dias úteis · 3 a 9 dias para chegar",
  returnPolicy: "30 dias para trocar. A primeira troca de numeração é por nossa conta.",
  payment: "Pix ou cartão em até 3x, por link seguro",
} as const;

export const navigation = [
  { href: "/#modelos", label: "Os modelos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/ajuda", label: "Ajuda" },
] as const;
