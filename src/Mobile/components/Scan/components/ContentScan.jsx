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
              setScanResult(code.data);
              console.log('Scan Result:', code.data); // Log the scan result
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
    <div className='p-4'>
      <h1 className='text-lg font-bold mb-4'>Camera View</h1>
      {hasPermission === null ? (
        <p>Meminta izin akses kamera...</p>
      ) : !hasPermission ? (
        <p className='text-red-500'>Izin akses kamera tidak diberikan. Harap izinkan akses kamera untuk menggunakan fitur ini.</p>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width='100%'
            videoConstraints={{ facingMode: 'environment' }}
            style={{ border: '1px solid green' }} // Tambahkan style sementara
          />
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }} // Canvas is used internally, so hide it
          />
          {scanResult && (
            <div className='mt-4'>
              <p className='text-md font-medium mb-2'>Scan Result:</p>
              <a
                href={scanResult}
                target='_blank'
                rel='noopener noreferrer'
                className='block text-blue-500 truncate overflow-hidden bg-gray-100 p-4 border border-gray-300 rounded hover:bg-gray-200'
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
    </div>
  );
};

export default ContentScan;
