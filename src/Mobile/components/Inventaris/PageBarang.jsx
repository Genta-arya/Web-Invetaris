import React from "react";
import Navbar from "../Navbar";
import TableItem from "./components/TableItem";
import Header from "../Header";

const PageBarang = () => {
  return (
    <main>
      <div className="lg:hidden md:block block">
        <nav className="">
          <Navbar />
        </nav>

        <div>
          <Header text={"Data Inventaris"} />
          <TableItem />
        </div>
      </div>

      <div>

      </div>
    </main>
  );
};

export default PageBarang;
