/**
 * Footer.jsx
 * Section 14 — Site Footer.
 * 4-column layout on desktop: Company info | Quick Links | Services | Legal.
 * Fifth column: Newsletter signup with email input.
 * Bottom bar: copyright, social icons, payment method icons.
 * All content animates in via revealFade on scroll.
 * Newsletter input sanitizes forbidden characters per Rule 18.1.
 */

import { useState } from 'react';
import './Footer.css';

/* ── Rule 18.1 — Forbidden character sanitizer ── */
const FORBIDDEN_CHARS = /[<>{}[\]/\\;'"` =\-\-]/g;
function sanitizeInput(value) {
  return value.replace(FORBIDDEN_CHARS, '');
}

const quickLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'Rooms',      href: '#rooms' },
  { label: 'Amenities',  href: '#amenities' },
  { label: 'Dining',     href: '#dining' },
  { label: 'Gallery',    href: '#gallery' },
  { label: 'Contact',    href: '#contact' },
];

const serviceLinks = [
  { label: 'Ground Floor Room', href: '#rooms' },
  { label: 'Upper Floor Room',  href: '#rooms' },
  { label: 'Full Resort Booking', href: '#rooms' },
  { label: 'Swimming Pool',     href: '#amenities' },
  { label: 'BBQ & Karaoke',     href: '#amenities' },
  { label: 'Packages',          href: '#services' },
];

const legalLinks = [
  { label: 'Privacy Policy',      href: '/privacy' },
  { label: 'Terms & Conditions',  href: '/terms' },
  { label: 'Cancellation Policy', href: '/cancellation' },
  { label: 'Cookie Policy',       href: '/cookies' },
];

const socialLinks = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    href: 'https://twitter.com/victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-hidden="true">
        <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M20 4H14l-4 6M4 20h6l4-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 17v-4a2 2 0 014 0v4M11 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* Simple payment method SVG badges */
const paymentMethods = [
  { id: 'visa',       label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex',       label: 'Amex' },
  { id: 'gcash',      label: 'GCash' },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail]   = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError]   = useState('');

  /* Newsletter email sanitization and submit */
  const handleNewsletterChange = (e) => {
    const raw = e.target.value;
    const sanitized = sanitizeInput(raw);
    setNewsletterEmail(sanitized);
    if (newsletterError) setNewsletterError('');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="footer" id="footer" role="contentinfo">

      {/* ── Main Footer Grid ── */}
      <div className="footerMain">
        <div className="footerMainInner">

          {/* Column 1 — Brand */}
          <div className="footerColumn footerBrandColumn revealFade">
            <a href="#home" className="footerLogo" aria-label="Victoria's Haven — Back to top">
              <span className="footerLogoMark">V</span>
              <span className="footerLogoText">ictoria's Haven</span>
            </a>
            <p className="footerBrandTagline">
              A private sanctuary where luxury meets the sea. Every detail is curated for your complete comfort and exclusive relaxation.
            </p>
            <address className="footerAddress" aria-label="Resort address">
              <span>Peninsula Drive, Coastal Cove</span>
              <span>Island Province, Philippines</span>
            </address>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footerColumn revealFade revealFadeDelay1">
            <h3 className="footerColumnTitle">Quick Links</h3>
            <nav aria-label="Footer quick links">
              <ul className="footerLinkList">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footerLink">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Services */}
          <div className="footerColumn revealFade revealFadeDelay2">
            <h3 className="footerColumnTitle">Services</h3>
            <nav aria-label="Footer services links">
              <ul className="footerLinkList">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footerLink">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4 — Legal */}
          <div className="footerColumn revealFade revealFadeDelay3">
            <h3 className="footerColumnTitle">Legal</h3>
            <nav aria-label="Footer legal links">
              <ul className="footerLinkList">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footerLink">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 5 — Newsletter */}
          <div className="footerColumn footerNewsletterColumn revealFade revealFadeDelay4">
            <h3 className="footerColumnTitle">Stay Connected</h3>
            <p className="footerNewsletterText">
              Subscribe for exclusive offers, seasonal packages, and curated resort updates.
            </p>

            {newsletterSubmitted ? (
              <div className="footerNewsletterSuccess" role="status" aria-live="polite">
                <span className="footerNewsletterSuccessIcon" aria-hidden="true">✓</span>
                You're on the list. Welcome to Victoria's Haven.
              </div>
            ) : (
              <form
                className="footerNewsletterForm"
                onSubmit={handleNewsletterSubmit}
                noValidate
                aria-label="Newsletter signup"
              >
                <div className="footerNewsletterInputWrapper">
                  <label htmlFor="footerNewsletterEmail" className="footerNewsletterLabel">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="footerNewsletterEmail"
                    className={`footerNewsletterInput ${newsletterError ? 'footerNewsletterInputError' : ''}`}
                    value={newsletterEmail}
                    onChange={handleNewsletterChange}
                    placeholder="Your email address"
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={newsletterError ? 'footerNewsletterError' : 'footerNewsletterPrivacy'}
                  />
                  {newsletterError && (
                    <span className="footerNewsletterError" id="footerNewsletterError" role="alert">
                      {newsletterError}
                    </span>
                  )}
                </div>
                <button type="submit" className="buttonPrimary footerNewsletterBtn">
                  Subscribe
                </button>
                <p className="footerNewsletterPrivacy" id="footerNewsletterPrivacy">
                  No spam. Unsubscribe anytime. Your privacy is respected.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footerBottom">
        <div className="footerBottomInner">

          {/* Copyright */}
          <p className="footerCopyright">
            © {new Date().getFullYear()} Victoria's Haven Private Resort. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="footerSocialRow" role="list" aria-label="Social media">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className="footerSocialIcon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in new tab)`}
                role="listitem"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="footerPaymentMethods" aria-label="Accepted payment methods">
            {paymentMethods.map((method) => (
              <span key={method.id} className="footerPaymentBadge" aria-label={method.label}>
                {method.label}
              </span>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
