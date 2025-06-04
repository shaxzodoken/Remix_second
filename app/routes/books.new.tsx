import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
type Author = {
  id: number;
  name: string;
};

export async function loader() {
  const authors = await prisma.author.findMany({
    orderBy: { name: "asc" },
  });
  return json({ authors });
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();

  const title = String(form.get("title"));
  const year = Number(form.get("year"));
  const price = Number(form.get("price"));
  const authorId = Number(form.get("authorId"));

  if (!title || !year || !authorId || isNaN(price)) {
    throw new Response("Invalid form submission", { status: 400 });
  }

  await prisma.book.create({
    data: {
      title,
      year,
      price,
      author: { connect: { id: authorId } },
    },
  });

  return redirect("/books");
}

export default function NewBookPage() {
  const { authors } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Yangi kitob qo‘shish</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div>
              <Label htmlFor="title">Sarlavha</Label>
              <Input type="text" id="title" name="title" required />
            </div>

            <div>
              <Label htmlFor="year">Yil</Label>
              <Input type="number" id="year" name="year" required />
            </div>

            <div>
              <Label htmlFor="price">Narx</Label>
              <Input type="number" step="0.01" id="price" name="price" required />
            </div>

            <div>
              <Label htmlFor="authorId">Muallif</Label>
              <select name="authorId" id="authorId" className="w-full border rounded p-2" required>
                <option value="">Muallifni tanlang</option>
                {authors.map((author: Author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit">Qo‘shish</Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
