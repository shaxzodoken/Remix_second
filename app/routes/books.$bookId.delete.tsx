// app/routes/books.$bookId.delete.tsx
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";

export async function action({ params }: ActionFunctionArgs) {
  const id = Number(params.bookId);
  if (!id) {
    throw new Response("Invalid ID", { status: 400 });
  }

  await prisma.book.delete({
    where: { id },
  });

  return redirect("/books");
}
