/**
 * Quick script to encrypt a Facebook Page Access Token
 * Run: node scripts/encrypt-token.mjs
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

// Your new Facebook Page Access Token
const NEW_TOKEN = 'EAAT0ZBuekbdEBQedjZBB6ZB4lgLYxCS51GF1vE4ObnSCZChT2aUzbGfBmzJLQVhO8EnOOAKv874jR9NhZBZC0ktjitDtpv5e5PY8ahAcFfK9mthvxmaWcXvVfPMoLu1O2a6yyL5VIez28zh89zlUXmNZCMw4HshzmMyEXpiRZCovfvnTZA8C3XvuZA9CvtH9Vg';

// Your encryption key from environment
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890ab';

const getEncryptionKey = () => {
  const key = Buffer.from(ENCRYPTION_KEY);
  if (key.length < 32) {
    return Buffer.concat([key, Buffer.alloc(32 - key.length)]);
  }
  return key.slice(0, 32);
};

function encryptToken(token) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

console.log('\n========================================');
console.log('🔐 Facebook Token Encryption');
console.log('========================================\n');

const encrypted = encryptToken(NEW_TOKEN);
console.log('✅ Token encrypted successfully!\n');
console.log('📋 Copy this encrypted token:\n');
console.log(encrypted);
console.log('\n========================================');
console.log('📌 Now update Supabase:');
console.log('1. Go to Supabase → Table Editor → facebook_pages');
console.log('2. Find your page (Page ID: 802675242933269)');
console.log('3. Paste this in encrypted_access_token column');
console.log('========================================\n');
