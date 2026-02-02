import React, { useEffect, useState } from "react";
import { FaPlus, FaPrint } from "react-icons/fa";
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
import ModalEdit from "./ModalEdit";
import ModalPenerimaanStok from "./ModalPenerimaanStok";
import useAuth from "../../../../../Utils/Zustand/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const TableItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { loading, setLoading } = useLoadingStore();
  const [selectId, setSelectedId] = useState(null);
  const [selectData, setSelectData] = useState(null);
  const [isOpenEdit, setOpenEdit] = useState(false);
  const [isOpenStok, setOpenStok] = useState(false);
  const [selectedPerolehan, setSelectedPerolehan] = useState([]);
  const [selectedTahun, setSelectedTahun] = useState(null);

  const currentYear = new Date().getFullYear();

  // generate tahun: -5 sampai +5
  const yearOptions = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear - 5 + i;
    return { value: year, label: year.toString() };
  });
  const { user } = useAuth();
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
  const uniqueTahun = [...new Set(data.map((item) => item.tahun))].map((t) => ({
    value: t,
    label: t,
  }));

  const handleSearch = (event) => {
    setSearchTerm(event.target.value || "");
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "";
    return `Rp${value.toLocaleString("id-ID")}`;
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.namaBarang
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPerolehan =
      selectedPerolehan.length === 0 ||
      selectedPerolehan.some((sel) => sel.value === item.perolehan);

    const matchesTahun = !selectedTahun || item.tahun === selectedTahun.value;

    return matchesSearch && matchesPerolehan && matchesTahun;
  });

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await DeleteBarang(id);
      toast.success("Barang Berhasil dihapus");
      fetchData();
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setLoading(false);
    }
  };
  const uniquePerolehans = [...new Set(data.map((item) => item.perolehan))].map(
    (p) => ({
      value: p,
      label: p,
    }),
  );

  const handleEdit = (data) => {
    setOpenEdit(true);

    setSelectData(data);
  };

  const print = () => {
    navigate("/qrcode/barang");
  };
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#018a8c" : base.borderColor, // warna hijau muda
      boxShadow: state.isFocused ? "0 0 0 2px #018a8c" : "none",
      "&:hover": {
        borderColor: "#018a8c",
      },
      fontSize: "0.75rem", // text-xs
      minHeight: "32px",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#bbf7d0", // hijau muda bg untuk item terpilih
      color: "#065f46",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "0.75rem", // biar placeholder juga kecil
    }),
  };

  const isBarangMasukPage =
    window.location.pathname === "/inventory/daftar-barang";

  if (loading)
    return (
      <>
        <LoadingGlobal />
      </>
    );

  return (
    <div className="p-4 lg:px-12">
      <div className="mb-4 flex-col flex gap-4 justify-between">
        <input
          type="text"
          placeholder="Cari Nama Barang..."
          className="px-4 py-2 text-xs border-gray-300 rounded border-2 focus:outline-none focus:ring-2 focus:ring-hijau"
          value={searchTerm}
          onChange={handleSearch}
        />

        <Select
          isMulti
          isSearchable={true}
          options={uniquePerolehans}
          value={selectedPerolehan}
          onChange={(selected) => setSelectedPerolehan(selected)}
          className="w-full mt-2 z-30"
          styles={customSelectStyles}
          placeholder="Filter berdasarkan Asal Perolehan"
        />

        {/* <Select
          isMulti
          isSearchable
          options={uniqueTahun}
          value={selectedTahun}
          onChange={(selected) => setSelectedTahun(selected)}
          className="w-full mt-2 z-20"
          styles={customSelectStyles}
          placeholder="Filter berdasarkan Tahun"
        /> */}

        <CreatableSelect
          isSearchable
          options={yearOptions}
          value={selectedTahun}
          onChange={(selected) => setSelectedTahun(selected)}
          className="w-full mt-2 z-20"
          styles={customSelectStyles}
          placeholder="Filter berdasarkan Tahun"
          formatCreateLabel={(input) => `Tambah tahun: ${input}`}
          onCreateOption={(input) => {
            if (!isNaN(input)) {
              const newOption = { value: Number(input), label: input };
              setSelectedTahun(newOption);
            }
          }}
        />

        <div className="flex gap-4 flex-row ">
          {isBarangMasukPage && user.role === "admin" && (
            <>
              <Swiper
                freeMode
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  480: {
                    slidesPerView: 2.8,
                  },
                  420: {
                    slidesPerView: 2.4,
                  },

                  640: {
                    slidesPerView: 2.5,
                  },
                  768: {
                    slidesPerView: 4.5,
                  },
                  1024: {
                    slidesPerView: 8.5,
                  },
                }}
                slidesPerView={2.5}
                className="mySwiper"
              >
                <SwiperSlide>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-hijau text-white px-4 py-2 rounded text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FaPlus />
                      <p>Tambah Barang</p>
                    </div>
                  </button>
                </SwiperSlide>
                <SwiperSlide>
                  <button
                    className="bg-hijau text-white px-4 py-2 rounded text-xs"
                    onClick={() => setOpenStok(true)}
                  >
                    <div className="flex items-center gap-2">
                      <FaPlus />
                      <p>Penerimaan Stok</p>
                    </div>
                  </button>
                </SwiperSlide>
                <SwiperSlide>
                  <button
                    onClick={print}
                    className="bg-hijau text-white px-4 py-2 rounded text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FaPrint />
                      <p>Cetak QrCode</p>
                    </div>
                  </button>
                </SwiperSlide>
              </Swiper>
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
          <div className="scroll-container overflow-x-auto ">
            <table className="min-w-full bg-white border-2 border-gray-300">
              <thead>
                <tr className="text-xs">
                  {user.role === "admin" && (
                    <th className="border-b py-2 px-4 text-center">Aksi</th>
                  )}
                  <th className="border-b py-2 px-4 text-center">Barcode</th>
                  <th className="border-b-2 py-2 px-4 text-center">
                    Nama Barang
                  </th>
                  <th className="border-b py-2 px-4 text-center">
                    Nomor Register
                  </th>
                  <th className="border-b py-2 px-4 text-center">
                    Asal Perolehan
                  </th>
                  <th className="border-b py-2 px-4 text-center">Tahun</th>
                  <th className="border-b py-2 px-4 text-center">Merk Type</th>
                  <th className="border-b py-2 px-4 text-center">Jenis</th>
                  <th className="border-b py-2 px-4 text-center">Ukuran</th>
                  <th className="border-b py-2 px-4 text-center">Qty</th>
                  <th className="border-b py-2 px-4 text-center">
                    Harga Barang
                  </th>
                  <th className="border-b py-2 px-4 text-center">Foto</th>
                </tr>
              </thead>
              <tbody className="text-xs text-center">
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    {user.role === "admin" && (
                      <td className="border-b py-2 px-4">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-white text-black border border-hijau font-bold px-2 py-1 rounded w-14"
                          >
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
                    )}
                    <td className="border-b py-2 px-4">
                      <img
                        src={item.imageBarcode}
                        alt="Barcode"
                        onClick={() => {
                          setPreviewImage(item.imageBarcode);
                          setSelectedId(item.id);
                          setIsPreviewOpen(true);
                        }}
                        className="cursor-pointer w-32"
                      />
                    </td>
                    <td className="border-b py-2 px-4">{item.namaBarang}</td>
                    <td className="border-b py-2 px-4">{item.nomorRegister}</td>
                    <td className="border-b py-2 px-4">{item.perolehan}</td>
                    <td className="border-b py-2 px-4">{item.tahun}</td>
                    <td className="border-b py-2 px-4">{item.merkType}</td>
                    <td className="border-b py-2 px-4">{item.jenis}</td>
                    <td className="border-b py-2 px-4">{item.ukuran}</td>
                    <td className="border-b py-2 px-4">{item.qty}</td>
                    <td className="border-b py-2 px-4">
                      {formatCurrency(item.hargaBarang)}
                    </td>
                    <td className="border-b py-2 px-4">
                      <img
                        src={item.foto}
                        alt="Foto Barang"
                        className="lg:w-24 border rounded-md "
                      />
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

      <ModalEdit
        isOpen={isOpenEdit}
        onClose={() => setOpenEdit(false)}
        refresh={fetchData}
        data={selectData}
      />

      {/* Modal Preview */}
      <ModalPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageSrc={previewImage}
        id={selectId}
      />
      {isOpenStok && (
        <ModalPenerimaanStok
          refresh={fetchData}
          onClose={() => setOpenStok(false)}
        />
      )}
    </div>
  );
};

export default TableItem;
