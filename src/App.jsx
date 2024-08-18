import React from "react";
import MobileLayout from "./Mobile/MobileLayout";
import DekstopLayout from "./Dekstop/DekstopLayout";

const App = () => {
  return (
    <main>
      <div className="hidden lg:block md:hidden">
        <DekstopLayout />
      </div>

      <div className="lg:hidden md:block block">
        <MobileLayout />
      </div>
    </main>
  );
};

export default App;
