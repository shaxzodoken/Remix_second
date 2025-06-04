import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { commitCartSession, getCartSession, removeFromCart } from "~/utils/cart.server";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const bookId = Number(form.get("bookId"));
  if (!bookId) throw new Response("Invalid book", { status: 400 });
  const session = await getCartSession(request);
  removeFromCart(session, bookId);
  return redirect("/cart", {
    headers: {
      "Set-Cookie": await commitCartSession(session),
    },
  });
}
