import React from "react";
import Navbar from "../../Navbar";

import Header from "../../Header";

import { Toaster } from "sonner";
import TableBarangMasuk from "./components/TableBarangMasuk";

const PageBarangMasuk = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div className="">
        <Header text={"Barang Masuk"} />

        <TableBarangMasuk />
      </div>

      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PageBarangMasuk;
