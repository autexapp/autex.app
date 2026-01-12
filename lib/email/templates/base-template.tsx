/**
 * Base Email Template
 * 
 * Shared layout component for all Autex emails.
 * Provides consistent branding, header, and footer.
 */

import {
  Body,
  Container,
  Head,
  Html,
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
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header with Logo */}
        <Section style={header}>
          <Text style={logo}>Autex AI</Text>
        </Section>
        
        {/* Content */}
        <Section style={content}>
          {children}
        </Section>
        
        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Questions? Contact us on{' '}
            <Link href="https://wa.me/8801977994057" style={link}>
              WhatsApp
            </Link>
          </Text>
          <Text style={footerText}>
            © 2026 Autex AI. All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#fafafa',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '580px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const logo = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#18181b',
  margin: '0',
};

const content = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const footerText = {
  fontSize: '13px',
  color: '#71717a',
  margin: '8px 0',
};

const link = {
  color: '#18181b',
  textDecoration: 'underline',
};

export default BaseTemplate;
