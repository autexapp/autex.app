/**
 * Quick script to encrypt a Facebook Page Access Token
 * Run: npx tsx scripts/encrypt-token.ts
 */

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

// Your new Facebook Page Access Token
const NEW_TOKEN = 'EAAT0ZBuekbdEBQYfI5WaSfgrjyVs3rOenuVNR3uzhQEZCFOtUh41ZB9oPlL8v8M12yKyyKBOMZA6WljsBDd6pLvte6vCOtmSFehuvEkZCYvuhCFkJvvlmnvhCRDkQPghEmIZBVyDzBCvRE5BZADAtOzTJVrcKXfnqm1fPvSMu7Mi1YZC5iodnlaOKYZALFQjIJXtQwRFZBjZBDQSNcaDu2MrqozXXZB4PXvaJJZBkTsVJS9owjAL6';

// Get encryption key from environment
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

const getEncryptionKey = (): Buffer => {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is not set. Run with: ENCRYPTION_KEY=your_key npx tsx scripts/encrypt-token.ts');
  }
  
  const key = Buffer.from(ENCRYPTION_KEY);
  if (key.length < 32) {
    return Buffer.concat([key, Buffer.alloc(32 - key.length)]);
  }
  return key.slice(0, 32);
};

function encryptToken(token: string): string {
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

try {
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
} catch (error) {
  console.error('❌ Error:', error);
}
