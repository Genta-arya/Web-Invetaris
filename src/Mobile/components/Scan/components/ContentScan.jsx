import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import PermissionModal from './PermissionModal';


const ContentScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const webcamRef = useRef(null);

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
