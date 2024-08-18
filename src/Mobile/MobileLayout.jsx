import React from "react";
import Navbar from "./components/Navbar";
import useCheckLogin from "../HOOK/Authentikasi/useCheckLogin";

const MobileLayout = () => {
  
  return (
    <main className="h-screen">
      <nav className="w-full">
        <Navbar />
      </nav>

      <div className="px-4 mx-auto py-4">test</div>
    </main>
  );
};

export default MobileLayout;
