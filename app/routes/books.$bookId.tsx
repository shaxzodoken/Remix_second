// app/routes/books.$bookId.tsx
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.bookId);
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    throw new Response("Kitob topilmadi", { status: 404 });
  }

  return json(book);
}

export default function BookDetailPage() {
  const book = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Muallif:</strong> {book.author}</p>
          <p><strong>Yil:</strong> {book.year}</p>
          <p><strong>Narx:</strong> ${'{'}book.price{'}'}</p>
          <fetcher.Form method="post" action="/cart/add">
            <input type="hidden" name="bookId" value={book.id} />
            <Button variant="outline" size="sm">Add to Cart</Button>
          </fetcher.Form>
        </CardContent>
      </Card>
    </div>
  );
}
