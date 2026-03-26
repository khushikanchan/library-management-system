import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";

function AddBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    status: "Available",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBooks = JSON.parse(localStorage.getItem("library_books")) || [];

    const newBook = {
      id: Date.now(),
      title: form.title,
      author: form.author,
      category: form.category,
      status: form.status,
    };

    const updatedBooks = [...existingBooks, newBook];
    localStorage.setItem("library_books", JSON.stringify(updatedBooks));

    navigate("/books");
  };

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar
            title="Add Book"
            subtitle="Create a new book entry"
            onMenuClick={() => setIsOpen(true)}
          />

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Book Title</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Author</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Available">Available</option>
                  <option value="Issued">Issued</option>
                </select>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Save Book
              </button>
            </form>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default AddBook;