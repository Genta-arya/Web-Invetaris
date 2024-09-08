import React from "react";
import Navbar from "../../../Navbar";
import Header from "../../../Header";
import FormPeminjaman from "./FormPeminjaman";

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
    </main>
  );
};

export default PagePengajuanPinjaman;
