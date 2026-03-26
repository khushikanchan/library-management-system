import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  PlusSquare,
  Users,
  ClipboardList,
  BadgeIndianRupee,
  UserCircle2,
} from "lucide-react";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Books", path: "/books", icon: BookOpen },
    { name: "Add Book", path: "/add-book", icon: PlusSquare },
    { name: "Users", path: "/users", icon: Users },
    { name: "Transactions", path: "/transactions", icon: ClipboardList },
    { name: "Fines", path: "/fines", icon: BadgeIndianRupee },
    { name: "Profile", path: "/profile", icon: UserCircle2 },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 min-h-screen w-64 transform bg-slate-900 p-6 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">LibraSys</h1>
            <p className="mt-1 text-sm text-slate-400">Library Admin Panel</p>
          </div>
          <button
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;