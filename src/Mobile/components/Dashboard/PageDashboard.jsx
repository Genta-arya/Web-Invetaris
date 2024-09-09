import React from "react";
import ContentDashboard from "./components/ContentDashboard";
import Navbar from "../Navbar";
import Header from "../Header";
import Chart from "./components/Chart";


const PageDashboard = () => {
  

  return (
    <main className="h-screen bg-gray-100">
      <nav className="w-full">
        <Navbar />
      </nav>
      <Header text={"Dashboard"} />
      <ContentDashboard  />

      

   
    </main>
  );
};

export default PageDashboard;
