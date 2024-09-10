import React, { useEffect } from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import TableUser from "./components/TableUser";
import useAuth from "../../../Utils/Zustand/useAuth";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const PageUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      {user.role === "admin" && (
        <main>
          <div className="lg:hidden md:block block"></div>
          <nav className="">
            <Navbar />
          </nav>

          <div>
            <Header text={"Kelola Pegawai"} />
            <TableUser />
          </div>

          <div></div>
          <Toaster richColors position="top-right" />
        </main>
      )}
    </>
  );
};

export default PageUser;
