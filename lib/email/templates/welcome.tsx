/**
 * Welcome Email Template
 * 
 * Sent when a new user signs up and their trial starts.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface WelcomeEmailProps {
  businessName: string;
  trialEndDate: string;
}

export const WelcomeEmail = ({ businessName, trialEndDate }: WelcomeEmailProps) => (
  <BaseTemplate preview="Welcome to Autex AI! Your 3-day free trial has started.">
    <Heading style={heading}>🎉 Welcome to Autex AI!</Heading>
    
    <Text style={paragraph}>
      Hi {businessName},
    </Text>
    
    <Text style={paragraph}>
      Your <strong>3-day free trial</strong> has started! We're excited to help
      you automate your F-commerce business.
    </Text>
    
    <Text style={highlight}>
      ⏰ Trial ends: <strong>{trialEndDate}</strong>
    </Text>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>What you can do now:</strong>
    </Text>
    
    <Text style={listItem}>✅ Connect your Facebook Page</Text>
    <Text style={listItem}>✅ Add your products</Text>
    <Text style={listItem}>✅ Let the AI bot handle customer inquiries</Text>
    <Text style={listItem}>✅ Collect orders automatically</Text>
    
    <Button style={button} href="https://app.autexai.com/dashboard">
      Go to Dashboard →
    </Button>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      Questions? Just reply to this email or contact us on WhatsApp: 
      <strong> 01977994057</strong>
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

const highlight = {
  backgroundColor: '#fef3c7',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '16px',
  color: '#92400e',
  textAlign: 'center' as const,
  margin: '24px 0',
};

const hr = {
  borderColor: '#e4e4e7',
  margin: '24px 0',
};

const listItem = {
  fontSize: '15px',
  color: '#3f3f46',
  margin: '8px 0',
  paddingLeft: '8px',
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

export default WelcomeEmail;
