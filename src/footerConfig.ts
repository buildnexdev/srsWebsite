/**
 * Footer contact details and Formspree.
 * Replace placeholders with your real values when you have them.
 * Formspree: sign up at https://formspree.io/, create a form, then use the form ID from the action URL.
 */
export const FOOTER_CONFIG = {
  /** Replace with your Formspree form ID (from https://formspree.io/ → Your form → form action) */
  formspreeFormId: 'YOUR_FORM_ID',

  address: {
    line1: 'Your address line 1',
    line2: 'Your city, state – PIN',
  },

  phone: ['+918825530267'],

  email: 'smartresearchsolution2026@gmail.com',

  /** WhatsApp number for floating button (no + or spaces in link) */
  whatsappNumber: '918825530267',

  workingHours: 'Mon – Fri: 9:00 AM – 6:00 PM',

  /** Google Maps embed URL (iframe src) or null to hide map. Get from Google Maps → Share → Embed map */
  mapEmbedUrl: null as string | null,
  /** "Open in Maps" link (Google Maps URL) */
  mapsLink: 'https://www.google.com/maps',

  socialLinks: [
    { name: 'Facebook', url: 'https://facebook.com/', icon: 'facebook' },
    { name: 'Twitter', url: 'https://twitter.com/', icon: 'twitter' },
    { name: 'Instagram', url: 'https://instagram.com/', icon: 'instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
  ],

  buildNexUrl: 'https://buildnexdev.co.in/',
}
