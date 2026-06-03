/**
 * Services.jsx
 * Section 6 — Tabbed services showcase.
 * Five tabs: Dining | Wellness | Activities | Events | Guest Services.
 * Active tab content fades in/out on switch.
 * Cards animate via revealFade utility classes on tab change.
 */

import { useState } from 'react';
import './Services.css';

const tabs = ['Dining', 'Wellness', 'Activities', 'Events', 'Guest Services'];

const serviceData = {
  Dining: [
    {
      id: 'fine-dining',
      title: 'Fine Dining Restaurant',
      description: 'Award-winning cuisine crafted by our Executive Chef using locally sourced ingredients and global techniques.',
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
      id: 'room-dining',
      title: 'In-Room Dining',
      description: 'Enjoy a curated menu delivered to your suite at any hour — breakfast at sunrise or a midnight craving indulged.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="8" y="16" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M16 16v-4a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M18 27h12M18 32h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'beach-bar',
      title: 'Beach Bar & Lounge',
      description: 'Signature cocktails and light bites served steps from the shore — the perfect sundowner setting.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18 10l-8 16h28L30 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 26v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M16 38h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      ),
    },
    {
      id: 'private-dining',
      title: 'Private Dining Experiences',
      description: 'Bespoke candlelit dinners on the beach, in your villa, or in our exclusive wine cellar — reserved solely for you.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 8v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M20 14c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="currentColor" strokeWidth="1.8"/>
          <ellipse cx="24" cy="30" rx="14" ry="6" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M10 30v4c0 3.31 6.27 6 14 6s14-2.69 14-6v-4" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      ),
    },
  ],
  Wellness: [
    {
      id: 'spa',
      title: 'Spa & Massage Therapies',
      description: 'Indulge in ancient healing rituals and modern therapeutic treatments in our serene oceanside spa sanctuary.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 8c-8 0-14 6-14 14 0 10 14 20 14 20s14-10 14-20c0-8-6-14-14-14z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M24 18v8M20 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'yoga',
      title: 'Sunrise Yoga & Meditation',
      description: 'Guided sessions on our clifftop pavilion as the sun rises — restoring balance between body and mind.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M24 14v10M16 20c0 0 2 4 8 4s8-4 8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M18 36c2-4 4-8 6-12M30 36c-2-4-4-8-6-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M10 40h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'fitness',
      title: 'Fitness Center & Training',
      description: 'State-of-the-art equipment and personal trainers available to keep your wellness routine uninterrupted.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 24h4M36 24h4M12 24h24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <rect x="12" y="18" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
          <rect x="30" y="18" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      ),
    },
    {
      id: 'hydrotherapy',
      title: 'Hydrotherapy & Float Pools',
      description: 'Mineral-rich thermal pools and float therapy suites designed for deep cellular recovery and tranquillity.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 32c4-4 8 0 12-4s8 0 12-4 8 0 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M8 38c4-4 8 0 12-4s8 0 12-4 8 0 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M24 22V10M20 14l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ],
  Activities: [
    {
      id: 'water-sports',
      title: 'Water Sports & Diving',
      description: 'Snorkeling, scuba diving, paddleboarding, and kayaking across our pristine private reef and lagoon.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 28c4-6 8-2 12-6s8-2 12-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M20 22l8-12 6 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="36" cy="16" r="4" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 36h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'beach-activities',
      title: 'Beach & Outdoor Activities',
      description: 'Volleyball, sunset cruises, nature hikes, and guided island tours curated for every type of adventurer.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M10 24h28M24 10c-4 6-4 22 0 28M24 10c4 6 4 22 0 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'sunset-cruises',
      title: 'Private Boat & Sunset Cruises',
      description: 'Charter our luxury vessel for intimate sunset cruises, island hopping, or twilight stargazing at sea.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10 34l4-12h20l4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 10v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M24 10l-10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M8 38h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'photography',
      title: 'Professional Photography',
      description: 'Capture your most treasured memories with our in-house professional photographer — available daily.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="6" y="16" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="24" cy="28" r="6" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M18 16l3-6h6l3 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="36" cy="22" r="2" fill="currentColor"/>
        </svg>
      ),
    },
  ],
  Events: [
    {
      id: 'weddings',
      title: 'Wedding Planning & Catering',
      description: 'Intimate beachside ceremonies to grand resort celebrations — every detail orchestrated to perfection.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 12c0 0-10 6-10 14a10 10 0 0020 0c0-8-10-14-10-14z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M24 26v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M20 38h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M14 12l-4-4M34 12l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'conferences',
      title: 'Conference & Corporate Events',
      description: 'Purpose-built meeting spaces with full AV capabilities and dedicated event coordinators for corporate retreats.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="8" y="12" width="32" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M20 32v6M28 32v6M14 38h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M14 22h20M14 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'private-events',
      title: 'Private Celebrations',
      description: 'Birthdays, anniversaries, and milestone celebrations tailored around your vision and attended by our full team.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M24 8l3.09 9.26L37 17.27l-7.41 6.72 2.24 9.73L24 28.5l-7.83 5.22 2.24-9.73L11 17.27l9.91-.01z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M24 36v4M16 40h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'catering',
      title: 'Event Catering & Bar Service',
      description: 'Full catering packages featuring multi-course menus, artisan cocktail bars, and sommelier-curated wine lists.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M14 10h20l-4 16H18z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 40h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M24 26v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M18 40h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
  ],
  'Guest Services': [
    {
      id: 'concierge',
      title: 'Personal Concierge',
      description: 'Your dedicated concierge handles every request — from dinner reservations to bespoke island experiences.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M28 12l2-2M30 16h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'housekeeping',
      title: 'Housekeeping & Laundry',
      description: 'Twice-daily suite servicing, turndown service, and same-day laundry handled with the utmost discretion.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="10" y="14" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M10 22h28" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M20 10v4M28 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M16 30h8M16 35h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'airport',
      title: 'Airport Transfers & Tours',
      description: 'Seamless private transfers in luxury vehicles plus curated island tours led by local expert guides.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 32l4-14h24l4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="6" y="32" width="36" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="14" cy="40" r="3" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="34" cy="40" r="3" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M24 18v6M20 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'kids-club',
      title: 'Kids Club & Entertainment',
      description: 'Supervised activities, creative workshops, and ocean adventures designed for younger guests aged 4–12.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="18" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="30" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M10 38c0-6.627 3.582-12 8-12M38 38c0-6.627-3.582-12-8-12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M18 26c0 0 3 3 6 3s6-3 6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
  ],
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('Dining');
  const [isAnimating, setIsAnimating] = useState(false);

  /* Switch tab with fade transition */
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 250);
  };

  const currentServices = serviceData[activeTab];

  return (
    <section className="servicesSection" id="services" aria-labelledby="servicesHeading">

      {/* Background decorative layer */}
      <div className="servicesBackground" aria-hidden="true" />

      <div className="servicesSectionInner">

        <header className="servicesSectionHeader revealFade">
          <span className="sectionEyebrow">What We Offer</span>
          <h2 className="sectionTitle sectionTitleLight" id="servicesHeading">
            Premium Services Available
          </h2>
          <p className="sectionSubtitle" style={{ color: 'rgba(245,241,232,0.55)', margin: '1rem auto 0' }}>
            Every service is delivered with precision, warmth, and an unwavering commitment to your comfort.
          </p>
        </header>

        {/* ── Tab Bar ── */}
        <nav className="servicesTabs revealFade revealFadeDelay1" aria-label="Service categories">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`servicesTab ${activeTab === tab ? 'servicesTabActive' : ''}`}
              onClick={() => handleTabChange(tab)}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* ── Tab Content ── */}
        <div
          className={`servicesGrid ${isAnimating ? 'servicesGridHidden' : 'servicesGridVisible'}`}
          role="tabpanel"
          aria-label={`${activeTab} services`}
        >
          {currentServices.map((service, index) => (
            <article
              key={service.id}
              className="serviceCard"
              style={{ transitionDelay: `${index * 0.06}s` }}
              aria-label={service.title}
            >
              <div className="serviceCardIcon" aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="serviceCardTitle">{service.title}</h3>
              <p className="serviceCardDescription">{service.description}</p>
              <span className="serviceCardCta" aria-hidden="true">
                Learn More
                <span className="serviceCardCtaArrow">→</span>
              </span>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
