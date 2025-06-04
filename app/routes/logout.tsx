import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { logout } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

export default function Logout() {
  return (
    <Form method="post">
      <button type="submit" className="hidden" />
    </Form>
  );
}
