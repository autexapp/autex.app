/**
 * Renewal Reminder Email Template
 * 
 * Sent 3 days before subscription expires.
 * Design matches Autex Dashboard aesthetic.
 */

import { Button, Heading, Text, Hr, Section } from '@react-email/components';
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
    {/* Header Badge */}
    <Section style={badgeContainer}>
      <Text style={badge}>📅 Reminder</Text>
    </Section>
    
    <Heading style={heading}>Subscription Renewal Reminder</Heading>
    
    <Text style={paragraph}>
      Hi <strong>{businessName}</strong>,
    </Text>
    
    <Text style={paragraph}>
      Your <strong>{planName}</strong> subscription is expiring soon. 
      Renew now to keep your bot running without interruption.
    </Text>
    
    {/* Alert Box */}
    <Section style={alertBox}>
      <Text style={alertBoxText}>
        ⏰ <strong>Expires:</strong> {expiryDate} ({daysRemaining} days left)
      </Text>
    </Section>
    
    <Hr style={divider} />
    
    <Text style={sectionTitle}>Why Renew?</Text>
    
    <Section style={checklistContainer}>
      <Text style={checklistItem}>🤖 Keep your bot responding 24/7</Text>
      <Text style={checklistItem}>📈 Don't lose potential sales</Text>
      <Text style={checklistItem}>💬 Maintain customer satisfaction</Text>
      <Text style={checklistItem}>📊 Keep tracking your analytics</Text>
    </Section>
    
    <Section style={buttonContainer}>
      <Button style={primaryButton} href="https://wa.me/8801977994057?text=Hi%2C%20I%20want%20to%20renew%20my%20Autex%20subscription.">
        💬 Renew on WhatsApp
      </Button>
    </Section>
    
    <Text style={helpText}>
      Pay via bKash to <strong>01915969330</strong> and send screenshot on WhatsApp.
    </Text>
  </BaseTemplate>
);

// ============================================
// STYLES
// ============================================

const badgeContainer = {
  textAlign: 'center' as const,
  marginBottom: '16px',
};

const badge = {
  display: 'inline-block',
  backgroundColor: '#fff7ed', // orange-50
  color: '#c2410c', // orange-700
  padding: '6px 16px',
  borderRadius: '9999px',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0',
};

const heading = {
  fontSize: '28px',
  fontWeight: '700' as const,
  color: '#18181b', // zinc-900
  textAlign: 'center' as const,
  margin: '0 0 24px',
  lineHeight: '1.3',
  letterSpacing: '-0.025em',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#3f3f46', // zinc-700
  margin: '0 0 16px',
};

const alertBox = {
  backgroundColor: '#fff7ed', // orange-50
  padding: '16px 20px',
  borderRadius: '12px',
  margin: '24px 0',
  border: '1px solid #fed7aa', // orange-200
};

const alertBoxText = {
  fontSize: '15px',
  color: '#c2410c', // orange-700
  margin: '0',
  textAlign: 'center' as const,
};

const divider = {
  borderColor: '#e4e4e7', // zinc-200
  margin: '28px 0',
};

const sectionTitle = {
  fontSize: '14px',
  fontWeight: '600' as const,
  color: '#71717a', // zinc-500
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 16px',
};

const checklistContainer = {
  margin: '0 0 24px',
};

const checklistItem = {
  fontSize: '15px',
  color: '#3f3f46', // zinc-700
  margin: '8px 0',
  paddingLeft: '4px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '28px 0 16px',
};

const primaryButton = {
  backgroundColor: '#22c55e', // green-500
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
};

const helpText = {
  fontSize: '13px',
  color: '#71717a', // zinc-500
  textAlign: 'center' as const,
  margin: '0',
};

export default RenewalReminderEmail;
