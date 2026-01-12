/**
 * Resend Email Client
 * 
 * Central module for email functionality using Resend API.
 * All email sending should go through this module.
 */

import { Resend } from 'resend';

// Singleton Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Default from email - use verified domain in production
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Autex AI <onboarding@resend.dev>';

// Email types for tracking/analytics
export type EmailType = 
  | 'welcome'
  | 'trial_ending'
  | 'trial_expired'
  | 'subscription_activated'
  | 'subscription_extended'
  | 'renewal_reminder'
  | 'urgent_renewal'
  | 'subscription_expired';

// Contact numbers (reuse from subscription utils)
export const CONTACT_NUMBERS = {
  whatsapp: '01977994057',
  bkash: '01915969330',
} as const;

// App URLs
export const APP_URLS = {
  dashboard: 'https://app.autexai.com/dashboard',
  whatsapp: `https://wa.me/880${CONTACT_NUMBERS.whatsapp}`,
} as const;
