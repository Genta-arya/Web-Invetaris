import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ModalInput from "./ModalInput";
import handleError from "../../../../../Utils/HandleError";
import {
  DeleteBarang,
  GetBarang,
} from "../../../../../Service/API/Barang/Service_Barang";
import useLoadingStore from "./../../../../../Utils/Zustand/useLoading";
import LoadingGlobal from "../../../LoadingGlobal";
import ModalPreview from "./BarcodePreview";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ItemNotFound from "../../../../ItemNotFound";

// Modal Preview Component

const TableItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { loading, setLoading } = useLoadingStore();
  const [selectId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetBarang();
      setData(response.data || []);
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value || "");
  };

  const handleAddItem = (newItem) => {
    setData([...data, newItem]);
    setIsModalOpen(false);
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "";
    return `Rp${value.toLocaleString("id-ID")}`;
  };

  const filteredData = (data || []).filter((item) =>
    (item.namaBarang || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase())
  );

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await DeleteBarang(id);
      toast.success("Barang Berhasil dihapus");
      fetchData();
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setLoading(false);
    }
  };

  const isBarangMasukPage =
    window.location.pathname === "/inventory/barang-masuk";

  if (loading)
    return (
      <>
        <LoadingGlobal />
      </>
    );

  return (
    <div className="p-4">
      <div className="mb-4 flex-col flex gap-4 justify-between">
        <input
          type="text"
          placeholder="Cari Nama Barang..."
          className="px-4 py-2 text-xs border-gray-300 rounded border-2 focus:outline-none focus:ring-2 focus:ring-hijau"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="flex gap-4 flex-row ">
          {isBarangMasukPage && (
            <>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-hijau text-white px-4 py-2 rounded text-xs"
                >
                  <div className="flex items-center gap-2">
                    <FaPlus />
                    <p>Tambah Barang</p>
                  </div>
                </button>
                <button
                
                  className="bg-hijau text-white px-4 py-2 rounded text-xs"
                >
                  <div className="flex items-center gap-2">
                    <FaPlus />
                    <p>Penerimaan Stok</p>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {filteredData.length === 0 ? (
        <div className="">
          <ItemNotFound text={"Belum ada barang"} />
        </div>
      ) : (
        <>
          <div className="scroll-container overflow-x-auto">
            <table className="min-w-full bg-white border-2 border-gray-300">
              <thead>
                <tr className="text-xs">
                  <th className="border-b py-2 px-4 text-center">Aksi</th>
                  <th className="border-b py-2 px-4 text-left">Barcode</th>
                  <th className="border-b-2 py-2 px-4 text-left">
                    Nama Barang
                  </th>
                  <th className="border-b py-2 px-4 text-left">
                    Nomor Register
                  </th>
                  <th className="border-b py-2 px-4 text-left">Merk Type</th>
                  <th className="border-b py-2 px-4 text-left">Jenis</th>
                  <th className="border-b py-2 px-4 text-left">Ukuran</th>
                  <th className="border-b py-2 px-4 text-left">Qty</th>
                  <th className="border-b py-2 px-4 text-left">Harga Barang</th>
                  <th className="border-b py-2 px-4 text-left">Foto</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b py-2 px-4">
                      <div className="flex gap-2 items-center">
                        <button className="bg-white text-black border border-hijau font-bold px-2 py-1 rounded w-14">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-white text-black border border-hijau font-bold px-2 py-1 rounded w-14"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                    <td className="border-b py-2 px-4">
                      <img
                        src={item.imageBarcode}
                        alt="Barcode"
                        onClick={() => {
                          setPreviewImage(item.imageBarcode);
                          setSelectedId(item.id);
                          setIsPreviewOpen(true);
                        }}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="border-b py-2 px-4">{item.namaBarang}</td>
                    <td className="border-b py-2 px-4">{item.nomorRegister}</td>
                    <td className="border-b py-2 px-4">{item.merkType}</td>
                    <td className="border-b py-2 px-4">{item.jenis}</td>
                    <td className="border-b py-2 px-4">{item.ukuran}</td>
                    <td className="border-b py-2 px-4">{item.qty}</td>
                    <td className="border-b py-2 px-4">
                      {formatCurrency(item.hargaBarang)}
                    </td>
                    <td className="border-b py-2 px-4">
                      <img src={item.foto} alt="Foto Barang" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ModalInput
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refresh={fetchData}
      />

      {/* Modal Preview */}
      <ModalPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageSrc={previewImage}
        id={selectId}
      />
    </div>
  );
};

export default TableItem;
