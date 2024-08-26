import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import PermissionModal from './PermisionModal';


const ContentScan = () => {
  const [scanResult, setScanResult] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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

  return (
    <div className='p-4'>
      <h1 className='text-lg font-bold mb-4'>Scan QR Code</h1>
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
          />
          <canvas
            ref={canvasRef}
            style={{ display: 'none' }} // Canvas is used internally, so hide it
          />
          {scanResult && (
            <div>
              <p className='text-md font-medium mb-2'>Scan Result:</p>
              <pre className='bg-gray-100 p-4 border border-gray-300 rounded'>{scanResult}</pre>
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
