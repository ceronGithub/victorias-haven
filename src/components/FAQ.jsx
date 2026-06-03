/**
 * FAQ.jsx
 * Section 12 — Frequently Asked Questions.
 * Accordion layout with smooth slide-down animation.
 * All answers reflect the actual Victoria's Haven setup:
 * private resort, 2 rooms, no visitors, no fixed rate.
 */

import { useState, useRef, useEffect } from 'react';
import './FAQ.css';

const faqItems = [
  {
    id: 'check-in-out',
    question: 'What are check-in and check-out times?',
    answer:
      'Standard check-in begins at 2:00 PM and check-out is at 12:00 PM noon. Early check-in and late check-out can be arranged depending on availability — please reach out to us in advance to confirm.',
  },
  {
    id: 'visitors',
    question: 'Can we bring outside visitors during our stay?',
    answer:
      'No. Victoria\'s Haven operates a strict no-visitors policy. Only guests who are part of the booked group are allowed inside the resort premises. This policy exists to maintain the privacy and security of all guests.',
  },
  {
    id: 'capacity',
    question: 'How many guests can the resort accommodate?',
    answer:
      'Each room can comfortably accommodate 12 guests, with a maximum of 15 guests per room. If you book both rooms, the resort can host between 24 and 30 guests in total. We do not allow guest counts beyond 15 per room for comfort and safety reasons.',
  },
  {
    id: 'rooms',
    question: 'What is the difference between the Ground Floor and Upper Floor rooms?',
    answer:
      'Both are 2-storey rooms with full access to all resort amenities. The Ground Floor Room offers direct, easy access to the pool, BBQ area, and outdoor spaces. The Upper Floor Room provides elevated views of the resort grounds. Both rooms include use of the full kitchen, veranda, karaoke, billiard, kiddie playground, and parking.',
  },
  {
    id: 'rate',
    question: 'How much does it cost to book?',
    answer:
      'We do not have a fixed published rate — pricing depends on the number of guests, days, and which room(s) you\'d like to book. Please contact us directly through the inquiry form or our social media pages and we\'ll get back to you with the details.',
  },
  {
    id: 'amenities',
    question: 'What amenities are included in the booking?',
    answer:
      'Your booking includes full access to: the swimming pool, BBQ area, karaoke setup, billiard table, fully equipped kitchen, veranda, kiddie playground, and parking area. All amenities are shared between booked guests only.',
  },
  {
    id: 'cancellation',
    question: 'What is your cancellation policy?',
    answer:
      'Cancellation terms are discussed and agreed upon at the time of booking. Please contact us directly for details. We recommend reaching out as early as possible if plans change.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'We accept bank transfers and cash in Philippine Peso. Payment details will be provided upon confirmation of your booking. A reservation deposit may be required to secure your dates.',
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
            Everything you need to know before booking — answered clearly.
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
            Still have questions? We'd love to hear from you.
          </p>
          <a href="#contact" className="buttonPrimary">
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}
