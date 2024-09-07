import React from "react";

const TTDUsulan= ({ length , name ,nip , bidang }) => {
  const getFormattedDate = () => {
    const date = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };
  const formattedDate = getFormattedDate();
  return (
    <div
      className={`w-full mt-7 print:mt-4 text-sm flex justify-between ${
        length >= 14 ? "print:pl-10 print:pr-14" : "pr-16 pl-12 print:pl-10 print:pr-14"
      } `}
    >
      <div className="text-center font-bold">
        <p className="mb-4  uppercase">Mengetahui</p>
        <p className="  uppercase">Kepala Sekolah</p>
        <br />
        <br />
        <br />
        <br />
        <p className=" uppercase">Trisno, ST</p>
        <p>NIP. 19730917 200502 1002</p>
      </div>
      <div className="text-center font-bold">
        <p className="mb-4">{formattedDate} , Ketapang</p>
        <p className=" uppercase ">{bidang}</p>
        <br />
        <br />
        <br />
        <br />
        <p className=" uppercase">{name}</p>
        <p className=" uppercase">NIP. {nip}</p>
      </div>
    </div>
  );
};

export default TTDUsulan;
