"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart/cart-provider";
import { navigation, site } from "@/data/site";

export function SiteHeader() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Faixa de frete: a objeção mais barata de derrubar fica antes de tudo. */}
      <div className="bg-ink py-2 text-center text-[0.8125rem] tracking-wide text-paper">
        {site.freeShippingLabel} · {site.returnPolicy}
      </div>

      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          scrolled ? "border-line bg-paper" : "border-transparent bg-paper"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            href="/"
            className="display text-2xl tracking-tight md:text-[1.75rem]"
            aria-label={`${site.name} — página inicial`}
          >
            {site.name}
          </Link>

          <nav aria-label="Principal" className="hidden gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {/* No celular a navegação vira um único atalho: os produtos. */}
            <Link
              href="/#modelos"
              className="px-3 py-2 text-[0.9375rem] text-ink-soft md:hidden"
            >
              Modelos
            </Link>
            <button
              type="button"
              onClick={open}
              className="flex h-11 items-center gap-2 px-3 text-[0.9375rem] font-medium transition-colors hover:text-ink-soft"
              aria-label={`Abrir a sacola${count > 0 ? ` com ${count} ${count === 1 ? "item" : "itens"}` : " (vazia)"}`}
            >
              {/* Carrinho: o ícone é o que o olho procura; o texto confirma. */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="-ml-0.5"
              >
                <path d="M1.5 2.5h3l2.6 12.1h11.2l2.2-8.6H6.2" />
                <circle cx="9.5" cy="20" r="1.4" />
                <circle cx="18.5" cy="20" r="1.4" />
              </svg>
              <span className="hidden sm:inline">Sacola</span>
              <span
                aria-hidden="true"
                className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs tabular-nums ${
                  count > 0 ? "bg-ink text-paper" : "border border-line text-stone"
                }`}
              >
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
