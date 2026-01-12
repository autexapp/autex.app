/**
 * Trial Expired Email Template
 * 
 * Sent when the trial period ends.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface TrialExpiredEmailProps {
  businessName: string;
}

export const TrialExpiredEmail = ({ businessName }: TrialExpiredEmailProps) => (
  <BaseTemplate preview="Your Autex AI trial has expired. Renew now to keep your bot running.">
    <Heading style={heading}>😔 Your Trial Has Expired</Heading>
    
    <Text style={paragraph}>
      Hi {businessName},
    </Text>
    
    <Text style={paragraph}>
      Your Autex AI trial has ended. Your bot has stopped responding to customers.
    </Text>
    
    <Text style={warningBox}>
      ⚠️ <strong>Your customers are waiting!</strong> Reactivate now to avoid losing sales.
    </Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>Don't worry — all your data is safe:</strong>
    </Text>
    
    <Text style={listItem}>✅ Your products are saved</Text>
    <Text style={listItem}>✅ Your conversations are preserved</Text>
    <Text style={listItem}>✅ Your orders are intact</Text>
    <Text style={listItem}>✅ Just pay to reactivate instantly</Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>Ready to continue?</strong> Message us on WhatsApp and we'll activate your subscription within 30 minutes!
    </Text>
    
    <Button style={button} href="https://wa.me/8801977994057?text=Hi%2C%20my%20trial%20expired.%20I%20want%20to%20subscribe.">
      💬 Reactivate on WhatsApp
    </Button>
    
    <Text style={finePrint}>
      Plans start at ৳499/mo. Pay via bKash to 01915969330.
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

const warningBox = {
  backgroundColor: '#fef2f2',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '16px',
  color: '#dc2626',
  margin: '24px 0',
  border: '1px solid #fecaca',
};

const hr = {
  borderColor: '#e4e4e7',
  margin: '24px 0',
};

const listItem = {
  fontSize: '15px',
  color: '#3f3f46',
  margin: '8px 0',
};

const button = {
  backgroundColor: '#18181b',
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

export default TrialExpiredEmail;
