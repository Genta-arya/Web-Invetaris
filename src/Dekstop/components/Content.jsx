import React from "react";
import PageDashboard from "../../Mobile/components/Dashboard/PageDashboard";
import ContentDashboard from "../../Mobile/components/Dashboard/components/ContentDashboard";
import Navbar from "../../Mobile/components/Navbar";
import Header from "../../Mobile/components/Header";

const Content = () => {
    const dummyData = [
        { id: 1, title: "Total User", value: "1,234", color: "bg-blue-500" },
        { id: 2, title: "Total Barang", value: "$12,345", color: "bg-green-500" },
        { id: 3, title: "Barang Keluar", value: "67", color: "bg-yellow-500" },
        { id: 4, title: "Barang Masuk", value: "4", color: "bg-red-500" },
      ];
  return (
    <div className="ml-64 w-full">
        <Header text={"Dashboard"}/>
      <ContentDashboard  dummyData={dummyData}/>
    </div>
  );
};

export default Content;
