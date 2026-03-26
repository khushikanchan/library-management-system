import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("library_books")) || [];
    setBooks(storedBooks);
  }, []);

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("library_books", JSON.stringify(updatedBooks));
  };

  const toggleStatus = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? {
            ...book,
            status: book.status === "Available" ? "Issued" : "Available",
          }
        : book
    );
    setBooks(updatedBooks);
    localStorage.setItem("library_books", JSON.stringify(updatedBooks));
  };

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar
            title="Books"
            subtitle="Manage and monitor library books"
            onMenuClick={() => setIsOpen(true)}
          />

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Book Inventory</h3>
              <a
                href="/add-book"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                + Add Book
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-3 pr-4 font-semibold">Title</th>
                    <th className="py-3 pr-4 font-semibold">Author</th>
                    <th className="py-3 pr-4 font-semibold">Category</th>
                    <th className="py-3 pr-4 font-semibold">Status</th>
                    <th className="py-3 pr-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-slate-500">
                        No books found
                      </td>
                    </tr>
                  ) : (
                    books.map((book) => (
                      <tr key={book.id} className="border-b border-slate-100">
                        <td className="py-4 pr-4 font-medium text-slate-800">{book.title}</td>
                        <td className="py-4 pr-4 text-slate-600">{book.author}</td>
                        <td className="py-4 pr-4 text-slate-600">{book.category}</td>
                        <td className="py-4 pr-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              book.status === "Available"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleStatus(book.id)}
                              className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                            >
                              Toggle Status
                            </button>
                            <button
                              onClick={() => deleteBook(book.id)}
                              className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Books;