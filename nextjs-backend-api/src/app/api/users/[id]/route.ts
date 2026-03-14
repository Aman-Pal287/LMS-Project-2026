import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'This endpoint is no longer used. Use /api/courses/:id instead.' },
    { status: 410 }
  );
}
