import React from "react";
import Navbar from "../../Navbar";

import Header from "../../Header";
import TableItem from "./components/TableItem";
import { Toaster } from "sonner";

const PageBarangMasuk = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Barang Masuk"} />

        <TableItem />
      </div>

      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PageBarangMasuk;
