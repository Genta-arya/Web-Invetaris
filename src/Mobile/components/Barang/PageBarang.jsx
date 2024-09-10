import React from "react";
import Navbar from "../Navbar";
import TableItem from "./components/TableItem";
import Header from "../Header";
import { Toaster } from "sonner";

const PageBarang = () => {
  return (
    <main>
      <div className="lg:hidden md:block block"></div>

      <div>
        <nav className="">
          <Navbar />
        </nav>

        <div>
          <Header text={"Data Inventaris"} />
          <TableItem />
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default PageBarang;
