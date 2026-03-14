import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await getCurrentSession();

  if (!session) {
    return NextResponse.json({ error: 'Please login first.' }, { status: 401 });
  }

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!razorpayKeyId || !razorpayKeySecret) {
    return NextResponse.json(
      { error: 'Razorpay is not configured in environment variables.' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const courseId = String(body?.courseId || '');

  if (!courseId) {
    return NextResponse.json({ error: 'Course id is required.' }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });

  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });

  const order = await razorpay.orders.create({
    amount: course.price * 100,
    currency: 'INR',
    receipt: `receipt_${session.userId.slice(0, 10)}_${Date.now()}`,
    notes: {
      courseId: course.id,
      userId: session.userId,
    },
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: razorpayKeyId,
    course: {
      id: course.id,
      title: course.title,
      price: course.price,
    },
    user: {
      name: session.name,
      email: session.email,
    },
  });
}
