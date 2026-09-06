import type { Product, Size } from "@/data/products";

export type CartItem = {
  /** slug + numeração: o mesmo modelo em dois números são linhas distintas. */
  id: string;
  slug: string;
  name: string;
  color: string;
  size: Size;
  priceCents: number;
  image: string;
  quantity: number;
};

const STORAGE_KEY = "legua:sacola:v1";
const EMPTY: CartItem[] = [];

/**
 * Sacola como store externa (padrão `useSyncExternalStore`).
 *
 * Por que não `useState` + `useEffect`: ler o localStorage dentro de um efeito
 * dispara render em cascata e não resolve o descasamento de hidratação. Aqui o
 * servidor renderiza sempre a sacola vazia (`getServerSnapshot`) e o cliente
 * assume o valor guardado no primeiro snapshot — sem efeito nenhum.
 *
 * De quebra, o listener de `storage` mantém as abas em sincronia.
 *
 * Quando houver carrinho no servidor, só este arquivo muda.
 */
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    // localStorage indisponível (aba anônima, cookies bloqueados): sacola vazia.
    return EMPTY;
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Persistência é conveniência, não requisito. Falha em silêncio.
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function commit(next: CartItem[]) {
  items = next;
  persist();
  emit();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;
  items = read();
  emit();
}

/**
 * O snapshot precisa devolver sempre a mesma referência enquanto nada muda,
 * senão o React entra em laço de render.
 */
export function getSnapshot(): CartItem[] {
  if (!loaded) {
    loaded = true;
    items = read();
  }
  return items;
}

export function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function addItem(product: Product, size: Size) {
  const id = `${product.slug}-${size}`;
  const existing = getSnapshot().find((i) => i.id === id);
  commit(
    existing
      ? items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
      : [
          ...items,
          {
            id,
            slug: product.slug,
            name: product.name,
            color: product.color,
            size,
            priceCents: product.priceCents,
            image: product.images[0].src,
            quantity: 1,
          },
        ],
  );
}

export function removeItem(id: string) {
  commit(getSnapshot().filter((i) => i.id !== id));
}

export function setItemQuantity(id: string, quantity: number) {
  commit(
    quantity <= 0
      ? getSnapshot().filter((i) => i.id !== id)
      : getSnapshot().map((i) => (i.id === id ? { ...i, quantity } : i)),
  );
}
