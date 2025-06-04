import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { addToCart, commitCartSession, getCartSession } from "~/utils/cart.server";
import { prisma } from "~/lib/prisma.server";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const bookId = Number(form.get("bookId"));
  const quantity = Number(form.get("quantity")) || 1;
  if (!bookId) {
    throw new Response("Invalid book", { status: 400 });
  }
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    throw new Response("Book not found", { status: 404 });
  }
  const session = await getCartSession(request);
  addToCart(session, { bookId, quantity, price: book.price });
  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitCartSession(session),
    },
  });
}
