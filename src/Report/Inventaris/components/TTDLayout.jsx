import React from "react";

const TTDLayout = ({ length }) => {
  const getFormattedDate = () => {
    const date = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };
  const formattedDate = getFormattedDate();
  return (
    <div
      className={`w-full mt-7 print:mt-4 text-sm flex justify-between ${
        length >= 6 ? "px-24" : ""
      } `}
    >
      <div className="text-center ">
        <p className="text-end mb-4  uppercase">Mengetahui</p>
        <p className="text-end  uppercase">Kepala Sekolah</p>
        <br />
        <br />
        <br />
        <br />
        <p className=" uppercase">Trisno, ST</p>
        <p>NIP. 19730917 200502 1002</p>
      </div>
      <div className="text-center">
        <p className="mb-4">{formattedDate} , Ketapang</p>
        <p className=" uppercase ">Pengurus Barang</p>
        <br />
        <br />
        <br />
        <br />
        <p className=" uppercase">Herman Syahadi</p>
        <p className=" uppercase">NIP. 19860822 201407 1001</p>
      </div>
    </div>
  );
};

export default TTDLayout;
