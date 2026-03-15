# LearnHub (Assignment Project)

Mini full-stack learning platform built with Next.js App Router + PostgreSQL + Razorpay.

## Features

- Home page with dummy course list
- Course detail page with buy button
- Razorpay checkout integration (order creation)
- Razorpay payment verification + purchase persistence
- Simple auth: register, login, logout
- PostgreSQL with Prisma ORM
- Purchased course content route with video playback (ImageKit URLs)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Prisma + PostgreSQL
- JWT session cookies
- Razorpay
- ImageKit (video hosting endpoint)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
copy .env.example .env.local
```

3. Update `.env.local` values:

- `DATABASE_URL`
- `JWT_SECRET`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `IMAGEKIT_URL_ENDPOINT`

4. Generate Prisma client + migrate DB:

```bash
npm run db:generate
npm run db:migrate -- --name init
```

5. Seed dummy courses:

```bash
npm run db:seed
```

6. Start app:

```bash
npm run dev
```

Open: `http://localhost:3000`

## Main Routes

- `/` -> course list
- `/courses/:id` -> course detail + buy
- `/learn/:courseId` -> purchased course videos
- `/login`
- `/register`

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/payments/create-order`
- `POST /api/payments/verify`

## Notes

- Buy button requires logged-in user.
- Razorpay popup appears after order creation.
- Course is marked purchased only after successful payment verification.
- Upload your MP4 files in ImageKit and set paths in `prisma/seed.js`.
