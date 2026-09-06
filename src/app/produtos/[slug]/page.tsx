import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOtherProduct, getProduct, products } from "@/data/products";
import { site } from "@/data/site";
import { ProductGallery } from "@/components/product-gallery";
import { BuyPanel } from "@/components/buy-panel";
import { DetailsAccordion } from "@/components/details-accordion";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} ${product.color}`,
    description: product.headline,
    openGraph: {
      title: `${product.name} ${product.color} · ${site.name}`,
      description: product.headline,
      images: [product.images[0].src],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const other = getOtherProduct(slug);

  return (
    <>
      <div className="shell pt-6">
        <Link href="/#modelos" className="text-[0.9375rem] text-stone hover:text-ink">
          ← Os dois modelos
        </Link>
      </div>

      <article className="shell grid gap-10 pt-6 pb-16 md:grid-cols-12 md:gap-14 md:pt-10">
        {/* Imagem primeiro: moda se compra pelo olho. No desktop ela fica fixa. */}
        <div className="md:col-span-7">
          <div className="md:sticky md:top-28">
            <ProductGallery images={product.images} priority />
          </div>
        </div>

        {/* Hierarquia: nome → preço → benefício → numeração → CTA → detalhes. */}
        <div className="md:col-span-5">
          <p className="eyebrow">{product.role}</p>
          <h1 className="display mt-3 text-[length:var(--text-title)]">
            {product.name} <span className="text-stone">{product.color}</span>
          </h1>
          <p className="mt-5 text-lg text-ink-soft">{product.headline}</p>

          <div className="mt-8">
            <BuyPanel product={product} />
          </div>

          {/* Tira de confiança, logo abaixo do CTA — onde a dúvida aparece. */}
          <ul className="mt-8 space-y-2 border-y border-line py-5 text-[0.9375rem] text-ink-soft">
            <li>{site.freeShippingLabel} · {site.shippingEstimate}</li>
            <li>{site.returnPolicy}</li>
            <li>{site.payment}</li>
          </ul>

          <div className="mt-10">
            <h2 className="eyebrow">O que você sente ao calçar</h2>
            <ul className="mt-4 space-y-5">
              {product.benefits.map((benefit) => (
                <li key={benefit.title}>
                  <h3 className="text-lg font-medium">{benefit.title}</h3>
                  <p className="mt-1 text-ink-soft">{benefit.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-lg text-ink-soft">{product.description}</p>

          {/* Ficha técnica só depois do benefício — e fechada por padrão. */}
          <div className="mt-10">
            <DetailsAccordion
              sections={[
                {
                  title: "Ficha técnica",
                  content: (
                    <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[10rem_1fr]">
                      {product.specs.map((spec) => (
                        <div key={spec.label} className="contents">
                          <dt className="text-stone">{spec.label}</dt>
                          <dd>{spec.value}</dd>
                        </div>
                      ))}
                      <dt className="text-stone">Referência</dt>
                      <dd>{product.supplierRef}</dd>
                    </dl>
                  ),
                },
                {
                  title: "Envio e prazo",
                  content: (
                    <p>
                      {site.freeShippingLabel}. {site.shippingEstimate}. Assim que
                      o pedido é postado, você recebe o código de rastreio no
                      WhatsApp. A grade 37–44 está disponível nas duas cores, com
                      envio imediato.
                    </p>
                  ),
                },
                {
                  title: "Trocas e devolução",
                  content: (
                    <p>
                      {site.returnPolicy} Se o par não servir ou você simplesmente
                      mudar de ideia, tem 30 dias para pedir a troca ou a
                      devolução, com o sapato sem uso e na caixa. É só chamar no
                      WhatsApp — a gente resolve por lá.
                    </p>
                  ),
                },
                {
                  title: "Cuidados",
                  content: (
                    <p>
                      Pano úmido no cabedal, sem produto agressivo. Deixe secar à
                      sombra, longe do sol direto e de fonte de calor. Se puder,
                      alterne os pares: sapato que descansa um dia dura bem mais.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </article>

      {/* Curadoria: só existe um "outro". Cross-sell sem parecer vitrine. */}
      {other && (
        <section
          aria-labelledby="outro"
          className="border-t border-line bg-paper-deep/50 py-16 md:py-20"
        >
          <div className="shell grid items-center gap-8 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <Link
                href={`/produtos/${other.slug}`}
                className="group relative block aspect-square w-full overflow-hidden bg-paper"
              >
                <Image
                  src={other.images[0].src}
                  alt={other.images[0].alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
            </div>
            <div className="md:col-span-6">
              <p className="eyebrow">O outro par</p>
              <h2 id="outro" className="display mt-3 text-[length:var(--text-section)]">
                {other.name} {other.color}
              </h2>
              <p className="mt-4 text-lg text-ink-soft">{other.headline}</p>
              <Link
                href={`/produtos/${other.slug}`}
                className="mt-6 inline-flex h-14 items-center border border-ink px-8 text-base font-medium transition-colors hover:bg-ink hover:text-paper"
              >
                Ver o {other.name}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
