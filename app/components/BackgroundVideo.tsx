"use client";

import { useRef, useEffect } from 'react';
import Lenis from 'lenis';

interface BackgroundVideoProps {
  lenis: Lenis | null;
}

export default function BackgroundVideo({ lenis }: BackgroundVideoProps): JSX.Element {
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis || !stickyContainerRef.current) return;

    const handleScroll = () => {
      const container = stickyContainerRef.current!;
      const rect = container.getBoundingClientRect();
      const totalScrollHeight = window.innerHeight * 2; // تعامل مع 200vh فقط كمنطقة تفعيل

      const distanceScrolled = -rect.top;
      const progress = Math.min(Math.max(distanceScrolled / totalScrollHeight, 0), 1);

      // حساب السرعة (كل ما زاد progress زادت السرعة)
      const minDuration = 5;  // أسرع
      const maxDuration = 25; // أبطأ (الافتراضي)
      const speed = maxDuration - progress * (maxDuration - minDuration);

      if (marqueeRef.current) {
        marqueeRef.current.style.animationDuration = `${speed}s`;
      }
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis]);

  const stickySectionHeight = '300vh';

  return (
    <div ref={stickyContainerRef} style={{ height: stickySectionHeight }} className="relative">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* الفيديو */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          key="/backgroundvid1.mp4"
        >
          <source
            src="/backgroundvid1.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source
            src="/backgroundvid2.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          متصفحك لا يدعم وسم الفيديو.
        </video>

        {/* الشريط النصي */}
        <div className="absolute top-[70%] left-0 w-full z-10 pointer-events-none">
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/50 z-20" />

          <div className="overflow-hidden w-full bg-black/40 py-2">
            <div
              ref={marqueeRef}
              className="animate-marquee whitespace-nowrap text-white text-xl sm:text-2xl md:text-3xl font-street font-semibold tracking-wide"
            >
              <span className="mx-10">
                Future Vision - Commitment to Quality - Specialized Expertise - Unique Designs -
              </span>
              <span className="mx-10">
                Future Vision - Commitment to Quality - Specialized Expertise - Unique Designs -
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
