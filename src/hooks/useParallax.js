/**
 * useParallax.js
 * Attaches a scroll listener and applies a CSS translateY
 * parallax offset to a referenced element.
 * @param {React.RefObject} ref    - The element to move
 * @param {number}          speed  - 0.0 = no movement, 1.0 = full scroll speed
 *                                   Values < 1 create a "slower than scroll" effect
 */

import { useEffect } from 'react';

export function useParallax(ref, speed = 0.4) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    /* GPU-accelerated scroll callback — runs on every scroll tick */
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - windowHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
}
