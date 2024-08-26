import React from 'react';

const PermissionModal = ({ onAllow, onDeny }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Akses Kamera Diperlukan</h2>
        <p className='mb-4'>Aplikasi ini memerlukan akses ke kamera Anda untuk melakukan pemindaian barcode. Harap izinkan akses kamera untuk melanjutkan.</p>
        <div className='flex justify-end gap-4'>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded'
            onClick={onAllow}
          >
            Izinkan
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded'
            onClick={onDeny}
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
