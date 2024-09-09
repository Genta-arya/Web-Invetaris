import React from "react";
import KOPsurat from "../../Inventaris/components/KOPsurat";
import HeaderKir from "../../RuangBarang/components/HeaderKir";
import TTDUsulan from "./TTDUsulan";
import HeaderUsulan from "./HeaderUsulan";

const TablePreviewUsulan = ({ componentRef, data, length }) => {
  console.log(length);

  return (
    <div
      className="md:w-[220mm] scroll-container md:mt-8 lg:mt-12 lg:w-[240mm] w-[95%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8 lg:p-0 md:p-8 overflow-auto"
      style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
    >
      {data ? (
        <div
          className={`p-4  ${
            length >= 14 ? "print:p-8" : "print:p-0"
          } print:-mt-7 w-full`}
          ref={componentRef}
        >
          <KOPsurat length={length} tipe={"kir"} />
          <HeaderUsulan
            nama={data.nama || "Tidak ada nama ruang"}
            unit={data.unit || "Tidak ada unit"}
            tahun={data.createdAt || "Tidak ada tahun"}
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
                  <th className="border border-gray-300 p-2">Verifikasi</th>
                </tr>
              </thead>
              <tbody>
                <tr key={data.id} className="text-center">
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    {data.namaBarang || "Tidak ada nama barang"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data.status === null
                      ? "Belum Diverifikasi"
                      : data.status === false
                      ? "Ditolak"
                      : "Disetujui"}
                  </td>
                </tr>
              </tbody>
            </table>
            <TTDUsulan
              length={length}
              name="SUMARI, S.Pi"
              nip="19691227 201407 1001"
              bidang={"Waka Sarpras"}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">Data tidak tersedia</div>
      )}
    </div>
  );
};

export default TablePreviewUsulan;
