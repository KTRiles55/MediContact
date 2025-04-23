import crypto from 'crypto';
export function hashPassword(password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash;
}