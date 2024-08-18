import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import FormPermintaan from "./components/FormPermintaan";

const PagePermintaan = () => {
  return (
    <main>
      <div className="lg:hidden md:block block">
        <nav className="">
          <Navbar />
        </nav>

        <div>
          <Header text={"Ajukan Permintaan"} />
          <FormPermintaan />
        </div>
      </div>

      <div></div>
    </main>
  );
};

export default PagePermintaan;
