// app/routes/authors.$authorId_.edit.tsx
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.authorId);
  const author = await prisma.author.findUnique({ where: { id } });
  if (!author) throw new Response("Author not found", { status: 404 });
  return json({ author });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();
  const id = Number(params.authorId);
  const name = String(form.get("name"));

  await prisma.author.update({
    where: { id },
    data: { name },
  });

  return redirect("/authors");
}

export default function EditAuthorPage() {
  const { author } = useLoaderData<typeof loader>();
  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Author</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={author.name} required />
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
