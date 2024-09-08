import React, { useState } from "react";
import { HandleRegister } from "../../../../Service/API/Authentikasi/Service_Authentikasi";
import { toast, Toaster } from "sonner";
import handleError from "../../../../Utils/HandleError";
import LoadingButton from "../../LoadingButton";

const AddUserModal = ({ isOpen, onClose, refresh }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    role: "pegawai",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await HandleRegister(newUser);
      toast.success("Pegawai Berhasil Ditambahkan");
      onClose();
      refresh();
      setNewUser({ username: "", role: "pegawai", password: "" });
    } catch (error) {
   
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-[60%]  w-full">
        <h3 className="text-lg font-semibold mb-4">Registrasi Pegawai</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              maxLength={20}
              required
              placeholder="Masukkan username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              required
              placeholder="Masukkan password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              required
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="flex flex-col-reverse gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-hijau text-white px-4 py-2 rounded-md shadow-md hover:bg-opacity-80"
            >
              <LoadingButton loading={loading} text={"Registrasi"} />
            </button>
          </div>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default AddUserModal;
