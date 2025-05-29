// app/routes/authors.new.tsx
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export async function action({ request }: any) {
  const formData = await request.formData();
  const name = formData.get("name");

  if (typeof name !== "string" || !name.trim()) {
    return json({ error: "Name is required" }, { status: 400 });
  }

  await prisma.author.create({
    data: { name },
  });

  return redirect("/authors");
}

export default function NewAuthorPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Add New Author</h2>
      <Form method="post" className="space-y-4">
        <Input name="name" placeholder="Author name" />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
}
