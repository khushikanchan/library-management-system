import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";

function Transactions() {
  const transactions = [
    { id: 1, user: "Rahul", book: "Computer Networks", status: "Returned" },
    { id: 2, user: "Aditi", book: "Cyber Security Essentials", status: "Issued" },
    { id: 3, user: "Admin", book: "Data Structures", status: "Issued" },
  ];

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar
            title="Transactions"
            subtitle="Track issue and return activity"
            onMenuClick={() => setIsOpen(true)}
          />

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Transactions</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-3 pr-4 font-semibold">User</th>
                    <th className="py-3 pr-4 font-semibold">Book</th>
                    <th className="py-3 pr-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100">
                      <td className="py-4 pr-4 text-slate-800">{item.user}</td>
                      <td className="py-4 pr-4 text-slate-600">{item.book}</td>
                      <td className="py-4 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "Returned"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Transactions;