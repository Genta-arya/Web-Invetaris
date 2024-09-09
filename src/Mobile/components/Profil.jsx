import React, { useState } from "react";
import useAuth from "../../Utils/Zustand/useAuth";
import { FaEdit } from "react-icons/fa";
import dummyProfil from "../../assets/dummyProfil.png";
import { ChangeImage } from "../../Service/API/Authentikasi/Service_Authentikasi";
import handleError from "../../Utils/HandleError";
import LoadingButton from "./LoadingButton";
import { toast, Toaster } from "sonner";

const Profil = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [selectedFile, setSelectedFile] = useState(null); // State untuk file yang dipilih
  const [previewImage, setPreviewImage] = useState(user.avatar || dummyProfil); // State untuk preview gambar
  const [loading, setLoading] = useState(false);
  console.log(user);
  const handleEditClick = () => {
    setIsModalOpen(true); // Buka modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Periksa jika file bukan gambar
      if (!file.type.startsWith("image/")) {
        toast.info("Harap pilih file gambar .(png,jpg,jpeg)");
        setSelectedFile(null);
       
        return;
      }
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveClick = async () => {
    setLoading(true);
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("image", selectedFile);
        await ChangeImage(formData, user.id);
        window.location.reload();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center pt-4">
      {user && (
        <div className="text-center mt-2 relative">
          <img
            src={user.avatar || dummyProfil}
            alt="Foto Profil"
            className="rounded-full w-24 h-24 mb-4"
          />

          <FaEdit
            title="Ganti Foto Profil"
            className="absolute bottom-3 right-0 cursor-pointer text-white"
            onClick={handleEditClick} // Event klik untuk membuka modal
          />
        </div>
      )}
      <p className="text-center mb-3 text-sm max-w-52">Hi, {user.username}</p>
      <p className="text-xs border px-2 py-1 rounded-md">
        {user.role === "admin" ? "Administrasi" : "Pegawai"}
      </p>

     
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white md:w-96 lg:w-96 p-6 rounded-md">
            <h2 className="text-sm mb-4 text-black font-bold">
              Ganti Foto Profil
            </h2>

           
            {previewImage && (
              <div className="flex justify-center">
                <img
                  src={previewImage}
                  alt="Preview Foto Profil"
                  className="rounded-full w-24 h-24   mb-4"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="text-xs"
              onChange={handleFileChange}
            />
            <div className="mt-4 flex flex-col-reverse gap-2">
              <button
                disabled={loading}
                className="px-4 py-2 border-hijau border text-gray-500 text-xs rounded-md"
                onClick={handleCloseModal}
              >
                Batal
              </button>
              <button
                disabled={loading}
                className="px-4 py-2 bg-hijau text-xs text-white rounded-md"
                onClick={handleSaveClick}
              >
                <LoadingButton loading={loading} text="Simpan" />
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Profil;
