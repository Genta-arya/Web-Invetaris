import React from "react";
import { PulseLoader } from "react-spinners";

const LoadingButton = ({ loading, text }) => {
  return <>{loading ? <PulseLoader size={9} color="white" /> : text}</>;
};

export default LoadingButton;
