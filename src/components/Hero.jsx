/**
 * Hero.jsx
 * Full-screen hero section with parallax background image,
 * staggered text entrance animations, and dual CTA buttons.
 * Background image uses CSS parallax via background-attachment: fixed
 * with a JS-based fallback using useParallax for mobile.
 */

import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import './Hero.css';

export default function Hero() {
  const parallaxRef = useRef(null);

  /* Slower scroll speed (0.25) creates the parallax depth effect */
  useParallax(parallaxRef, 0.25);

  return (
    <section className="heroSection" id="home" aria-label="Hero">

      {/* ── Parallax Background Layer ── */}
      <div className="heroBackground" ref={parallaxRef} aria-hidden="true" />

      {/* ── Gradient Overlay ── */}
      <div className="heroOverlay" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="heroContent">

        <span className="heroEyebrow">Victoria's Haven · Private Resort</span>

        <h1 className="heroHeadline">
          Experience Luxury
          <em className="heroHeadlineAccent"> Redefined</em>
        </h1>

        <p className="heroSubheadline">
          Your Private Sanctuary Awaits
        </p>

        <div className="heroCtaGroup">
          <a href="#booking" className="buttonPrimary heroCtaPrimary">
            Book Your Stay
          </a>
          <a href="#gallery" className="buttonOutline heroCtaSecondary">
            Explore Gallery
          </a>
        </div>

      </div>

      {/* ── Scroll Hint ── */}
      <div className="heroScrollHint" aria-hidden="true">
        <span className="heroScrollLabel">Scroll</span>
        <span className="heroScrollLine" />
      </div>

    </section>
  );
}
