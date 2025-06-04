import { storage } from "./session.server";

export type CartItem = { bookId: number; quantity: number; price: number };

export async function getCartSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export function getCart(session: Awaited<ReturnType<typeof getCartSession>>): CartItem[] {
  const cart = session.get("cart");
  if (Array.isArray(cart)) return cart as CartItem[];
  return [];
}

export function addToCart(session: Awaited<ReturnType<typeof getCartSession>>, item: CartItem) {
  const cart = getCart(session);
  const existing = cart.find((c) => c.bookId === item.bookId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  session.set("cart", cart);
}

export function removeFromCart(session: Awaited<ReturnType<typeof getCartSession>>, bookId: number) {
  const cart = getCart(session).filter((i) => i.bookId !== bookId);
  session.set("cart", cart);
}

export function clearCart(session: Awaited<ReturnType<typeof getCartSession>>) {
  session.set("cart", []);
}

export function commitCartSession(session: Awaited<ReturnType<typeof getCartSession>>) {
  return storage.commitSession(session);
}
