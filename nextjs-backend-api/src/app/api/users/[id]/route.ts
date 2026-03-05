/**
 * User Detail API Route Handler
 * 
 * Endpoint: /api/users/[id]
 * Methods: GET
 * 
 * GET - Retrieve a specific user by ID
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getUserByIdHandler,
  methodNotAllowedHandler,
} from '@/controllers/user.controller';

/**
 * Route handler for /api/users/[id]
 * 
 * The id parameter is extracted from the URL path
 * Example: /api/users/1 → id = "1"
 */
interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/users/[id]
 * Returns a single user by their ID
 * 
 * URL Parameters:
 * - id (required): The user's ID
 * 
 * Example:
 * GET /api/users/1
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  const { id } = await params;
  return getUserByIdHandler(request, id);
}

/**
 * Catch all other HTTP methods
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  return methodNotAllowedHandler(request, 'PATCH');
}
