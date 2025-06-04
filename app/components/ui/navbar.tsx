import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navItems = [
    { path: "/books", label: "Books" },
    { path: "/authors", label: "Authors" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur transition-all dark:border-gray-800 dark:bg-gray-900/70 ${
        mounted ? "animate-in slide-in-from-top-2" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center font-semibold text-gray-900 transition-colors hover:text-black dark:text-gray-100 dark:hover:text-white"
        >
          <span className="mr-1 text-xl"></span>
          <span className="hidden text-lg sm:inline">Remix Library</span>
        </Link>
        <ul className="flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:text-black hover:after:scale-x-100 dark:hover:text-white ${
                  currentPath.startsWith(item.path)
                    ? "text-black dark:text-white after:scale-x-100"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
