const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const courses = [
  {
    title: 'Next.js for Beginners',
    slug: 'nextjs-for-beginners',
    description: 'Learn routing, layouts, APIs, and deployment with Next.js.',
    price: 1999,
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'TypeScript Masterclass',
    slug: 'typescript-masterclass',
    description: 'Write safer applications with advanced TypeScript patterns.',
    price: 2499,
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'PostgreSQL Essentials',
    slug: 'postgresql-essentials',
    description: 'Design schemas, write fast SQL, and work with relational data.',
    price: 1499,
    imageUrl:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Backend APIs with Prisma',
    slug: 'backend-apis-with-prisma',
    description: 'Build production-ready APIs using Prisma and Next.js route handlers.',
    price: 2199,
    imageUrl:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
  },
];

const courseVideosBySlug = {
  'nextjs-for-beginners': [
    { title: 'Course Intro', imagekitPath: '/sample-videos/nextjs-intro.mp4', order: 1 },
    { title: 'App Router Basics', imagekitPath: '/sample-videos/nextjs-routing.mp4', order: 2 },
  ],
  'typescript-masterclass': [
    { title: 'TypeScript Setup', imagekitPath: '/sample-videos/ts-setup.mp4', order: 1 },
    { title: 'Types and Interfaces', imagekitPath: '/sample-videos/ts-interfaces.mp4', order: 2 },
  ],
  'postgresql-essentials': [
    { title: 'Database Fundamentals', imagekitPath: '/sample-videos/pg-basics.mp4', order: 1 },
    { title: 'Indexes and Performance', imagekitPath: '/sample-videos/pg-indexes.mp4', order: 2 },
  ],
  'backend-apis-with-prisma': [
    { title: 'Prisma Setup', imagekitPath: '/sample-videos/prisma-setup.mp4', order: 1 },
    { title: 'Relations and Queries', imagekitPath: '/sample-videos/prisma-relations.mp4', order: 2 },
  ],
};

async function main() {
  for (const course of courses) {
    const upsertedCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });

    const videos = courseVideosBySlug[course.slug] || [];

    await prisma.courseVideo.deleteMany({
      where: { courseId: upsertedCourse.id },
    });

    if (videos.length > 0) {
      await prisma.courseVideo.createMany({
        data: videos.map((video) => ({
          courseId: upsertedCourse.id,
          title: video.title,
          imagekitPath: video.imagekitPath,
          order: video.order,
        })),
      });
    }
  }

  console.log('Seeded courses:', courses.length);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
