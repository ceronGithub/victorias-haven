/**
 * Testimonials.jsx
 * Section 8 — Guest reviews carousel.
 * Displays 3 testimonials at a time on desktop, 1 on mobile.
 * Prev/Next navigation + dot indicators.
 * Auto-advances every 5s, pauses on hover.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 'guest-1',
    name: 'Alexandra Whitmore',
    location: 'London, UK',
    date: 'March 2025',
    rating: 5,
    quote: "Victoria's Haven exceeded every expectation we had for a luxury escape. The staff anticipated our needs before we even voiced them, and the oceanfront suite was simply breathtaking. We have stayed at many resorts — none compare.",
    initials: 'AW',
    accentColor: 'var(--color-gold)',
  },
  {
    id: 'guest-2',
    name: 'Sebastián Morales',
    location: 'Buenos Aires, AR',
    date: 'January 2025',
    rating: 5,
    quote: "The spa experience alone was worth the journey. An absolute sanctuary of calm and luxury. Every corner of this resort tells a story of care and craftsmanship. We are already planning our return.",
    initials: 'SM',
    accentColor: 'var(--color-teal)',
  },
  {
    id: 'guest-3',
    name: 'Naomi Chen',
    location: 'Singapore, SG',
    date: 'February 2025',
    rating: 5,
    quote: "From the private beach to the sunrise yoga sessions, every moment felt intentional and magical. The team made our honeymoon truly unforgettable. We didn't want to leave — and honestly, we haven't fully left in our hearts.",
    initials: 'NC',
    accentColor: 'var(--color-sage)',
  },
  {
    id: 'guest-4',
    name: 'James Hartfield',
    location: 'New York, US',
    date: 'April 2025',
    rating: 5,
    quote: "The Lagoon Bungalow is unlike anything I've experienced. Waking up over the water with glass floors revealing the sea below — that's a memory I'll carry forever. Impeccable service throughout our entire stay.",
    initials: 'JH',
    accentColor: 'var(--color-gold)',
  },
  {
    id: 'guest-5',
    name: 'Isabelle Fontaine',
    location: 'Paris, FR',
    date: 'March 2025',
    rating: 5,
    quote: "We hosted our corporate retreat here and every single detail was handled with elegance and efficiency. The conference facilities are world-class, yet the resort never loses its intimate, personal atmosphere. Extraordinary.",
    initials: 'IF',
    accentColor: 'var(--color-teal)',
  },
  {
    id: 'guest-6',
    name: 'Hiroshi Tanaka',
    location: 'Tokyo, JP',
    date: 'May 2025',
    rating: 5,
    quote: "The fine dining restaurant offered a culinary experience we still talk about months later. The chef's tasting menu paired with the sommelier's wine selection was a masterclass in flavour. Victoria's Haven is perfection.",
    initials: 'HT',
    accentColor: 'var(--color-sage)',
  },
];

/**
 * StarRating — renders N filled gold stars
 */
function StarRating({ rating }) {
  return (
    <div className="testimonialStars" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: rating }, (_, i) => (
        <span key={i} className="testimonialStar" aria-hidden="true">★</span>
      ))}
    </div>
  );
}

const VISIBLE_COUNT = 3; /* cards shown at once on desktop */
const AUTO_ADVANCE_MS = 5000;

export default function Testimonials() {
  const [activeIndex, setActiveIndex]     = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused]           = useState(false);
  const intervalRef                       = useRef(null);

  const totalSlides = testimonials.length - VISIBLE_COUNT + 1; /* 4 stops */

  /* Move to specific slide with transition guard */
  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    setIsTransitioning(true);
    setActiveIndex(clampedIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, totalSlides]);

  const goNext = useCallback(() => {
    goTo(activeIndex < totalSlides - 1 ? activeIndex + 1 : 0);
  }, [activeIndex, goTo, totalSlides]);

  const goPrev = useCallback(() => {
    goTo(activeIndex > 0 ? activeIndex - 1 : totalSlides - 1);
  }, [activeIndex, goTo, totalSlides]);

  /* Auto-advance timer */
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, goNext]);

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + VISIBLE_COUNT);

  return (
    <section
      className="testimonialsSection"
      id="testimonials"
      aria-labelledby="testimonialsHeading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      <div className="testimonialsSectionInner">

        <header className="testimonialsSectionHeader revealFade">
          <span className="sectionEyebrow">Guest Stories</span>
          <h2 className="sectionTitle" id="testimonialsHeading">
            What Our Guests Say
          </h2>
          <p className="sectionSubtitle" style={{ margin: '1rem auto 0' }}>
            Authentic moments from those who have experienced Victoria's Haven firsthand.
          </p>
        </header>

        {/* ── Carousel Track ── */}
        <div
          className={`testimonialsTrack ${isTransitioning ? 'testimonialsTrackTransitioning' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {visibleTestimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="testimonialCard"
              aria-label={`Review by ${testimonial.name}`}
            >
              {/* Quote mark */}
              <div className="testimonialQuoteMark" aria-hidden="true">"</div>

              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote className="testimonialQuote">
                {testimonial.quote}
              </blockquote>

              {/* Guest info */}
              <footer className="testimonialGuest">
                <div
                  className="testimonialAvatar"
                  style={{ '--avatarAccent': testimonial.accentColor }}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div className="testimonialGuestInfo">
                  <span className="testimonialGuestName">{testimonial.name}</span>
                  <span className="testimonialGuestMeta">
                    {testimonial.location} · {testimonial.date}
                  </span>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="testimonialsControls">

          {/* Prev */}
          <button
            className="testimonialsNavBtn"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Dots */}
          <div className="testimonialsDots" role="tablist" aria-label="Testimonial navigation">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                className={`testimonialsDot ${i === activeIndex ? 'testimonialsDotActive' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-selected={i === activeIndex}
                role="tab"
              />
            ))}
          </div>

          {/* Next */}
          <button
            className="testimonialsNavBtn"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            →
          </button>

        </div>

      </div>
    </section>
  );
}
