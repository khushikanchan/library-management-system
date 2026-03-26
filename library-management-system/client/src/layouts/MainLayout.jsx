import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-4 md:p-6">{children(setIsOpen)}</main>
      </div>
    </div>
  );
}

export default MainLayout;