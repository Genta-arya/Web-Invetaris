import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import PermissionModal from "./PermissionModal";
import { toast, Toaster } from "sonner"; // Import Sonner toast

const ContentScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading indicator
  const [cameraActive, setCameraActive] = useState(true); // Camera active state
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if permission has already been granted
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream
        setHasPermission(true);
      } catch (error) {
        setHasPermission(false);
      }
    };

    checkPermission();
  }, []);

  useEffect(() => {
    if (hasPermission === null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [hasPermission]);

  useEffect(() => {
    if (!hasPermission || !cameraActive) return; // Skip detection if no permission or camera not active

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = webcamRef.current?.video;

    const detectQR = () => {
      if (video && context) {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          try {
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
              const result = code.data;
              setScanResult(result);

              // Check if result is a URL
              if (
                result.startsWith("http://") ||
                result.startsWith("https://")
              ) {
                window.open(result, "_blank");
                setCameraActive(false); // Deactivate camera
                setScanResult(null); // Clear scan result after opening in a new tab
                return; // Stop detection after successful scan
              } else {
                // Show a toast if the result is not a URL
                toast("QR Code tidak dikenali", {
                  description: "Hasil QR code bukan URL yang valid.",
                });
                setCameraActive(false);
                setScanResult(null); // Clear scan result
              }
            }
          } catch (error) {
            console.error("Error processing image data:", error);
          }
        }
      }

      requestAnimationFrame(detectQR); // Continue detecting QR codes
    };

    detectQR(); // Start detecting QR codes

    return () => cancelAnimationFrame(detectQR); // Clean up
  }, [hasPermission, cameraActive]);

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (error) {
      setHasPermission(false);
    }
  };

  const denyCameraPermission = () => {
    setHasPermission(false);
    setShowModal(false); // Hide modal on denial
  };

  const handleScanAgain = () => {
    setCameraActive(true); // Reactivate camera
    setScanResult(null); // Clear scan result
  };

  return (
    <div className="relative p-4">
      {hasPermission === null ? (
        <p className="text-gray-500 mt-12">Meminta izin akses kamera...</p>
      ) : !hasPermission ? (
        <p className="text-red-500">
          Izin akses kamera tidak diberikan. Harap izinkan akses kamera untuk
          menggunakan fitur ini.
        </p>
      ) : !cameraActive ? (
        <button
          onClick={handleScanAgain}
          className="bg-hijau w-full text-white p-2 rounded"
        >
          Scan Lagi
        </button>
      ) : (
        <div className="relative">
          <Webcam
            className="rounded-xl shadow-lg h-full"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
            videoConstraints={{ facingMode: "environment" }}
            style={{ border: "1px solid gray" }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
              <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          {scanResult && (
            <div className="mt-4">
              <p className="text-md font-medium mb-2">Scan Result:</p>
              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-500 bg-gray-100 p-4 border border-gray-300 rounded hover:bg-gray-200"
                style={{ wordBreak: "break-word" }}
              >
                {scanResult}
              </a>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <PermissionModal
          onAllow={requestCameraPermission}
          onDeny={denyCameraPermission}
        />
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default ContentScan;
