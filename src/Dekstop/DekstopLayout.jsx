import React from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";


const DekstopLayout = () => {
  return (
    <main className="flex h-screen">
      <SideBar />
      <Content />
    </main>
  );
};

export default DekstopLayout;
