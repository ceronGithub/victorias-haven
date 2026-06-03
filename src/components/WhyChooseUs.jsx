/**
 * WhyChooseUs.jsx
 * Section 4 — 4 USP cards highlighting what makes Victoria's Haven unique.
 * Private resort, 2 rooms (Ground & Upper), shared amenities, no visitors policy.
 */

import './WhyChooseUs.css';

const uspCards = [
  {
    id: 'privacy',
    title: 'Exclusive Private Resort',
    description:
      'Victoria\'s Haven is a fully private resort — booked exclusively for your group. No strangers, no shared spaces with outsiders. Your entire stay is yours alone.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="22" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M16 22v-6a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="24" cy="32" r="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M24 35v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'rooms',
    title: 'Two 2-Storey Rooms',
    description:
      'Choose from our Ground Floor Room or Upper Floor Room — each a full 2-storey space comfortably accommodating up to 12 guests, with a maximum of 15 per room.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 24h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="18" y="30" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="16" y="13" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="25" y="13" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    id: 'amenities',
    title: 'Complete Amenities Included',
    description:
      'Pool, BBQ area, karaoke, billiard table, fully equipped kitchen, veranda, kiddie playground, and parking — everything you need for a complete group getaway.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 28c4-4 8 0 12-4s8 0 12-4 8 0 8 0v12H8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 14v6M18 10l6 4 6-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'group',
    title: 'Perfect for Groups',
    description:
      'Ideal for family reunions, barkada trips, team outings, and private celebrations. Book 1 room for up to 15 guests, or both rooms for groups of up to 30.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="32" cy="16" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M6 40c0-7 4.477-10 10-10s10 3 10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M28 40c0-7 4.477-10 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
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
            Why Choose Victoria's Haven
          </h2>
          <p className="sectionSubtitle">
            A private retreat crafted for groups who want the whole place to themselves.
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
