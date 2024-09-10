import React from "react";
import Navbar from "../Navbar";
import TableRuangan from "./components/TableRuangan";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header";
import { Toaster } from "sonner";

const PageRuangan = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>
      <nav className="">
        <Navbar />
      </nav>

      <div>
        <Header text={"Kelola Ruangan"} />
        <TableRuangan />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PageRuangan;
