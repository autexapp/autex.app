/**
 * Trial Ending Email Template
 * 
 * Sent 1 day before the trial expires.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface TrialEndingEmailProps {
  businessName: string;
  expiryDate: string;
}

export const TrialEndingEmail = ({ businessName, expiryDate }: TrialEndingEmailProps) => (
  <BaseTemplate preview="Your Autex AI trial ends tomorrow! Don't lose access.">
    <Heading style={heading}>⏰ Your Trial Ends Tomorrow!</Heading>
    
    <Text style={paragraph}>
      Hi {businessName},
    </Text>
    
    <Text style={paragraph}>
      Your Autex AI trial expires on <strong>{expiryDate}</strong>.
      After that, your bot will stop responding to customers.
    </Text>
    
    <Text style={urgentBox}>
      💡 <strong>Enjoying Autex?</strong> Continue using it by upgrading your subscription.
    </Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>Plans start at just ৳499/month:</strong>
    </Text>
    
    <Text style={planItem}>📦 <strong>Starter</strong> — ৳499/mo</Text>
    <Text style={planItem}>🚀 <strong>Pro</strong> — ৳599/mo (Founder Price!)</Text>
    <Text style={planItem}>🏢 <strong>Business</strong> — ৳1,799/mo</Text>
    
    <Button style={button} href="https://wa.me/8801977994057?text=Hi%2C%20I%20want%20to%20upgrade%20my%20Autex%20subscription.">
      💬 Message Us on WhatsApp
    </Button>
    
    <Text style={finePrint}>
      Pay via bKash to 01915969330 and send us a screenshot on WhatsApp.
    </Text>
  </BaseTemplate>
);

// Styles
const heading = {
  fontSize: '24px',
  fontWeight: '700' as const,
  color: '#18181b',
  textAlign: 'center' as const,
  margin: '0 0 24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#3f3f46',
  margin: '0 0 16px',
};

const urgentBox = {
  backgroundColor: '#fef3c7',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '16px',
  color: '#92400e',
  margin: '24px 0',
};

const hr = {
  borderColor: '#e4e4e7',
  margin: '24px 0',
};

const planItem = {
  fontSize: '15px',
  color: '#3f3f46',
  margin: '8px 0',
};

const button = {
  backgroundColor: '#22c55e',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '14px 24px',
  margin: '24px auto',
};

const finePrint = {
  fontSize: '13px',
  color: '#71717a',
  textAlign: 'center' as const,
};

export default TrialEndingEmail;
