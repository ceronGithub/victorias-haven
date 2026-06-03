/**
 * FAQ.jsx
 * Section 12 — Frequently Asked Questions.
 * Accordion layout: clicking a question expands the answer
 * with a smooth slide-down animation. Expand/collapse icon rotates.
 * Only one item open at a time.
 */

import { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const faqItems = [
  {
    id: 'check-in-out',
    question: 'What are check-in and check-out times?',
    answer:
      'Standard check-in begins at 2:00 PM and check-out is at 12:00 PM noon. Early check-in from 10:00 AM and late check-out until 4:00 PM can be arranged subject to availability — please contact our concierge team at least 24 hours in advance.',
  },
  {
    id: 'airport-transfer',
    question: 'Do you offer airport transfers?',
    answer:
      'Yes. We provide private luxury vehicle transfers to and from the international airport, 25 km away. Transfers are available around the clock and can be pre-arranged through your reservation or by contacting our guest services team. Rates vary by vehicle type.',
  },
  {
    id: 'cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'Reservations cancelled 14 or more days prior to arrival receive a full refund. Cancellations between 7–13 days before arrival incur a 50% charge. Cancellations within 7 days of arrival or no-shows are charged the full reservation amount. Special packages and peak-season bookings may have separate terms communicated at time of booking.',
  },
  {
    id: 'pets',
    question: 'Are pets allowed at the resort?',
    answer:
      'We welcome well-behaved dogs and cats in select villa categories. A pet amenity package including bedding, bowls, and welcome treats is included. Prior arrangement is required, and a nominal cleaning fee applies. Pets are not permitted in dining areas or the main spa facility.',
  },
  {
    id: 'wifi',
    question: 'Is high-speed Wi-Fi included?',
    answer:
      'Complimentary high-speed fibre Wi-Fi is available throughout the entire resort — in all suites, villas, dining venues, pool areas, and public spaces. Connection details are provided upon check-in. For guests requiring dedicated bandwidth for business use, a premium connection upgrade is available.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express), bank wire transfers, and cash in Philippine Peso. For reservations made online, a valid credit card is required to secure your booking. Charges are settled in full at check-out or upon booking for non-refundable rates.',
  },
  {
    id: 'kids-club',
    question: 'Do you have a Kids Club?',
    answer:
      'Yes — our Kids Club welcomes children aged 4 to 12 and operates daily from 9:00 AM to 6:00 PM. Supervised activities include ocean education sessions, arts and crafts, beach games, cooking workshops, and movie nights. The programme is complimentary for in-house guests.',
  },
  {
    id: 'hidden-charges',
    question: 'Are there any hidden charges?',
    answer:
      'There are no hidden fees. Your published room rate includes daily breakfast, Wi-Fi, beach access, and Kids Club participation. A 12% value-added tax and a 10% service charge are applied to all food, beverage, and ancillary services, and are clearly itemised on your final bill.',
  },
];

/**
 * FAQItem — single collapsible accordion entry.
 * Uses a height transition on the inner content wrapper.
 */
function FAQItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  /* Measure the real content height so the transition is exact */
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [item.answer]);

  return (
    <div className={`faqItem ${isOpen ? 'faqItemOpen' : ''}`}>
      <button
        className="faqQuestion"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
      >
        <span className="faqQuestionText">{item.question}</span>
        <span className="faqToggleIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        className="faqAnswerWrapper"
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
      >
        <div className="faqAnswer" ref={contentRef}>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  /* Toggle open — close if same item is clicked again */
  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faqSection" id="faq" aria-labelledby="faqHeading">

      <div className="faqSectionInner">

        <header className="faqSectionHeader revealFade">
          <span className="sectionEyebrow">Common Questions</span>
          <h2 className="sectionTitle" id="faqHeading">
            Frequently Asked Questions
          </h2>
          <p className="sectionSubtitle" style={{ marginTop: '1rem' }}>
            Everything you need to know before your stay — answered clearly and completely.
          </p>
        </header>

        {/* ── Accordion List ── */}
        <div className="faqList revealFade revealFadeDelay1" role="list">
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="faqCta revealFade revealFadeDelay2">
          <p className="faqCtaText">
            Can't find what you're looking for?
          </p>
          <a href="#contact" className="buttonPrimary">
            Ask Our Concierge
          </a>
        </div>

      </div>
    </section>
  );
}
