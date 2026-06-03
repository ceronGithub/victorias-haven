/**
 * Gallery.jsx
 * Section 9 — Photo gallery grid with category tabs and lightbox.
 * Categories: All | Rooms | Beach & Pool | Dining | Spa & Wellness | Grounds.
 * Click any image to open full-screen lightbox with prev/next navigation.
 * Lazy loading on all images.
 */

import { useState, useEffect, useCallback } from 'react';
import './Gallery.css';

const categories = ['All', 'Rooms', 'Beach & Pool', 'Dining', 'Spa & Wellness', 'Grounds'];

const galleryImages = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop',
    alt: 'Oceanfront Suite interior',
    category: 'Rooms',
    span: 'wide',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80&auto=format&fit=crop',
    alt: 'Garden Villa plunge pool',
    category: 'Rooms',
    span: 'normal',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
    alt: 'Private beach at sunset',
    category: 'Beach & Pool',
    span: 'normal',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800&q=80&auto=format&fit=crop',
    alt: 'Infinity pool overlooking ocean',
    category: 'Beach & Pool',
    span: 'tall',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop',
    alt: 'Fine dining table setting',
    category: 'Dining',
    span: 'normal',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80&auto=format&fit=crop',
    alt: 'Presidential Suite bedroom',
    category: 'Rooms',
    span: 'normal',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&auto=format&fit=crop',
    alt: 'Spa treatment room',
    category: 'Spa & Wellness',
    span: 'wide',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80&auto=format&fit=crop',
    alt: 'Lagoon bungalow at dawn',
    category: 'Rooms',
    span: 'normal',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?w=800&q=80&auto=format&fit=crop',
    alt: 'Resort tropical gardens',
    category: 'Grounds',
    span: 'normal',
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80&auto=format&fit=crop',
    alt: 'Beach bar and lounge',
    category: 'Beach & Pool',
    span: 'normal',
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80&auto=format&fit=crop',
    alt: 'Gourmet breakfast presentation',
    category: 'Dining',
    span: 'tall',
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&q=80&auto=format&fit=crop',
    alt: 'Sunset over resort grounds',
    category: 'Grounds',
    span: 'wide',
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFiltering, setIsFiltering]       = useState(false);
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  /* Filtered image list */
  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  /* Switch category with fade transition */
  const handleCategoryChange = (cat) => {
    if (cat === activeCategory) return;
    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setIsFiltering(false);
    }, 200);
  };

  /* Open lightbox */
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  /* Lightbox navigation */
  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [filteredImages.length]);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [filteredImages.length]);

  /* Keyboard navigation for lightbox */
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowRight')  lightboxNext();
      if (e.key === 'ArrowLeft')   lightboxPrev();
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, lightboxNext, lightboxPrev]);

  const activeLightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section className="gallerySection" id="gallery" aria-labelledby="galleryHeading">

      <div className="gallerySectionInner">

        <header className="gallerySectionHeader revealFade">
          <span className="sectionEyebrow">Visual Journey</span>
          <h2 className="sectionTitle sectionTitleLight" id="galleryHeading">
            Gallery
          </h2>
          <p className="sectionSubtitle" style={{ color: 'rgba(245,241,232,0.55)', margin: '1rem auto 0' }}>
            A glimpse into the world that awaits you at Victoria's Haven.
          </p>
        </header>

        {/* ── Category Tabs ── */}
        <nav
          className="galleryCategoryTabs revealFade revealFadeDelay1"
          aria-label="Gallery categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`galleryCategoryTab ${activeCategory === cat ? 'galleryCategoryTabActive' : ''}`}
              onClick={() => handleCategoryChange(cat)}
              aria-selected={activeCategory === cat}
              role="tab"
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* ── Image Grid ── */}
        <div className={`galleryGrid ${isFiltering ? 'galleryGridHidden' : 'galleryGridVisible'}`}>
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              className={`galleryItem galleryItem--${image.span} revealFade`}
              style={{ transitionDelay: `${(index % 6) * 0.07}s` }}
              onClick={() => openLightbox(index)}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="galleryItemImage"
                loading="lazy"
              />
              <div className="galleryItemOverlay" aria-hidden="true">
                <span className="galleryItemIcon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
                <span className="galleryItemCaption">{image.alt}</span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* ── Lightbox ── */}
      {activeLightboxImage && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${activeLightboxImage.alt}`}
          onClick={closeLightbox}
        >
          {/* Backdrop handled by div click above */}

          <button
            className="lightboxClose"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="lightboxCounter" aria-live="polite">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>

          {/* Image */}
          <div
            className="lightboxImageWrap"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage.src}
              alt={activeLightboxImage.alt}
              className="lightboxImage"
            />
            <p className="lightboxCaption">{activeLightboxImage.alt}</p>
          </div>

          {/* Prev */}
          <button
            className="lightboxNavBtn lightboxNavPrev"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
          >
            ←
          </button>

          {/* Next */}
          <button
            className="lightboxNavBtn lightboxNavNext"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}

    </section>
  );
}
