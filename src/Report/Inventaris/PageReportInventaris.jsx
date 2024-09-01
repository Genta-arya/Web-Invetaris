import React, { useRef, useEffect, useState } from "react";
import KOP from "../../assets/KOP.png";
import { useReactToPrint } from "react-to-print";
import { getReport } from "../../Service/API/Inventaris/Service_Inventaris";
import Navbar from "../../Mobile/components/Navbar";
import ModalDate from "../../Mobile/components/Inventaris/components/ModalDate";
import { FaPrint, FaFilter } from 'react-icons/fa'; // Import ikon yang diperlukan
import Header from "../../Mobile/components/Header";

const PageReportInventaris = () => {
  const componentRef = useRef();
  const [dataInventaris, setDataInventaris] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date()); // Set default to current year

  const fetchData = async () => {
    try {
      const year = selectedYear.getFullYear();
      const report = await getReport(year);
      setDataInventaris(report);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @media print {
        @page {
          size: landscape;
          margin: 20mm;
        }
        .page-break { page-break-before: always; }
        .page-break-margin { margin-top: 10mm; }
      }
    `,
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveDate = (date) => {
    setSelectedYear(date); // Set the selected date
    setModalOpen(false);
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <>
      <Navbar />
      <Header text="Laporan Inventaris" />
      <div className="bg-white">
        <div className="flex justify-start mt-4 gap-4 lg:px-16 px-4">
          <button
            onClick={handleOpenModal}
            className="bg-hijau text-xs text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaFilter className="w-5 h-5" /> Filter Tahun
          </button>
          <button
            onClick={handlePrint}
            disabled={dataInventaris.length === 0} // Disable if no data
            className={`bg-hijau text-xs text-white px-4 py-2 rounded flex items-center gap-2 ${dataInventaris.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaPrint className="w-5 h-5" /> Cetak Laporan
          </button>
        </div>
        <div className="flex justify-center">
          <div
            className="md:w-[220mm] scroll-container lg:w-[240mm] w-[90%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8 overflow-auto"
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
      {modalOpen && (
        <ModalDate
          refresh={fetchData}
          onClose={handleCloseModal}
          selectedDate={selectedYear}
          setSelectedDate={setSelectedYear}
          onSave={handleSaveDate}
        />
      )}
    </>
  );
};

export default PageReportInventaris;
