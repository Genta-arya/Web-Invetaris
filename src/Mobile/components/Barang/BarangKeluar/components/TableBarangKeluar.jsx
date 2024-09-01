import React from "react";

const TableBarangKeluar = ({
  filteredBarangKeluar,
  handleNavigate,
  formatTanggal,
  jenisStyles,
}) => {
  return (
    <div className="overflow-x-auto scroll-container">
      <table className="min-w-full bg-white shadow-lg rounded-lg ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
              Nama Barang
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
              Ruangan
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
              Tanggal
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
              Jumlah Keluar
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
              Sisa Stok
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
              Jenis Barang
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBarangKeluar.map((item, index) => {
            const barang = item.barang || {};
            const permintaan = item.barang?.permintaan?.[0] || {};

            return (
              <tr
                key={index}
                className="hover:bg-gray-200 hover:transition-colors cursor-pointer"
                onClick={() =>
                  handleNavigate(permintaan.barangId, item.barang.jenis)
                }
              >
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {barang.namaBarang || "Nama Barang Tidak Tersedia"}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {permintaan.ruangan?.nama || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {formatTanggal(item.tanggal)}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700 text-center">
                  {item.qty || 0}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700 text-center">
                  {barang.qty || 0}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      jenisStyles[barang.jenis] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {barang.jenis || "Jenis Tidak Tersedia"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableBarangKeluar;
