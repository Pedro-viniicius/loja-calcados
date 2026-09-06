/**
 * Catálogo do MVP — dois produtos, escritos à mão.
 *
 * Estrutura pensada para crescer: para adicionar um produto basta acrescentar
 * um objeto a `products`. Quando houver backend, este módulo vira o adaptador
 * (mesma interface `Product`, outra origem de dados).
 *
 * ATENÇÃO — campos marcados com `// hipótese` não são verificáveis nas fotos
 * do fornecedor. Confirmar antes de publicar.
 */

export type Size = 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44;

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  /** Nome curto do modelo, usado como título. */
  name: string;
  /** Cor, exibida junto ao nome. */
  color: string;
  /** O papel que este par cumpre no guarda-roupa. É o coração da curadoria. */
  role: string;
  /** Uma linha. O benefício que justifica a compra. */
  headline: string;
  /** Dois a três períodos, tom editorial, sem jargão técnico. */
  description: string;
  priceCents: number;
  sizes: Size[];
  /** Numerações disponíveis para pronta entrega. */
  sizesInStock: Size[];
  images: ProductImage[];
  /** Benefícios sentidos no pé — vêm antes da ficha técnica. */
  benefits: { title: string; body: string }[];
  /** Ficha técnica, escondida em acordeão por padrão. */
  specs: { label: string; value: string }[];
  /** Referência de fábrica, para conferência de pedido. */
  supplierRef: string;
};

export const products: Product[] = [
  {
    slug: "turno-preto",
    name: "Turno",
    color: "Preto",
    role: "O par do expediente",
    headline: "Ventilação no cabedal inteiro, para o turno que não acaba.",
    description:
      "O preto é o par que cumpre uniforme sem chamar atenção. O cabedal é perfurado de ponta a ponta — não é enfeite, é o ar entrando enquanto você fica em pé. O elástico lateral deixa calçar e tirar sem se abaixar, e o bico largo dá espaço para o pé que incha ao longo do dia.",
    priceCents: 8990,
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    sizesInStock: [37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      { src: "/produtos/turno-01-par.jpg", alt: "Par do mocassim Turno preto visto de cima, mostrando o cabedal perfurado e o elástico lateral" },
      { src: "/produtos/turno-02-caixa.jpg", alt: "Mocassim Turno preto de perfil, apoiado sobre a caixa" },
      { src: "/produtos/turno-03-angulo.jpg", alt: "Mocassim Turno preto em três quartos, com o adorno metálico em destaque" },
      { src: "/produtos/turno-04-solado.jpg", alt: "Solado de borracha preta do Turno, com desenho antiderrapante em espinha" },
    ],
    benefits: [
      { title: "Respira o dia inteiro", body: "Perfurações nas laterais e no bico. O pé sai do turno seco." },
      { title: "Calça sem cadarço", body: "Elástico nas duas laterais. Entra e sai com o pé, sem abaixar." },
      { title: "Bico largo", body: "Forma ampla na frente. Nenhuma pressão nos dedos ao fim do dia." },
    ],
    specs: [
      { label: "Tipo", value: "Mocassim slip-on, cano baixo" },
      { label: "Cabedal", value: "Material sintético perfurado" }, // hipótese — confirmar com o fornecedor
      { label: "Fechamento", value: "Elástico lateral, sem cadarço" },
      { label: "Palmilha", value: "Forrada, acolchoada" },
      { label: "Solado", value: "Borracha flexível antiderrapante" },
      { label: "Cor", value: "Preto" },
    ],
    supplierRef: "Chilawak Z.6970",
  },
  {
    slug: "folga-cafe",
    name: "Folga",
    color: "Café",
    role: "O par de sair",
    headline: "O mesmo conforto, com cara de sábado.",
    description:
      "Mesma forma, mesmo solado, outra intenção. O café tem costura mocassim aparente e um brilho acetinado que o tira do uniforme e leva para o almoço de domingo, para a igreja, para o aniversário. É o par que você calça quando o dia é seu.",
    priceCents: 8990,
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    sizesInStock: [37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      { src: "/produtos/folga-01-par.jpg", alt: "Par do mocassim Folga café visto de cima, com costura mocassim aparente" },
      { src: "/produtos/folga-02-caixa.jpg", alt: "Mocassim Folga café apoiado sobre a caixa preta" },
      { src: "/produtos/folga-03-lateral.jpg", alt: "Mocassim Folga café de perfil, mostrando o elástico lateral" },
      { src: "/produtos/folga-06-solado.jpg", alt: "Solado de borracha do Folga, com desenho antiderrapante" },
    ],
    benefits: [
      { title: "Costura aparente", body: "O acabamento mocassim dá ao par um ar feito à mão." },
      { title: "Calça sem cadarço", body: "Elástico nas duas laterais. Pronto para sair em cinco segundos." },
      { title: "Solado que dobra", body: "Borracha flexível. O pé anda, o sapato acompanha." },
    ],
    specs: [
      { label: "Tipo", value: "Mocassim slip-on, cano baixo" },
      { label: "Cabedal", value: "Material sintético com acabamento acetinado" }, // hipótese — confirmar com o fornecedor
      { label: "Fechamento", value: "Elástico lateral, sem cadarço" },
      { label: "Palmilha", value: "Forrada, acolchoada" },
      { label: "Solado", value: "Borracha flexível antiderrapante" },
      { label: "Cor", value: "Café" },
    ],
    supplierRef: "Chilawak 1050",
  },
];

/** O kit é o único incentivo comercial do MVP. Ver docs/ESTRATEGIA.md, Etapa 8. */
export const bundle = {
  slug: "par-de-pares",
  name: "O Par de Pares",
  headline: "Os dois modelos, um para cada metade da sua semana.",
  priceCents: 15900,
  get savingsCents() {
    return products.reduce((total, p) => total + p.priceCents, 0) - this.priceCents;
  },
};

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOtherProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug !== slug);
}

/** Tabela de conversão pé → numeração. Resolve a objeção nº 1 do público. */
export const sizeChart: { size: Size; footCm: string }[] = [
  { size: 37, footCm: "23,5" },
  { size: 38, footCm: "24,2" },
  { size: 39, footCm: "25,0" },
  { size: 40, footCm: "25,8" },
  { size: 41, footCm: "26,5" },
  { size: 42, footCm: "27,3" },
  { size: 43, footCm: "28,0" },
  { size: 44, footCm: "28,8" },
];
