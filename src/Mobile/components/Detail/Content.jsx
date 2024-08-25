import React, { useEffect, useState } from "react";
import handleError from "../../../Utils/HandleError";
import LoadingGlobal from "../LoadingGlobal";
import { GetSingleBarang } from "../../../Service/API/Barang/Service_Barang";
import { formatCurrency } from "../../../Utils/Format";
import { useNavigate } from "react-router-dom";

const Content = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetSingleBarang(id);
      setData(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBarangClick = (ruangId) => {
    navigate(`/barang/ruangan/${ruangId}`); // Arahkan ke halaman detail barang
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

  const totalDistributed = data.inventaris.reduce(
    (acc, curr) => acc + curr.qty,
    0
  );

  const stokGudang = data.qty;

  const displayOrder = [
    { key: "kodeBarang", label: "Kode Barang" },
    { key: "nomorRegister", label: "Nomor Register" },
    { key: "namaBarang", label: "Nama Barang" },
    { key: "merkType", label: "Merk" },
    { key: "ukuran", label: "Ukuran" },
    { key: "perolehan", label: "Perolehan" },
    { key: "kondisi", label: "Kondisi" },
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

          <tr>
            <td className="border-b py-2 px-4 font-semibold">Tersedia</td>
            <td className="border-b py-2 px-4">{stokGudang} unit</td>
          </tr>

          {data.inventaris && data.inventaris.length > 0 && (
            <tr>
              <td className="border-b py-2 px-4 font-semibold">Terpakai</td>
              <td className="border-b py-2 px-4">
                <ul>
                  {data.inventaris.map((inv, index) => (
                    <li
                      key={index}
                      className="py-1 hover:text-hijau hover:underline hover:cursor-pointer"
                      onClick={() => handleBarangClick(inv.ruangan.id)}
                    >
                      {index + 1}. {inv.ruangan.nama} ( {inv.qty} unit )
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
