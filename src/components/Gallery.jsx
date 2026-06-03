/**
 * Gallery.jsx
 * Section 9 — Photo gallery grid with category tabs and lightbox.
 * Categories: All | Amenities | Kitchen | Rooms | Pool | Guests.
 * Guests tab: full-width auto-advancing carousel with thumbnails.
 * Other tabs: masonry grid with lightbox on click.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import './Gallery.css';
import { getR2Url } from '../lib/r2';

const categories = ['All', 'Amenities', 'Kitchen', 'Rooms', 'Pool', 'Guests'];

const galleryImages = [
  {
    id: 'g1',
    src: getR2Url('gallery/rooms-1.jpg'),
    alt: 'Ground Floor Room interior',
    category: 'Rooms',
    span: 'wide',
  },
  {
    id: 'g2',
    src: getR2Url('gallery/rooms-2.jpg'),
    alt: 'Upper Floor Room interior',
    category: 'Rooms',
    span: 'normal',
  },
  {
    id: 'g3',
    src: getR2Url('gallery/pool-1.jpg'),
    alt: 'Swimming pool area',
    category: 'Pool',
    span: 'normal',
  },
  {
    id: 'g4',
    src: getR2Url('gallery/pool-2.jpg'),
    alt: 'Pool view',
    category: 'Pool',
    span: 'tall',
  },
  {
    id: 'g5',
    src: getR2Url('gallery/kitchen-1.jpg'),
    alt: 'Fully equipped kitchen',
    category: 'Kitchen',
    span: 'normal',
  },
  {
    id: 'g6',
    src: getR2Url('gallery/kitchen-2.jpg'),
    alt: 'Kitchen and dining area',
    category: 'Kitchen',
    span: 'normal',
  },
  {
    id: 'g7',
    src: getR2Url('gallery/amenities-1.jpg'),
    alt: 'Resort veranda',
    category: 'Amenities',
    span: 'wide',
  },
  {
    id: 'g8',
    src: getR2Url('gallery/amenities-2.jpg'),
    alt: 'BBQ and outdoor area',
    category: 'Amenities',
    span: 'normal',
  },
  {
    id: 'g9',
    src: getR2Url('gallery/amenities-3.jpg'),
    alt: 'Parking area',
    category: 'Amenities',
    span: 'normal',
  },
  {
    id: 'g10',
    src: getR2Url('gallery/guests-1.jpg'),
    alt: 'Guests enjoying the resort',
    category: 'Guests',
  },
  {
    id: 'g11',
    src: getR2Url('gallery/guests-2.jpg'),
    alt: 'Group celebration at the resort',
    category: 'Guests',
  },
  {
    id: 'g12',
    src: getR2Url('gallery/guests-3.jpg'),
    alt: 'Family gathering at the pool',
    category: 'Guests',
  },
];

/* ============================================================
   GuestsCarousel — auto-advancing carousel shown only in Guests tab
   ============================================================ */
