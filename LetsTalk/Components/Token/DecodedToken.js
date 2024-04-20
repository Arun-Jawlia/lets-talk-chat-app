import { Buffer } from 'buffer';

export const decodeToken = (token) => {
  try {
    // Split the token into header, payload, and signature
    const parts = token.split('.');
    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8'));
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
    const signature = parts[2];

    return { header, payload, signature };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};