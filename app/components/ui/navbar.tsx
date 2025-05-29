import { Link, useLocation } from "@remix-run/react";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/books", label: "Books" },
    { path: "/authors", label: "Authors" },
    { path: "/", label: "Home" },
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-lg">📚 Remix Library</div>
        <ul className="flex space-x-6">
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
        </ul>
      </div>
    </nav>
  );
}
