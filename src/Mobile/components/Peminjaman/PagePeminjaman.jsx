import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import TablePeminjaman from "./components/Form/compoents/TablePeminjaman";
import { Toaster } from "sonner";

const PagePeminjaman = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Daftar Peminjaman Barang"} />
        <TablePeminjaman />
      </div>

      <div></div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PagePeminjaman;
