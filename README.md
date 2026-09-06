# Légua

Loja de validação para dois modelos de mocassim de conforto.
Front-end apenas: sem backend, sem banco, sem autenticação, sem painel.
O checkout termina numa conversa de WhatsApp — de propósito.

**A estratégia que originou cada decisão de interface está em [`docs/ESTRATEGIA.md`](docs/ESTRATEGIA.md).**
Leia esse documento antes de mexer em copy, preço ou hierarquia: quase toda escolha
de layout aqui é consequência de uma decisão de nicho registrada lá.

---

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera as 5 rotas estáticas
npm run start      # serve o build de produção
npm run lint
```

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Nenhuma dependência além dessas.

---

## Antes de publicar

| O quê | Onde |
|---|---|
| Número real do WhatsApp | `src/data/site.ts` → `whatsapp.number` (formato `55DDDNÚMERO`) |
| Domínio de produção | `src/data/site.ts` → `url` |
| **Confirmar o material do cabedal com o fornecedor** | `src/data/products.ts` → `specs` (linhas marcadas `// hipótese`) |
| Numerações realmente em estoque | `src/data/products.ts` → `sizesInStock` |

O texto do site diz "material sintético" e nunca "couro". Só mude isso com
confirmação do fornecedor por escrito.

---

## Estrutura

```
src/
  app/
    page.tsx                 Home — hero, os dois modelos, contexto, kit, confiança
    produtos/[slug]/page.tsx PDP — estática, uma por produto
    sobre/  ajuda/           Institucional e dúvidas pré-compra
    layout.tsx  globals.css  Fontes, providers e o sistema visual (tokens)
  components/
    site-header · site-footer
    product-gallery          Carrossel no celular, miniaturas no desktop
    buy-panel                Numeração → CTA → barra fixa no celular
    size-helper              Medidor pé → numeração (objeção nº 1 do público)
    details-accordion        <details> nativo: ficha técnica depois do benefício
    cart/cart-store.ts       Estado da sacola (useSyncExternalStore + localStorage)
    cart/cart-provider.tsx   Contexto e regra do kit
    cart/cart-drawer.tsx     Gaveta e saída para o WhatsApp
  data/
    products.ts              Catálogo, grade de numeração, kit, tabela de medidas
    site.ts                  Marca, contato, frete, trocas, pagamento
  lib/
    format.ts                Preço e parcelamento em pt-BR
    whatsapp.ts              Monta a mensagem do pedido
public/produtos/             Fotografia do fornecedor, renomeada por modelo
```

---

## Como evoluir sem reescrever

O código foi organizado para que cada próximo passo toque um arquivo só.

- **Novo produto** — acrescente um objeto em `products` (`src/data/products.ts`).
  A home, as rotas estáticas, o footer e o cross-sell se atualizam sozinhos.
  Acima de 4 ou 5 produtos, revise o posicionamento: a curadoria é parte da marca.
- **Checkout real** — troque `src/lib/whatsapp.ts` por uma chamada ao provedor de
  pagamento. A gaveta já entrega itens, numeração, desconto e total prontos.
- **Estoque de verdade** — `sizesInStock` vira consulta ao servidor; a PDP já
  distingue "pronta entrega" de "sob encomenda" na própria grade.
- **Catálogo no servidor** — mantenha a interface `Product` e troque a origem dos
  dados. Nenhum componente lê nada além dessa interface.
- **Sacola no servidor** — só `cart-store.ts` muda; provider e componentes ficam.
- **Analytics** — os eventos que importam para a validação já são pontos únicos no
  código: seleção de numeração e abertura do medidor (`buy-panel`, `size-helper`),
  adição à sacola (`cart-store`) e clique no checkout (`cart-drawer`).

---

## Decisões que parecem faltas, mas são escolhas

- **Só dois produtos e nenhuma busca ou filtro.** Curadoria é o posicionamento.
- **Sem avaliações.** A loja é nova; a home diz isso em vez de inventar depoimento.
- **Sem foto de lifestyle.** Só existe fotografia de estúdio, então o contexto de uso
  é narrado por tipografia na seção "Doze horas cabem em um par".
- **Frete grátis embutido no preço.** Remove a objeção mais barata de derrubar.
- **Pagamento fora do site.** Nenhum dado sensível é digitado aqui.
