import React, { useState } from 'react';
import { GetBarang } from '../../../../Service/API/Barang/Service_Barang';

const TableRuangan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ruanganList, setRuanganList] = useState([
    { id: 1, namaRuangan: 'Ruang 1', lokasi: 'Gedung A'},
    { id: 2, namaRuangan: 'Ruang 2', lokasi: 'Gedung B'},
    { id: 3, namaRuangan: 'Ruang 3', lokasi: 'Gedung C' },
   
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdd = () => {
  
    const newRuangan = {
      id: ruanganList.length + 1,
      namaRuangan: `Ruang ${ruanganList.length + 1}`,
      lokasi: `Gedung ${String.fromCharCode(65 + ruanganList.length)}`,
    
    };
    setRuanganList([...ruanganList, newRuangan]);
  };

  const handleEdit = (id) => {
    // Logika untuk mengedit ruangan berdasarkan ID
    console.log(`Edit ruangan dengan ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logika untuk menghapus ruangan berdasarkan ID
    setRuanganList(ruanganList.filter((ruangan) => ruangan.id !== id));
  };

  const filteredRuangan = ruanganList.filter((ruangan) =>
    ruangan.namaRuangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Cari Nama Ruangan..."
          className="px-4 py-2 text-xs border-gray-400 focus:outline-none rounded border-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="border-hijau text-gray-800 font-bold border-2 text-xs px-2 py-1 rounded"
          onClick={handleAdd}
        >
          Tambah Ruangan
        </button>
      </div>

      <div className="scroll-container overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-xs text-center">
              <th className="border-b py-2 px-4">No</th>
              <th className="border-b py-2 px-4">Nama Ruangan</th>
              <th className="border-b py-2 px-4">Lokasi</th>
             
              <th className="border-b py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-xs text-center">
            {filteredRuangan.map((ruangan, index) => (
              <tr key={ruangan.id}>
                <td className="border-b py-2 px-4">{index + 1}</td>
                <td className="border-b py-2 px-4">{ruangan.namaRuangan}</td>
                <td className="border-b py-2 px-4">{ruangan.lokasi}</td>
              
                <td className="border-b py-2 px-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="border-hijau text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                      onClick={() => handleEdit(ruangan.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="border-hijau text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                      onClick={() => handleDelete(ruangan.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRuangan;
