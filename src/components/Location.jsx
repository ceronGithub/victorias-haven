/**
 * Location.jsx
 * Section 10 — Location & Map.
 * Two-column layout: left side shows address, distances, directions link,
 * and nearby attractions. Right side renders an embedded Google Map iframe.
 * Info column fades in from the left, map zooms in from the right on scroll.
 */

import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import './Location.css';

const distanceDetails = [
  {
    id: 'airport',
    label: 'International Airport',
    distance: '18 km',
    duration: '25 min',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 32l6-4 4-12 6-4 6 4-4 12 6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 38h36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M28 20l8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'city',
    label: 'City Center',
    distance: '12 km',
    duration: '18 min',
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
    id: 'beach',
    label: 'Beach Town',
    distance: '6 km',
    duration: '10 min',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 34c4-4 8 0 12-4s8 0 12-4 8 0 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 40c4-4 8 0 12-4s8 0 12-4 8 0 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M24 20v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const nearbyAttractions = [
  'Coral Bay Marine Sanctuary',
  'Heritage Old Town District',
  'Sunset Cliffs Viewpoint',
  'Tropical Botanical Gardens',
  'Artisan Market & Night Bazaar',
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
              Tucked away on a secluded peninsula, yet perfectly connected to everything that matters.
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
              <span className="locationAddressLine">Victoria's Haven Private Resort</span>
              <span className="locationAddressLine">Peninsula Drive, Coastal Cove</span>
              <span className="locationAddressLine">Island Province, Philippines</span>
              <span className="locationCoords">14.5995° N, 120.9842° E</span>
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
            href="https://maps.google.com/?q=Victoria%27s+Haven+Resort+Philippines"
            target="_blank"
            rel="noopener noreferrer"
            className="buttonPrimary locationDirectionsBtn"
            aria-label="Get directions to Victoria's Haven on Google Maps (opens in new tab)"
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
              title="Victoria's Haven location map"
              src="https://maps.google.com/maps?q=14.5995,120.9842&z=15&output=embed"
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
