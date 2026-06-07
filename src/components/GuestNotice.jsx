/**
 * GuestNotice.jsx
 * Important notice displayed prominently on the site.
 * Informs guests that upon entering — whether booked or for an ocular visit —
 * they will be speaking directly with the resort owner family,
 * and to kindly watch their manners.
 * Dismissible per session via local state.
 */

import { useState } from 'react';
import './GuestNotice.css';

export default function GuestNotice() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="guestNotice" role="alert" aria-live="polite" aria-label="Important guest notice">
      <div className="guestNoticeInner">

        {/* Icon */}
        <div className="guestNoticeIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M12 8v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
          </svg>
        </div>

        {/* Message */}
        <div className="guestNoticeContent">
          <span className="guestNoticeLabel">Important</span>
          <p className="guestNoticeText">
            Upon entering the resort — whether you're booked or visiting for an ocular — you will be speaking directly with the resort owner family. Kindly watch your manners.
          </p>
        </div>

        {/* Dismiss */}
        <button
          className="guestNoticeDismiss"
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss notice"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
