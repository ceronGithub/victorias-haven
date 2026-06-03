/**
 * WhyChooseUs.jsx
 * Section 4 — Highlights 4 USP cards with inline SVG icons.
 * Cards animate in with staggered fade-up via IntersectionObserver
 * (class "revealFade" + "revealFadeDelayN" from main.css utilities).
 */

import './WhyChooseUs.css';

const uspCards = [
  {
    id: 'privacy',
    title: 'Privacy & Exclusivity',
    description:
      'Nestled on a private peninsula, Victoria\'s Haven offers complete seclusion. Every guest enjoys a dedicated section of beach — no crowds, no compromise.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M30 10l4-4M34 14l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'service',
    title: 'White-Glove Service',
    description:
      'From personal butlers to bespoke dining experiences, our staff-to-guest ratio ensures every request is anticipated before it is even voiced.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 32V20a12 12 0 0124 0v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 32h32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M20 36a4 4 0 008 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="24" cy="14" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'nature',
    title: 'Untouched Nature',
    description:
      'Set amidst lush tropical gardens and pristine shoreline, the resort is a living sanctuary — designed to reconnect you with the natural world.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 40V24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M24 24C24 24 14 20 10 10c6 0 12 4 14 14z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M24 24C24 24 34 20 38 10c-6 0-12 4-14 14z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M24 30c0 0-7-2-10-8 4 0 8 3 10 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'wellness',
    title: 'Holistic Wellness',
    description:
      'Our world-class spa integrates ancient healing traditions with modern therapies — offering a complete sanctuary for body, mind, and spirit.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M24 8c-8 0-14 6-14 14 0 10 14 20 14 20s14-10 14-20c0-8-6-14-14-14z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M24 18v8M20 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="whySection" id="why" aria-labelledby="whyHeading">

      <div className="whydivider" aria-hidden="true">
        <span className="whyDividerLine" />
        <span className="whyDividerDot" />
        <span className="whyDividerLine" />
      </div>

      <div className="whySectionInner">

        <header className="whySectionHeader revealFade">
          <span className="sectionEyebrow">Our Promise</span>
          <h2 className="sectionTitle" id="whyHeading">
            Why Choose Our Resort
          </h2>
          <p className="sectionSubtitle">
            An experience meticulously crafted for those who expect nothing less than extraordinary.
          </p>
        </header>

        <div className="whyGrid">
          {uspCards.map((card, index) => (
            <article
              key={card.id}
              className={`whyCard revealFade revealFadeDelay${index + 1}`}
              aria-label={card.title}
            >
              <div className="whyCardIcon" aria-hidden="true">
                {card.icon}
              </div>
              <h3 className="whyCardTitle">{card.title}</h3>
              <p className="whyCardDescription">{card.description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
