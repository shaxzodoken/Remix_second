import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => [
  { title: "Remix Library" },
  { name: "description", content: "Buy and manage your favorite books" },
];

export default function Index() {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=60"
        alt="Books background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-black/40">
        <div className="space-y-6 text-center text-white">
          <h1 className="text-5xl font-extrabold tracking-tight">Remix Library</h1>
          <p className="text-lg">
            Discover and purchase books from your favorite authors.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/books">
              <Button variant="secondary">Browse Books</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
      <section className="bg-white py-12 text-gray-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3 text-center">
          <div>
            <h3 className="mb-2 text-xl font-semibold">Vast Selection</h3>
            <p>Browse hundreds of titles across all genres.</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Secure Checkout</h3>
            <p>Your orders are processed with top-notch security.</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
            <p>Get your favorite books delivered to your door.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
