import React from "react";

const TablePreview = ({ componentRef, KOP, dataInventaris, formatRupiah }) => {
  return (
    <div
      className="md:w-[220mm] scroll-container md:mt-8 lg:mt-12 lg:w-[240mm]  w-[95%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8  lg:p-0 md:p-8 overflow-auto"
      style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
    >
      <div ref={componentRef} className="p-4">
        <div className="flex justify-center flex-col gap-4 items-center">
          <img src={KOP} alt="KOP Surat" className="w-full bg-white" />
          <table className="w-[90%] border-collapse border border-gray-300 text-xs mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Kode Barang</th>
                <th className="border border-gray-300 p-2">Nama Barang</th>
                <th className="border border-gray-300 p-2">Nomor Register</th>
                <th className="border border-gray-300 p-2">Merk/Type</th>
                <th className="border border-gray-300 p-2">Ukuran</th>
                <th className="border border-gray-300 p-2">Qty</th>
                <th className="border border-gray-300 p-2">Tahun</th>
                <th className="border border-gray-300 p-2">Harga</th>
                <th className="border border-gray-300 p-2">Asal Perolehan</th>
                <th className="border border-gray-300 p-2">Kondisi</th>
                <th className="border border-gray-300 p-2">Ruangan</th>
              </tr>
            </thead>
            <tbody>
              {dataInventaris.map((item) => (
                <tr key={item.id}>
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
                    {item.barang.kondisi}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.ruangan.nama}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePreview;
