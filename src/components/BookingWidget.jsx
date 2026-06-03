/**
 * BookingWidget.jsx
 * Floating booking widget below the hero section.
 * Fields: check-in date, check-out date, guests (stepper), room type (dropdown).
 * Guest max is 15 per room, 30 for both rooms.
 * Room types reflect the actual 2 rooms at Victoria's Haven.
 * Sanitizes all text inputs by stripping forbidden characters (Rule 18.1).
 */

import { useState } from 'react';
import './BookingWidget.css';

/* Forbidden characters per Rule 18 */
const FORBIDDEN = /[<>{}[\]/\\;'"=\-\-]/g;

/**
 * sanitizeInput — strips forbidden characters from user text
 * @param {string} value
 * @returns {string}
 */
function sanitizeInput(value) {
  return value.replace(FORBIDDEN, '');
}

const roomTypes = [
  'Select a Room',
  'Ground Floor Room',
  'Upper Floor Room',
  'Both Rooms (Full Resort)',
];

/* Returns the max guests allowed based on room type selected */
function getMaxGuests(roomType) {
  if (roomType === 'Both Rooms (Full Resort)') return 30;
  return 15;
}

export default function BookingWidget() {
  const [formData, setFormData] = useState({
    checkIn:   '',
    checkOut:  '',
    guests:    1,
    roomType:  'Select a Room',
  });

  const maxGuests = getMaxGuests(formData.roomType);

  /* Update a single field in form state */
  const updateField = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      /* If room type changed, clamp guest count to new max */
      if (field === 'roomType') {
        const newMax = getMaxGuests(value);
        updated.guests = Math.min(prev.guests, newMax);
      }
      return updated;
    });
  };

  /* Guest stepper — increment/decrement within 1–max */
  const adjustGuests = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(maxGuests, Math.max(1, prev.guests + delta)),
    }));
  };

  /* Form submit — redirect to contact section for inquiry */
  const handleCheckAvailability = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bookingWidget" id="booking" aria-label="Book your stay">

      <div className="bookingWidgetInner">

        <p className="bookingWidgetTitle">
          <span className="bookingWidgetTitleIcon" aria-hidden="true">◆</span>
          Reserve Your Stay
        </p>

        <form
          className="bookingWidgetForm"
          onSubmit={handleCheckAvailability}
          noValidate
        >

          {/* Check-in */}
          <div className="bookingField">
            <label className="bookingLabel" htmlFor="checkInDate">Check-in</label>
            <input
              id="checkInDate"
              type="date"
              className="bookingInput"
              value={formData.checkIn}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => updateField('checkIn', e.target.value)}
              required
              aria-required="true"
            />
          </div>

          {/* Check-out */}
          <div className="bookingField">
            <label className="bookingLabel" htmlFor="checkOutDate">Check-out</label>
            <input
              id="checkOutDate"
              type="date"
              className="bookingInput"
              value={formData.checkOut}
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              onChange={(e) => updateField('checkOut', e.target.value)}
              required
              aria-required="true"
            />
          </div>

          {/* Guests stepper */}
          <div className="bookingField">
            <label className="bookingLabel" htmlFor="guestCount">
              Guests <span className="bookingGuestMax">(max {maxGuests})</span>
            </label>
            <div className="bookingGuestStepper">
              <button
                type="button"
                className="stepperBtn"
                onClick={() => adjustGuests(-1)}
                aria-label="Decrease guests"
                disabled={formData.guests <= 1}
              >−</button>
              <output
                id="guestCount"
                className="stepperValue"
                aria-live="polite"
              >
                {formData.guests}
              </output>
              <button
                type="button"
                className="stepperBtn"
                onClick={() => adjustGuests(1)}
                aria-label="Increase guests"
                disabled={formData.guests >= maxGuests}
              >+</button>
            </div>
          </div>

          {/* Room type */}
          <div className="bookingField">
            <label className="bookingLabel" htmlFor="roomTypeSelect">Room Type</label>
            <select
              id="roomTypeSelect"
              className="bookingSelect"
              value={formData.roomType}
              onChange={(e) => updateField('roomType', e.target.value)}
            >
              {roomTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Submit — scrolls to contact */}
          <button type="submit" className="buttonPrimary bookingWidgetSubmit">
            Check Availability
          </button>

        </form>

      </div>
    </section>
  );
}