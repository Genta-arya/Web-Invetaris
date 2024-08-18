import { toast, Toaster } from "sonner";

const handleError = (error, navigate) => {

  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || "An unexpected error occurred.";

    switch (status) {
      case 400:
        toast.error(`${message}`);

        break;
      case 401:
        toast.error(`${message}`);
        setTimeout(() => navigate("/login"), 2000);
        break;
      case 500:
        toast.error(`${message}`);
        setTimeout(() => navigate("/login"), 2000);
        break;
      default:
        toast.error(`${status}: ${message}`);
        break;
    }
  } else if (error.request) {
    toast.error("Network Error: Failed to reach the server.");
  } else if (error.code === "ERR_NETWORK") {
    toast.error("Network Error: Failed to reach the server.");
    setTimeout(() => navigate("/login"), 2000);
  } else {
    toast.error("An unexpected error occurred while setting up the request.");
  }
};

export default handleError;
