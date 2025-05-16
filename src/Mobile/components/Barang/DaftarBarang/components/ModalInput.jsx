import React, { useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import handleError from "../../../../../Utils/HandleError";
import { PostBarang } from "../../../../../Service/API/Barang/Service_Barang";
import { formatRupiah, options } from "../../../../../Utils/Format";
import useLoadingStore from "../../../../../Utils/Zustand/useLoading";
import { toast } from "sonner";
import LoadingButton from "../../../LoadingButton";
import Webcam from "react-webcam";
import CreatableSelect from "react-select/creatable";
const ModalInput = ({ isOpen, onClose, refresh }) => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [nomorRegister, setNomorRegister] = useState("");
  const [merkType, setMerkType] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = React.useRef(null);
  const [hargaBarang, setHargaBarang] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [foto, setFoto] = useState(null);
  const [perolehan, setPerolehan] = useState("");
  const [jenisBarang, setJenisBarang] = useState("Habis Pakai"); // New state for item type
  const { loading, setLoading } = useLoadingStore();
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoSource, setFotoSource] = useState(null); // 'camera' | 'file' | null

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };
  const captureFromCamera = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "foto-barang.jpg", {
          type: "image/jpeg",
        });
        setFoto(file);
        setFotoPreview(imageSrc);
        setUseCamera(false);
        setFotoSource("camera");
      });
  };

  const resetFoto = () => {
    setFoto(null);
    setFotoPreview(null);
    setUseCamera(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
    setUseCamera(false);
    setFotoSource("file");
  };
  const handleHargaChange = (event) => {
    const value = event.target.value;
    const rawValue = value.replace(/[^\d]/g, "");
    setHargaBarang(rawValue);
  };

  const formatHargaBarang = (harga) => {
    if (!harga) return "";
    const value = harga.toString();
    return formatRupiah(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("kodeBarang", kodeBarang);
      formData.append("namaBarang", namaBarang);
      formData.append("nomorRegister", nomorRegister);
      formData.append("merkType", merkType);
      formData.append("ukuran", ukuran);
      formData.append("tahun", tahun);

      formData.append("hargaBarang", hargaBarang);
      formData.append("kondisi", kondisi);
      formData.append("image", foto);
      formData.append("perolehan", perolehan);
      formData.append("jenis", jenisBarang);

      await PostBarang(formData);
      refresh();
      toast.success("Barang Berhasil Ditambahkan");

      onClose();
      setKodeBarang("");
      setNamaBarang("");
      setNomorRegister("");
      setMerkType("");
      setUkuran("");

      setHargaBarang("");
      setKondisi("");
      setFoto(null);
      setPerolehan("");
      setJenisBarang("Habis Pakai");
    } catch (error) {
      // handleError(error);
    } finally {
      setLoading(false);
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg md:w-[80%] w-[95%] relative"
      >
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FaTimes />
        </button>
        <h2 className="text-base mb-4 font-semibold">Tambah Barang</h2>
        <div className="space-y-4 h-[450px] sidebar-scrollable overflow-auto border p-6 rounded-sm">
          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Kode Barang</strong>
            </label>
            <input
              type="text"
              placeholder="Kode Barang"
              value={kodeBarang}
              required
              onChange={handleInputChange(setKodeBarang)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">No Register</strong>
            </label>

            <input
              type="text"
              placeholder="Nomor Register"
              value={nomorRegister}
              required
              onChange={handleInputChange(setNomorRegister)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Asal Perolehan</strong>
            </label>
            <CreatableSelect
              styles={customSelectStyles}
              isClearable
              options={options}
              placeholder="Asal Perolehan"
              value={perolehan ? { label: perolehan, value: perolehan } : null}
              onChange={(selectedOption) =>
                setPerolehan(selectedOption ? selectedOption.value : "")
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Nama Barang</strong>
            </label>

            <input
              type="text"
              placeholder="Nama Barang"
              value={namaBarang}
              maxLength={200}
              required
              onChange={handleInputChange(setNamaBarang)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="tahun">
              <strong className="text-sm">Tahun</strong>
            </label>
            <input
              type="number"
              placeholder="Tahun Perolehan"
              value={tahun}
              min="1900"
              max={new Date().getFullYear()}
              required
              onChange={handleInputChange(setTahun)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Merk / Type</strong>
            </label>

            <input
              type="text"
              placeholder="Merk Type"
              value={merkType}
              required
              onChange={handleInputChange(setMerkType)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Kondisi</strong>
            </label>

            <input
              type="text"
              placeholder="Kondisi"
              value={kondisi}
              required
              onChange={handleInputChange(setKondisi)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Ukuran</strong>
            </label>
            <input
              type="text"
              placeholder="Ukuran"
              value={ukuran}
              required
              onChange={handleInputChange(setUkuran)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Harga Barang</strong>
            </label>
            <input
              type="text"
              placeholder="Harga Barang"
              value={formatHargaBarang(hargaBarang)}
              required
              onChange={handleHargaChange}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Jenis Barang</strong>
            </label>

            <select
              value={jenisBarang}
              onChange={(e) => setJenisBarang(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            >
              <option value="Habis Pakai">Habis Pakai</option>
              <option value="Asset">Asset</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold">Foto Barang</label>

            <div className="flex gap-2">
              {useCamera ? (
                <button
                  type="button"
                  className="text-xs px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => {
                    if (fotoSource === "camera") {
                      // Ulangi Foto → tetap di kamera
                      setUseCamera(false);
                      setFoto(null);
                      setFotoPreview(null);
                      setFotoSource(null);
                    } else {
                      // Batal → matikan kamera, balik ke file input
                      setUseCamera(false);
                      setFoto(null);
                      setFotoPreview(null);
                      setFotoSource(null);
                    }
                  }}
                >
                  Batal
                </button>
              ) : (
                <>
                  {fotoPreview && fotoSource !== "file" && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setUseCamera(false);
                          setFoto(null);
                          setFotoPreview(null);
                          setFotoSource(null);
                        }}
                        className="text-xs px-2 py-1 bg-green-500 text-white rounded"
                      >
                        Gunakan File
                      </button>
                      <button
                        type="button"
                        onClick={resetFoto}
                        className="text-xs px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        Ulangi Foto
                      </button>
                    </>
                  )}
                  {fotoSource !== "camera" && (
                    <button
                      type="button"
                      className="text-xs px-2 py-1 hidden lg:block md:block bg-green-500 text-white rounded"
                      onClick={() => {
                        setUseCamera(true);
                        setFoto(null);
                        setFotoPreview(null);
                        setFotoSource(null);
                      }}
                    >
                      Gunakan Kamera
                    </button>
                  )}
                </>
              )}
            </div>

            {!useCamera && !fotoPreview && (
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded"
              />
            )}

            {useCamera && !fotoPreview && (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="h-52 rounded border"
                  />
                </div>
                <div className="flex justify-center">
                  <div
                    className="flex justify-center w-fit px-8  text-white p-1 bg-hijau rounded-full cursor-pointer text-xl"
                    onClick={captureFromCamera}
                  >
                    <button
                      type="button"
                      className=" border rounded-full  py-2 px-2  "
                    >
                      <FaCamera className="" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {fotoPreview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={fotoPreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-hijau mt-4 w-full text-white px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
        >
          <LoadingButton loading={loading} text="Submit" />
        </button>
      </form>
    </div>
  );
};

export default ModalInput;
