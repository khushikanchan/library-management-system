import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, BookOpenCheck } from "lucide-react";

function Register() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-emerald-700 via-teal-700 to-slate-900 p-12 text-white lg:flex">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3">
              <BookOpenCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">LibraSys</h1>
              <p className="text-sm text-emerald-100">Create your library account</p>
            </div>
          </div>

          <div className="mt-16 max-w-md">
            <h2 className="text-4xl font-bold leading-tight">
              Start managing your library with confidence.
            </h2>
            <p className="mt-5 text-base text-emerald-100">
              Register as an admin or librarian and access a modern library
              management dashboard.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
          <p className="text-sm text-emerald-100">
            “Fast setup, clean dashboard, and simple library operations.”
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
            <p className="mt-2 text-slate-500">Register to use the library system</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                <User size={18} className="mr-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                <Mail size={18} className="mr-3 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                <Lock size={18} className="mr-3 text-slate-400" />
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;