// src/HOOK/Authentikasi/useCheckLogin.js
import React, { useEffect, useState } from "react";
import handleError from "./../../Utils/HandleError";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckLogin } from "../../Service/API/Authentikasi/Service_Authentikasi";
import useAuth from "./../../Utils/Zustand/useAuth";

const useCheckLogin = () => {
  const { setAuthData, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
const location = useLocation();

  useEffect(() => {
    const checkLogins = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await CheckLogin(token);
        setAuthData(response.data);
       if (location.pathname === "/login") {
          navigate("/");
        }

       
      } catch (error) {
        handleError(error, navigate);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogins();
  }, [navigate, setAuthData]);

  return {
    user,
    isLoading,
  };
};

export default useCheckLogin;
