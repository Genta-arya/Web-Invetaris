import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import PermissionModal from './PermissionModal';
import { toast, Toaster } from 'sonner'; // Import Sonner toast

const CONTENT_URL_PREFIX = 'https://web-invetaris.vercel.app/detail/'; // URL prefix to check for

const ContentScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
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
    if (!hasPermission) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = webcamRef.current?.video;

    const detectQR = () => {
      if (video && context) {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          try {
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
              const result = code.data;
              setScanResult(result);

              setLoading(false); // Hide loading indicator

              if (result.startsWith(CONTENT_URL_PREFIX)) {
                window.location.href = result; // Navigate to the URL
              } else {
                toast.error('QR code tidak dikenali'); // Show toast notification
              }

              return; // Stop detection after successful scan
            }
          } catch (error) {
            console.error('Error processing image data:', error);
          }
        }
      }

      requestAnimationFrame(detectQR);
    };

    setLoading(true); // Show loading indicator
    detectQR();

    return () => cancelAnimationFrame(detectQR);
  }, [hasPermission]);

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
    setShowModal(false);
  };

  return (
    <div className='relative p-4'>
      <h1 className='text-lg font-bold mb-4'>Scan Sekarang</h1>
      {hasPermission === null ? (
        <p className='text-gray-500 mt-12'>Meminta izin akses kamera...</p>
      ) : !hasPermission ? (
        <p className='text-red-500'>Izin akses kamera tidak diberikan. Harap izinkan akses kamera untuk menggunakan fitur ini.</p>
      ) : (
        <div className='relative'>
          <Webcam
            className='rounded-xl shadow-lg h-full'
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width='100%'
            height='100%'
            videoConstraints={{ facingMode: 'environment' }}
            style={{ border: '1px solid gray' }}
          />
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }}
          />
          {loading && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
              <div className='text-white'>Loading...</div>
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
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default ContentScan;
