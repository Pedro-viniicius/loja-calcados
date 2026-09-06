/**
 * Detalhes em acordeão nativo (<details>): funciona sem JS, é acessível por
 * padrão e mantém a ficha técnica abaixo do benefício — progressive disclosure.
 */
export function DetailsAccordion({
  sections,
}: {
  sections: { title: string; content: React.ReactNode }[];
}) {
  return (
    <div className="border-t border-line">
      {sections.map((section) => (
        <details key={section.title} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg [&::-webkit-details-marker]:hidden">
            {section.title}
            <span
              aria-hidden="true"
              className="text-stone transition-transform group-open:rotate-45"
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </span>
          </summary>
          <div className="pb-6 text-ink-soft">{section.content}</div>
        </details>
      ))}
    </div>
  );
}
