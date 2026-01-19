/**
 * Admin Notification - Subscription Activated
 * 
 * Sent to admin when a subscription is activated (payment received).
 */

import { Heading, Text, Hr, Section } from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './base-template';

interface AdminSubscriptionEmailProps {
  businessName: string;
  userEmail: string;
  planName: string;
  amount: number;
  paymentMethod: string;
  durationDays: number;
  expiresAt: string;
  transactionId?: string;
  isRenewal: boolean;
}

export const AdminSubscriptionEmail = ({ 
  businessName,
  userEmail,
  planName,
  amount,
  paymentMethod,
  durationDays,
  expiresAt,
  transactionId,
  isRenewal,
}: AdminSubscriptionEmailProps) => (
  <BaseTemplate preview={`💰 ${isRenewal ? 'Renewal' : 'New Sale'}: ${businessName} - ৳${amount}`}>
    {/* Header Badge */}
    <Section style={badgeContainer}>
      <Text style={badge}>{isRenewal ? '🔄 Renewal' : '💰 New Sale'}</Text>
    </Section>
    
    <Heading style={heading}>
      {isRenewal ? 'Subscription Renewed!' : 'New Subscription!'}
    </Heading>
    
    <Text style={paragraph}>
      Great news! {businessName} just {isRenewal ? 'renewed their' : 'purchased a'} subscription.
    </Text>
    
    {/* Revenue Highlight */}
    <Section style={revenueBox}>
      <Text style={revenueLabel}>Revenue</Text>
      <Text style={revenueAmount}>৳{amount.toLocaleString()}</Text>
    </Section>
    
    {/* Subscription Details */}
    <Section style={detailsBox}>
      <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
        <tr>
          <td style={detailLabel}>Business</td>
          <td style={detailValue}>{businessName}</td>
        </tr>
        <tr>
          <td style={detailLabel}>Email</td>
          <td style={detailValue}>{userEmail}</td>
        </tr>
        <tr>
          <td style={detailLabel}>Plan</td>
          <td style={detailValue}>{planName}</td>
        </tr>
        <tr>
          <td style={detailLabel}>Duration</td>
          <td style={detailValue}>{durationDays} days</td>
        </tr>
        <tr>
          <td style={detailLabel}>Expires</td>
          <td style={detailValue}>{expiresAt}</td>
        </tr>
        <tr>
          <td style={detailLabel}>Payment</td>
          <td style={detailValue}>{paymentMethod}</td>
        </tr>
        {transactionId && (
          <tr>
            <td style={detailLabel}>TXN ID</td>
            <td style={detailValue}>{transactionId}</td>
          </tr>
        )}
      </table>
    </Section>
    
    <Hr style={divider} />
    
    <Text style={helpText}>
      Keep up the great work! 🎉
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
  textAlign: 'center' as const,
};

const revenueBox = {
  backgroundColor: '#18181b', // zinc-900
  padding: '24px',
  borderRadius: '12px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const revenueLabel = {
  fontSize: '12px',
  fontWeight: '600' as const,
  color: '#a1a1aa', // zinc-400
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  margin: '0 0 4px',
};

const revenueAmount = {
  fontSize: '36px',
  fontWeight: '700' as const,
  color: '#22c55e', // green-500
  margin: '0',
  fontFamily: 'monospace',
};

const detailsBox = {
  backgroundColor: '#f4f4f5', // zinc-100
  padding: '20px',
  borderRadius: '12px',
  margin: '24px 0',
};

const detailLabel = {
  fontSize: '13px',
  color: '#71717a', // zinc-500
  padding: '6px 0',
  width: '100px',
};

const detailValue = {
  fontSize: '14px',
  fontWeight: '600' as const,
  color: '#18181b', // zinc-900
  padding: '6px 0',
};

const divider = {
  borderColor: '#e4e4e7', // zinc-200
  margin: '28px 0',
};

const helpText = {
  fontSize: '14px',
  color: '#71717a', // zinc-500
  textAlign: 'center' as const,
  margin: '0',
};

export default AdminSubscriptionEmail;
