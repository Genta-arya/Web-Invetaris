import React from "react";

const HeaderUsulan = ({ length, tahun , nama , unit }) => {
  const tahunFormatYear = (tahun) => {
    return new Date(tahun).getFullYear();
  };
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-base mt-2 uppercase text-center">
        <p className="w-64">
          REKAPITULASI USULAN KEBUTUHAN ALAT / BAHAN PERSEMESTER
        </p>
      </div>

      <div
        className={`flex flex-col items-start font-bold text-sm mt-8 w-full ${"print:pl-1 pl-1"} `}
      >
        <div className="flex gap-11  w-full">
          <p>Nama:</p>
          <p>{nama}</p>
        </div>
        <div className="flex gap-5  w-full">
          <p>Unit Kerja:</p>
          <p>{unit}</p>
        </div>
        <div className="flex gap-11  w-full">
          <p>Tahun:</p>
          <p>{tahunFormatYear(tahun)}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderUsulan;
