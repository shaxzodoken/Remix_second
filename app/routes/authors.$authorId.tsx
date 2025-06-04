// app/routes/authors.$authorId.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";

export async function loader({ params }: any) {
  const author = await prisma.author.findUnique({
    where: { id: Number(params.authorId) },
    include: { books: true },
  });

  if (!author) {
    throw new Response("Author not found", { status: 404 });
  }

  return json(author);
}

export default function AuthorDetailPage() {
  const author = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{author.name}</h1>
      <h2 className="text-lg font-semibold">Books:</h2>
      <ul className="space-y-2">
        {author.books.length === 0 && <p>No books found for this author.</p>}
        {author.books.map((book: typeof author.books[number]) => (
          <li key={book.id} className="border p-3 rounded">
            {book.title} ({book.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
