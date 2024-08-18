import React, { useEffect, useState } from "react";
import handleError from "../../../Utils/HandleError";
import LoadingGlobal from "../LoadingGlobal";

const Content = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.0.2:5001/api/v1/barang/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <LoadingGlobal />;

  if (!data) {
    return (
      <div className="p-4 flex justify-center mt-24">
        Barang Tidak ditemukan
      </div>
    );
  }

  // Format the date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Format currency to Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Define the order of fields to display
  const displayOrder = [
    { key: "kodeBarang", label: "Kode Barang" },
    { key: "nomorRegister", label: "Nomor Register" },
    { key: "namaBarang", label: "Nama Barang" },
    { key: "merkType", label: "Merk" },
    { key: "ukuran", label: "Ukuran" },
    { key: "perolehan", label: "Perolehan" },
    { key: "qty", label: "Jumlah" },
    { key: "kondisi", label: "Kondisi" },
    { key: "ruangan", label: "Ruangan" },
    { key: "hargaBarang", label: "Harga Barang" },
    { key: "foto", label: "Foto" },
  ];

  return (
    <div className="p-4 pb-8">
      <table className="min-w-full bg-white border-2 border-gray-300">
        <thead>
          <tr className="text-xs">
            <th className="border-b py-2 px-4 text-left">Keterangan</th>
            <th className="border-b py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {displayOrder.map(({ key, label }) =>
            key in data ? (
              <tr key={key}>
                <td className="border-b py-2 px-4 font-semibold">{label}</td>
                <td className="border-b py-2 px-4">
                  {key === "foto" || key === "imageBarcode" ? (
                    <img
                      src={data[key]}
                      alt={key}
                      className="max-w-xs max-h-20"
                    />
                  ) : key === "hargaBarang" ? (
                    formatCurrency(data[key])
                  ) : data[key] === null ? (
                    "-"
                  ) : (
                    data[key].toString()
                  )}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
