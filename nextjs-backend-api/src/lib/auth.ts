import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'session_token';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
  name: string;
}

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('Missing JWT_SECRET environment variable.');
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    return {
      userId: String(payload.userId),
      email: String(payload.email),
      name: String(payload.name),
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}
