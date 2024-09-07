import React, { useState, useEffect } from "react";
import {
  DeleteUser,
  getUser,
} from "../../../../Service/API/Authentikasi/Service_Authentikasi";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./ModalAddPegawai";
import { FaPlus } from "react-icons/fa6";
import handleError from "../../../../Utils/HandleError";
import LoadingGlobal from "../../LoadingGlobal";
import { useNavigate } from "react-router-dom";

const TableUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      handleError(error);
     
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (userId) => {
    setLoading(true);
    try {
      await DeleteUser(userId);

      fetchUsers();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  if (loading) return <LoadingGlobal />;
  return (
    <div className="p-6 bg-white ">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleAddUser}
          className="bg-hijau text-white px-4 py-2 rounded-lg shadow-md hover:opacity-80 transition duration-300"
        >
          <div className="flex items-center gap-2">
            <FaPlus />
            <p className="text-sm">Tambah Pegawai</p>
          </div>
        </button>
        <div className="w-1/3">
          <input
            type="text"
            id="searchFilter"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari nama pegawai..."
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-hijau text-white">
            <tr className="text-xs">
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data pegawai
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="text-xs">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:opacity-80 mr-2 transition duration-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddUserModal isOpen={isModalOpen} refresh={fetchUsers} onClose={handleModalClose} />
    </div>
  );
};

export default TableUser;
