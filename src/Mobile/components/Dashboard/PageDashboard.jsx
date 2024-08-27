import React from "react";
import ContentDashboard from "./components/ContentDashboard";
import Navbar from "../Navbar";
import Header from "../Header";


const PageDashboard = () => {
  const dummyData = [
    { id: 1, title: "Total User", value: "1,234", color: "bg-blue-500" },
    { id: 2, title: "Total Barang", value: "$12,345", color: "bg-green-500" },
    { id: 3, title: "Barang Keluar", value: "67", color: "bg-yellow-500" },
    { id: 4, title: "Barang Masuk", value: "4", color: "bg-red-500" },
  ];

  return (
    <main className="h-screen bg-gray-100">
      <nav className="w-full">
        <Navbar />
      </nav>
      <Header text={"Dashboard"} />
      <ContentDashboard  dummyData={dummyData}/>

   
    </main>
  );
};

export default PageDashboard;
