import React, { useRef, useEffect } from 'react';

export function useTilt<T extends HTMLElement>(active: boolean = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const card = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const rx = (-dy * 8).toFixed(2) + 'deg';
      const ry = (dx * 10).toFixed(2) + 'deg';
      card.style.setProperty('--rx', rx);
      card.style.setProperty('--ry', ry);
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`;
    };

    const handleMouseLeave = () => {
      card.style.transition = 'transform 0.5s ease-in-out';
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active]);

  return ref;
}
