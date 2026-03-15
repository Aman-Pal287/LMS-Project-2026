import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyButton from '@/components/BuyButton';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: CoursePageProps): Promise<React.ReactElement> {
  const { id } = await params;

  const [course, session] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    getCurrentSession(),
  ]);

  if (!course) {
    notFound();
  }

  const enrollment = session
    ? await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.userId,
            courseId: course.id,
          },
        },
      })
    : null;

  const isPurchased = Boolean(enrollment?.razorpayPaymentId);

  return (
    <section className="course-detail">
      <Image
        src={course.imageUrl}
        alt={course.title}
        className="detail-image"
        width={1200}
        height={800}
      />
      <div className="detail-content">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <h3>Price: INR {course.price}</h3>
        <BuyButton
          courseId={course.id}
          courseTitle={course.title}
          isLoggedIn={Boolean(session)}
          isPurchased={isPurchased}
        />
        {isPurchased && (
          <>
            <p className="success-text">This course is already in your purchased list.</p>
            <Link href={`/learn/${course.id}`} className="secondary-btn">
              Go to Course Content
            </Link>
          </>
        )}
        {!session && <p className="muted">Login is required before checkout.</p>}
      </div>
    </section>
  );
}
