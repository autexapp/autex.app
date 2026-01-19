/**
 * Subscription Expired Email Template
 * 
 * Sent when a paid subscription expires.
 * Design matches Autex Dashboard aesthetic.
 */

import { Button, Heading, Text, Hr, Section } from '@react-email/components';
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
    {/* Header Badge */}
    <Section style={badgeContainer}>
      <Text style={badge}>⚠️ Expired</Text>
    </Section>
    
    <Heading style={heading}>Subscription Expired</Heading>
    
    <Text style={paragraph}>
      Hi <strong>{businessName}</strong>,
    </Text>
    
    <Text style={paragraph}>
      Your <strong>{planName}</strong> subscription has expired. 
      Your bot has stopped responding to customers.
    </Text>
    
    {/* Warning Box */}
    <Section style={warningBox}>
      <Text style={warningBoxText}>
        🛑 <strong>Bot is offline.</strong> Customers are not receiving automated responses.
      </Text>
    </Section>
    
    <Hr style={divider} />
    
    <Text style={sectionTitle}>Good News — Your Data is Safe:</Text>
    
    <Section style={checklistContainer}>
      <Text style={checklistItem}>✅ Products — Saved</Text>
      <Text style={checklistItem}>✅ Conversations — Preserved</Text>
      <Text style={checklistItem}>✅ Orders — Intact</Text>
      <Text style={checklistItem}>✅ Settings — Ready</Text>
    </Section>
    
    <Text style={paragraph}>
      Renew now to reactivate your bot instantly!
    </Text>
    
    <Section style={buttonContainer}>
      <Button style={primaryButton} href="https://wa.me/8801977994057?text=Hi%2C%20my%20subscription%20expired.%20I%20want%20to%20renew.">
        💬 Renew on WhatsApp
      </Button>
    </Section>
    
    <Text style={helpText}>
      Pay via bKash to <strong>01915969330</strong>. We'll reactivate within 30 minutes!
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
  backgroundColor: '#fef2f2', // red-50
  color: '#dc2626', // red-600
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

const warningBox = {
  backgroundColor: '#fef2f2', // red-50
  padding: '16px 20px',
  borderRadius: '12px',
  margin: '24px 0',
  border: '1px solid #fecaca', // red-200
};

const warningBoxText = {
  fontSize: '15px',
  color: '#dc2626', // red-600
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
  backgroundColor: '#18181b', // zinc-900
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

export default SubscriptionExpiredEmail;
