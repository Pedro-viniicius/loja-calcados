import Link from "next/link";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { buildQuestionLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-deep py-14">
      <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="display text-3xl">{site.name}</p>
          <p className="mt-2 max-w-xs text-stone">{site.tagline}</p>
        </div>

        <nav aria-label="Produtos">
          <h2 className="eyebrow">Modelos</h2>
          <ul className="mt-4 space-y-2">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/produtos/${p.slug}`} className="hover:text-cafe">
                  {p.name} {p.color}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h2 className="eyebrow">A loja</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/sobre" className="hover:text-cafe">Sobre a Légua</Link>
            </li>
            <li>
              <Link href="/ajuda" className="hover:text-cafe">Trocas e envio</Link>
            </li>
            <li>
              <a
                href={buildQuestionLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cafe"
              >
                WhatsApp {site.whatsapp.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="shell mt-12 border-t border-line pt-6 text-sm text-stone">
        <p>
          {site.name} · {new Date().getFullYear()} · Projeto de validação.
          Preços e prazos podem mudar enquanto testamos a operação.
        </p>
      </div>
    </footer>
  );
}
