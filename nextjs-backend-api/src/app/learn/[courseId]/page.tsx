import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentSession } from '@/lib/auth';
import { getImageKitVideoUrl } from '@/lib/imagekit';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface LearnPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LearnPage({ params }: LearnPageProps): Promise<React.ReactElement> {
  const session = await getCurrentSession();

  if (!session) {
    redirect('/login');
  }

  const { courseId } = await params;

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.userId,
        courseId,
      },
    },
  });

  if (!enrollment?.razorpayPaymentId) {
    return (
      <section className="detail-content">
        <h1>Access Denied</h1>
        <p className="muted">You need to purchase this course to watch videos.</p>
        <Link href={`/courses/${courseId}`} className="primary-btn">
          Go to Course Page
        </Link>
      </section>
    );
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      videos: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!course) {
    return (
      <section className="detail-content">
        <h1>Course Not Found</h1>
        <Link href="/" className="primary-btn">
          Back Home
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="hero">
        <p className="eyebrow">Course Content</p>
        <h1>{course.title}</h1>
        <p>Purchased successfully. Watch all your lessons below.</p>
      </div>

      <div className="video-list">
        {course.videos.length === 0 ? (
          <p className="muted">No videos uploaded yet for this course.</p>
        ) : (
          course.videos.map((video) => (
            <article key={video.id} className="video-card">
              <h3>
                {video.order}. {video.title}
              </h3>
              <video controls preload="metadata" className="course-video" src={getImageKitVideoUrl(video.imagekitPath)}>
                Your browser does not support video playback.
              </video>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
