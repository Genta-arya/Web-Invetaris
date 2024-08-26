import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

const MobileLayout = () => {
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

      <div className="px-4 mx-auto py-4">
        <div className="grid grid-cols-2 gap-4">
          {dummyData.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg shadow-lg ${item.color} text-white`}
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      
      </div>
    </main>
  );
};

export default MobileLayout;
