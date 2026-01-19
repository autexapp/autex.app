/**
 * Subscription Activated Email Template
 * 
 * Sent when admin activates a user's subscription after payment.
 * Design matches Autex Dashboard aesthetic.
 */

import { Button, Heading, Text, Hr, Section } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface SubscriptionActivatedEmailProps {
  businessName: string;
  planName: string;
  expiryDate: string;
  daysRemaining: number;
}

export const SubscriptionActivatedEmail = ({ 
  businessName, 
  planName, 
  expiryDate,
  daysRemaining 
}: SubscriptionActivatedEmailProps) => (
  <BaseTemplate preview={`Your ${planName} subscription is now active!`}>
    {/* Header Badge */}
    <Section style={badgeContainer}>
      <Text style={badge}>🎉 Activated</Text>
    </Section>
    
    <Heading style={heading}>Subscription Activated!</Heading>
    
    <Text style={paragraph}>
      Hi <strong>{businessName}</strong>,
    </Text>
    
    <Text style={paragraph}>
      Great news! Your <strong>{planName}</strong> subscription has been activated.
      Your bot is now live and ready to serve your customers!
    </Text>
    
    {/* Success Box */}
    <Section style={successBox}>
      <Text style={successBoxText}>
        ✅ <strong>Active until:</strong> {expiryDate} ({daysRemaining} days)
      </Text>
    </Section>
    
    <Hr style={divider} />
    
    <Text style={sectionTitle}>What's Included:</Text>
    
    <Section style={checklistContainer}>
      <Text style={checklistItem}>🤖 AI-powered customer responses</Text>
      <Text style={checklistItem}>🛒 Automated order collection</Text>
      <Text style={checklistItem}>📸 Image recognition for products</Text>
      <Text style={checklistItem}>📊 Analytics & insights</Text>
    </Section>
    
    <Section style={buttonContainer}>
      <Button style={primaryButton} href="https://app.autexai.com/dashboard">
        Go to Dashboard →
      </Button>
    </Section>
    
    <Hr style={divider} />
    
    <Text style={thankYouText}>
      Thank you for choosing Autex AI! 🚀
      <br />We're here to help your business grow.
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
  backgroundColor: '#dcfce7', // green-100
  color: '#166534', // green-800
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

const successBox = {
  backgroundColor: '#dcfce7', // green-100
  padding: '16px 20px',
  borderRadius: '12px',
  margin: '24px 0',
  border: '1px solid #bbf7d0', // green-200
};

const successBoxText = {
  fontSize: '15px',
  color: '#166534', // green-800
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

const thankYouText = {
  fontSize: '14px',
  color: '#71717a', // zinc-500
  textAlign: 'center' as const,
  margin: '0',
  lineHeight: '1.6',
};

export default SubscriptionActivatedEmail;
