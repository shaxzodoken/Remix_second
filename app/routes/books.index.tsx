// app/routes/books.index.tsx
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { prisma } from "~/lib/prisma.server";
type Book = {
  id: number;
  title: string;
  year: number;
  price: number;
  author?: { name?: string | null } | null;
};

export async function loader() {
  const books = await prisma.book.findMany({
    orderBy: { id: "asc" },
    include: { author: true }, // ✅ Author maʼlumotini olib kelamiz
  });

  return json({ books });
}

export default function BooksPage() {
  const { books } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link to="/books/new">
          <Button variant="default">+ Add Book</Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {books.map((book: Book) => (
          <Card key={book.id}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {book.author?.name || "Unknown Author"} ({book.year})
            </p>
            <p className="text-sm">${'{'}book.price{'}'}</p>
          </CardHeader>
          <CardContent className="flex justify-end gap-2">
            <fetcher.Form method="post" action="/cart/add">
              <input type="hidden" name="bookId" value={book.id} />
              <Button variant="outline" size="sm">Add to Cart</Button>
            </fetcher.Form>
            <Link to={`/books/${book.id}/edit`}>
              <Button variant="outline" size="sm">Edit</Button>
            </Link>
              <fetcher.Form method="post" action={`/books/${book.id}/delete`}>
                <input type="hidden" name="_method" value="delete" />
                <Button variant="destructive" size="sm">Delete</Button>
              </fetcher.Form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
