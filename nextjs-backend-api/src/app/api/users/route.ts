/**
 * Users API Route Handler
 * 
 * Endpoint: /api/users
 * Methods: GET, POST
 * 
 * GET - Retrieve all users or search by query parameter
 * POST - Create a new user
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getUsersHandler,
  createUserHandler,
  methodNotAllowedHandler,
} from '@/controllers/user.controller';

/**
 * GET /api/users
 * Returns a list of all users or filtered results based on search query
 * 
 * Query Parameters:
 * - search (optional): Search term to filter users by name or email
 * 
 * Example:
 * GET /api/users
 * GET /api/users?search=john
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  return getUsersHandler(request);
}

/**
 * POST /api/users
 * Creates a new user with provided name and email
 * 
 * Request Body:
 * {
 *   "name": "string (required)",
 *   "email": "string (required, valid email format)"
 * }
 * 
 * Example:
 * POST /api/users
 * {
 *   "name": "Alice Williams",
 *   "email": "alice@example.com"
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  return createUserHandler(request);
}

/**
 * Catch all other HTTP methods
 */
export async function HEAD(request: NextRequest): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'HEAD');
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'PUT');
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'DELETE');
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'PATCH');
}
