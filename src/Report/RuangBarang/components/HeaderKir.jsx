import React from "react";

const HeaderKir = ({ length, namaRuang, kodeLokasi }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-base mt-2 uppercase text-center">
        <p>KARTU INVENTARIS RUANG (KIR)</p>
        <p>SMK NEGERI 2 KETAPANG</p>
      </div>

      <div
        className={`flex flex-col items-start font-bold text-sm mt-8 w-full ${"print:pl-1 pl-1"} `}
      >
        <div className="flex gap-4  w-full">
          <p>NAMA RUANG:</p>
          <p>{namaRuang}</p>
        </div>
        <div className="flex gap-5  w-full">
          <p>KODE LOKASI:</p>
          <p>{kodeLokasi}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderKir;
