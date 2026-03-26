import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("library_users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar title="Users" subtitle="Manage library users" onMenuClick={() => setIsOpen(true)} />

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Registered Users</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-sm text-slate-500">
                    <th className="py-3 pr-4 font-semibold">Name</th>
                    <th className="py-3 pr-4 font-semibold">Email</th>
                    <th className="py-3 pr-4 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100">
                      <td className="py-4 pr-4 font-medium text-slate-800">{user.name}</td>
                      <td className="py-4 pr-4 text-slate-600">{user.email}</td>
                      <td className="py-4 pr-4 text-slate-600">{user.role}</td>
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

export default Users;