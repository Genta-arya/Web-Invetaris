import React, { useEffect, useState } from "react";
import { getDataDashboard } from "../../../../Service/API/Dashboard/service_dashboard";
import handleError from "../../../../Utils/HandleError";
import LoadingGlobal from "../../LoadingGlobal";
import { FaUser, FaBox, FaListUl, FaSignOutAlt, FaBoxOpen, FaWarehouse } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';
import { RiFileList2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const ContentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDataDashboard();
        setDashboardData(response.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingGlobal />;

  const dataItems = [
    {
      id: 1,
      title: "Daftar Pegawai",
      value: dashboardData.totalUser,
      color: "bg-blue-500",
      icon: <FaUser className="text-2xl" />,
      path: "/karyawan"
    },
    {
      id: 2,
      title: "Daftar Inventaris",
      value: dashboardData.totalInventaris,
      color: "bg-green-500",
      icon: <MdOutlineInventory className="text-2xl" />,
      path: "/inventory"
    },
    {
      id: 3,
      title: "Daftar Usulan",
      value: dashboardData.totalUsulan,
      color: "bg-yellow-500",
      icon: <RiFileList2Fill className="text-2xl" />,
      path: "/usulan"
    },
    {
      id: 4,
      title: "Daftar Permintaan",
      value: dashboardData.totalPermintaan,
      color: "bg-red-500",
      icon: <FaListUl className="text-2xl" />,
      path: "/permintaan"
    },
    {
      id: 5,
      title: "Daftar Barang",
      value: dashboardData.totalBarang,
      color: "bg-purple-500",
      icon: <FaBox className="text-2xl" />,
      path: "/inventory/daftar-barang"
    },
    {
      id: 6,
      title: "Barang Keluar",
      value: dashboardData.totalBarangKeluar,
      color: "bg-orange-500",
      icon: <FaSignOutAlt className="text-2xl" />,
      path: "/inventory/barang-keluar"
    },
    {
      id: 7,
      title: "Daftar Barang Masuk",
      value: dashboardData.totalBarangMasuk,
      color: "bg-teal-500",
      icon: <FaBoxOpen className="text-2xl" />,
      path: "/inventory/barang-masuk"
    },
    {
      id: 8,
      title: "Daftar Ruangan",
      value: dashboardData.totalRuangan,
      color: "bg-hijau",
      icon: <FaWarehouse className="text-2xl" />,
      path: "/ruangan"
    },
    {
      id: 9,
      title: "Daftar Peminjaman",
      value: dashboardData.totalPinjaman,
      color: "bg-sky-400",
      icon: <FaListUl className="text-2xl" />,
      path: "/peminjaman"
    },
  ];

  return (
    <div className="px-4 mx-auto py-4 lg:px-12">
      <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4">
        {dataItems.map((item) => (
          <motion.div
            key={item.id}
            className={`p-4 rounded-lg shadow-lg ${item.color} text-white flex items-center space-x-4 cursor-pointer hover:shadow-2xl hover:shadow-hijau transition-all ease-in`}
            onClick={() => navigate(item.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">
                <CountUp end={item.value} duration={2.5} />
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContentDashboard;
