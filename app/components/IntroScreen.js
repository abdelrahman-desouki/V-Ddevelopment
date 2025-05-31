"use client";

import { useEffect } from 'react';

export default function IntroScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // 3 ثواني بالضبط

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center animate-slideUp-full">
      <h1 className="text-white text-4xl md:text-6xl font-bold animate-fadeIn">
        VANGUARD DEVELOPMENT
      </h1>
    </div>
  );
}

{/*
    عايز كود عند تحميل الموقع، تظهر شاشة الانترو فقط تنزلق الشاشة لأعلى (slideUp) بعد 3 ثواني بالضبط:
الموقع الرئيسي يظهر وتنتهي شاشة الانترو يتم إزالتها تمامًا
عايز شاشة الانترو تكون  اسم الموقع في النص "VANGUARD DEVELOPMENT"
بدل الي في الصورة ونفس الالوان

*/
}