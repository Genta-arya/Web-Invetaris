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
    path: "/inventory",
    element: <ProtectedRoute element={<PageBarang />} />,
  },
  {
    path: "/detail/:id",
    element: <PageDetail />,
  },
  {
    path: "/ruangan",
    element: <ProtectedRoute element={<PageRuangan />} />,
  },
  {
    path: "/permintaan",
    element: <ProtectedRoute element={<PagePermintaan />} />,
  },
  {
    path: "/inventory/barang-masuk",
    element: <ProtectedRoute element={<PageBarangMasuk />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
