/**
 * useScrollReveal.js
 * Custom hook that uses IntersectionObserver to add/remove
 * the "isVisible" class on elements, triggering CSS fade-in animations.
 * Attaches observer to all elements with className "revealFade".
 */

import { useEffect } from 'react';

export function useScrollReveal(deps = []) {
  useEffect(() => {
    /* Observe every .revealFade element in the document */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.revealFade');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
}
