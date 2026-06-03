/**
 * Services.jsx
 * Section 6 — Packages & Policies.
 * Shows the 3 booking packages: 1 Room (Ground), 1 Room (Upper), Full Resort (Both).
 * Includes the no-visitors policy, capacity rules, and a contact CTA.
 */

import './Services.css';

const packages = [
  {
    id: 'ground-room',
    title: 'Ground Floor Room',
    subtitle: '1 Room · Private',
    capacity: '12–15 guests',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="16" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M18 40v-8h12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 24h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 10h16v6H16z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    features: [
      'Exclusive use of Ground Floor Room',
      '2-storey layout',
      'Standard 12 guests · Max 15 guests',
      'Full access to all amenities',
      'Pool, BBQ, Karaoke, Billiard, Kitchen',
      'Veranda, Playground & Parking',
      'No outside visitors allowed',
    ],
    highlight: false,
  },
  {
    id: 'upper-room',
    title: 'Upper Floor Room',
    subtitle: '1 Room · Private',
    capacity: '12–15 guests',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M18 40v-8h12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 24h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 16h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      'Exclusive use of Upper Floor Room',
      '2-storey layout with elevated views',
      'Standard 12 guests · Max 15 guests',
      'Full access to all amenities',
      'Pool, BBQ, Karaoke, Billiard, Kitchen',
      'Veranda, Playground & Parking',
      'No outside visitors allowed',
    ],
    highlight: false,
  },
  {
    id: 'full-resort',
    title: 'Full Resort',
    subtitle: 'Both Rooms · Exclusive',
    capacity: '24–30 guests',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6 38V20l18-12 18 12v18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="18" y="28" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 38h36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="10" y="24" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="30" y="24" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    features: [
      'Exclusive use of both rooms',
      'Ground Floor + Upper Floor',
      'Standard 24 guests · Max 30 guests',
      'Full access to all amenities',
      'Pool, BBQ, Karaoke, Billiard, Kitchen',
      'Veranda, Playground & Parking',
      'No outside visitors allowed',
    ],
    highlight: true,
  },
];

export default function Services() {
  return (
    <section className="servicesSection" id="services" aria-labelledby="servicesHeading">

      {/* Background decorative layer */}
      <div className="servicesBackground" aria-hidden="true" />

      <div className="servicesSectionInner">

        <header className="servicesSectionHeader revealFade">
          <span className="sectionEyebrow">Booking Packages</span>
          <h2 className="sectionTitle sectionTitleLight" id="servicesHeading">
            Choose Your Package
          </h2>
          <p className="sectionSubtitle" style={{ color: 'rgba(245,241,232,0.55)', margin: '1rem auto 0' }}>
            Book one room or the entire resort — all packages are fully private with no outside visitors.
          </p>
        </header>

        {/* ── Package Cards ── */}
        <div className="servicesPackageGrid revealFade revealFadeDelay1">
          {packages.map((pkg, index) => (
            <article
              key={pkg.id}
              className={`servicesPackageCard ${pkg.highlight ? 'servicesPackageCardHighlight' : ''} revealFade revealFadeDelay${index + 1}`}
              aria-label={pkg.title}
            >
              {pkg.highlight && (
                <div className="servicesPackageBadge" aria-label="Most popular">
                  Best for Large Groups
                </div>
              )}

              <div className="servicesPackageIcon" aria-hidden="true">
                {pkg.icon}
              </div>

              <h3 className="servicesPackageTitle">{pkg.title}</h3>
              <p className="servicesPackageSubtitle">{pkg.subtitle}</p>

              <div className="servicesPackageCapacity" aria-label={`Capacity: ${pkg.capacity}`}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 11c1.657 0 3 1.343 3 3v1M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {pkg.capacity}
              </div>

              <ul className="servicesPackageFeatures" aria-label={`${pkg.title} inclusions`}>
                {pkg.features.map((feature) => (
                  <li key={feature} className="servicesPackageFeatureItem">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14" aria-hidden="true">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={pkg.highlight ? 'buttonPrimary servicesPackageCta' : 'buttonOutline servicesPackageCta'}>
                Inquire Now
              </a>
            </article>
          ))}
        </div>

        {/* ── Policy Note ── */}
        <div className="servicesPolicy revealFade revealFadeDelay3">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <p>
            <strong>No Visitors Policy:</strong> Only booked guests are allowed inside the resort premises.
            Outside visitors are strictly not permitted during your stay.
          </p>
        </div>

      </div>
    </section>
  );
}
