import React, { useState, useEffect } from "react";
import handleError from "../../../../Utils/HandleError";
import { getAllInventaris } from "../../../../Service/API/Inventaris/Service_Inventaris";

import ModalImagePreview from "./ModalImagePreview";

import { FaPrint, FaSearch } from "react-icons/fa";
import ModalDate from "./ModalDate";
import { useNavigate } from "react-router-dom";

const TableItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectImage, setSelectImage] = useState(null);
  const [openImage, setOpenImage] = useState(false);
  const [data, setData] = useState([]);
 const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (year = null) => {
    try {
      const response = await getAllInventaris(year);
      setData(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoomFilter = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleOpenImage = (data) => {
    setOpenImage(true);
    setSelectImage(data);
  };

 
  const aggregateData = () => {
    const aggregated = {};

    data.forEach((item) => {
      const key = item.barang.id;
      if (!aggregated[key]) {
        aggregated[key] = {
          ...item.barang,
          ruangan: [item.ruangan.nama],
          qty: item.qty,
        };
      } else {
        aggregated[key].ruangan.push(item.ruangan.nama);
        aggregated[key].qty += item.qty;
      }
    });

    return Object.values(aggregated);
  };

  const handleReport = () => {
    navigate("/report/inventaris");
  };

  const aggregatedData = aggregateData();

  const filteredData = aggregatedData
    .filter((item) =>
      item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedRoom === ""
        ? true
        : item.ruangan.join(", ").includes(selectedRoom)
    );

  const uniqueRooms = [...new Set(data.map((item) => item.ruangan.nama))];
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div className="p-4 lg:px-12">
      <div className="mb-4 flex flex-wrap gap-4 relative">
        <input
          type="text"
          placeholder="Cari Nama Barang..."
          className="px-4 py-2 w-full text-xs border-gray-300 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-hijau"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select
          className="px-4 py-1 text-xs border-gray-300 rounded border-2 focus:outline-none focus:ring-2 focus:ring-hijau"
          value={selectedRoom}
          onChange={handleRoomFilter}
        >
          <option value="">Semua Ruang</option>
          {uniqueRooms.map((room, index) => (
            <option key={index} value={room} className="text-xs select-none">
              {room}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-1 text-xs bg-hijau text-white rounded hover:opacity-80"
          onClick={() => handleReport()} 
        >
          <div className="flex items-center gap-2">
            <FaPrint />
            <p>Rekap Tahunan</p>
          </div>
        </button>
      </div>

      <div className="scroll-container overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-gray-300">
          <thead>
            <tr className="text-xs">
              <th className="border-b py-2 px-4 text-center">Aksi</th>
              <th className="border-b py-2 px-4 text-left">QrCode</th>
              <th className="border-b-2 py-2 px-4 text-left">Kode Barang</th>
              <th className="border-b-2 py-2 px-4 text-left">Nama Barang</th>
              <th className="border-b py-2 px-4 text-left">Nomor Register</th>
              <th className="border-b py-2 px-4 text-left">Merk Type</th>
              <th className="border-b py-2 px-4 text-left">Ukuran</th>
              <th className="border-b py-2 px-4 text-left">Tahun</th>
              <th className="border-b py-2 px-4 text-left">
                Asal Usul Perolehan
              </th>
              <th className="border-b py-2 px-4 text-left">Harga Barang</th>
              <th className="border-b py-2 px-4 text-left">Kondisi</th>
              <th className="border-b py-2 px-4 text-left">Ruang Penempatan</th>
              <th className="border-b py-2 px-4 text-left">Foto</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border-b py-2 px-4">
                  <div className="flex gap-2 items-center">
                    <button className="bg-white text-black border border-hijau font-bold px-2 py-1 rounded w-14">
                      Hapus
                    </button>
                  </div>
                </td>
                <td
                  className="border-b py-2 px-4 cursor-pointer"
                  onClick={() => handleOpenImage(item.imageBarcode)}
                >
                  <img src={item.imageBarcode} alt="Barcode" />
                </td>
                <td className="border-b py-2 px-4">{item.kodeBarang}</td>
                <td className="border-b py-2 px-4">{item.namaBarang}</td>
                <td className="border-b py-2 px-4">{item.nomorRegister}</td>
                <td className="border-b py-2 px-4">{item.merkType}</td>
                <td className="border-b py-2 px-4">{item.ukuran}</td>
                <td className="border-b py-2 px-4">{item.tahun}</td>
                <td className="border-b py-2 px-4">{item.perolehan}</td>
                <td className="border-b py-2 px-4">
                  {formatRupiah(item.hargaBarang)}
                </td>
                <td className="border-b py-2 px-4">{item.kondisi}</td>
                <td className="border-b py-2 px-4">
                  {item.ruangan.join(", ")}
                </td>
                <td
                  className="border-b py-2 px-4 cursor-pointer"
                  onClick={() => handleOpenImage(item.foto)}
                >
                  <img src={item.foto} alt="Foto Barang" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openImage && (
        <ModalImagePreview
          imageSrc={selectImage}
          onClose={() => {
            setOpenImage(false), setSelectImage(null);
          }}
        />
      )}
    
    </div>
  );
};

export default TableItem;
