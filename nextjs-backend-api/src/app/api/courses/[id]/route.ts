import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, context: RouteContext): Promise<NextResponse> {
  const { id } = await context.params;

  const course = await prisma.course.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      imageUrl: true,
      slug: true,
    },
  });

  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  return NextResponse.json({ course });
}
