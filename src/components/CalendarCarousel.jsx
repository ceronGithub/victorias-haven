/**
 * CalendarCarousel.jsx
 * Dynamic monthly calendar displayed as a sliding carousel.
 * Active (center) slide is always the current month on load.
 * Today's date is highlighted. Users can slide left/right to browse months.
 * Infinite-style navigation: never locks at a hard boundary.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import './CalendarCarousel.css';

/* ── Constants ──────────────────────────────────────────────────────────── */

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

/* ── Helpers ────────────────────────────────────────────────────────────── */

/**
 * getDaysInMonth — returns total days in a given month/year
 * @param {number} year
 * @param {number} month  0-indexed
 * @returns {number}
 */
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * getFirstDayOfWeek — returns weekday index (0=Sun) of the 1st of the month
 * @param {number} year
 * @param {number} month  0-indexed
 * @returns {number}
 */
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * buildCalendarGrid — generates a flat array of day cells for a month.
 * Leading nulls fill the first week's empty slots.
 * @param {number} year
 * @param {number} month  0-indexed
 * @returns {(number|null)[]}
 */
function buildCalendarGrid(year, month) {
  const totalDays  = getDaysInMonth(year, month);
  const startDay   = getFirstDayOfWeek(year, month);
  const cells      = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  /* Pad trailing nulls to complete the last week row */
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

/**
 * offsetMonth — adds/subtracts months from a { year, month } object,
 * correctly wrapping across year boundaries.
 * @param {{ year: number, month: number }} base
 * @param {number} delta
 * @returns {{ year: number, month: number }}
 */
function offsetMonth(base, delta) {
  let m = base.month + delta;
  let y = base.year;
  while (m < 0)  { m += 12; y--; }
  while (m > 11) { m -= 12; y++; }
  return { year: y, month: m };
}

/* ── Single month card ──────────────────────────────────────────────────── */

/**
 * MonthCard — renders one month's calendar grid.
 * Highlights today if the rendered month matches the current date.
 * @param {{ year: number, month: number, today: Date, isActive: boolean }}
 */
function MonthCard({ year, month, today, isActive }) {
  const cells       = buildCalendarGrid(year, month);
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className={`calCard ${isActive ? 'calCardActive' : ''}`} aria-label={`${MONTH_NAMES[month]} ${year}`}>

      {/* Month / Year header */}
      <div className="calCardHeader">
        <span className="calCardMonth">{MONTH_NAMES[month]}</span>
        <span className="calCardYear">{year}</span>
        {isActive && <span className="calCardActivePip" aria-hidden="true" />}
      </div>

      {/* Day-of-week labels */}
      <div className="calDayLabels" aria-hidden="true">
        {DAY_LABELS.map(d => (
          <span key={d} className="calDayLabel">{d}</span>
        ))}
      </div>

      {/* Date grid */}
      <div className="calGrid" role="grid" aria-label={`${MONTH_NAMES[month]} ${year} calendar`}>
        {cells.map((day, idx) => {
          const isToday    = isThisMonth && day === today.getDate();
          const isWeekend  = (idx % 7 === 0 || idx % 7 === 6);
          return (
            <span
              key={idx}
              role={day ? 'gridcell' : 'presentation'}
              aria-label={day ? `${MONTH_NAMES[month]} ${day}, ${year}${isToday ? ', today' : ''}` : undefined}
              className={[
                'calCell',
                !day         ? 'calCellEmpty'   : '',
                isWeekend && day ? 'calCellWeekend' : '',
                isToday      ? 'calCellToday'   : '',
              ].join(' ').trim()}
            >
              {day || ''}
            </span>
          );
        })}
      </div>

    </div>
  );
}

/* ── Main export ────────────────────────────────────────────────────────── */

export default function CalendarCarousel() {
  const today   = new Date();

  /*
   * centerIndex tracks which month is the active (center) slide.
   * It's an offset from today's month — 0 = current month.
   * Negative = past, positive = future.
   */
  const [centerOffset, setCenterOffset] = useState(0);

  /* Slide animation state */
  const [slideDirection, setSlideDirection] = useState(null); // 'left' | 'right' | null
  const animTimerRef = useRef(null);

  /* Build the three visible months: prev, center, next */
  const baseMonth  = { year: today.getFullYear(), month: today.getMonth() };
  const prevMonth  = offsetMonth(baseMonth, centerOffset - 1);
  const activeMonth = offsetMonth(baseMonth, centerOffset);
  const nextMonth  = offsetMonth(baseMonth, centerOffset + 1);

  /* Clean up animation timer on unmount */
  useEffect(() => () => clearTimeout(animTimerRef.current), []);

  /**
   * slide — triggers directional animation, then advances the center index.
   * @param {'left'|'right'} dir
   */
  const slide = useCallback((dir) => {
    if (slideDirection) return; /* Prevent double-tap during animation */
    setSlideDirection(dir);
    animTimerRef.current = setTimeout(() => {
      setCenterOffset(prev => prev + (dir === 'left' ? 1 : -1));
      setSlideDirection(null);
    }, 340);
  }, [slideDirection]);

  /* Keyboard navigation */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft')  slide('right');
    if (e.key === 'ArrowRight') slide('left');
  }, [slide]);

  /* Touch swipe */
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    slide(delta < 0 ? 'left' : 'right');
  };

  const isAtCurrentMonth = centerOffset === 0;

  return (
    <section className="calSection revealFade" id="availability" aria-label="Availability Calendar">
      <div className="calInner">

        {/* Section header */}
        <div className="calSectionHeader">
          <span className="sectionEyebrow">Availability</span>
          <h2 className="sectionTitle calSectionTitle">Check the Calendar</h2>
          <p className="sectionSubtitle calSectionSub">
            Browse available dates and plan your perfect getaway at Victoria's Haven.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div
          className={`calCarousel ${slideDirection ? `calCarouselSlide${slideDirection === 'left' ? 'Left' : 'Right'}` : ''}`}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex="0"
          aria-roledescription="carousel"
          aria-label="Monthly calendar carousel"
        >
          <MonthCard {...prevMonth}   today={today} isActive={false} />
          <MonthCard {...activeMonth} today={today} isActive={true}  />
          <MonthCard {...nextMonth}   today={today} isActive={false} />
        </div>

        {/* Navigation row */}
        <div className="calNavRow">
          <button
            className="calNavBtn"
            onClick={() => slide('right')}
            aria-label="Previous month"
            disabled={!!slideDirection}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="calDots" aria-hidden="true">
            {[-1, 0, 1].map(offset => (
              <span
                key={offset}
                className={`calDot ${offset === 0 ? 'calDotActive' : ''}`}
              />
            ))}
          </div>

          <button
            className="calNavBtn"
            onClick={() => slide('left')}
            aria-label="Next month"
            disabled={!!slideDirection}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        {/* "Back to today" pill — only shown when not on current month */}
        {!isAtCurrentMonth && (
          <div className="calReturnRow">
            <button
              className="calReturnBtn"
              onClick={() => setCenterOffset(0)}
              aria-label="Return to current month"
            >
              ◆ Back to {MONTH_NAMES[today.getMonth()]} {today.getFullYear()}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
