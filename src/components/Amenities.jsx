/**
 * Amenities.jsx
 * Section 7 — World-class amenities grid.
 * 15 amenity cards arranged in a 5-column grid with SVG icons.
 * Cards scale-up + fade-in on scroll via revealFade utility.
 */

import './Amenities.css';

const amenities = [
  {
    id: 'private-beach',
    name: 'Private Beach Access',
    description: 'Exclusive shoreline reserved solely for our guests.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 36c8-8 16-4 24-8s12-12 12-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 40h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="36" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M36 17v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'infinity-pool',
    name: 'Infinity Pool',
    description: 'Horizon-edge pool merging seamlessly with the ocean.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 28c4-4 8 0 12-4s8 0 12-4 8 0 8 0v12H8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 36c4-3 8 1 12-3s8 1 12-3 8 1 8 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M34 12a5 5 0 00-10 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M29 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'spa',
    name: 'Spa & Wellness Center',
    description: 'Full-service spa with ancient and modern therapies.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 10c-6 0-10 4.5-10 10 0 8 10 16 10 16s10-8 10-16c0-5.5-4-10-10-10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M20 20h8M24 16v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 36c0 0 4 2 8 2s8-2 8-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'fine-dining',
    name: 'Fine Dining Restaurant',
    description: 'Award-winning cuisine by our Executive Chef.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16 8v10a8 8 0 0016 0V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 18v22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 40h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M32 8v32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'room-service',
    name: '24/7 Room Service',
    description: 'Round-the-clock dining delivered to your suite.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 26h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 12V8M20 8h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 26V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 26l6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'fitness',
    name: 'Fitness Center',
    description: 'State-of-the-art equipment and personal trainers.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 24h4M36 24h4M12 24h24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="12" y="18" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="30" y="18" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'concierge',
    name: 'Concierge Service',
    description: 'Personal concierge for every guest request.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'conference',
    name: 'Conference Facilities',
    description: 'Modern meeting spaces for corporate events.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="12" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 32v6M28 32v6M14 38h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M14 22h20M14 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'kids-club',
    name: 'Kids Club',
    description: 'Supervised activities and adventures for children.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="18" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="30" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 38c0-5 3-9 8-10M38 38c0-5-3-9-8-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 28c0 0 3 3 6 3s6-3 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'water-sports',
    name: 'Water Sports',
    description: 'Snorkeling, diving, kayaking, and paddleboarding.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 30c4-6 8-2 12-6s8-2 12-6l8 12H8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 38c4-3 8 1 12-3s8 1 12-3 8 0 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'beach-lounge',
    name: 'Beach Lounge',
    description: 'Private sun beds and shaded cabanas by the shore.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 26h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M14 26V32M34 26v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 26l4-10h20l4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 38h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 16V8M20 10l4-2 4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'library',
    name: 'Library & Reading Room',
    description: 'A curated collection of literature in a serene setting.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="10" width="8" height="28" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="20" y="14" width="8" height="24" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="30" y="10" width="8" height="28" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 38h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'game-room',
    name: 'Game Room',
    description: 'Evening entertainment with billiards, chess, and more.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="16" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M18 22v8M14 26h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="32" cy="24" r="2" fill="currentColor"/>
        <circle cx="32" cy="30" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'parking',
    name: 'Secure Parking',
    description: 'Complimentary valet and secure parking facilities.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="12" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M18 26h4a5 5 0 000-10h-4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'wifi',
    name: 'High-Speed Wi-Fi',
    description: 'Complimentary fibre-speed internet throughout the resort.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 22c8.837-8.837 23.163-8.837 32 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 27c5.523-5.523 16.477-5.523 22 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 32c2.761-2.761 9.239-2.761 12 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="24" cy="38" r="2.5" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function Amenities() {
  return (
    <section className="amenitiesSection" id="amenities" aria-labelledby="amenitiesHeading">

      <div className="amenitiesSectionInner">

        <header className="amenitiesSectionHeader revealFade">
          <span className="sectionEyebrow">Facilities</span>
          <h2 className="sectionTitle" id="amenitiesHeading">
            World-Class Amenities
          </h2>
          <p className="sectionSubtitle" style={{ margin: '1rem auto 0' }}>
            Every facility has been thoughtfully designed to elevate your stay beyond expectation.
          </p>
        </header>

        <div className="amenitiesGrid">
          {amenities.map((amenity, index) => (
            <article
              key={amenity.id}
              className={`amenityCard revealFade revealFadeDelay${(index % 5) + 1}`}
              aria-label={amenity.name}
            >
              <div className="amenityCardIcon" aria-hidden="true">
                {amenity.icon}
              </div>
              <h3 className="amenityCardName">{amenity.name}</h3>
              <p className="amenityCardDescription">{amenity.description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
