import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleRuangan } from "../../../../../Service/API/Ruangan/Service_Ruangan";
import useLoadingStore from "../../../../../Utils/Zustand/useLoading";
import ModalPreview from "../../../Barang/BarangMasuk/components/BarcodePreview";
import { toast, Toaster } from "sonner";
import { ReturBarang } from "../../../../../Service/API/Barang/Service_Barang";
import LoadingGlobal from "../../../LoadingGlobal";
import { formatDate } from "../../../../../Utils/Format";

const ContentDetail = ({ setNamaRuangan }) => {
  const { id } = useParams();
  const [ruangan, setRuangan] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBarangId, setSelectedBarangId] = useState(null);
  const { loading, setLoading } = useLoadingStore();
  const [selectImage, setSelectImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getSingleRuangan(id);
      if (response && response.data) {
        setRuangan(response.data);
        setNamaRuangan(response.data.nama);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectBarang = (barangId) => {
    setSelectedBarangId(barangId);
  };

  const handleReturnBarang = async () => {
    if (!selectedBarangId) {
      toast.info("Pilih barang yang ingin dikembalikan.");
      return;
    }

    setLoading(true);
    try {
      const response = await ReturBarang(selectedBarangId);
      if (response) {
        toast.success("Barang berhasil dikembalikan.");
        fetchData(); // Refresh data setelah pengembalian
        setSelectedBarangId(null); // Reset selection setelah pengembalian
      }
    } catch (error) {
      console.error("Error returning barang:", error);
      toast.error("Gagal mengembalikan barang.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (data) => {
    setSelectImage(data);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingGlobal />;
  }
  if (!ruangan) {
    return null;
  }

  // Transform data into the required format
  const permintaanByMonth = ruangan.permintaan.reduce((acc, permintaan) => {
    permintaan.months.forEach((monthData) => {
      if (!acc[monthData.month]) {
        acc[monthData.month] = [];
      }
      acc[monthData.month] = acc[monthData.month].concat(monthData.permintaan);
    });
    return acc;
  }, {});

  const filteredPermintaan = Object.values(permintaanByMonth)
    .flat()
    .filter((item) =>
      item.barang.namaBarang.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-4 mt-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 lg:px-12">
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4 text-gray-700">
          Penggunaan Barang
        </h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Cari barang..."
          className="w-full px-3 py-2 outline-none text-xs mb-4 border border-hijau rounded-md"
        />
        {filteredPermintaan.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-12">
            Tidak ada barang di ruangan ini.
          </p>
        ) : (
          <div className="space-y-6">
            {filteredPermintaan.map((item) => {
              const barang = item.barang || {};

              return (
                <div
                  key={item.id}
                  className={`shadow-md rounded-lg p-4 border ${
                    selectedBarangId === barang.id
                      ? "border-hijau bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={barang.foto || "/path/to/default-image.jpg"}
                      alt={barang.namaBarang || "No image"}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h2 className="text-sm font-semibold">
                        {barang.namaBarang || "Nama Barang Tidak Tersedia"}
                      </h2>
                      <p className="text-xs text-gray-600">
                        Jumlah: {item.qty || 0}
                      </p>
                      <p className="text-xs text-gray-600">
                        Tanggal: {formatDate(item.createdAt)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Sisa Stok: {barang.qty || 0}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          barang.jenis === "Habis Pakai"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {barang.jenis || "Jenis Tidak Tersedia"}
                      </span>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleOpenModal(barang)}
                          className="text-xs text-blue-500 underline"
                        >
                          Lihat Barcode
                        </button>
                        {barang.jenis === "Asset" && (
                          <button
                            onClick={() => handleSelectBarang(barang.id)}
                            className="text-xs text-red-500 underline"
                          >
                            Kembalikan
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {selectedBarangId && (
        <div className="flex justify-center w-full">
          <button
            onClick={handleReturnBarang}
            className="mt-4 w-full px-4 py-2 text-xs bg-hijau text-white rounded-md hover:bg-opacity-80"
          >
            Kembalikan Barang
          </button>
        </div>
      )}
      {openModal && (
        <ModalPreview
          id={selectImage.id}
          imageSrc={selectImage.imageBarcode}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default ContentDetail;
