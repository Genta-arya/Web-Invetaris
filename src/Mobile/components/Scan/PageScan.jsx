import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import ContentScan from "./components/ContentScan";

const PageScan = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Scan QR Barang"} />
        <ContentScan />
      </div>
    </main>
  );
};

export default PageScan;
