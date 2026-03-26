import React from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Topbar from "../components/Topbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const { user } = useAuth();

  return (
    <MainLayout>
      {(setIsOpen) => (
        <>
          <Topbar
            title="Profile"
            subtitle="Manage your librarian profile"
            onMenuClick={() => setIsOpen(true)}
          />

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">Profile Details</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="mt-1 font-semibold text-slate-800">{user?.name}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-800">{user?.email}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-1 font-semibold text-slate-800">{user?.role}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Profile;