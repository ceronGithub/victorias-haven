/**
 * Contact.jsx
 * Section 13 — Get In Touch.
 * Two-column layout: left = contact form with validation,
 * right = quick contact info + social media links.
 * Form slides in from left, info panel from right via revealFade.
 * Forbidden characters are silently stripped from all text inputs (Rule 18.1).
 */

import { useState } from 'react';
import { sendContactEmail } from '../lib/emailjs';
import './Contact.css';

/* ── Rule 18.1 — Forbidden character sanitizer ── */
const FORBIDDEN_CHARS = /[<>{}[\]/\\;'"=\-\-]/g;

function sanitizeInput(value) {
  return value.replace(FORBIDDEN_CHARS, '');
}

const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'reservation', label: 'Reservation' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'events', label: 'Events & Weddings' },
  { value: 'other', label: 'Other' },
];

const socialLinks = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="20" height="20">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://tiktok.com/@victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="20" height="20">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/victoriashaven',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  inquiryType: '',
  message: '',
};

export default function Contact() {
  const [formData, setFormData]     = useState(INITIAL_FORM_STATE);
  const [errors, setErrors]         = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Sanitize text inputs, leave select/email/tel as-is (browser validates) */
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const sanitizedValue = type === 'text' || type === 'textarea'
      ? sanitizeInput(value)
      : value;

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    /* Clear field error on change */
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /* Validate all required fields before submit */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim())    newErrors.fullName    = 'Please enter your full name.';
    if (!formData.email.trim())       newErrors.email       = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                      newErrors.email       = 'Please enter a valid email address.';
    if (!formData.inquiryType)        newErrors.inquiryType = 'Please select an inquiry type.';
    if (!formData.message.trim())     newErrors.message     = 'Please enter your message.';
    return newErrors;
  };

  /* Handle form submit — sends via EmailJS */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await sendContactEmail({ fromName: formData.fullName, fromEmail: formData.email, phone: formData.phone, message: formData.message });
      setIsSubmitted(true);
      setFormData(INITIAL_FORM_STATE);
    } catch {
      setErrors({ message: 'Something went wrong. Please try again or contact us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contactSection" id="contact" aria-labelledby="contactHeading">

      {/* Top decorative border */}
      <div className="contactTopAccent" aria-hidden="true" />

      <div className="contactSectionInner">

        {/* ── Left Column: Form ── */}
        <div className="contactFormColumn revealFade">

          <header className="contactColumnHeader">
            <span className="sectionEyebrow">Reach Out</span>
            <h2 className="sectionTitle" id="contactHeading">Get In Touch</h2>
            <p className="sectionSubtitle" style={{ marginTop: '0.75rem' }}>
              Our concierge team responds within two hours — day or night.
            </p>
          </header>

          {isSubmitted ? (
            /* Success state */
            <div className="contactSuccessMessage" role="status" aria-live="polite">
              <div className="contactSuccessIcon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M14 24l7 7 13-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="contactSuccessTitle">Message Received</h3>
              <p className="contactSuccessText">
                Thank you for reaching out. Our team will be in touch within two hours with a personal response.
              </p>
              <button
                className="buttonPrimary"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            /* Contact form */
            <form
              className="contactForm"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Full Name */}
              <div className={`contactField ${errors.fullName ? 'contactFieldError' : ''}`}>
                <label className="contactLabel" htmlFor="contactFullName">
                  Full Name <span className="contactRequired" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="contactFullName"
                  name="fullName"
                  className="contactInput"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={errors.fullName ? 'contactFullNameError' : undefined}
                />
                {errors.fullName && (
                  <span className="contactErrorMessage" id="contactFullNameError" role="alert">
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Email + Phone (2-col on desktop) */}
              <div className="contactFieldRow">
                <div className={`contactField ${errors.email ? 'contactFieldError' : ''}`}>
                  <label className="contactLabel" htmlFor="contactEmail">
                    Email Address <span className="contactRequired" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    className="contactInput"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={errors.email ? 'contactEmailError' : undefined}
                  />
                  {errors.email && (
                    <span className="contactErrorMessage" id="contactEmailError" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="contactField">
                  <label className="contactLabel" htmlFor="contactPhone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="phone"
                    className="contactInput"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 912 345 6789"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className={`contactField ${errors.inquiryType ? 'contactFieldError' : ''}`}>
                <label className="contactLabel" htmlFor="contactInquiryType">
                  Inquiry Type <span className="contactRequired" aria-label="required">*</span>
                </label>
                <select
                  id="contactInquiryType"
                  name="inquiryType"
                  className="contactSelect"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.inquiryType ? 'contactInquiryTypeError' : undefined}
                >
                  {inquiryTypes.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <span className="contactErrorMessage" id="contactInquiryTypeError" role="alert">
                    {errors.inquiryType}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className={`contactField ${errors.message ? 'contactFieldError' : ''}`}>
                <label className="contactLabel" htmlFor="contactMessage">
                  Message <span className="contactRequired" aria-label="required">*</span>
                </label>
                <textarea
                  id="contactMessage"
                  name="message"
                  className="contactTextarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can make your stay exceptional..."
                  rows={5}
                  aria-required="true"
                  aria-describedby={errors.message ? 'contactMessageError' : undefined}
                />
                {errors.message && (
                  <span className="contactErrorMessage" id="contactMessageError" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="buttonPrimary contactSubmitBtn"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="contactSpinner" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>

        {/* ── Right Column: Quick Info ── */}
        <aside className="contactInfoColumn revealFade revealFadeDelay2" aria-label="Contact information">

          <div className="contactInfoCard">
            <h3 className="contactInfoCardTitle">Direct Contact</h3>

            <ul className="contactInfoList" aria-label="Contact details">
              <li className="contactInfoItem">
                <div className="contactInfoItemIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="contactInfoItemDetails">
                  <span className="contactInfoItemLabel">Email</span>
                  <a href="mailto:official.victoriashaven@gmail.com" className="contactInfoItemValue">
                    official.victoriashaven@gmail.com
                  </a>
                </div>
              </li>

              <li className="contactInfoItem">
                <div className="contactInfoItemIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contactInfoItemDetails">
                  <span className="contactInfoItemLabel">Phone</span>
                  <a href="tel:+639178576858" className="contactInfoItemValue">
                    0917 857 6858
                  </a>
                  <a href="tel:+639471293981" className="contactInfoItemValue">
                    0947 129 3981
                  </a>
                </div>
              </li>

              <li className="contactInfoItem">
                <div className="contactInfoItemIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contactInfoItemDetails">
                  <span className="contactInfoItemLabel">Hours of Operation</span>
                  <span className="contactInfoItemValue">Concierge: 24 hours, 7 days</span>
                  <span className="contactInfoItemValue contactInfoItemValueMuted">Reservations: 7:00 AM – 10:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="contactSocialCard">
            <h3 className="contactInfoCardTitle">Follow Our Story</h3>
            <div className="contactSocialLinks" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  className="contactSocialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  role="listitem"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </section>
  );
}