/**
 * Location.jsx
 * Section 10 — Location & Map.
 * Two-column layout: left side shows address, distances, directions link,
 * and nearby attractions. Right side renders an embedded Google Map iframe.
 * All location data matches the real Victoria's Haven Green Breeze property
 * in Langkaan, Dasmariñas City, Cavite.
 */

import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import './Location.css';

const distanceDetails = [
  {
    id: 'robinsons',
    label: 'Robinsons Place Dasmariñas',
    distance: '3.5 km',
    duration: '8 min',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="20" width="10" height="20" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="28" y="14" width="10" height="26" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 40h36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 20l5-8 5 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 28h3M16 33h3M29 22h3M29 27h3M29 32h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'highway',
    label: 'Emilio Aguinaldo Highway',
    distance: '1.2 km',
    duration: '3 min',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 38l4-28h20l4 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 38l2-28M30 38l-2-28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 22h16M15 30h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'manila',
    label: 'Manila (via SLEX)',
    distance: '35 km',
    duration: '45 min',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M16 16v-4h16v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 26h20M14 32h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const nearbyAttractions = [
  'SM City Dasmariñas',
  'De La Salle University – Dasmariñas',
  'Cavite State University',
  'Governors Drive Commercial Strip',
  'Dasmariñas City Hall',
];

export default function Location() {
  const parallaxRef = useRef(null);
  useParallax(parallaxRef, 0.15);

  return (
    <section className="locationSection" id="location" aria-labelledby="locationHeading">

      {/* Decorative background layer */}
      <div className="locationBackground" aria-hidden="true" ref={parallaxRef} />

      <div className="locationSectionInner">

        {/* ── Left Column: Info ── */}
        <div className="locationInfo revealFade">

          <header className="locationInfoHeader">
            <span className="sectionEyebrow">Find Us</span>
            <h2 className="sectionTitle" id="locationHeading">
              Location
            </h2>
            <p className="sectionSubtitle" style={{ marginTop: '1rem' }}>
              Nestled in the heart of Green Breeze, Dasmariñas City — easily accessible from Manila via SLEX and surrounded by the best of Cavite.
            </p>
          </header>

          {/* Address block */}
          <address className="locationAddress">
            <div className="locationAddressIcon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6C16.82 6 11 11.82 11 19c0 10.5 13 23 13 23s13-12.5 13-23c0-7.18-5.82-13-13-13z"
                  stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <circle cx="24" cy="19" r="4" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            </div>
            <div className="locationAddressText">
              <span className="locationAddressLine">Victoria's Haven Green Breeze</span>
              <span className="locationAddressLine">Green Breeze, Langkaan</span>
              <span className="locationAddressLine">Dasmariñas City, Cavite, Philippines</span>
              <span className="locationCoords">14.2673208° N, 120.9206383° E</span>
            </div>
          </address>

          {/* Distances */}
          <ul className="locationDistances" aria-label="Distance to nearby landmarks">
            {distanceDetails.map((item) => (
              <li key={item.id} className="locationDistanceItem">
                <div className="locationDistanceIcon" aria-hidden="true">{item.icon}</div>
                <div className="locationDistanceDetails">
                  <span className="locationDistanceLabel">{item.label}</span>
                  <span className="locationDistanceMeta">
                    {item.distance} &nbsp;·&nbsp; {item.duration} drive
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Nearby attractions */}
          <div className="locationAttractions">
            <h3 className="locationAttractionsTitle">Nearby Attractions</h3>
            <ul className="locationAttractionsList" aria-label="Nearby attractions">
              {nearbyAttractions.map((attraction) => (
                <li key={attraction} className="locationAttractionItem">
                  <span className="locationAttractionDot" aria-hidden="true" />
                  {attraction}
                </li>
              ))}
            </ul>
          </div>

          {/* Directions CTA */}
          <a
            href="https://www.google.com/maps/place/Victoria's+Haven+Green+Breeze/@14.2673208,120.9180634,17z/data=!3m1!4b1!4m6!3m5!1s0x33bd7f00434e56f1:0xe62a403e2022c531!8m2!3d14.2673208!4d120.9206383!16s%2Fg%2F11yfg_r1fj"
            target="_blank"
            rel="noopener noreferrer"
            className="buttonPrimary locationDirectionsBtn"
            aria-label="Get directions to Victoria's Haven Green Breeze on Google Maps (opens in new tab)"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
              <path d="M12 2L8 9h3v4H7l5 9 5-9h-4V9h3L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Get Directions
          </a>

        </div>

        {/* ── Right Column: Map ── */}
        <div className="locationMapWrapper revealFade revealFadeDelay2">
          <div className="locationMapFrame">
            <iframe
              title="Victoria's Haven Green Breeze location map"
              src="https://maps.google.com/maps?q=14.2673208,120.9206383&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay pin label */}
            <div className="locationMapPin" aria-hidden="true">
              <span className="locationMapPinLabel">Victoria's Haven</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}