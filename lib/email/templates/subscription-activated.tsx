/**
 * Subscription Activated Email Template
 * 
 * Sent when admin activates a user's subscription after payment.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
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
    <Heading style={heading}>🎉 Subscription Activated!</Heading>
    
    <Text style={paragraph}>
      Hi {businessName},
    </Text>
    
    <Text style={paragraph}>
      Great news! Your <strong>{planName}</strong> subscription has been activated.
      Your bot is now live and ready to serve your customers!
    </Text>
    
    <Text style={successBox}>
      ✅ <strong>Active until:</strong> {expiryDate} ({daysRemaining} days)
    </Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>What's included:</strong>
    </Text>
    
    <Text style={listItem}>🤖 AI-powered customer responses</Text>
    <Text style={listItem}>🛒 Automated order collection</Text>
    <Text style={listItem}>📸 Image recognition for products</Text>
    <Text style={listItem}>📊 Analytics & insights</Text>
    
    <Button style={button} href="https://app.autexai.com/dashboard">
      Go to Dashboard →
    </Button>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      Thank you for choosing Autex AI! We're here to help your business grow. 🚀
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

const successBox = {
  backgroundColor: '#dcfce7',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '16px',
  color: '#166534',
  textAlign: 'center' as const,
  margin: '24px 0',
  border: '1px solid #bbf7d0',
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

export default SubscriptionActivatedEmail;
