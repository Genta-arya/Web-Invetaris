import React, { useState } from "react";

const TableItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoomFilter = (event) => {
    setSelectedRoom(event.target.value);
  };

  const data = [
    {
      kodeBarang: "001",
      namaBarang: "Contoh Barang",
      nomorRegister: "123456",
      merkType: "Merk A",
      ukuran: "M",
      tahun: "2024",
      asalUsul: "Pembelian",
      hargaBarang: "Rp1.000.000",
      kondisi: "Baru",
      ruangPenempatan: ["Ruang 1", "Ruang 2"],
      foto: "https://via.placeholder.com/100",
      barcode: "https://via.placeholder.com/50x20?text=Barcode",
    },
    {
      kodeBarang: "002",
      namaBarang: "Contoh Barang 1",
      nomorRegister: "123457",
      merkType: "Merk B",
      ukuran: "L",
      tahun: "2023",
      asalUsul: "Hibah",
      hargaBarang: "Rp500.000",
      kondisi: "Bekas",
      ruangPenempatan: ["Ruang 4"],
      foto: "https://via.placeholder.com/100",
      barcode: "https://via.placeholder.com/50x20?text=Barcode",
    },
    // Tambahkan data lainnya di sini
  ];

  const filteredData = data
    .filter((item) =>
      item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedRoom === ""
        ? true
        : item.ruangPenempatan.includes(selectedRoom)
    );

  const uniqueRooms = [...new Set(data.flatMap((item) => item.ruangPenempatan))];

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Cari Nama Barang..."
          className="px-4 py-2 text-xs border-gray-300 rounded border-2 focus:outline-none focus:ring-2 focus:ring-hijau"
          value={searchTerm}
          onChange={handleSearch}
        />

        <select
          className="px-4 py-2 text-xs border-gray-300 rounded border-2 focus:outline-none focus:ring-2 focus:ring-hijau"
          value={selectedRoom}
          defaultValue=""
          onChange={handleRoomFilter}
        >
          <option value="">Semua Ruang</option>
          {uniqueRooms.map((room, index) => (
            <option key={index} value={room} className="text-xs select-none">
              {room}
            </option>
          ))}
        </select>
      </div>

      <div className="scroll-container overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-gray-300">
          <thead>
            <tr className="text-xs">
              <th className="border-b py-2 px-4 text-center">Aksi</th>
              <th className="border-b py-2 px-4 text-left">Barcode</th>
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
              <tr key={index}>
                <td className="border-b py-2 px-4">
                  <div className="flex gap-2 items-center">
                    <button className="bg-white text-black border border-hijau font-bold px-2 py-1 rounded w-14">
                      Edit
                    </button>
                    <button className="bg-white text-black border border-hijau font-bold px-2 py-1 rounded w-14">
                      Hapus
                    </button>
                  </div>
                </td>
                <td className="border-b py-2 px-4">
                  <img src={item.barcode} alt="Barcode" />
                </td>
                <td className="border-b py-2 px-4">{item.kodeBarang}</td>
                <td className="border-b py-2 px-4">{item.namaBarang}</td>
                <td className="border-b py-2 px-4">{item.nomorRegister}</td>
                <td className="border-b py-2 px-4">{item.merkType}</td>
                <td className="border-b py-2 px-4">{item.ukuran}</td>
                <td className="border-b py-2 px-4">{item.tahun}</td>
                <td className="border-b py-2 px-4">{item.asalUsul}</td>
                <td className="border-b py-2 px-4">{item.hargaBarang}</td>
                <td className="border-b py-2 px-4">{item.kondisi}</td>
                <td className="border-b py-2 px-4">
                  {item.ruangPenempatan.join(", ")}
                </td>
                <td className="border-b py-2 px-4">
                  <img src={item.foto} alt="Foto Barang" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableItem;
