import React, { useEffect, useState } from "react";
import Select from "react-select"; // Import react-select
import { useNavigate } from "react-router-dom";
import { getAllRuangan } from "../../../Service/API/Ruangan/Service_Ruangan";
import handleError from "../../../Utils/HandleError";

const PageKir = () => {
  const [ruanganList, setRuanganList] = useState([]);
  const [selectedRuangan, setSelectedRuangan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true); // Untuk mengontrol modal
  const navigate = useNavigate();

  // Fetch data ruangan saat komponen dimount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRuangan(); // Panggil API untuk mendapatkan data ruangan
        const options = response.data.map((ruangan) => ({
          value: ruangan.id,
          label: ruangan.nama,
        }));
        setRuanganList(options); // Set data ruangan ke state dalam format yang dibutuhkan react-select
      } catch (error) {
        handleError(error);
      }
    };

    fetchData();
  }, []);

  // Event handler untuk navigasi setelah ruangan dipilih
  const handleSelectRuangan = (selectedOption) => {
    setSelectedRuangan(selectedOption);
    setIsModalOpen(false); // Tutup modal setelah ruangan dipilih
    navigate(`/report/kir/${selectedOption.value}`); // Navigasi ke halaman laporan dengan ID ruangan
  };

  const back = () => {
    navigate("/");
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg md:w-[80%] lg:w-[50%] p-6">
            <h2 className="md:text-base font-semibold mb-4">
              Laporan Kartu Inventaris Ruang
            </h2>

            {/* Select dropdown untuk ruangan menggunakan react-select */}
            <Select
              options={ruanganList} // Data ruangan dalam bentuk opsi untuk react-select
              value={selectedRuangan}
              onChange={handleSelectRuangan} // Fungsi untuk handle pemilihan ruangan
              placeholder="Pilih atau ketik nama ruangan"
              className="mb-4 outline-none text-xs"
            />

            {/* Tombol Tutup Modal */}
            <button
              onClick={() => back()}
              className="mt-4 text-xs font-bold bg-hijau text-white rounded-md p-2 w-full"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PageKir;
