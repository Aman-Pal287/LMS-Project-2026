import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';

export async function GET(): Promise<NextResponse> {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: session.userId,
      name: session.name,
      email: session.email,
    },
  });
}
