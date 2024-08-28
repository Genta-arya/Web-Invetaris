import React, { useRef, useEffect, useState } from "react";
import KOP from "../../assets/KOP.png";
import { useReactToPrint } from "react-to-print";
import { getAllInventaris } from "../../Service/API/Inventaris/Service_Inventaris";
import Navbar from "../../Mobile/components/Navbar";


const PageReportInventaris = () => {
  const componentRef = useRef();
  const [dataInventaris, setDataInventaris] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllInventaris();
        const originalData = response.data;
        const multipliedData = Array(5).fill(originalData).flat(); // Menggandakan data sebanyak 5 kali
        setDataInventaris(multipliedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @media print {
        @page {
          size:  landscape;
          margin: 20mm;
        }
        .page-break { page-break-before: always; }
        .page-break-margin { margin-top: 10mm; }
      }
    `,
  });

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white ">
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrint}
            className="bg-hijau text-white px-4 py-2 rounded"
          >
            Cetak Laporan
          </button>
        </div>
        <div className="flex justify-center ">
          <div
            className="md:w-[220mm] lg:w-[240mm] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8"
            style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
          >
            <div ref={componentRef} className="p-4">
              {/* Bagian ini adalah konten yang akan dicetak */}
              <div className="flex justify-center flex-col gap-4 items-center">
                <img
                  src={KOP}
                  alt="KOP Surat"
                  className="w-full bg-white"
                />
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
                    {dataInventaris.map((item, index) => (
                      <tr key={`${item.id}-${index}`} >
                        <td className="border border-gray-300 p-2">{item.barang.kodeBarang}</td>
                        <td className="border border-gray-300 p-2">{item.barang.namaBarang}</td>
                        <td className="border border-gray-300 p-2">{item.barang.nomorRegister}</td>
                        <td className="border border-gray-300 p-2">{item.barang.merkType}</td>
                        <td className="border border-gray-300 p-2">{item.barang.ukuran}</td>
                        <td className="border border-gray-300 p-2">{item.qty}</td>
                        <td className="border border-gray-300 p-2">{item.barang.tahun}</td>
                        <td className="border border-gray-300 p-2">{formatRupiah(item.barang.hargaBarang)}</td>
                        <td className="border border-gray-300 p-2">{item.barang.perolehan}</td>
                        <td className="border border-gray-300 p-2">{item.barang.kondisi}</td>
                        <td className="border border-gray-300 p-2">{item.ruangan.nama}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageReportInventaris;
