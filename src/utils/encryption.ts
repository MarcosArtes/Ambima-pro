import crypto from 'crypto';

export function encryptData(plaintext: string, key?: string): string {
  try {
    const encryptionKey = key || process.env.REACT_APP_ENCRYPTION_KEY!;
    const iv = crypto.randomBytes(16);
    const derivedKey = crypto.pbkdf2Sync(encryptionKey, Buffer.alloc(0), 100000, 32, 'sha256');
    const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    
    return iv.toString('hex') + authTag.toString('hex') + encrypted;
  } catch (error) {
    throw new Error('Failed to encrypt data');
  }
}

export function decryptData(ciphertext: string, key?: string): string {
  try {
    const encryptionKey = key || process.env.REACT_APP_ENCRYPTION_KEY!;
    const iv = Buffer.from(ciphertext.slice(0, 32), 'hex');
    const authTag = Buffer.from(ciphertext.slice(32, 64), 'hex');
    const encrypted = ciphertext.slice(64);
    const derivedKey = crypto.pbkdf2Sync(encryptionKey, Buffer.alloc(0), 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new Error('Failed to decrypt data');
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const iterations = 100000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
  return iterations + '$' + salt.toString('hex') + '$' + hash.toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  try {
    const [iterations, salt, key] = hash.split('$');
    const hashBuffer = Buffer.from(key, 'hex');
    const computedHash = crypto.pbkdf2Sync(
      password,
      Buffer.from(salt, 'hex'),
      parseInt(iterations, 10),
      64,
      'sha512'
    );
    return crypto.timingSafeEqual(hashBuffer, computedHash);
  } catch {
    return false;
  }
}

export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}
