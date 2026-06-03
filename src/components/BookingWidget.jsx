/**
 * BookingWidget.jsx
 * Floating booking form below the hero section.
 * Fields: check-in date, check-out date, guests (stepper), room type (dropdown).
 * Slides up from bottom with a fade-in entrance animation.
 * Sanitizes all text inputs by stripping forbidden characters.
 */

import { useState } from 'react';
import './BookingWidget.css';

/* Forbidden characters per Rule 18 */
const FORBIDDEN = /[<>{}[\]/\\;'"` =\-\-]/g;

/**
 * sanitizeInput — strips forbidden characters from user text
 * @param {string} value
 * @returns {string}
 */
function sanitizeInput(value) {
  return value.replace(FORBIDDEN, '');
}

const roomTypes = [
  'Any Room Type',
  'Oceanfront Suite',
  'Garden Villa',
  'Beach Cottage',
  'Presidential Suite',
  'Deluxe Double Room',
];

export default function BookingWidget() {
  const [formData, setFormData] = useState({
    checkIn:   '',
    checkOut:  '',
    guests:    1,
    roomType:  'Any Room Type',
  });

  /* Update a single field in form state */
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* Guest stepper — increment/decrement within 1–20 */
  const adjustGuests = (delta) => {
    setFormData((prev) => ({
      ...prev,
      guests: Math.min(20, Math.max(1, prev.guests + delta)),
    }));
  };

  /* Form submit handler — availability check placeholder */
  const handleCheckAvailability = (e) => {
    e.preventDefault();
    console.log('Availability check:', formData);
    /* TODO: wire to real availability API */
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
            <label className="bookingLabel" htmlFor="guestCount">Guests</label>
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
                disabled={formData.guests >= 20}
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

          {/* Submit */}
          <button type="submit" className="buttonPrimary bookingWidgetSubmit">
            Check Availability
          </button>

        </form>

      </div>
    </section>
  );
}
