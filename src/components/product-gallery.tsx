"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/data/products";

/**
 * Galeria da PDP.
 * Celular: carrossel por deslize, com paginação — o gesto que o público já conhece.
 * Desktop: imagem grande + miniaturas. Sem zoom, sem lightbox: a foto já é grande.
 */
export function ProductGallery({
  images,
  priority,
}: {
  images: ProductImage[];
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Celular */}
      <div className="md:hidden">
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, i) => (
            <div
              key={image.src}
              className="relative aspect-3/4 w-[86%] shrink-0 snap-center bg-paper-deep"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="86vw"
                priority={priority && i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-stone">
          Deslize para ver as {images.length} fotos
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden gap-4 md:flex">
        <ul className="flex w-20 shrink-0 flex-col gap-3">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver foto ${i + 1} de ${images.length}`}
                aria-current={active === i}
                className={`relative block aspect-3/4 w-full overflow-hidden bg-paper-deep transition-opacity ${
                  active === i ? "ring-1 ring-ink" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>

        <div className="relative aspect-3/4 flex-1 bg-paper-deep">
          <Image
            src={images[active].src}
            alt={images[active].alt}
            fill
            sizes="(min-width: 1024px) 46vw, 60vw"
            priority={priority}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
