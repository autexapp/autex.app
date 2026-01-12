/**
 * Subscription Expired Email Template
 * 
 * Sent when a paid subscription expires.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface SubscriptionExpiredEmailProps {
  businessName: string;
  planName: string;
}

export const SubscriptionExpiredEmail = ({ 
  businessName, 
  planName 
}: SubscriptionExpiredEmailProps) => (
  <BaseTemplate preview="Your Autex AI subscription has expired. Renew to reactivate.">
    <Heading style={heading}>⚠️ Subscription Expired</Heading>
    
    <Text style={paragraph}>
      Hi {businessName},
    </Text>
    
    <Text style={paragraph}>
      Your <strong>{planName}</strong> subscription has expired. 
      Your bot has stopped responding to customers.
    </Text>
    
    <Text style={warningBox}>
      🛑 <strong>Bot is offline.</strong> Customers are not receiving automated responses.
    </Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>Good news:</strong> All your data is safe and preserved. 
      Renew now to reactivate your bot instantly!
    </Text>
    
    <Text style={listItem}>✅ Products — Saved</Text>
    <Text style={listItem}>✅ Conversations — Preserved</Text>
    <Text style={listItem}>✅ Orders — Intact</Text>
    <Text style={listItem}>✅ Settings — Ready</Text>
    
    <Button style={button} href="https://wa.me/8801977994057?text=Hi%2C%20my%20subscription%20expired.%20I%20want%20to%20renew.">
      💬 Renew on WhatsApp
    </Button>
    
    <Text style={finePrint}>
      Pay via bKash to 01915969330. We'll reactivate within 30 minutes!
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
  textAlign: 'center' as const,
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

export default SubscriptionExpiredEmail;
