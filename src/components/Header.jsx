/**
 * Header.jsx
 * Sticky navigation bar for Victoria's Haven.
 * - Transparent on load, semi-solid on scroll
 * - Hamburger menu on mobile (≤1024px)
 * - Logo left, nav center, CTA right
 */

import { useState, useEffect } from 'react';
import './Header.css';

const navLinks = [
  { label: 'Home',      href: '#home' },
  { label: 'Rooms',     href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Dining',    href: '#dining' },
  { label: 'Services',  href: '#services' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'Contact',   href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]     = useState(false);

  /* Detect scroll position to toggle solid background */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'headerScrolled' : ''}`} role="banner">
      <div className="headerInner">

        {/* ── Logo ── */}
        <a href="#home" className="headerLogo" aria-label="Victoria's Haven — Home">
          <span className="headerLogoMark">V</span>
          <span className="headerLogoText">ictoria's Haven</span>
        </a>

        {/* ── Desktop Nav — flex-1 + justify-content: center keeps it always centered ── */}
        <nav
          className={`headerNavMenu ${menuOpen ? 'menuOpen' : ''}`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navLink"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <a href="#booking" className="buttonPrimary headerReserveBtn">
          Reserve Now
        </a>

        {/* ── Hamburger ── */}
        <button
          className={`headerHamburger ${menuOpen ? 'hamburgerOpen' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="hamburgerBar" />
          <span className="hamburgerBar" />
          <span className="hamburgerBar" />
        </button>

      </div>
    </header>
  );
}
