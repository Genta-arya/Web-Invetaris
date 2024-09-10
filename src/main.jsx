import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageBarang from "./Mobile/components/Inventaris/PageBarang.jsx";
import PageRuangan from "./Mobile/components/Ruangan/PageRuangan.jsx";
import PageBarangMasuk from "./Mobile/components/Barang/BarangMasuk/PageBarangMasuk.jsx";
import PagePermintaan from "./Mobile/components/Permintaan/PagePermintaan.jsx";
import PageLogin from "./Authentikasi/PageLogin.jsx";
import ProtectedRoute from "./ProtectRoute/ProtectRoute.jsx";
import PageDetail from "./Mobile/components/Detail/PageDetail.jsx";
import PageDetailBarangRuangan from "./Mobile/components/Ruangan/Detail/PageDetailBarangRuangan.jsx";
import PageBarangKeluar from "./Mobile/components/Barang/BarangKeluar/PageBarangKeluar.jsx";
import PageScan from "./Mobile/components/Scan/PageScan.jsx";
import PageReportInventaris from "./Report/Inventaris/PageReportInventaris.jsx";
import PageDaftarBarang from "./Mobile/components/Barang/DaftarBarang/PageDaftarBarang.jsx";
import PageUser from "./Mobile/components/User/PageUser.jsx";
import PageReportKIR from "./Report/RuangBarang/PageReportKIR";
import PageUsulan from "./Mobile/components/Usulan/PageUsulan.jsx";
import PageReportUsulan from "./Report/Usulan/PageReportUsulan.jsx";
import PagePeminjaman from "./Mobile/components/Peminjaman/PagePeminjaman.jsx";
import PagePengajuanPinjaman from "./Mobile/components/Peminjaman/components/Form/PagePengajuanPinjaman.jsx";
import PrintQr from "./Mobile/components/Barang/DaftarBarang/components/PrintQr.jsx";
import PageNotFound from "./Mobile/PageNotFound.jsx";
import PageReportBarangKeluar from "./Report/BarangKeluar/PageReportBarangKeluar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
  },
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/scan",
    element: <PageScan />,
  },
  {
    path: "/inventory",
    element: <ProtectedRoute element={<PageBarang />} />,
  },
  {
    path: "/detail/:id",
    element: <PageDetail />,
  },
  {
    path: "/report/Inventaris",
    element: <ProtectedRoute element={<PageReportInventaris />} />,
  },
  {
    path: "/report/kir/:id",
    element: <ProtectedRoute element={<PageReportKIR />} />,
  },
  {
    path: "/report/usulan/:id",
    element: <ProtectedRoute element={<PageReportUsulan />} />,
  },
  {
    path: "/report/barangkeluar",
    element: <ProtectedRoute element={<PageReportBarangKeluar />} />,
  },
  {
    path: "/karyawan",
    element: <ProtectedRoute element={<PageUser />} />,
  },
  {
    path: "/ruangan",
    element: <ProtectedRoute element={<PageRuangan />} />,
  },

  {
    path: "/usulan",
    element: <ProtectedRoute element={<PageUsulan />} />,
  },
  {
    path: "/barang/ruangan/:id",
    element: <ProtectedRoute element={<PageDetailBarangRuangan />} />,
  },
  {
    path: "/inventory/barang-keluar",
    element: <ProtectedRoute element={<PageBarangKeluar />} />,
  },
  {
    path: "/inventory/daftar-barang",
    element: <ProtectedRoute element={<PageDaftarBarang />} />,
  },
  {
    path: "/pengajuan/permintaan",
    element: <ProtectedRoute element={<PagePermintaan />} />,
  },
  {
    path: "/permintaan",
    element: <ProtectedRoute element={<PagePermintaan />} />,
  },
  {
    path: "/inventory/barang-masuk",
    element: <ProtectedRoute element={<PageBarangMasuk />} />,
  },

  {
    path: "/peminjaman",
    element: <ProtectedRoute element={<PagePeminjaman />} />,
  },
  {
    path: "/pengajuan/peminjaman",
    element: <ProtectedRoute element={<PagePengajuanPinjaman />} />,
  },
  {
    path: "/qrcode/barang",
    element: <PrintQr />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
