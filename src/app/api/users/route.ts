import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'This endpoint is no longer used. Use /api/courses and /api/auth.' },
    { status: 410 }
  );
}

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'This endpoint is no longer used. Use /api/auth/register.' },
    { status: 410 }
  );
}
