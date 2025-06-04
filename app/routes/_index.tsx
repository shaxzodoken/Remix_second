import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => [
  { title: "Remix Library" },
  { name: "description", content: "Buy and manage your favorite books" },
];

export default function Index() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Remix Library
        </h1>
        <p className="text-lg text-gray-700">
          Discover and purchase books from your favorite authors.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/books">
            <Button>Browse Books</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
