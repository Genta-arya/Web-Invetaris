import React from "react";
import TTDLayout from "./TTDLayout";
import HeaderReportInventaris from "./HeaderReportInventaris";
import KOPsurat from "./KOPsurat";

const TablePreview = ({
  componentRef,
  KOP,
  dataInventaris,
  formatRupiah,
  length,
}) => {
  return (
    <div
      className="md:w-[220mm] scroll-container md:mt-8 lg:mt-12 lg:w-[240mm]  w-[95%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8  lg:p-0 md:p-8 overflow-auto"
      style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
    >
      <div ref={componentRef} className="p-4 print:0">
        <KOPsurat length={length} tipe={"inventaris"} />
        <HeaderReportInventaris length={length} />

        <div className="flex justify-center flex-col gap-4 items-center">
          <table
            className={` ${
              length >= 8 ? "w-full" : "print:w-[90%]"
            } w-[90%] border-collapse border border-gray-300 text-xs mt-4`}
          >
            <thead>
              <tr className="text-center">
                <th className="border border-gray-300 p-2">No. Urut</th>
                <th className="border border-gray-300 p-2">Kode Barang</th>
                <th className="border border-gray-300 p-2">
                  Nama Barang / Jenis Barang
                </th>
                <th className="border border-gray-300 p-2">Nomor Register</th>
                <th className="border border-gray-300 p-2">Merk/Type</th>
                <th className="border border-gray-300 p-2">Ukuran / CC</th>
                <th className="border border-gray-300 p-2">Jumlah Barang</th>
                <th className="border border-gray-300 p-2">Tahun Pembelian</th>
                <th className="border border-gray-300 p-2">Harga</th>
                <th className="border border-gray-300 p-2">Asal usul cara perolehan</th>
                <th className="border border-gray-300 p-2">Ruangan Penempatan</th>
              </tr>
            </thead>
            <tbody>
              {dataInventaris.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.kodeBarang}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.namaBarang}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.nomorRegister}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.merkType}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.ukuran}
                  </td>
                  <td className="border border-gray-300 p-2">{item.qty}</td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.tahun}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatRupiah(item.barang.hargaBarang)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.barang.perolehan}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.ruangan.nama}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TTDLayout
            length={length}
            name={"HERMAN SYAHADI"}
            nip={"19860822 201407 1001"}
            bidang={"Pengurus Barang"}
          />
        </div>
      </div>
    </div>
  );
};

export default TablePreview;
