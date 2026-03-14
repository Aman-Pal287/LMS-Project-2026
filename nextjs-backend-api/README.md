# LearnHub (Assignment Project)

Mini full-stack learning platform built with Next.js App Router + PostgreSQL + Razorpay.

## Features

- Home page with dummy course list
- Course detail page with buy button
- Razorpay checkout integration (order creation)
- Simple auth: register, login, logout
- PostgreSQL with Prisma ORM

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Prisma + PostgreSQL
- JWT session cookies
- Razorpay

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

## Notes

- Buy button requires logged-in user.
- Razorpay popup appears after order creation.
- Payment verification webhook is not implemented yet (can be added next).
