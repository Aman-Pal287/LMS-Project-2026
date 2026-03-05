# GitHub Copilot Instructions

This is a Next.js backend API server project built with TypeScript and the App Router.

## Project Purpose

This project demonstrates enterprise-grade backend API architecture using Next.js 15, TypeScript, and the App Router. It focuses on clean architecture principles with clear separation of concerns.

## Key Technologies

- **Next.js 15.5** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Node.js 18+** - Server runtime

## Project Structure

The project follows a layered architecture:

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── controllers/           # HTTP request handlers
├── services/              # Business logic
├── middleware/            # Cross-cutting concerns
├── utils/                 # Reusable utilities
├── types/                 # TypeScript interfaces
└── lib/                   # Configuration & helpers
```

## Architecture Pattern

```
Route → Controller → Service → Response Utility
```

Each layer has a specific responsibility:
- **Routes**: HTTP method handling
- **Controllers**: Request validation & response formatting
- **Services**: Business logic & data operations
- **Utilities**: Standardized response format

## Getting Started

### Development

```bash
npm run dev        # Start development server on port 3000
npm run build      # Build for production
npm start          # Run production server
npm run lint       # Check code quality
```

### API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users?search=term` - Search users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user

## Code Style Guidelines

1. **Type Safety**: No `any` types. Use strict TypeScript.
2. **Comments**: Document complex logic and function purposes.
3. **Error Handling**: Always return standardized error responses.
4. **Logging**: Use logger middleware for request tracking.
5. **Validation**: Validate all inputs before processing.

## Development Practices

- Follow clean code principles
- Maintain separation of concerns
- Use meaningful variable/function names
- Add JSDoc comments for functions
- Keep functions focused and single-responsibility

## Common Tasks

### Add a New API Endpoint

1. Create route file in `src/app/api/[resource]/route.ts`
2. Implement controller in `src/controllers/[resource].controller.ts`
3. Create service in `src/services/[resource].service.ts`
4. Define types in `src/types/[resource].types.ts`

### Add Middleware

1. Create middleware file in `src/middleware/`
2. Export middleware function
3. Import and use in route handlers

### Extend the Data Model

1. Update types in `src/types/[resource].types.ts`
2. Modify service methods as needed
3. Update controller validation logic

## Production Considerations

Before deploying to production:

1. **Replace in-memory database** with real database connection
2. **Add authentication** (JWT, OAuth)
3. **Configure CORS** settings
4. **Add rate limiting** for API protection
5. **Implement comprehensive logging** service
6. **Add request validation** schemas (Zod, Joi)
7. **Set up environment variables** properly
8. **Add API documentation** (Swagger/OpenAPI)

## For Help

Refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [README.md](./README.md) for detailed API documentation
