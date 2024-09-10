import React from "react";

const HeaderBarangKeluar = ({ tahun }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="font-bold flex flex-col mb-8 text-base mt-2 uppercase text-center">
          <p>Laporan Penggunaan</p>
          <p> Barang Habis Pakai</p>
          <p>Tahun {tahun}</p>
        </div>
      </div>

    
    </>
  );
};

export default HeaderBarangKeluar;
