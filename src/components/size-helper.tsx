"use client";

import { useState } from "react";
import { sizeChart } from "@/data/products";

/**
 * Medidor de numeração.
 *
 * A objeção nº 1 da persona é "vai servir?" (ver docs/ESTRATEGIA.md, Etapa 4).
 * Este é o elemento de maior alavancagem de conversão da PDP — por isso ele
 * fica ao lado do seletor, e não escondido no rodapé.
 *
 * Progressive disclosure: fechado por padrão, não compete com o CTA.
 */
export function SizeHelper() {
  const [open, setOpen] = useState(false);
  const [cm, setCm] = useState("");

  const value = Number(cm.replace(",", "."));
  const match =
    value > 0
      ? sizeChart.find((row) => value <= Number(row.footCm.replace(",", ".")))
      : undefined;
  const tooBig = value > 0 && !match;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-[0.9375rem] text-stone underline underline-offset-4 transition-colors hover:text-ink"
      >
        Não sei minha numeração
      </button>

      {open && (
        <div className="mt-4 border border-line bg-paper-deep/60 p-5">
          <p className="font-medium">Meça em trinta segundos</p>
          <ol className="mt-3 space-y-1.5 text-[0.9375rem] text-ink-soft">
            <li>1. Pise numa folha de papel, de pé, com o peso nos dois pés.</li>
            <li>2. Marque um traço no calcanhar e outro na ponta do dedo maior.</li>
            <li>3. Meça a distância entre os traços com uma régua.</li>
          </ol>

          <label
            htmlFor="medida-pe"
            className="mt-5 block text-[0.9375rem] font-medium"
          >
            Quanto deu, em centímetros?
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input
              id="medida-pe"
              type="text"
              inputMode="decimal"
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              placeholder="26,5"
              className="h-12 w-28 border border-line bg-paper px-3 text-base"
            />
            <span className="text-stone">cm</span>

            {match && (
              <p aria-live="polite" className="text-base">
                Sua numeração é <strong className="text-cafe">{match.size}</strong>.
              </p>
            )}
            {tooBig && (
              <p aria-live="polite" className="text-base text-stone">
                Fora da nossa grade. Fale com a gente pelo WhatsApp.
              </p>
            )}
          </div>

          <details className="mt-5">
            <summary className="cursor-pointer text-[0.9375rem] text-stone">
              Ver a tabela inteira
            </summary>
            <table className="mt-3 w-full max-w-sm text-[0.9375rem]">
              <thead>
                <tr className="border-b border-line text-left text-stone">
                  <th scope="col" className="py-1.5 font-medium">Pé</th>
                  <th scope="col" className="py-1.5 font-medium">Numeração</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size} className="border-b border-line/60">
                    <td className="py-1.5 tabular-nums">até {row.footCm} cm</td>
                    <td className="py-1.5 tabular-nums">{row.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>

          <p className="mt-4 text-sm text-stone">
            Na dúvida entre dois números, fique com o maior: o bico é largo e o pé
            incha ao longo do dia.
          </p>
        </div>
      )}
    </div>
  );
}
