import { Link, useLocation } from "@remix-run/react";
import type { User } from "@prisma/client";

type NavbarProps = {
  user: User | null;
};
export default function Navbar({ user }: NavbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const baseItems = [
    { path: "/", label: "Home" },
    { path: "/books", label: "Books" },
    { path: "/authors", label: "Authors" },
    { path: "/cart", label: "Cart" },
    { path: "/orders", label: "Orders" },
  ];
  const navItems = user
    ? [{ path: "/dashboard", label: "Dashboard" }, ...baseItems]
    : baseItems;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-lg">📚 Remix Library</div>
        <ul className="flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:underline ${
                  currentPath.startsWith(item.path) ? "text-yellow-400" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {user ? (
            <li>
              <form action="/logout" method="post">
                <button type="submit" className="hover:underline">
                  Logout
                </button>
              </form>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
