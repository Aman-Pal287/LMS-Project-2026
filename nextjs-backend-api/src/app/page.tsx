import CourseCard from '@/components/CourseCard';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HomePage(): Promise<React.ReactElement> {
  let courses: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
  }> = [];
  let dbError = '';

  try {
    courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
      },
    });
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
