import React from "react";
import KOPsurat from "../../Inventaris/components/KOPsurat";
import HeaderKir from "./HeaderKir";
import TTDKir from "./TTDKir";

const TablePreviewKir = ({ componentRef, data, length }) => {
  console.log(length);
  return (
    <div
      className="md:w-[220mm] scroll-container md:mt-8 lg:mt-12 lg:w-[240mm] w-[95%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8 lg:p-0 md:p-8 overflow-auto"
      style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
    >
      {data ? (
        <div className={`p-4  ${length >= 14 ? "print:p-8" : "print:p-0"}  w-full`} ref={componentRef}>
          <KOPsurat length={length} tipe={"kir"} />
          <HeaderKir
            kodeLokasi={data.kodeRuang || "Tidak ada kode lokasi"}
            length={length}
            namaRuang={data.nama || "Tidak ada nama ruang"}
          />
          <div className="flex justify-center flex-col gap-4 items-center">
            <table className="w-[100%] border-collapse border border-gray-300 text-xs mt-4">
              <thead>
                <tr className="text-center">
                  <th className="border border-gray-300 p-2">No</th>
                  <th className="border border-gray-300 p-2">Nama Barang</th>
                  <th className="border border-gray-300 p-2">Kode Barang</th>
                  <th className="border border-gray-300 p-2">Tahun Pembelian</th>
                  <th className="border border-gray-300 p-2">
                    Asal Usul cara perolehan
                  </th>
                  <th className="border border-gray-300 p-2">Jumlah Barang</th>
                  <th className="border border-gray-300 p-2">Keadaan Barang</th>
                  <th className="border border-gray-300 p-2">Ket</th>
                </tr>
              </thead>
              <tbody>
                {data.inventaris && data.inventaris.length > 0 ? (
                  data.inventaris.map((item, index) => (
                    <tr key={item.id} className="text-center">
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">
                        {item.barang.namaBarang || "Tidak ada nama barang"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.barang.kodeBarang || "Tidak ada kode barang"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.barang.tahun || "Tidak ada tahun pembelian"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.barang.perolehan || "Tidak ada perolehan"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.qty || "0"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.barang.kondisi || "Tidak ada kondisi"}
                      </td>
                      <td className="border border-gray-300 p-2">-</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-gray-300 p-4 text-center"
                    >
                      Tidak ada data barang
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <TTDKir
              length={length}
              name="SUMARI, S.Pi"
              nip="19691227 201407 1001"
              bidang={"Waka Sarpras"}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          Data tidak tersedia
        </div>
      )}
    </div>
  );
};

export default TablePreviewKir;
