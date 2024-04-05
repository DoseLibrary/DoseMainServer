import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  username: string;
}

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends jwt.JwtPayload, JwtPayload { }
}

export const generateSalt = (length: number = 16): string => {
  return crypto.randomBytes(length).toString('hex');
}

export const hashText = (text: string, salt: string): string => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(text);
  return hash.digest('hex');
};

const devSecret = 'dev-secret';
const getSecret = (): string => process.env['SECRET'] || devSecret;

export const signJwt = (payload: object, expiresIn: string): string => {
  return jwt.sign(payload, getSecret(), { expiresIn });
}

export const signUserJwt = (payload: JwtPayload): string => {
  return signJwt(payload, '1h');
}
