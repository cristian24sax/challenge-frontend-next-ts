'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accountId');
    localStorage.removeItem('userName');
    Cookies.remove('accountId');
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      <div className="text-xl font-bold flex justify-center items-center space-x-2">
        <Image src="/logo.png" width={30} height={30} alt="logo" />
        <span>EQUIP</span>
      </div>

      <div className="relative">
        <button
          className="flex items-center space-x-2"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="text-sm font-medium">{userName || 'Usuario'}</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded">
            <button
              className="block w-full px-4 py-2 text-left hover:bg-gray-200"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
