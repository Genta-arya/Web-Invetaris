import React, { useState } from "react";
import Navbar from "../../Mobile/components/Navbar";
import Header from "../../Mobile/components/Header";

const PageReportKIR = () => {
    const [selectedYear, setSelectedYear] = useState(new Date());
  return (
    <div>
      {" "}
      <Navbar />
      <Header text={`Laporan KIR`} />
    </div>
  );
};

export default PageReportKIR;
