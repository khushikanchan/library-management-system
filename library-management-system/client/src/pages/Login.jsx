import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpenCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-12 text-white lg:flex">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <BookOpenCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">LibraSys</h1>
              <p className="text-sm text-blue-100">Library Management Platform</p>
            </div>
          </div>

          <div className="mt-16 max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Manage your library smarter and faster.
            </h2>
            <p className="mt-5 text-base text-blue-100">
              Track books, users, transactions, due dates, and fines with a modern dashboard.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
          <p className="text-sm text-blue-100">
            Demo Login: admin@library.com / 123456
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
            <p className="mt-2 text-slate-500">Login to access your library dashboard</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Mail size={18} className="mr-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-sm outline-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Lock size={18} className="mr-3 text-slate-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full text-sm outline-none"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;