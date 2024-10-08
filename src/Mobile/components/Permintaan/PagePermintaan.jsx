import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import FormPermintaan from "./components/FormPermintaan";
import { useLocation } from "react-router-dom";
import ListPermintaan from "./components/ListPermintaan";
import { Toaster } from "sonner";

const PagePermintaan = () => {
  const location = useLocation();
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>
      {location.pathname === "/permintaan" ? (
        <div>
          <Header text={"Daftar Permintaan"} />
          <ListPermintaan />
        </div>
      ) : (
        <div>
          <Header text={"Ajukan Permintaan"} />
          <FormPermintaan />
        </div>
      )}

      <div></div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PagePermintaan;
