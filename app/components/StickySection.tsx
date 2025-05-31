"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const StickySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[150vh] w-full bg-white">
      {/* الفيديو مثبت */}
      <div
        className={`sticky top-0 h-screen w-full z-10 flex items-center justify-center transition-opacity duration-1000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* محتوى ثابت فوق الفيديو */}
        <div className="relative z-10 flex w-full h-full">
          <div className="flex-1 flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-white text-4xl font-bold text-center px-4">
              Nature meets Innovation
            </h2>
          </div>

          {/* شريط الصور المتحرك */}
          <div className="w-1/3 flex flex-col gap-4 overflow-hidden items-center justify-center px-4 py-10">
            {[...Array(6)].map((_, i) => (
              <Image
                key={i}
                src={`/img/img${(i % 3) + 1}.jpg`}
                alt="scrolling image"
                width={300}
                height={400}
                className="rounded-lg object-cover animate-scroll-image"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySection;
