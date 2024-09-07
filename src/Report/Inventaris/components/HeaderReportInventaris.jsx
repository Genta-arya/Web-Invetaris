import React from "react";

const HeaderReportInventaris = ({length}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-base mt-2 uppercase text-center">
        <p>DAFTAR INVENTARIS BARANG</p>
        <p>Peralatan dan mesin</p>
      </div>

      <div className={`flex flex-col items-start font-bold text-sm mt-8 w-full ${length >= 8 ? "print:pl-1" : "print:-ml-16"} `}>
        <div className="flex gap-4  w-full">
          <p>SATUAN PENDIDIKAN:</p>
          <p>SMK 2 KETAPANG</p>
        </div>
        <div className="flex gap-20  w-full">
          <p>KAB / KOTA:</p>
          <p>Ketapang</p>
        </div>
        <div className="flex  gap-[94px] w-full">
          <p>PROVINSI:</p>
          <p>Kalimantan Barat</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderReportInventaris;
