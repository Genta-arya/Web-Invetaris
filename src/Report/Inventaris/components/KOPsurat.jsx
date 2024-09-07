import React from "react";
import akcaya_icon from "../../../assets/akcaya.jpeg";
import smk_icon from "../../../assets/smk2Icon.jpeg";

const KOPsurat = ({ length, tipe }) => {
  return (
    <div className="relative w-full mb-4 border-b-[4px] border-black">
      {/* Logo Sebelah Kiri */}
      <div
        className={`absolute ${
          length === 8 && tipe === "inventaris" ? "print:left-12 -left-5" : length === 14 && tipe === "kir" ? "print:left-24 -left-10" : "-left-5"
        } -bottom-8 transform -translate-y-1/2 w-[80px]`}
      >
        <img
          src={akcaya_icon}
          alt="Logo Akcaya"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Logo Sebelah Kanan */}
      <div
        className={`absolute ${
          length === 8 && tipe === "inventaris" ? "print:right-12 -right-6" : length === 14 && tipe === "kir" ? "print:right-24 -right-10" : "-right-6"
        } -bottom-6 transform -translate-y-1/2 w-[70px]`}
      >
        <img
          src={smk_icon}
          alt="Logo SMK"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Teks Tengah */}
      <div
        className={`text-center flex flex-col ${
          length === 8 && tipe === "inventaris" ? "print:mt-14" : length === 14 && tipe === "kir" ? "print:mt-20" : ""
        } pb-4 relative`}
      >
        <h1 className="leading-5 font-semibold text-lg uppercase">
          Pemerintah Provinsi Kalimantan Barat
        </h1>
        <h2 className="font-bold text-2xl uppercase">SMK NEGERI 2 KETAPANG</h2>

        <div className="mb-2 w-full text-center text-sm print:text-xs">
          <p>
            Jalan Gatot Subroto Kabupaten Ketapang, Provinsi Kalimantan Barat,
            Kode Pos 78813
          </p>
          <p>
            Telepon / Faksimile (0534) 34885 NSS. 401130607004 NPSN. 301034887
          </p>
          <p>Pos-el smkn2ktp@gmail.com, Laman www.smkn2ketapang.sch.id</p>
        </div>
        {/* Border Bawah Kedua */}
        <div className="absolute bottom-[2px] left-0 w-full border-b-[1px] border-black"></div>
      </div>
    </div>
  );
};

export default KOPsurat;
