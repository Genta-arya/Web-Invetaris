import React from "react";
import Navbar from "../../../Navbar";
import Header from "../../../Header";
import FormPeminjaman from "./FormPeminjaman";
import { Toaster } from "sonner";

const PagePengajuanPinjaman = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Ajukan Pinjaman"} />
        <FormPeminjaman />
      </div>

      <div></div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PagePengajuanPinjaman;
