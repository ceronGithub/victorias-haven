/**
 * Amenities.jsx
 * Section 7 — Amenities grid.
 * Displays the actual amenities available at Victoria's Haven:
 * Pool, BBQ Area, Karaoke, Billiard, Kitchen, Veranda, Kiddie Playground, Parking.
 */

import './Amenities.css';

const amenities = [
  {
    id: 'pool',
    name: 'Swimming Pool',
    description: 'Relax and cool off in our refreshing pool — perfect for the whole group.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 28c4-4 8 0 12-4s8 0 12-4 8 0 8 0v12H8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 36c4-3 8 1 12-3s8 1 12-3 8 1 8 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="30" cy="13" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M30 17v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'bbq',
    name: 'BBQ Area',
    description: 'Fire up the grill and enjoy outdoor dining with your group in our dedicated BBQ area.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 22a12 12 0 0024 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 22h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 34v8M18 42h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 10c0 0 2-3 2-5M24 10c0 0 2-3 2-5M30 10c0 0 2-3 2-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'karaoke',
    name: 'Karaoke',
    description: 'Belt out your favorite songs all night long with our karaoke setup — the ultimate group activity.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M24 26v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 22c0 0 0 10 8 10s8-10 8-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 38h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'billiard',
    name: 'Billiard Table',
    description: 'Challenge your friends to a round of billiards in our recreational area.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="14" width="36" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="16" cy="24" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="32" cy="24" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="24" cy="24" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'kitchen',
    name: 'Full Kitchen',
    description: 'Fully equipped kitchen so you can cook your own meals and make yourselves at home.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="10" width="32" height="28" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 22h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="30" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="26" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'veranda',
    name: 'Veranda',
    description: 'Unwind on the veranda — a great spot for morning coffee, evening conversations, and fresh air.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 20h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6 20l6-10h24l6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20v18M36 20v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 38h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 28h12M18 33h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'playground',
    name: 'Kiddie Playground',
    description: 'A safe and fun playground area so the little ones can play while adults relax.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M10 38V20M38 38V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 20l14-10 14 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 38V28h12v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'parking',
    name: 'Parking Area',
    description: 'Spacious parking area available on-site for all your vehicles.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="8" y="12" width="32" height="26" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M18 26h4a5 5 0 000-10h-4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
            What's Included
          </h2>
          <p className="sectionSubtitle" style={{ margin: '1rem auto 0' }}>
            Everything you need for a complete group getaway — all within the resort.
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
