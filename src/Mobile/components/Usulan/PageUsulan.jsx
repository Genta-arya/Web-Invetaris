import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import TabelDataUsulan from "./components/TabelDataUsulan";

const PageUsulan = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Kelola Pengusulan"} />
        <TabelDataUsulan />
      </div>

      <div></div>
    </main>
  );
};

export default PageUsulan;
