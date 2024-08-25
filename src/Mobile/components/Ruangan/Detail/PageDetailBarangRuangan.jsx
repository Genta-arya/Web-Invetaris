import React, { useState } from "react";
import Navbar from "../../Navbar";
import Header from "../../Header";
import ContentDetail from "./components/ContentDetail";

const PageDetailBarangRuangan = () => {

    const [ruangan,setRuangan] = useState("")
  return (
    <main>
      <div className="lg:hidden md:block block">
        <nav className="">
          <Navbar />
        </nav>

        <div>
          <Header text={ruangan} />
          <ContentDetail setNamaRuangan={setRuangan} />
        </div>
      </div>
    </main>
  );
};

export default PageDetailBarangRuangan;
