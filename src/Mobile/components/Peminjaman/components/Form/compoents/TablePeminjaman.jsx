import React, { useEffect, useState } from "react";
import {
  GetPeminjaman,
  returPeminjmana,
  updateStatusPeminjaman,
} from "../../../../../../Service/API/Peminjaman/Service_Peminjaman";
import LoadingGlobal from "./../../../../LoadingGlobal";
import ItemNotFound from "../../../../../ItemNotFound";
import { FaCheckCircle } from "react-icons/fa";

const TablePeminjaman = () => {
  const [peminjaman, setPeminjaman] = useState([]);
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Format YYYY-MM-DD
  const [loading, setLoading] = useState(true);

  const fetchPeminjaman = async () => {
    setLoading(true);
    try {
      const response = await GetPeminjaman(filterDate);
      setPeminjaman(response.data); // Asumsi data adalah array peminjaman
    } catch (error) {
      console.error("Error fetching peminjaman:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPeminjaman();
  }, [filterDate]);

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      // Panggil API untuk update status
      await updateStatusPeminjaman({ peminjamanId: id, status: newStatus });

      // Update status di UI
      setPeminjaman((prevPeminjaman) =>
        prevPeminjaman.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
      fetchPeminjaman();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnItem = async (id) => {
    setLoading(true);
    try {
      await returPeminjmana({ peminjamanId: id });
      fetchPeminjaman();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    date.setHours(date.getHours() - 7);

    return `${date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}, ${date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",

      hour12: false,
    })}`;
  };

  if (loading) return <LoadingGlobal />;

  return (
    <div className="p-6 rounded-lg w-full text-sm">
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="filterDate"
        >
          Filter Tanggal
        </label>
        <input
          type="date"
          id="filterDate"
          max={new Date().toISOString().split("T")[0]}
          value={filterDate}
          onChange={handleDateChange}
          className="mt-1 block w-full py-2 px-3 text-xs border rounded-md shadow-sm outline-none sm:text-sm"
        />
      </div>
      {peminjaman.length === 0 ? (
        <ItemNotFound text={"Tidak ada data peminjaman"} />
      ) : (
        <div className="scroll-container">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="text-center">
                <th className="py-2 px-4 border-b">No.</th>
                <th className="py-2 px-4 border-b">Nama Peminjam</th>
                <th className="py-2 px-4 border-b">Nama Barang</th>
                <th className="py-2 px-4 border-b">Jumlah</th>
                <th className="py-2 px-4 border-b">Status Verifikasi</th>
                <th className="py-2 px-4 border-b">Tanggal Peminjaman</th>
                <th className="py-2 px-4 border-b">Tanggal Dikembalikan</th>
                <th className="py-2 px-4 border-b">Status Pinjam</th>
              </tr>
            </thead>
            <tbody>
              {peminjaman.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.nama}</td>
                  <td className="py-2 px-4 border-b">
                    {item.barang.namaBarang}
                  </td>
                  <td className="py-2 px-4 border-b">{item.qty}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md py-1 px-2 text-xs"
                    >
                      <option value="">Belum diverifikasi</option>
                      <option value="setuju">Setuju</option>
                      {item.status_kembali === "kembali" &&
                        item.status !== "setuju" && (
                          <option value="tolak">Tolak</option>
                        )}
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.status_kembali === "kembali" ? (
                      <>{formatDate(item.updatedAt)}</>
                    ) : (
                      <>-</>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.status === "setuju" && (
                      <button
                        disabled={item.status_kembali === "kembali"}
                        onClick={() => handleReturnItem(item.id)}
                        className={`${
                          item.status_kembali === "kembali"
                            ? "text-green-500"
                            : "text-blue-500 hover:underline"
                        } flex items-center`}
                      >
                        {item.status_kembali === "kembali" ? (
                          <>
                            <FaCheckCircle className="mr-1" /> Sudah
                            diKembalikan
                          </>
                        ) : (
                          "Kembalikan Barang"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablePeminjaman;