function GuestsCarousel({ images }) {
  const [activeIndex, setActiveIndex]   = useState(0);
  const [isAnimating, setIsAnimating]   = useState(false);
  const [direction, setDirection]       = useState('next');
  const intervalRef                     = useRef(null);
  const isPausedRef                     = useRef(false);

  /* Auto-advance every 4 seconds */
  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        goTo('next');
      }
    }, 4000);
  }, []);

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  /* Navigate to next or prev slide */
  const goTo = useCallback((dirOrIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (typeof dirOrIndex === 'number') {
      setDirection(dirOrIndex > activeIndex ? 'next' : 'prev');
      setActiveIndex(dirOrIndex);
    } else {
      setDirection(dirOrIndex);
      setActiveIndex((prev) =>
        dirOrIndex === 'next'
          ? (prev + 1) % images.length
          : (prev - 1 + images.length) % images.length
      );
    }

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, activeIndex, images.length]);

  const handlePrev = () => { goTo('prev'); startInterval(); };
  const handleNext = () => { goTo('next'); startInterval(); };
  const handleThumb = (i) => { goTo(i); startInterval(); };

  return (
    <div
      className="guestsCarousel"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      {/* Main slide */}
      <div className="guestsCarouselStage">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`guestsCarouselSlide
              ${index === activeIndex ? 'guestsCarouselSlide--active' : ''}
              ${index !== activeIndex ? 'guestsCarouselSlide--hidden' : ''}
            `}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="guestsCarouselImage"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Caption bar */}
            <div className="guestsCarouselCaption">
              <span className="guestsCarouselCaptionText">{image.alt}</span>
              <span className="guestsCarouselCounter">
                {index + 1} <span>/</span> {images.length}
              </span>
            </div>
          </div>
        ))}

        {/* Prev / Next arrows */}
        <button
          className="guestsCarouselArrow guestsCarouselArrow--prev"
          onClick={handlePrev}
          aria-label="Previous photo"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className="guestsCarouselArrow guestsCarouselArrow--next"
          onClick={handleNext}
          aria-label="Next photo"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Progress bar */}
        <div className="guestsCarouselProgress" aria-hidden="true">
          <div
            key={activeIndex}
            className="guestsCarouselProgressBar"
          />
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="guestsCarouselThumbs" role="group" aria-label="Photo thumbnails">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`guestsCarouselThumb ${index === activeIndex ? 'guestsCarouselThumb--active' : ''}`}
            onClick={() => handleThumb(index)}
            aria-label={`Go to photo ${index + 1}: ${image.alt}`}
            aria-pressed={index === activeIndex}
          >
            <img
              src={image.src}
              alt=""
              className="guestsCarouselThumbImg"
              loading="lazy"
            />
            <div className="guestsCarouselThumbOverlay" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="guestsCarouselDots" role="group" aria-label="Slide indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`guestsCarouselDot ${index === activeIndex ? 'guestsCarouselDot--active' : ''}`}
            onClick={() => handleThumb(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Main Gallery component
   ============================================================ */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFiltering, setIsFiltering]       = useState(false);
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  const isGuestsTab = activeCategory === 'Guests';

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

  /* Lightbox */
  const openLightbox  = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [filteredImages.length]);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [filteredImages.length]);

  /* Keyboard nav for lightbox */
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft')  lightboxPrev();
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
          <h2 className="sectionTitle sectionTitleLight" id="galleryHeading">Gallery</h2>
          <p className="sectionSubtitle" style={{ color: 'rgba(245,241,232,0.55)', margin: '1rem auto 0' }}>
            A glimpse into what's waiting for you and your group at Victoria's Haven.
          </p>
        </header>

        {/* Category Tabs */}
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

        {/* Content — Carousel for Guests, Grid for everything else */}
        <div className={isFiltering ? 'galleryGridHidden' : 'galleryGridVisible'}>
          {isGuestsTab ? (
            <GuestsCarousel images={filteredImages} />
          ) : (
            <div className="galleryGrid">
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
          )}
        </div>

      </div>

      {/* Lightbox — only for grid tabs */}
      {activeLightboxImage && !isGuestsTab && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${activeLightboxImage.alt}`}
          onClick={closeLightbox}
        >
          <button className="lightboxClose" onClick={closeLightbox} aria-label="Close lightbox">✕</button>
          <div className="lightboxCounter" aria-live="polite">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
          <div className="lightboxImageWrap" onClick={(e) => e.stopPropagation()}>
            <img src={activeLightboxImage.src} alt={activeLightboxImage.alt} className="lightboxImage" />
            <p className="lightboxCaption">{activeLightboxImage.alt}</p>
          </div>
          <button
            className="lightboxNavBtn lightboxNavPrev"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
          >←</button>
          <button
            className="lightboxNavBtn lightboxNavNext"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next image"
          >→</button>
        </div>
      )}
    </section>
  );
}