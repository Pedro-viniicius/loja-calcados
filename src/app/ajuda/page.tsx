import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { DetailsAccordion } from "@/components/details-accordion";
import { buildQuestionLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Ajuda",
  description: "Numeração, prazos, trocas, pagamento e contato da Légua.",
};

export default function AjudaPage() {
  return (
    <section className="shell grid gap-10 pt-14 pb-20 md:grid-cols-12 md:gap-14 md:pt-20">
      <div className="md:col-span-4">
        <p className="eyebrow">Ajuda</p>
        <h1 className="display mt-4 text-[length:var(--text-title)]">
          As dúvidas que aparecem antes de pagar.
        </h1>
        <a
          href={buildQuestionLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-14 items-center bg-ink px-8 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Falar no WhatsApp
        </a>
        <p className="mt-3 text-[0.9375rem] text-stone">
          {site.whatsapp.label} · segunda a sábado, 9h às 19h
        </p>
      </div>

      <div className="md:col-span-8">
        <DetailsAccordion
          sections={[
            {
              title: "Como descubro minha numeração?",
              content: (
                <p>
                  Pise numa folha de papel, marque o calcanhar e a ponta do dedo
                  maior e meça a distância com uma régua. Na página de cada
                  modelo há um medidor que converte a medida em numeração. Na
                  dúvida entre dois números, fique com o maior — o bico é largo e
                  o pé incha ao longo do dia.
                </p>
              ),
            },
            {
              title: "E se não servir?",
              content: (
                <p>
                  {site.returnPolicy} Você tem 30 dias para trocar ou devolver,
                  com o sapato sem uso e na caixa. Chame no WhatsApp que a gente
                  organiza a postagem.
                </p>
              ),
            },
            {
              title: "Quanto custa o frete?",
              content: (
                <p>
                  Nada. {site.freeShippingLabel} — o custo já está no preço, para
                  não haver surpresa no fim. {site.shippingEstimate}.
                </p>
              ),
            },
            {
              title: "Como eu pago?",
              content: (
                <p>
                  {site.payment}. Você monta a sacola aqui, confere o pedido no
                  WhatsApp e só então recebe a chave Pix ou o link do cartão.
                  Nenhum dado de pagamento é digitado neste site.
                </p>
              ),
            },
            {
              title: "Por que o pedido termina no WhatsApp?",
              content: (
                <p>
                  Porque a loja é nova e preferimos conferir cada pedido com você
                  — numeração, endereço, prazo — antes de cobrar qualquer coisa.
                  Quando o volume justificar, colocamos checkout automático no
                  site.
                </p>
              ),
            },
            {
              title: "De que material é o sapato?",
              content: (
                <p>
                  Cabedal em material sintético, palmilha forrada e solado de
                  borracha flexível antiderrapante. Cada modelo tem a ficha
                  completa na sua própria página. Não vendemos como couro aquilo
                  que não é.
                </p>
              ),
            },
            {
              title: "Vocês têm avaliações de clientes?",
              content: (
                <p>
                  Ainda não. A loja acabou de abrir. Em vez de inventar
                  depoimento, deixamos o espaço vazio até o primeiro cliente
                  responder — e o que ele escrever entra aqui, elogio ou não.
                </p>
              ),
            },
          ]}
        />

        <p className="mt-10 text-ink-soft">
          Não achou sua dúvida?{" "}
          <a
            href={buildQuestionLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-ink pb-0.5 text-ink"
          >
            Pergunte no WhatsApp
          </a>{" "}
          ou volte para{" "}
          <Link href="/#modelos" className="border-b border-ink pb-0.5 text-ink">
            os modelos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
