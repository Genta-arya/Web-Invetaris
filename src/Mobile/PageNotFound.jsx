import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Halaman Tidak Ditemukan</p>
        <p className="text-lg text-gray-500 mb-4">
          Kami tidak dapat menemukan halaman yang Anda cari. Mungkin sudah dipindahkan atau dihapus.
        </p>
        <a
          href="/"
          className="bg-hijau text-white px-4 py-2 rounded hover:opacity-90"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
