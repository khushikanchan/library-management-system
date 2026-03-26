import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";

function Fines() {
  const fines = [
    { id: 1, user: "Rahul", amount: "₹150", status: "Paid" },
    { id: 2, user: "Aditi", amount: "₹300", status: "Pending" },
    { id: 3, user: "Admin", amount: "₹100", status: "Pending" },
  ];

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar
            title="Fines"
            subtitle="Monitor and manage pending fines"
            onMenuClick={() => setIsOpen(true)}
          />

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Fine Records</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-3 pr-4 font-semibold">User</th>
                    <th className="py-3 pr-4 font-semibold">Amount</th>
                    <th className="py-3 pr-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fines.map((fine) => (
                    <tr key={fine.id} className="border-b border-slate-100">
                      <td className="py-4 pr-4 text-slate-800">{fine.user}</td>
                      <td className="py-4 pr-4 text-slate-600">{fine.amount}</td>
                      <td className="py-4 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            fine.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {fine.status}
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

export default Fines;