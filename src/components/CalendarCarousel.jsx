/**
 * CalendarCarousel.jsx
 * Dynamic monthly calendar carousel with smooth CSS transform sliding.
 * - Active slide is always the current month on load, positioned in the center.
 * - 12 dot indicators — one per month of the year.
 * - Smooth sliding via translateX on a continuous track.
 * - Today's date highlighted. Touch + keyboard navigation.
 * - slotPct is measured via ResizeObserver after mount so centering is always accurate.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import './CalendarCarousel.css';

/* ── Constants ─────────────────────────────────────────────────────────── */

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** getDaysInMonth — total days in a given month/year */
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/** getFirstDayOfWeek — 0=Sun weekday of the 1st */
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * buildCalendarGrid — flat array of day numbers (or null for empty cells).
 * Padded to always complete the last week row.
 */
function buildCalendarGrid(year, month) {
  const totalDays = getDaysInMonth(year, month);
  const startDay  = getFirstDayOfWeek(year, month);
  const cells     = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/**
 * offsetMonth — safely adds delta months to a base { year, month },
 * wrapping correctly across year boundaries.
 */
function offsetMonth(base, delta) {
  let m = base.month + delta;
  let y = base.year;
  while (m < 0)  { m += 12; y--; }
  while (m > 11) { m -= 12; y++; }
  return { year: y, month: m };
}

/* ── Single month card ─────────────────────────────────────────────────── */

/**
 * MonthCard — renders one calendar month.
 * Highlights today when this card matches the current month.
 */
function MonthCard({ year, month, today, isActive }) {
  const cells       = buildCalendarGrid(year, month);
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div
      className={`calCard ${isActive ? 'calCardActive' : ''}`}
      aria-label={`${MONTH_NAMES[month]} ${year}`}
      aria-hidden={!isActive}
    >
      {/* Header */}
      <div className="calCardHeader">
        <div className="calCardMonthGroup">
          <span className="calCardMonth">{MONTH_NAMES[month]}</span>
          <span className="calCardYear">{year}</span>
        </div>
        {isActive && <span className="calCardPip" aria-hidden="true" />}
      </div>

      {/* Day-of-week row */}
      <div className="calDayLabels" aria-hidden="true">
        {DAY_LABELS.map(d => (
          <span key={d} className="calDayLabel">{d}</span>
        ))}
      </div>

      {/* Date grid */}
      <div className="calGrid" role="grid">
        {cells.map((day, idx) => {
          const isToday   = isThisMonth && day === today.getDate();
          const isWeekend = idx % 7 === 0 || idx % 7 === 6;
          return (
            <span
              key={idx}
              role={day ? 'gridcell' : 'presentation'}
              className={[
                'calCell',
                !day              ? 'calCellEmpty'   : '',
                isWeekend && day  ? 'calCellWeekend' : '',
                isToday           ? 'calCellToday'   : '',
              ].filter(Boolean).join(' ')}
              aria-label={day ? `${MONTH_NAMES[month]} ${day}${isToday ? ', today' : ''}` : undefined}
            >
              {day || ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main export ───────────────────────────────────────────────────────── */

export default function CalendarCarousel() {
  const today      = new Date();
  const todayYear  = today.getFullYear();
  const todayMonth = today.getMonth(); // 0-indexed

  /*
   * activeIndex — which month (0–11) in the current year is active.
   * Initialized to today's month so the carousel always opens on it.
   */
  const [activeIndex, setActiveIndex] = useState(todayMonth);
  const [yearOffset,  setYearOffset]  = useState(0);

  /* Sliding state */
  const [isSliding, setIsSliding] = useState(false);
  const [slideDir,  setSlideDir]  = useState(null); // 'prev' | 'next'
  const slideTimer = useRef(null);

  /* Touch tracking */
  const touchStartX = useRef(null);

  useEffect(() => () => clearTimeout(slideTimer.current), []);

  /* Absolute offset from today's month */
  const totalOffset = yearOffset * 12 + (activeIndex - todayMonth);
  const isAtToday   = totalOffset === 0;
  const activeYear  = todayYear + yearOffset;

  /**
   * navigate — move to previous or next month with a slide animation.
   */
  const navigate = useCallback((dir) => {
    if (isSliding) return;
    setSlideDir(dir);
    setIsSliding(true);
    slideTimer.current = setTimeout(() => {
      if (dir === 'next') {
        setActiveIndex(prev => {
          if (prev === 11) { setYearOffset(y => y + 1); return 0; }
          return prev + 1;
        });
      } else {
        setActiveIndex(prev => {
          if (prev === 0) { setYearOffset(y => y - 1); return 11; }
          return prev - 1;
        });
      }
      setIsSliding(false);
      setSlideDir(null);
    }, 420);
  }, [isSliding]);

  /* Jump directly to a month dot */
  const jumpToMonth = useCallback((monthIndex) => {
    if (isSliding || monthIndex === activeIndex) return;
    const dir = monthIndex > activeIndex ? 'next' : 'prev';
    setSlideDir(dir);
    setIsSliding(true);
    slideTimer.current = setTimeout(() => {
      setActiveIndex(monthIndex);
      setYearOffset(0);
      setIsSliding(false);
      setSlideDir(null);
    }, 420);
  }, [isSliding, activeIndex]);

  /* Keyboard navigation */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft')  navigate('prev');
    if (e.key === 'ArrowRight') navigate('next');
  }, [navigate]);

  /* Touch swipe */
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 44) return;
    navigate(delta < 0 ? 'next' : 'prev');
  };

  /* Build 5 cards: [active-2, active-1, active, active+1, active+2] */
  const base  = { year: activeYear, month: activeIndex };
  const cards = [-2, -1, 0, 1, 2].map(delta => ({
    ...offsetMonth(base, delta),
    delta,
  }));

  const viewportRef = useRef(null);

  /*
   * slotPct — each slot's width as a percentage of the viewport width.
   * Must be measured after mount (not during render) so the DOM has painted.
   * ResizeObserver keeps it accurate when the window resizes.
   * Default 33.333 matches the CSS flex: 0 0 33.333% rule.
   */
  const [slotPct, setSlotPct] = useState(33.333);

  useEffect(() => {
    /* Measure the first rendered slot and express its width as % of viewport */
    function measureSlot() {
      if (!viewportRef.current) return;
      const slot = viewportRef.current.querySelector('.calTrackSlot');
      const vw   = viewportRef.current.offsetWidth;
      if (!slot || !vw) return;
      setSlotPct((slot.offsetWidth / vw) * 100);
    }

    measureSlot();

    const resizeObserver = new ResizeObserver(measureSlot);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  /*
   * translateX calculation:
   * The track holds 5 slots. Center card is at index 2 (delta 0).
   * To show index 2 in the viewport: shift left by 2 slot widths.
   * baseShift = -(2 × slotPct)%
   * During slide: add/subtract one slot width for the animation frame.
   */
  const baseShift  = -(2 * slotPct);
  const slideShift = isSliding ? (slideDir === 'next' ? -slotPct : slotPct) : 0;
  const trackX     = baseShift + slideShift;

  return (
    <section className="calSection revealFade" id="availability" aria-label="Availability Calendar">
      <div className="calInner">

        {/* Header */}
        <div className="calSectionHeader">
          <span className="sectionEyebrow">Availability</span>
          <h2 className="sectionTitle calSectionTitle">Check the Calendar</h2>
          <p className="sectionSubtitle calSectionSub">
            Browse available dates and plan your perfect stay at Victoria's Haven.
          </p>
        </div>

        {/* Carousel viewport — clips the sliding track */}
        <div
          ref={viewportRef}
          className="calViewport"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex="0"
          aria-roledescription="carousel"
          aria-label="Monthly calendar"
        >
          {/* Sliding track — 5 cards; center card (idx 2) positioned via translateX */}
          <div
            className="calTrack"
            style={{
              transform: `translate3d(${trackX}%, 0, 0)`,
              transition: isSliding
                ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'none',
            }}
          >
            {cards.map(({ year, month, delta }) => (
              <div key={`${year}-${month}`} className="calTrackSlot">
                <MonthCard
                  year={year}
                  month={month}
                  today={today}
                  isActive={delta === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nav row */}
        <div className="calNavRow">
          <button
            className="calNavBtn"
            onClick={() => navigate('prev')}
            aria-label="Previous month"
            disabled={isSliding}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* 12 dots — one per calendar month */}
          <div className="calDots" role="tablist" aria-label="Month selector">
            {MONTH_NAMES.map((name, idx) => {
              const isActive = idx === activeIndex && yearOffset === 0;
              return (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={name}
                  className={`calDot ${isActive ? 'calDotActive' : ''}`}
                  onClick={() => jumpToMonth(idx)}
                  disabled={isSliding}
                />
              );
            })}
          </div>

          <button
            className="calNavBtn"
            onClick={() => navigate('next')}
            aria-label="Next month"
            disabled={isSliding}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        {/* Back to today — visible only when browsed away */}
        {!isAtToday && (
          <div className="calReturnRow">
            <button
              className="calReturnBtn"
              onClick={() => {
                setActiveIndex(todayMonth);
                setYearOffset(0);
              }}
            >
              ◆ Back to {MONTH_NAMES[todayMonth]} {todayYear}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}