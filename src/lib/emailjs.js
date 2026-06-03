/*
 * emailjs.js
 * Initializes EmailJS with the public key from environment variables.
 * Exports sendContactEmail() — call this from the Contact form submit handler.
 * Template variables sent: from_name, from_email, phone, message.
 */

import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* Initialize EmailJS once with the public key */
emailjs.init(EMAILJS_PUBLIC_KEY);

/*
 * sendContactEmail()
 * Sends an email via EmailJS using the Contact Us template.
 * Accepts a formData object with: fromName, fromEmail, phone, message.
 * Returns a Promise — resolves on success, rejects on failure.
 */
export function sendContactEmail({ fromName, fromEmail, phone, message }) {
  const templateParams = {
    from_name: fromName,
    from_email: fromEmail,
    phone: phone,
    message: message,
  };

  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
}