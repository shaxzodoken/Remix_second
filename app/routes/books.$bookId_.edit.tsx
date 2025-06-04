// app/routes/books.$bookId.edit.tsx
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
type Author = {
  id: number;
  name: string;
};
import { useLoaderData, Form } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

// LOADER: Kitobni olib kelish
export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.bookId);
  const book = await prisma.book.findUnique({ where: { id } });
  const authors = await prisma.author.findMany({ orderBy: { name: "asc" } });

  if (!book) throw new Response("Kitob topilmadi", { status: 404 });

  return json({ book, authors });
}


// ACTION: Kitobni yangilash
export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();
  const id = Number(params.bookId);

  await prisma.book.update({
    where: { id },
    data: {
      title: String(form.get("title")),
      year: Number(form.get("year")),
      price: Number(form.get("price")),
      authorId: Number(form.get("authorId")), // e'tibor bering
    },
  });

  return redirect(`/books`);
}


// UI: Edit sahifa
export default function EditBookPage() {
  const { book, authors } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Book</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" defaultValue={book.title} required />
            </div>

            <div>
              <Label htmlFor="authorId">Author</Label>
              <select
                id="authorId"
                name="authorId"
                defaultValue={book.authorId}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Author</option>
                {authors.map((author: Author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input name="year" id="year" defaultValue={book.year} type="number" required />
            </div>

            <div>
              <Label htmlFor="price">Price</Label>
              <Input name="price" id="price" defaultValue={book.price} type="number" step="0.01" required />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

