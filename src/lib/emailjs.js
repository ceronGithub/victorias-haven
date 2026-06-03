/**
 * emailjs.js
 * EmailJS helper — sends contact form submissions as emails.
 * Uses the EmailJS browser SDK with credentials from environment variables.
 * Call sendContactEmail() from the Contact form submit handler.
 */

import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * sendContactEmail — sends form data via EmailJS
 * @param {{ fullName: string, email: string, phone: string, inquiryType: string, message: string }} formData
 * @returns {Promise<void>}
 */
export async function sendContactEmail(formData) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name:    formData.fullName,
      from_email:   formData.email,
      phone:        formData.phone,
      inquiry_type: formData.inquiryType,
      message:      formData.message,
    },
    EMAILJS_PUBLIC_KEY
  );
}
