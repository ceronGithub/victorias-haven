/**
 * RoomShowcase.jsx
 * Section 5 — Room/Accommodation showcase grid.
 * Displays 6 room cards: image, name, description, amenities,
 * price, rating, and "View Details" CTA.
 * Cards animate in via scroll-reveal (revealFade utility classes).
 */

import './RoomShowcase.css';

const rooms = [
  {
    id: 'oceanfront-suite',
    name: 'Oceanfront Suite',
    description: 'Wake to unobstructed sea views from your private terrace. Floor-to-ceiling glass frames the horizon.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80&auto=format&fit=crop',
    amenities: ['Private Terrace', 'King Bed', 'Infinity Tub', 'Butler Service'],
    priceFrom: 480,
    rating: 5,
  },
  {
    id: 'garden-villa',
    name: 'Garden Villa',
    description: 'A secluded retreat enveloped in tropical gardens. Your own plunge pool awaits just steps away.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80&auto=format&fit=crop',
    amenities: ['Plunge Pool', 'Garden View', 'Living Room', 'Rain Shower'],
    priceFrom: 620,
    rating: 5,
  },
  {
    id: 'beach-cottage',
    name: 'Beach Cottage',
    description: 'Steps from the sand, this intimate cottage offers barefoot luxury at its most effortless.',
    image: 'https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800&q=80&auto=format&fit=crop',
    amenities: ['Beach Access', 'Outdoor Shower', 'Hammock Deck', 'Mini Bar'],
    priceFrom: 340,
    rating: 5,
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    description: 'The pinnacle of resort living — sprawling interiors, panoramic views, and dedicated concierge around the clock.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format&fit=crop',
    amenities: ['Full Kitchen', 'Private Pool', 'Dining Room', '24/7 Concierge'],
    priceFrom: 1200,
    rating: 5,
  },
  {
    id: 'lagoon-bungalow',
    name: 'Lagoon Bungalow',
    description: 'Perched over a glassy lagoon, this overwater bungalow lets you fall asleep to the gentle lull of the sea.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80&auto=format&fit=crop',
    amenities: ['Overwater Deck', 'Glass Floor Panel', 'Snorkel Gear', 'Kayak Access'],
    priceFrom: 780,
    rating: 5,
  },
  {
    id: 'deluxe-double',
    name: 'Deluxe Double Room',
    description: 'Refined and comfortable — the perfect base for couples seeking elegance without excess.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
    amenities: ['Mountain View', 'King Bed', 'Workspace', 'Pool Access'],
    priceFrom: 240,
    rating: 4,
  },
];

/**
 * StarRating — renders filled/empty star icons
 * @param {number} rating - number of filled stars (max 5)
 */
function StarRating({ rating }) {
  return (
    <div className="roomCardStars" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`roomCardStar ${i < rating ? 'starFilled' : 'starEmpty'}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export default function RoomShowcase() {
  return (
    <section className="roomsSection" id="rooms" aria-labelledby="roomsHeading">

      <div className="roomsSectionInner">

        <header className="roomsSectionHeader revealFade">
          <span className="sectionEyebrow">Accommodations</span>
          <h2 className="sectionTitle" id="roomsHeading">
            Our Accommodations
          </h2>
          <p className="sectionSubtitle">
            Each space is a masterpiece of comfort and craft — choose the sanctuary that speaks to you.
          </p>
        </header>

        <div className="roomsGrid">
          {rooms.map((room, index) => (
            <article
              key={room.id}
              className={`roomCard revealFade revealFadeDelay${(index % 3) + 1}`}
              aria-label={room.name}
            >

              {/* ── Image ── */}
              <div className="roomCardImageWrap">
                <img
                  src={room.image}
                  alt={`${room.name} interior`}
                  className="roomCardImage"
                  loading="lazy"
                />
                <div className="roomCardImageOverlay" aria-hidden="true" />
                <div className="roomCardPrice" aria-label={`Starting from $${room.priceFrom} per night`}>
                  <span className="roomCardPriceFrom">From</span>
                  <span className="roomCardPriceAmount">${room.priceFrom}</span>
                  <span className="roomCardPriceNight">/night</span>
                </div>
              </div>

              {/* ── Content ── */}
              <div className="roomCardContent">

                <div className="roomCardMeta">
                  <StarRating rating={room.rating} />
                </div>

                <h3 className="roomCardName">{room.name}</h3>
                <p className="roomCardDescription">{room.description}</p>

                {/* Amenities */}
                <ul className="roomCardAmenities" aria-label={`${room.name} amenities`}>
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="roomCardAmenityItem">
                      <span className="roomCardAmenityDot" aria-hidden="true" />
                      {amenity}
                    </li>
                  ))}
                </ul>

                <a
                  href={`#room-${room.id}`}
                  className="roomCardCta"
                  aria-label={`View details for ${room.name}`}
                >
                  View Details
                  <span className="roomCardCtaArrow" aria-hidden="true">→</span>
                </a>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
