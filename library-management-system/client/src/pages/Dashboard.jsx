import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";
import StatCard from "../components/StatCard.jsx";

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("library_books")) || [];
    if (storedBooks.length === 0) {
      const sampleBooks = [
        { id: 1, title: "Computer Networks", author: "Tanenbaum", category: "Networking", status: "Available" },
        { id: 2, title: "Cyber Security Essentials", author: "Charles Brooks", category: "Security", status: "Issued" },
        { id: 3, title: "Data Structures", author: "Mark Allen Weiss", category: "Programming", status: "Available" },
      ];
      localStorage.setItem("library_books", JSON.stringify(sampleBooks));
      setBooks(sampleBooks);
    } else {
      setBooks(storedBooks);
    }
  }, []);

  const totalBooks = books.length;
  const issuedBooks = books.filter((b) => b.status === "Issued").length;
  const availableBooks = books.filter((b) => b.status === "Available").length;

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar
            title="Dashboard"
            subtitle="Welcome back, Librarian"
            onMenuClick={() => setIsOpen(true)}
          />

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Books" value={totalBooks} color="text-blue-600" subtitle="Books in catalog" />
            <StatCard title="Issued Books" value={issuedBooks} color="text-orange-500" subtitle="Currently borrowed" />
            <StatCard title="Available Books" value={availableBooks} color="text-green-600" subtitle="Ready for issue" />
            <StatCard title="Pending Fines" value="₹1,250" color="text-red-500" subtitle="Unpaid fine balance" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Recent Activity</h3>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  ["Book issued", "Cyber Security Essentials", "2 min ago"],
                  ["Book added", "Operating System Concepts", "15 min ago"],
                  ["New user registered", "Librarian account created", "1 hour ago"],
                  ["Book returned", "Computer Networks", "3 hours ago"],
                ].map(([title, desc, time], index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-medium text-slate-800">{title}</p>
                      <p className="mt-1 text-sm text-slate-500">{desc}</p>
                    </div>
                    <span className="text-xs text-slate-400">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <a href="/add-book" className="rounded-xl bg-blue-600 px-4 py-3 text-left font-medium text-white hover:bg-blue-700">
                    + Add New Book
                  </a>
                  <a href="/books" className="rounded-xl bg-emerald-600 px-4 py-3 text-left font-medium text-white hover:bg-emerald-700">
                    View Books
                  </a>
                  <a href="/transactions" className="rounded-xl bg-violet-600 px-4 py-3 text-left font-medium text-white hover:bg-violet-700">
                    View Transactions
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-sm">
                <h3 className="text-lg font-semibold">Library Insights</h3>
                <p className="mt-2 text-sm text-blue-100">
                  Most borrowed category this week: Security
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Dashboard;