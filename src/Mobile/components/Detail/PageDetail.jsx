import React from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import Content from "./Content";
import { useParams } from "react-router-dom";

const PageDetail = () => {
  const { id } = useParams();

  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Detail Barang"} />
        <Content id={id} />
      </div>

      <div></div>
    </main>
  );
};

export default PageDetail;
