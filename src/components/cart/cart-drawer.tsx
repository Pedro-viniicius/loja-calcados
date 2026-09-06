"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useCart } from "./cart-provider";
import { formatPrice } from "@/lib/format";
import { buildOrderLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { bundle } from "@/data/products";

export function CartDrawer() {
  const {
    items,
    isOpen,
    close,
    remove,
    setQuantity,
    subtotalCents,
    bundleDiscountCents,
    totalCents,
    count,
  } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc fecha e o corpo trava — comportamento esperado de qualquer gaveta.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const orderLink = buildOrderLink(
    items.map((i) => ({
      name: i.name,
      color: i.color,
      size: i.size,
      quantity: i.quantity,
      priceCents: i.priceCents,
    })),
    totalCents,
    bundleDiscountCents,
  );

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Fechar a sacola"
        onClick={close}
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Sua sacola"
        tabIndex={-1}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="display text-2xl">
            Sacola{count > 0 && <span className="text-stone"> · {count}</span>}
          </h2>
          <button
            type="button"
            onClick={close}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-stone transition-colors hover:text-ink"
          >
            <span className="sr-only">Fechar</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="display text-2xl">Sua sacola está vazia.</p>
            <p className="text-stone">São só dois modelos. Não leva um minuto.</p>
            <button
              type="button"
              onClick={close}
              className="mt-3 border-b border-ink pb-0.5 font-medium"
            >
              Ver os modelos
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-paper-deep">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="font-medium">
                        {item.name} <span className="text-stone">{item.color}</span>
                      </p>
                      <p className="whitespace-nowrap font-medium">
                        {formatPrice(item.priceCents * item.quantity)}
                      </p>
                    </div>
                    <p className="text-sm text-stone">Numeração {item.size}</p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label={`Diminuir quantidade de ${item.name} ${item.color}`}
                          className="flex h-10 w-10 items-center justify-center text-lg text-stone hover:text-ink"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label={`Aumentar quantidade de ${item.name} ${item.color}`}
                          className="flex h-10 w-10 items-center justify-center text-lg text-stone hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-sm text-stone underline underline-offset-4 hover:text-ink"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-5">
              {bundleDiscountCents > 0 && (
                <>
                  <div className="flex items-baseline justify-between text-stone">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotalCents)}</span>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between text-cafe">
                    <span>{bundle.name}</span>
                    <span>−{formatPrice(bundleDiscountCents)}</span>
                  </div>
                  <div className="mt-3 border-t border-line pt-3" />
                </>
              )}

              <div className="flex items-baseline justify-between">
                <span className="text-stone">Total</span>
                <span className="display text-3xl">{formatPrice(totalCents)}</span>
              </div>
              <p className="mt-1 text-sm text-stone">{site.freeShippingLabel}</p>

              <a
                href={orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex h-14 w-full items-center justify-center bg-ink px-6 text-base font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                Fechar pedido pelo WhatsApp
              </a>
              <p className="mt-3 text-center text-sm text-stone">
                Você confere tudo antes de pagar. Pix ou cartão.
              </p>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
