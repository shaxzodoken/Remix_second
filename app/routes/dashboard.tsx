import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { requireUserId } from "~/utils/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const [books, authors, orders] = await Promise.all([
    prisma.book.count(),
    prisma.author.count(),
    prisma.order.count(),
  ]);
  return json({ books, authors, orders });
}

export default function DashboardPage() {
  const { books, authors, orders } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded border p-4 text-center">
          <p className="text-sm text-muted-foreground">Books</p>
          <p className="text-2xl font-bold">{books}</p>
        </div>
        <div className="rounded border p-4 text-center">
          <p className="text-sm text-muted-foreground">Authors</p>
          <p className="text-2xl font-bold">{authors}</p>
        </div>
        <div className="rounded border p-4 text-center">
          <p className="text-sm text-muted-foreground">Orders</p>
          <p className="text-2xl font-bold">{orders}</p>
        </div>
      </div>
    </div>
  );
}
