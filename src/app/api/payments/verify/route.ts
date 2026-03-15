import crypto from 'node:crypto';
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
  const razorpayOrderId = String(body?.razorpay_order_id || '');
  const razorpayPaymentId = String(body?.razorpay_payment_id || '');
  const razorpaySignature = String(body?.razorpay_signature || '');

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return NextResponse.json({ error: 'Missing payment verification fields.' }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    return NextResponse.json({ error: 'Invalid payment signature.' }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });

  const payment = await razorpay.payments.fetch(razorpayPaymentId);

  if (!payment || payment.order_id !== razorpayOrderId || payment.status !== 'captured') {
    return NextResponse.json({ error: 'Payment is not captured.' }, { status: 400 });
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      userId: session.userId,
      razorpayOrderId,
    },
  });

  if (!enrollment) {
    return NextResponse.json({ error: 'Order not found for current user.' }, { status: 404 });
  }

  await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: {
      razorpayPaymentId,
    },
  });

  return NextResponse.json({ success: true, message: 'Course purchased successfully.' });
}
