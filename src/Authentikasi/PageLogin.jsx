import React, { useState } from "react";
import { HandleLogin } from "../Service/API/Authentikasi/Service_Authentikasi";
import { toast, Toaster } from "sonner";
import handleError from "../Utils/HandleError";
import { useNavigate } from "react-router-dom";
import useCheckLogin from "../HOOK/Authentikasi/useCheckLogin";
import { PulseLoader } from "react-spinners";
import useLoadingStore from "../Utils/Zustand/useLoading";
import LoadingButton from "../Mobile/components/LoadingButton";

const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {} = useCheckLogin();
  const { loading ,setLoading } = useLoadingStore();

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
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau text-sm"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau text-sm"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-hijau text-white w-full py-2 rounded-md text-sm font-semibold hover:bg-hijau-dark"
          >
            <LoadingButton loading={loading} text={"Login"}/>
         
          </button>
        </form>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default PageLogin;
