import CourseCard from '@/components/CourseCard';
import Link from 'next/link';
import { getCurrentSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HomePage(): Promise<React.ReactElement> {
  const session = await getCurrentSession();

  let courses: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  }> = [];
  let purchasedCourses: Array<{
    id: string;
    title: string;
  }> = [];
  let dbError = '';

  try {
    const [allCourses, enrollments] = await Promise.all([
      prisma.course.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          imageUrl: true,
        },
      }),
      session
        ? prisma.enrollment.findMany({
            where: {
              userId: session.userId,
              razorpayPaymentId: { not: null },
            },
            select: {
              course: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          })
        : Promise.resolve([]),
    ]);

    courses = allCourses;
    purchasedCourses = enrollments.map((item) => item.course);
  } catch {
    dbError =
      'Database not ready. Create the PostgreSQL database and run Prisma migration + seed.';
  }

  return (
    <section>
      <div className="hero">
        <p className="eyebrow">Assignment Project</p>
        <h1>LearnHub Courses</h1>
        <p>Pick a course and open details to buy it using Razorpay checkout.</p>
      </div>

      {session && (
        <section className="purchased-box">
          <h2>Purchased Courses</h2>
          {purchasedCourses.length === 0 ? (
            <p className="muted">No purchased courses yet.</p>
          ) : (
            <ul className="purchased-list">
              {purchasedCourses.map((course) => (
                <li key={course.id}>
                  <Link href={`/learn/${course.id}`}>{course.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {dbError ? (
        <p className="error-text">{dbError}</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              price={course.price}
              imageUrl={course.imageUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
}
