import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { requireUserId } from "~/utils/session.server";
import { clearCart, getCart, getCartSession, commitCartSession } from "~/utils/cart.server";
import { Button } from "~/components/ui/button";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getCartSession(request);
  const cart = getCart(session);
  const bookIds = cart.map((c) => c.bookId);
  const books = await prisma.book.findMany({ where: { id: { in: bookIds } } });
  const items = cart.map((c) => {
    const book = books.find((b) => b.id === c.bookId)!;
    return { ...c, title: book.title };
  });
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return json({ items, total });
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const session = await getCartSession(request);
  const cart = getCart(session);
  if (cart.length === 0) return redirect("/cart");

  // create order
  await prisma.order.create({
    data: {
      userId,
      items: {
        create: cart.map((c) => ({ bookId: c.bookId, quantity: c.quantity, price: c.price })),
      },
    },
  });
  clearCart(session);
  return redirect(`/orders`, {
    headers: {
      "Set-Cookie": await commitCartSession(session),
    },
  });
}

export default function CartPage() {
  const { items, total } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.bookId} className="flex justify-between items-center border p-2 rounded">
                <div>
                  {item.title} (x{item.quantity}) - ${'{'}item.price{'}'}
                </div>
                <Form method="post" action="/cart/remove">
                  <input type="hidden" name="bookId" value={item.bookId} />
                  <Button variant="destructive" size="sm">Remove</Button>
                </Form>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: ${'{'}total.toFixed(2){'}'}</p>
          <Form method="post">
            <Button type="submit">Checkout</Button>
          </Form>
        </div>
      )}
    </div>
  );
}
