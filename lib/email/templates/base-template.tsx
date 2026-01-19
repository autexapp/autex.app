/**
 * Base Email Template
 * 
 * Shared layout component for all Autex emails.
 * Design matches the Autex Dashboard aesthetic:
 * - Clean, modern design
 * - Deep navy/zinc colors
 * - Serif headings, sans body
 * - Subtle shadows and rounded corners
 */

import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BaseTemplateProps {
  preview: string;
  children: React.ReactNode;
}

export const BaseTemplate = ({ preview, children }: BaseTemplateProps) => (
  <Html>
    <Head>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        `}
      </style>
    </Head>
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={header}>
          <table width="100%" cellPadding="0" cellSpacing="0" role="presentation">
            <tr>
              <td align="center">
                <Text style={logo}>
                  <span style={logoIcon}>⚡</span> Autex AI
                </Text>
              </td>
            </tr>
          </table>
        </Section>
        
        {/* Content Card */}
        <Section style={contentCard}>
          {children}
        </Section>
        
        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Questions? Contact us on{' '}
            <Link href="https://wa.me/8801977994057" style={footerLink}>
              WhatsApp
            </Link>
          </Text>
          <Text style={footerDivider}>•</Text>
          <Text style={footerText}>
            <Link href="https://app.autexai.com" style={footerLink}>
              Dashboard
            </Link>
            {' '}•{' '}
            <Link href="https://autexai.com" style={footerLink}>
              Website
            </Link>
          </Text>
          <Text style={copyright}>
            © 2026 Autex AI. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// ============================================
// STYLES - Matching Dashboard Design System
// ============================================

const main = {
  backgroundColor: '#f4f4f5', // zinc-100
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const logo = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#18181b', // zinc-900
  margin: '0',
  letterSpacing: '-0.025em',
};

const logoIcon = {
  marginRight: '4px',
};

const contentCard = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '40px 32px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e4e4e7', // zinc-200
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '32px',
  paddingTop: '24px',
};

const footerText = {
  fontSize: '13px',
  color: '#71717a', // zinc-500
  margin: '4px 0',
  lineHeight: '1.5',
};

const footerLink = {
  color: '#18181b', // zinc-900
  textDecoration: 'none',
  fontWeight: '500',
};

const footerDivider = {
  fontSize: '13px',
  color: '#d4d4d8', // zinc-300
  margin: '8px 0',
};

const copyright = {
  fontSize: '12px',
  color: '#a1a1aa', // zinc-400
  marginTop: '16px',
};

export default BaseTemplate;
