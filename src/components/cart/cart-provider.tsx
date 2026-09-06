"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { bundle, products, type Product, type Size } from "@/data/products";
import {
  addItem,
  getServerSnapshot,
  getSnapshot,
  removeItem,
  setItemQuantity,
  subscribe,
  type CartItem,
} from "./cart-store";

export type { CartItem };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  /** Desconto do kit, já aplicado. Zero quando a sacola não fecha o par. */
  bundleDiscountCents: number;
  totalCents: number;
  isOpen: boolean;
  add: (product: Product, size: Size) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((product: Product, size: Size) => {
    addItem(product, size);
    setIsOpen(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const subtotalCents = items.reduce((n, i) => n + i.priceCents * i.quantity, 0);

  /**
   * "O Par de Pares": o desconto vale uma vez, assim que a sacola tem pelo
   * menos um de cada modelo. Aplicado aqui, e não só na conversa do WhatsApp,
   * para o cliente ver o valor real antes de decidir.
   */
  const bundleDiscountCents = products.every((p) =>
    items.some((i) => i.slug === p.slug),
  )
    ? bundle.savingsCents
    : 0;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotalCents,
      bundleDiscountCents,
      totalCents: subtotalCents - bundleDiscountCents,
      isOpen,
      add,
      remove: removeItem,
      setQuantity: setItemQuantity,
      open,
      close,
    }),
    [items, subtotalCents, bundleDiscountCents, isOpen, add, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
