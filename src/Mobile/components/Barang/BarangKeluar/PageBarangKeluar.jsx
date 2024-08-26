import React from "react";
import Header from "../../Header";
import Navbar from "../../Navbar";
import ContentBarangKeluar from "./components/ContentBarangKeluar";

const PageBarangKeluar = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Barang Keluar"} />
        <ContentBarangKeluar />
      </div>

      <div></div>
    </main>
  );
};

export default PageBarangKeluar;
