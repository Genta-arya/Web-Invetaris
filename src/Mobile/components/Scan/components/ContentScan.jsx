import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import PermissionModal from './Permision';


const ContentScan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const webcamRef = useRef(null);

  useEffect(() => {
    if (hasPermission === null) {
      setShowModal(true);
    }
  }, [hasPermission]);

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      setShowModal(false); // Hide modal on success
    } catch (error) {
      setHasPermission(false);
    }
  };

  const denyCameraPermission = () => {
    setHasPermission(false);
    setShowModal(false); // Hide modal on denial
  };

  useEffect(() => {
    if (!hasPermission) return;

    const interval = setInterval(() => {
      if (webcamRef.current && isScanning) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const image = new Image();
          image.src = imageSrc;

          image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, image.width, image.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
              setScanResult(code.data);
              console.log('Scan Result:', code.data); // Log the scan result
              setIsScanning(false); // Stop scanning after a successful scan
            }
          };
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [isScanning, hasPermission]);

  return (
    <div className='p-4'>
      <h1 className='text-lg font-bold mb-4'>Scan QR Code</h1>
      {hasPermission === null ? (
        <p>Meminta izin akses kamera...</p>
      ) : !hasPermission ? (
        <p className='text-red-500'>Izin akses kamera tidak diberikan. Harap izinkan akses kamera untuk menggunakan fitur ini.</p>
      ) : isScanning ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width='100%'
            videoConstraints={{ facingMode: 'environment' }}
          />
        </div>
      ) : (
        <div>
          <p className='text-md font-medium mb-2'>Scan Result:</p>
          <pre className='bg-gray-100 p-4 border border-gray-300 rounded'>{scanResult}</pre>
          <button
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
            onClick={() => setIsScanning(true)} // Restart scanning
          >
            Scan Again
          </button>
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
