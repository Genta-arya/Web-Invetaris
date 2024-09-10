import React from "react";
import KOPsurat from "../../Inventaris/components/KOPsurat";

const TableBarangKeluar = ({ data }) => {
  return (
    <>
    <KOPsurat tipe={"kir"} length={data.length} />
      <table className="table-auto w-full text-xs border-collapse border border-gray-300 ">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Nama Barang</th>
            <th className="border border-gray-300 px-4 py-2">Jenis</th>
            <th className="border border-gray-300 px-4 py-2">Nama Ruangan</th>
            <th className="border border-gray-300 px-4 py-2">Total Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.namaBarang}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.jenis}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.namaRuangan}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.totalQty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableBarangKeluar;
