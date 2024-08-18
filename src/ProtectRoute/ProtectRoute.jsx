import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useCheckLogin from "../HOOK/Authentikasi/useCheckLogin";
import LoadingGlobal from "../Mobile/components/LoadingGlobal";

const ProtectedRoute = ({ element }) => {
  const { user, isLoading } = useCheckLogin();
  const  navigate = useNavigate()

  if (isLoading) {
    return <LoadingGlobal />; 
  }

  if (user?.status === true) {
   
    return element;
  } else {
    navigate("/login");
  }


  
};

export default ProtectedRoute;
