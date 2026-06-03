/**
 * Gallery.jsx
 * Section 9 — Photo gallery grid with category tabs and lightbox.
 * Categories: All | Amenities | Kitchen | Rooms | Pool | Guests.
 * Click any image to open full-screen lightbox with prev/next navigation.
 */

import { useState, useEffect, useCallback } from 'react';
import './Gallery.css';

const categories = ['All', 'Amenities', 'Kitchen', 'Rooms', 'Pool', 'Guests'];

const galleryImages = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
    alt: 'Ground Floor Room interior',
    category: 'Rooms',
    span: 'wide',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format&fit=crop',
    alt: 'Upper Floor Room interior',
    category: 'Rooms',
    span: 'normal',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80&auto=format&fit=crop',
    alt: 'Swimming pool area',
    category: 'Pool',
    span: 'normal',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800&q=80&auto=format&fit=crop',
    alt: 'Pool view',
    category: 'Pool',
    span: 'tall',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
    alt: 'Fully equipped kitchen',
    category: 'Kitchen',
    span: 'normal',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80&auto=format&fit=crop',
    alt: 'Kitchen and dining area',
    category: 'Kitchen',
    span: 'normal',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&auto=format&fit=crop',
    alt: 'Resort veranda',
    category: 'Amenities',
    span: 'wide',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80&auto=format&fit=crop',
    alt: 'BBQ and outdoor area',
    category: 'Amenities',
    span: 'normal',
  },
  {
    id: 'g9',
    src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80&auto=format&fit=crop',
    alt: 'Parking area',
    category: 'Amenities',
    span: 'normal',
  },
  {
    id: 'g10',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80&auto=format&fit=crop',
    alt: 'Guests enjoying the resort',
    category: 'Guests',
    span: 'normal',
  },
  {
    id: 'g11',
    src: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80&auto=format&fit=crop',
    alt: 'Group celebration at the resort',
    category: 'Guests',
    span: 'tall',
  },
  {
    id: 'g12',
    src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80&auto=format&fit=crop',
    alt: 'Family gathering at the pool',
    category: 'Guests',
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
            A glimpse into what's waiting for you and your group at Victoria's Haven.
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
          <button
            className="lightboxClose"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <div className="lightboxCounter" aria-live="polite">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>

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

          <button
            className="lightboxNavBtn lightboxNavPrev"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
          >
            ←
          </button>

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
