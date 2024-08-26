import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import PermissionModal from './PermissionModal';

const ContentScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if permission has already been granted
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the stream
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

              // Check if result is a valid URL
              if (isValidUrl(result)) {
                window.location.href = result; // Navigate to the URL
              }

              return; // Stop detection after successful scan
            }
          } catch (error) {
            console.error('Error processing image data:', error);
          }
        }
      }

      requestAnimationFrame(detectQR); // Continue detecting QR codes
    };

    detectQR(); // Start detecting QR codes

    return () => cancelAnimationFrame(detectQR); // Clean up
  }, [hasPermission]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

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

  return (
    <div className='relative p-4'>
     
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
          {scanResult && (
            <div className='mt-4'>
              <p className='text-md font-medium mb-2'>Scan Result:</p>
              <p className='bg-gray-100 p-4 border border-gray-300 rounded' style={{ wordBreak: 'break-word' }}>
                {scanResult}
              </p>
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
    </div>
  );
};

export default ContentScan;
