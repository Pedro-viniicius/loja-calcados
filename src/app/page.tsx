import Image from "next/image";
import Link from "next/link";
import { products, bundle } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

const benefits = [
  {
    title: "Calça sem cadarço",
    body: "Elástico nas duas laterais. Entra e sai com o pé, sem precisar se abaixar.",
  },
  {
    title: "Bico largo, não aperta",
    body: "Forma ampla na frente, para o pé que incha ao longo do turno.",
  },
  {
    title: "Solado que dobra",
    body: "Borracha flexível e antiderrapante. Leve, e firme no piso molhado.",
  },
  {
    title: "Cabedal que respira",
    body: "Perfurações que deixam o ar passar durante as horas em pé.",
  },
];

const trust = [
  { title: "Frete grátis", body: "Para todo o Brasil, sempre. Já está no preço." },
  { title: "Troca em 30 dias", body: "A primeira troca de numeração é por nossa conta." },
  { title: "Pix ou cartão", body: "Link de pagamento seguro, em até 3x." },
  { title: "Atendimento humano", body: `Uma pessoa responde no ${site.whatsapp.label}.` },
];

export default function Home() {
  const [turno, folga] = products;

  return (
    <>
      {/* ------------------------------------------------------------------
          HERO — responde em cinco segundos: o que é, para quem, por quê.
          O produto é o protagonista; o texto ocupa menos da metade da tela.
      ------------------------------------------------------------------ */}
      <section className="shell grid items-center gap-10 pt-12 pb-16 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-5">
          <p className="eyebrow">Dois modelos · Nada além disso</p>
          <h1 className="display mt-5 text-[length:var(--text-display)]">
            Um sapato para o turno.
            <br />
            Outro para a folga.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Mocassins sem cadarço, de bico largo e solado flexível, para quem fica
            de pé oito, dez, doze horas por dia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#modelos"
              className="flex h-14 items-center justify-center bg-ink px-8 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
            >
              Ver os dois modelos
            </Link>
            <span className="text-stone">
              {formatPrice(turno.priceCents)} · frete grátis
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative aspect-4/5 w-full bg-paper-deep lg:aspect-square">
            <Image
              src={folga.images[1].src}
              alt={folga.images[1].alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          BENEFÍCIOS — quatro, em linguagem curta. Nada de ícone decorativo:
          numeração tipográfica basta e não polui.
      ------------------------------------------------------------------ */}
      <section
        aria-labelledby="beneficios"
        className="border-y border-line bg-paper-deep/50 py-14 md:py-16"
      >
        <div className="shell">
          <h2 id="beneficios" className="sr-only">
            Por que estes sapatos
          </h2>
          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <li key={benefit.title}>
                <span className="display text-2xl text-cafe">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-medium">{benefit.title}</h3>
                <p className="mt-1.5 text-ink-soft">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          OS MODELOS — apresentação editorial, não grade de e-commerce.
          Cada par ocupa a largura inteira e declara o papel que cumpre.
      ------------------------------------------------------------------ */}
      <section id="modelos" aria-labelledby="modelos-titulo" className="scroll-mt-24 py-20 md:py-28">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">O catálogo inteiro</p>
            <h2 id="modelos-titulo" className="display mt-4 text-[length:var(--text-title)]">
              São dois. E cada um tem um motivo.
            </h2>
          </div>
        </div>

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {products.map((product, index) => (
            <article key={product.slug} className="shell">
              <div className="grid items-center gap-8 md:grid-cols-12 md:gap-14">
                <div
                  className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Link
                    href={`/produtos/${product.slug}`}
                    className="group relative block aspect-square w-full overflow-hidden bg-paper-deep"
                  >
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </Link>
                </div>

                <div className="md:col-span-5">
                  <p className="eyebrow">{product.role}</p>
                  <h3 className="display mt-3 text-[length:var(--text-section)]">
                    <Link href={`/produtos/${product.slug}`} className="hover:text-cafe">
                      {product.name} <span className="text-stone">{product.color}</span>
                    </Link>
                  </h3>
                  <p className="mt-4 text-lg text-ink-soft">{product.headline}</p>

                  <dl className="mt-6 space-y-1 text-[0.9375rem] text-stone">
                    <div className="flex gap-2">
                      <dt className="sr-only">Numerações</dt>
                      <dd>
                        Numeração {product.sizes[0]} a{" "}
                        {product.sizes[product.sizes.length - 1]}
                      </dd>
                    </div>
                  </dl>

                  <p className="display mt-5 text-3xl">
                    {formatPrice(product.priceCents)}
                  </p>

                  <Link
                    href={`/produtos/${product.slug}`}
                    className="mt-6 inline-flex h-14 items-center justify-center bg-ink px-8 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
                  >
                    Ver o {product.name}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CONTEXTO DE USO — não temos fotografia de lifestyle e não vamos
          inventar uma. O contexto é narrado por tipografia, com as macros do
          produto como apoio. Ver docs/ESTRATEGIA.md, Etapa 11.
      ------------------------------------------------------------------ */}
      <section
        aria-labelledby="dia"
        className="border-y border-line bg-ink py-20 text-paper md:py-28"
      >
        <div className="shell grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-tan">O dia que este sapato aguenta</p>
            <h2
              id="dia"
              className="display mt-4 text-[length:var(--text-title)] text-paper"
            >
              Doze horas cabem em um par.
            </h2>
            {/* Placa clara sobre a página escura: a foto vira uma prancha
                documental, com legenda, em vez de um retângulo branco solto. */}
            <figure className="mt-10 bg-paper p-4">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={turno.images[3].src}
                  alt={turno.images[3].alt}
                  fill
                  sizes="(min-width: 768px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-stone">
                Solado de borracha, desenho antiderrapante em espinha.
              </figcaption>
            </figure>
          </div>

          <ol className="md:col-span-6 md:col-start-7">
            {[
              {
                hour: "05h40",
                text: "Você calça sem sentar, sem cadarço, sem acordar a casa inteira.",
              },
              {
                hour: "09h00",
                text: "Três horas em pé. O bico largo ainda não encostou nos dedos.",
              },
              {
                hour: "13h20",
                text: "Piso lavado no corredor. O solado de borracha segura.",
              },
              {
                hour: "17h00",
                text: "O pé inchou, como incha todo dia. O cabedal perfurado deixa o ar entrar.",
              },
              {
                hour: "19h15",
                text: "Você tira os dois com o próprio pé, na porta de casa. Sem dor.",
              },
            ].map((step) => (
              <li
                key={step.hour}
                className="grid grid-cols-[4.5rem_1fr] gap-5 border-b border-paper/15 py-6 first:border-t"
              >
                <span className="display text-xl text-tan tabular-nums">
                  {step.hour}
                </span>
                <p className="text-lg text-paper/85">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          DIFERENCIAL — transforma a limitação de catálogo em posicionamento.
      ------------------------------------------------------------------ */}
      <section aria-labelledby="curadoria" className="py-20 md:py-28">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <p className="eyebrow">Por que só dois modelos</p>
          </div>
          <div className="md:col-span-8">
            <h2
              id="curadoria"
              className="display text-[length:var(--text-title)]"
            >
              Menos catálogo, mais pé no chão.
            </h2>
            <div className="mt-7 max-w-2xl space-y-5 text-lg text-ink-soft">
              <p>
                Uma loja com quarenta sapatos não escolheu nenhum. Nós escolhemos
                dois, calçamos os dois e sabemos exatamente para que serve cada um:
                um cumpre o uniforme, o outro sai no domingo.
              </p>
              <p>
                Não temos vitrine, não temos coleção de estação e não temos
                vendedor com meta. Temos dois pares, o preço na cara e uma pessoa
                do outro lado do WhatsApp para responder antes de você pagar.
              </p>
              <p>
                Se um terceiro modelo aparecer aqui um dia, vai ser porque
                alguém pediu — não porque sobrou no estoque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          KIT — único incentivo comercial do MVP.
      ------------------------------------------------------------------ */}
      <section aria-labelledby="kit" className="shell">
        <div className="grid items-center gap-8 border border-line bg-paper-deep/50 p-8 md:grid-cols-12 md:gap-12 md:p-14">
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <div key={p.slug} className="relative aspect-3/4 bg-paper">
                  <Image
                    src={p.images[0].src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 20vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="eyebrow">Os dois juntos</p>
            <h2 id="kit" className="display mt-3 text-[length:var(--text-section)]">
              {bundle.name}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{bundle.headline}</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="display text-4xl">{formatPrice(bundle.priceCents)}</span>
              <span className="text-stone line-through">
                {formatPrice(bundle.priceCents + bundle.savingsCents)}
              </span>
              <span className="text-cafe">
                economia de {formatPrice(bundle.savingsCents)}
              </span>
            </p>
            <p className="mt-5 text-[0.9375rem] text-stone">
              Adicione os dois modelos à sacola e o desconto entra sozinho —
              você escolhe a numeração de cada par separadamente.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CONFIANÇA — as objeções 3, 4 e 5 da persona, em ordem.
          Sem depoimento inventado: dizemos que ainda não temos avaliações.
      ------------------------------------------------------------------ */}
      <section aria-labelledby="confianca" className="py-20 md:py-28">
        <div className="shell">
          <h2 id="confianca" className="eyebrow">
            Antes de você decidir
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-9 border-t border-line pt-9 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-1.5 text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 max-w-2xl border-l-2 border-tan pl-6">
            <p className="text-lg text-ink-soft">
              <strong className="font-medium text-ink">
                Ainda não temos avaliações.
              </strong>{" "}
              A loja acabou de abrir e preferimos dizer isso a inventar
              depoimento. Quando os primeiros clientes responderem, o que eles
              escreverem aparece aqui — inclusive o que não for elogio.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          CTA FINAL — repete a proposta e devolve para os produtos.
      ------------------------------------------------------------------ */}
      <section className="shell pb-8">
        <div className="border-t border-line pt-16 text-center md:pt-20">
          <h2 className="display mx-auto max-w-3xl text-[length:var(--text-title)]">
            Dois pares, {formatPrice(products[0].priceCents)} cada, frete grátis.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
            Escolha o do turno, o da folga, ou os dois. A decisão inteira leva
            um minuto.
          </p>
          <Link
            href="#modelos"
            className="mt-8 inline-flex h-14 items-center justify-center bg-ink px-10 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
          >
            Escolher meu par
          </Link>
        </div>
      </section>
    </>
  );
}
