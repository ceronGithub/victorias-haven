/**
 * RoomShowcase.jsx
 * Section 5 — Room showcase.
 * Displays the 2 actual rooms at Victoria's Haven:
 * Ground Floor Room and Upper Floor Room.
 * Each is a 2-storey space, standard 12 pax, max 15 pax.
 * No fixed rate — directs guests to contact us for pricing.
 */

import './RoomShowcase.css';

const rooms = [
  {
    id: 'ground-floor',
    name: 'Ground Floor Room',
    description: 'Our ground floor 2-storey room offers easy access to all resort amenities — the pool, BBQ area, veranda, and playground are just steps away.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
    amenities: ['2-Storey Layout', 'Up to 12 Guests', 'Max 15 Guests', 'Pool Access', 'Full Kitchen Use', 'All Amenities Included'],
  },
  {
    id: 'upper-floor',
    name: 'Upper Floor Room',
    description: 'The upper floor 2-storey room offers elevated views of the resort grounds, perfect for groups who want a bit of extra height and a great vantage point.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format&fit=crop',
    amenities: ['2-Storey Layout', 'Up to 12 Guests', 'Max 15 Guests', 'Elevated Views', 'Full Kitchen Use', 'All Amenities Included'],
  },
];

export default function RoomShowcase() {
  return (
    <section className="roomsSection" id="rooms" aria-labelledby="roomsHeading">

      <div className="roomsSectionInner">

        <header className="roomsSectionHeader revealFade">
          <span className="sectionEyebrow">Accommodations</span>
          <h2 className="sectionTitle" id="roomsHeading">
            Our Rooms
          </h2>
          <p className="sectionSubtitle">
            Two 2-storey rooms, each accommodating up to 12 guests comfortably — 15 guests maximum.
          </p>
        </header>

        <div className="roomsGrid">
          {rooms.map((room, index) => (
            <article
              key={room.id}
              className={`roomCard revealFade revealFadeDelay${index + 1}`}
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
                {/* Capacity badge replacing price */}
                <div className="roomCardPrice" aria-label="Room capacity">
                  <span className="roomCardPriceFrom">Up to</span>
                  <span className="roomCardPriceAmount">15</span>
                  <span className="roomCardPriceNight">pax</span>
                </div>
              </div>

              {/* ── Content ── */}
              <div className="roomCardContent">

                <h3 className="roomCardName">{room.name}</h3>
                <p className="roomCardDescription">{room.description}</p>

                {/* Features */}
                <ul className="roomCardAmenities" aria-label={`${room.name} features`}>
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="roomCardAmenityItem">
                      <span className="roomCardAmenityDot" aria-hidden="true" />
                      {amenity}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="roomCardCta"
                  aria-label={`Inquire about ${room.name}`}
                >
                  Inquire About This Room
                  <span className="roomCardCtaArrow" aria-hidden="true">→</span>
                </a>

              </div>
            </article>
          ))}
        </div>

        {/* ── Both Rooms Note ── */}
        <div className="roomsBothNote revealFade revealFadeDelay3">
          <p className="roomsBothNoteText">
            Need more space? Book both rooms and accommodate up to <strong>30 guests</strong> — the entire resort is yours.
          </p>
          <a href="#contact" className="buttonPrimary">
            Ask About Full Resort Booking
          </a>
        </div>

      </div>
    </section>
  );
}
