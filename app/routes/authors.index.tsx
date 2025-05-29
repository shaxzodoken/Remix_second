// app/routes/authors.index.tsx
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { Button } from "~/components/ui/button";

export async function loader() {
  const authors = await prisma.author.findMany({
    orderBy: { id: "asc" },
  });
  return json({ authors });
}

export default function AuthorsPage() {
  const { authors } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Authors</h1>
        <Link to="/authors/new">
          <Button>+ Add Author</Button>
        </Link>
      </div>

      <ul className="space-y-3">
        {authors.map((author) => (
          <li key={author.id} className="border p-4 rounded">
            <Link to={`/authors/${author.id}`} className="font-semibold hover:underline">
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
