import React from "react";
import { Menu, Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Topbar({ title, subtitle, onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-800 md:text-2xl">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 md:flex">
          <Search size={16} className="text-slate-400" />
          <input type="text" placeholder="Search..." className="text-sm outline-none" />
        </div>

        <button className="rounded-xl p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <div className="hidden text-right md:block">
          <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.role}</p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl p-2 text-red-500 hover:bg-red-50"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default Topbar;