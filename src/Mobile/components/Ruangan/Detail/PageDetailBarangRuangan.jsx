import React, { useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import ContentDetail from "./components/ContentDetail";
import { Toaster } from "sonner";

const PageDetailBarangRuangan = () => {
  const [ruangan, setRuangan] = useState("");
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={ruangan} />
        <ContentDetail setNamaRuangan={setRuangan} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PageDetailBarangRuangan;
