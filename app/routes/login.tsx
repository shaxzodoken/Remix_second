import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { login } from "~/utils/auth.server";
import { createUserSession, getUser } from "~/utils/session.server";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  if (user) return json(null, { status: 302, headers: { Location: "/" } });
  return json(null);
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Invalid Form" }, { status: 400 });
  }
  const user = await login(email, password);
  if (!user) {
    return json({ error: "Invalid credentials" }, { status: 400 });
  }
  return createUserSession(user.id, "/");
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <Card className="mx-auto mt-10 max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" className="space-y-4">
          {actionData?.error && (
            <p className="text-sm text-red-600">{actionData.error}</p>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </Form>
        <p className="mt-4 text-center text-sm">
          No account? <Link to="/register" className="underline">Sign up</Link>
        </p>
      </CardContent>
    </Card>
  );
}
