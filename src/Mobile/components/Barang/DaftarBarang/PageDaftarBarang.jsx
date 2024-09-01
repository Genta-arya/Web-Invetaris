import React from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { Toaster } from "sonner";
import TableItem from "./components/TableItem";

const PageDaftarBarang = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div className="">
        <Header text={"Daftar Barang"} />

        <TableItem />
      </div>

      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PageDaftarBarang;
