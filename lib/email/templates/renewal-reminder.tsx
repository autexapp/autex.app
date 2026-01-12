/**
 * Renewal Reminder Email Template
 * 
 * Sent 3 days before subscription expires.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface RenewalReminderEmailProps {
  businessName: string;
  planName: string;
  expiryDate: string;
  daysRemaining: number;
}

export const RenewalReminderEmail = ({ 
  businessName, 
  planName, 
  expiryDate,
  daysRemaining 
}: RenewalReminderEmailProps) => (
  <BaseTemplate preview={`Your ${planName} subscription expires in ${daysRemaining} days`}>
    <Heading style={heading}>📅 Subscription Renewal Reminder</Heading>
    
    <Text style={paragraph}>
      Hi {businessName},
    </Text>
    
    <Text style={paragraph}>
      Your <strong>{planName}</strong> subscription is expiring soon. 
      Renew now to keep your bot running without interruption.
    </Text>
    
    <Text style={alertBox}>
      ⏰ <strong>Expires:</strong> {expiryDate} ({daysRemaining} days left)
    </Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>Why renew?</strong>
    </Text>
    
    <Text style={listItem}>🤖 Keep your bot responding 24/7</Text>
    <Text style={listItem}>📈 Don't lose potential sales</Text>
    <Text style={listItem}>💬 Maintain customer satisfaction</Text>
    <Text style={listItem}>📊 Keep tracking your analytics</Text>
    
    <Button style={button} href="https://wa.me/8801977994057?text=Hi%2C%20I%20want%20to%20renew%20my%20Autex%20subscription.">
      💬 Renew on WhatsApp
    </Button>
    
    <Text style={finePrint}>
      Pay via bKash to 01915969330 and send screenshot on WhatsApp.
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

const alertBox = {
  backgroundColor: '#fff7ed',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '16px',
  color: '#c2410c',
  textAlign: 'center' as const,
  margin: '24px 0',
  border: '1px solid #fed7aa',
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

export default RenewalReminderEmail;
