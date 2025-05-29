// app/routes/books.$bookId.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

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

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{book.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Muallif:</strong> {book.author}</p>
          <p><strong>Yil:</strong> {book.year}</p>
        </CardContent>
      </Card>
    </div>
  );
}
