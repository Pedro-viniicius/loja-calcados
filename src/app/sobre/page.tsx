import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Por que a Légua vende só dois modelos de sapato, e para quem eles foram escolhidos.",
};

export default function SobrePage() {
  return (
    <>
      <section className="shell grid gap-10 pt-14 pb-16 md:grid-cols-12 md:gap-14 md:pt-20">
        <div className="md:col-span-7">
          <p className="eyebrow">Sobre a Légua</p>
          <h1 className="display mt-4 text-[length:var(--text-title)]">
            Uma légua é o quanto se anda antes de reparar no sapato.
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-lg text-ink-soft">
            <p>
              A Légua começou de um jeito bem pouco romântico: olhando para o pé
              de quem trabalha em pé. Porteiro, vigilante, vendedor de loja,
              almoxarife, técnico, atendente. Gente que sai de casa antes das
              seis e volta com o pé quente, inchado e reclamando.
            </p>
            <p>
              Esse público tem duas opções ruins. Ou compra o sapato social
              barato que aperta e escorrega, ou compra o sapato de conforto que
              resolve o pé e estraga a aparência. Não existe muita coisa no meio.
            </p>
            <p>
              Então escolhemos dois pares que ficam exatamente no meio: se calçam
              sem cadarço, têm bico largo, solado de borracha que dobra e cabedal
              que respira — e ainda assim passam no espelho antes de sair.
            </p>
            <p>
              <strong className="font-medium text-ink">
                Não somos uma loja grande, e não estamos tentando parecer uma.
              </strong>{" "}
              São dois modelos, o preço na cara, frete grátis e uma pessoa
              respondendo no WhatsApp. Estamos testando se isso basta. Se você
              comprar e disser o que achou, você está ajudando a decidir o que
              vem depois.
            </p>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-3/4 w-full bg-paper-deep">
            <Image
              src={products[1].images[2].src}
              alt={products[1].images[2].alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-deep/50 py-16">
        <div className="shell grid gap-10 md:grid-cols-3">
          {[
            {
              title: "Curadoria, não catálogo",
              body: "Dois modelos escolhidos para dois momentos do mesmo dia. Um terceiro só entra se alguém pedir.",
            },
            {
              title: "Só o que dá para provar",
              body: "Descrevemos o que existe no sapato. Onde não temos certeza, não afirmamos — perguntamos ao fornecedor primeiro.",
            },
            {
              title: "Uma pessoa do outro lado",
              body: `Sem robô e sem formulário. O pedido é fechado por conversa, no ${site.whatsapp.label}.`,
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16 text-center md:py-20">
        <h2 className="display text-[length:var(--text-section)]">
          São dois. Dá para decidir agora.
        </h2>
        <Link
          href="/#modelos"
          className="mt-7 inline-flex h-14 items-center bg-ink px-10 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Ver os modelos
        </Link>
      </section>
    </>
  );
}
