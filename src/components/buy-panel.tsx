"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./cart/cart-provider";
import { SizeHelper } from "./size-helper";
import type { Product, Size } from "@/data/products";
import { formatPrice, formatInstallment } from "@/lib/format";
import { buildQuestionLink } from "@/lib/whatsapp";

/**
 * Bloco de compra da PDP: numeração → CTA.
 * Reconhecimento em vez de memorização — o cliente vê a grade inteira e o que
 * está indisponível, em vez de digitar um número e torcer.
 */
export function BuyPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [warn, setWarn] = useState(false);

  // No celular o CTA principal sai da tela enquanto o cliente lê os detalhes.
  // A barra fixa só aparece nesse momento — nunca competindo com o botão real.
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [ctaVisible, setCtaVisible] = useState(true);

  useEffect(() => {
    const node = ctaRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    if (!size) {
      setWarn(true);
      document.getElementById("numeracao")?.scrollIntoView({ block: "center" });
      return;
    }
    add(product, size);
  };

  return (
    <div>
      <fieldset id="numeracao">
        <legend className="flex w-full items-baseline justify-between gap-4">
          <span className="eyebrow">Numeração</span>
          {size && (
            <span className="text-[0.9375rem] text-stone">
              Selecionado: <strong className="text-ink">{size}</strong>
            </span>
          )}
        </legend>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {product.sizes.map((s) => {
            const inStock = product.sizesInStock.includes(s);
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setWarn(false);
                }}
                aria-pressed={selected}
                className={`h-13 w-full border text-base tabular-nums transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper hover:border-ink"
                } ${!inStock ? "text-stone" : ""}`}
                title={inStock ? undefined : "Sob encomenda — chega em até 12 dias"}
              >
                {s}
                {!inStock && <span className="sr-only"> — sob encomenda</span>}
              </button>
            );
          })}
        </div>

        {size && !product.sizesInStock.includes(size) && (
          <p className="mt-3 text-[0.9375rem] text-cafe">
            Numeração {size} sai sob encomenda — chega em até 12 dias. Confirmamos
            o prazo no WhatsApp antes de você pagar.
          </p>
        )}
        {warn && (
          <p role="alert" className="mt-3 text-[0.9375rem] text-cafe">
            Escolha a numeração para continuar.
          </p>
        )}
      </fieldset>

      <SizeHelper />

      <div className="mt-7 border-t border-line pt-6">
        <div className="flex items-baseline gap-3">
          <span className="display text-4xl">{formatPrice(product.priceCents)}</span>
          <span className="text-stone">
            ou {formatInstallment(product.priceCents)}
          </span>
        </div>

        <button
          ref={ctaRef}
          type="button"
          onClick={handleAdd}
          className="mt-5 flex h-14 w-full items-center justify-center bg-ink px-6 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
        >
          Adicionar à sacola
        </button>

        <a
          href={buildQuestionLink(`${product.name} ${product.color}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex h-14 w-full items-center justify-center border border-line px-6 text-base transition-colors hover:border-ink"
        >
          Tirar uma dúvida no WhatsApp
        </a>
      </div>

      {/* Barra de compra fixa — só no celular, só quando o CTA saiu da tela. */}
      {!ctaVisible && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper px-4 py-3 shadow-[0_-8px_24px_rgba(23,20,15,0.08)] md:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm text-stone">
                {product.name} {product.color}
                {size ? ` · nº ${size}` : ""}
              </p>
              <p className="display text-xl leading-tight">
                {formatPrice(product.priceCents)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="ml-auto flex h-13 flex-1 items-center justify-center bg-ink px-5 text-base font-medium text-paper"
            >
              {size ? "Adicionar à sacola" : "Escolher numeração"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
