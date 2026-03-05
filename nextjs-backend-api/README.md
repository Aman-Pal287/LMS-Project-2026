# Next.js Backend API Server

A professional, scalable backend API server built with Next.js, TypeScript, and the App Router. This project demonstrates clean architecture principles with clear separation of concerns.

## 🏗️ Project Structure

```
nextjs-backend-api/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       ├── route.ts           # Users GET/POST endpoints
│   │   │       └── [id]/
│   │   │           └── route.ts       # User detail GET endpoint
│   │   ├── page.tsx                   # API documentation homepage
│   │   └── layout.tsx                 # Root layout
│   ├── controllers/
│   │   └── user.controller.ts         # Request/response handlers
│   ├── services/
│   │   └── user.service.ts            # Business logic
│   ├── middleware/
│   │   └── logger.middleware.ts       # HTTP request logging
│   ├── utils/
│   │   └── response.util.ts           # Response formatting
│   ├── types/
│   │   └── user.types.ts              # TypeScript interfaces
│   └── lib/
│       └── server.ts                  # Server configuration
├── package.json
├── tsconfig.json
├── next.config.js
├── .eslintrc.json
└── .gitignore
```

## 🎯 Architecture Pattern

### Request Flow

```
Route → Controller → Service → Response Utility
  ↓         ↓           ↓            ↓
Handler  Validation   Business    Format
         & Logging     Logic      Response
```

### Layer Responsibilities

- **Routes** (`src/app/api/`): HTTP method mapping and route parameter extraction
- **Controllers** (`src/controllers/`): Request/response handling, validation, error handling
- **Services** (`src/services/`): Core business logic, data operations
- **Middleware** (`src/middleware/`): Cross-cutting concerns (logging)
- **Utils** (`src/utils/`): Reusable utilities (response formatting)
- **Types** (`src/types/`): TypeScript interfaces and types

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### 1. Get All Users

```http
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "timestamp": "2024-03-06T12:30:45.123Z"
}
```

### 2. Search Users

```http
GET /api/users?search=john
```

Searches by user name or email. Returns matching users.

### 3. Get User by ID

```http
GET /api/users/:id
```

**Example:**
```http
GET /api/users/1
```

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T00:00:00.000Z"
  },
  "timestamp": "2024-03-06T12:30:45.123Z"
}
```

### 4. Create User

```http
POST /api/users
Content-Type: application/json

{
  "name": "Alice Williams",
  "email": "alice@example.com"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "4",
    "name": "Alice Williams",
    "email": "alice@example.com",
    "createdAt": "2024-03-06T12:30:45.123Z"
  },
  "timestamp": "2024-03-06T12:30:45.123Z"
}
```

## 🔍 API Response Format

All responses follow a standard format:

```typescript
{
  success: boolean;        // Operation success status
  message: string;         // Human-readable message
  data?: any;              // Response data (optional)
  error?: string;          // Error details (optional)
  timestamp: string;       // ISO timestamp
}
```

## 📝 Data Model

### User

```typescript
interface User {
  id: string;           // Unique identifier
  name: string;         // User's full name
  email: string;        // User's email address
  createdAt: string;    // ISO timestamp
}
```

## 🔧 Type Safety

The project uses strict TypeScript with:

- No `any` types
- Interface-based models
- Typed service responses
- Typed HTTP handlers

## 📋 Validation Rules

### Create User

- `name` - Required, string
- `email` - Required, valid email format
- No duplicate emails allowed

### Search Users

- `search` - Optional query parameter
- Case-insensitive search across name and email

## 🛠️ Development Features

### Logging Middleware

Automatic HTTP request logging with:
- Timestamp
- HTTP method
- Route path
- Console output for development

### Error Handling

Comprehensive error handling with:
- Validation error messages
- Resource not found (404)
- Method not allowed (405)
- Server error context

### In-Memory Database

Uses in-memory array for demonstration. Replace with actual database:

```typescript
// In src/services/user.service.ts
const usersDatabase: User[] = []

// Replace with database client:
// import { db } from '@/lib/database'
// db.users.find()
```

## 🔐 Security Considerations

For production deployment:

1. **Database**: Replace in-memory storage with real database
2. **Authentication**: Add JWT/OAuth authentication
3. **CORS**: Configure CORS settings
4. **Rate Limiting**: Implement rate limiting
5. **Validation**: Add input sanitization
6. **Error Logging**: Use production logging service
7. **Environment**: Use environment variables for config

## 📦 Key Dependencies

- **Next.js 15.2.0** - React framework with App Router
- **TypeScript 5** - Type safety
- **React 19** - UI framework (minimal for API use)

## 🎯 Best Practices Implemented

✅ Separation of concerns (routes, controllers, services)
✅ Strong TypeScript typing
✅ Centralized error handling
✅ Standardized response format
✅ Request logging middleware
✅ Input validation
✅ Clean code with comments
✅ Modular architecture
✅ Easy to extend

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create `.env.local`:

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 📖 Next Steps

1. **Add Database**: Connect to MongoDB, PostgreSQL, etc.
2. **Authentication**: Implement user authentication
3. **Additional Endpoints**: Add more API routes
4. **Validation**: Add schema validation (Zod, Joi)
5. **Testing**: Add unit and integration tests
6. **Documentation**: Generate API docs with Swagger

## 📄 License

MIT

---

Built with ❤️ using Next.js & TypeScript
