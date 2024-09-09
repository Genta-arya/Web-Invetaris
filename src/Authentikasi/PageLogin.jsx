import React, { useState } from "react";
import { HandleLogin } from "../Service/API/Authentikasi/Service_Authentikasi";
import { toast, Toaster } from "sonner";
import handleError from "../Utils/HandleError";
import { useNavigate } from "react-router-dom";
import useCheckLogin from "../HOOK/Authentikasi/useCheckLogin";
import useLoadingStore from "../Utils/Zustand/useLoading";
import LoadingButton from "../Mobile/components/LoadingButton";
import bg from "../assets/bg.png";
import smk from "../assets/smk.jpg";
import icon_smk from "../assets/icon_smk.png";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {} = useCheckLogin();
  const { loading, setLoading } = useLoadingStore();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await HandleLogin(username, password);
      toast.success("Login Berhasil");
      localStorage.setItem("token", response.data.user.token);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center" }}
    >
      <div className="bg-white rounded-md shadow-md w-full lg:max-w-[90%] md:max-w-[90%] flex flex-col md:flex-row">
        {/* Gambar */}
        <div className="flex-1 relative -mt-32 lg:mt-0 md:mt-0">
          <img
            src={smk}
            alt="SMK"
            className="w-full h-full object-cover lg:rounded-l-md md:rounded-l-md"
            style={{ filter: "brightness(30%)" }} // Mengurangi kecerahan gambar
          />
          <div className="absolute md:top-1/2 top-24 left-52 md:left-1/2 lg:bottom-[250px] lg:mt-16 transform -translate-x-1/2 w-full md:-translate-y-1/2  text-white text-xl  px-4 py-2 rounded-md">
            <div className=" p-4 rounded-md">
              <p className="border-b-4 w-fit pb-2 mb-4 border-white font-light uppercase lg:text-base md:text-base text-base ">
                Selamat Datang
              </p>
              <p className="font-light text-base lg:text-2xl md:text-xl ">
                Sistem Informasi Asset{" "}
              </p>
              <p className="font-bold md:text-base lg:text-base text-sm ">
                SMKN 2 KETAPANG, Kalimantan Barat
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-6 ">
          <div className="flex justify-center mb-8">
            <img src={icon_smk} alt="" srcset="" className="lg:w-40 md:w-40 w-32" />
          </div>
          <h2 className="lg:text-xl md:text-xl text-base font-semibold mb-6 text-center uppercase text-gray-500">
            Silahkan Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-12 pb-8">
            <div className="flex items-center gap-2">
              <FaUser className="text-hijau " />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:border-b-hijau  shadow-sm focus:outline-none text-sm"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div className="flex items-center gap-2 relative ">
              <FaLock className="text-hijau" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:border-b-hijau focus:outline-none   shadow-sm   text-sm"
                placeholder="Masukkan password"
                required
              />

              <div
                className="text-hijau absolute right-0 cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-hijau text-white w-full py-2  rounded-md text-sm font-semibold hover:bg-hijau-dark"
            >
              <LoadingButton loading={loading} text={"Login"} />
            </button>
          </form>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default PageLogin;
