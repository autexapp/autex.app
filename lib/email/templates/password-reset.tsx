/**
 * Password Reset Email Template
 * 
 * Sent when user requests a password reset.
 */

import { Button, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface PasswordResetEmailProps {
  resetLink: string;
}

export const PasswordResetEmail = ({ resetLink }: PasswordResetEmailProps) => (
  <BaseTemplate preview="Reset your Autex AI password">
    <Heading style={heading}>🔐 Reset Your Password</Heading>
    
    <Text style={paragraph}>
      Hi there,
    </Text>
    
    <Text style={paragraph}>
      We received a request to reset your Autex AI password. 
      Click the button below to set a new password.
    </Text>
    
    <Button style={button} href={resetLink}>
      Reset Password
    </Button>
    
    <Hr style={hr} />
    
    <Text style={paragraph}>
      <strong>Didn't request this?</strong>
    </Text>
    
    <Text style={paragraph}>
      If you didn't request a password reset, you can safely ignore this email.
      Your password won't be changed.
    </Text>
    
    <Text style={finePrint}>
      This link expires in 1 hour for security reasons.
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

const hr = {
  borderColor: '#e4e4e7',
  margin: '24px 0',
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
  fontStyle: 'italic' as const,
};

export default PasswordResetEmail;
