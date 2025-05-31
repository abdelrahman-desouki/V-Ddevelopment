import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: 'center center',
    });

    let mouseX = 0;
    let mouseY = 0;
    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY - 10;
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    let animationFrameId: number;

    const animate = () => {
      posX = lerp(posX, mouseX, 0.5);
      posY = lerp(posY, mouseY, 0.5);

      gsap.set(cursor, {
        x: posX,
        y: posY,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);

    const setupImageHover = () => {
      const images = document.querySelectorAll('img');

      const handleEnter = () => {
        setIsHoveringImage(true);
        if (cursor) {
          cursor.style.cursor = 'none';
          gsap.to(cursor, { scale: 1.8, duration: 0.3, ease: 'power2.out' });
        }
      };

      const handleLeave = () => {
        setIsHoveringImage(false);
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      };

      images.forEach((img) => {
        img.style.cursor = 'none';
        img.addEventListener('mouseenter', handleEnter);
        img.addEventListener('mouseleave', handleLeave);
      });

      return () => {
        images.forEach((img) => {
          img.removeEventListener('mouseenter', handleEnter);
          img.removeEventListener('mouseleave', handleLeave);
          img.style.cursor = '';
        });
      };
    };

    const cleanup = setupImageHover();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      cleanup();
    };
  }, []);

  return (
    <div>
      <div ref={cursorRef} className={`cursor ${isHoveringImage ? 'hovering-image' : ''}`}>
        {isHoveringImage && (
          <div className="eye-outline" />
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
