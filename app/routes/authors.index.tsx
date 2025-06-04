// app/routes/authors.index.tsx
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
type Author = {
  id: number;
  name: string;
};

export async function loader() {
  const authors = await prisma.author.findMany({
    orderBy: { id: "asc" },
  });
  return json({ authors });
}

export default function AuthorsPage() {
  const { authors } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Authors</h1>
        <Link to="/authors/new">
          <Button>+ Add Author</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {authors.map((author: Author) => (
          <Card key={author.id}>
            <CardHeader>
              <CardTitle>{author.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to={`/authors/${author.id}`} className="text-sm text-blue-600 hover:underline">
                View Books
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
