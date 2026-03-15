import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(): Promise<NextResponse> {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      imageUrl: true,
      slug: true,
    },
  });

  return NextResponse.json({ courses });
}
