import bcrypt from 'bcryptjs';
import cfg from '../cfg.js';

// 1. Hash password
export async function hashPassword(password, saltRounds = cfg.saltRounds) {
  saltRounds = Number(saltRounds)

  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a non-empty string');
    }

    const salt = await bcrypt.genSalt(saltRounds);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  } catch (error) {
    throw new Error(`Password hashing failed: ${error.message}`);
  }
}

// 2. Compare password with hash
export async function comparePassword(password, hashedPassword) {
  try {
    if (!password || !hashedPassword) {
      throw new Error('Both password and hash are required');
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    return false
  }
}