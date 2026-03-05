/**
 * User Controller
 * 
 * Handles HTTP request/response logic for user endpoints.
 * Acts as a bridge between routes and services.
 * Manages request validation, error handling, and response formatting.
 */

import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';
import { CreateUserRequest } from '@/types/user.types';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/utils/response.util';
import { logRequest } from '@/middleware/logger.middleware';

/**
 * Handle GET /api/users
 * Get all users or filter by search query
 * 
 * @param request - The HTTP request object
 * @returns JSON response with users or error
 */
export const getUsersHandler = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    logRequest(request, 'GET /api/users');

    // Check for search query parameter
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get('search');

    let result;

    if (searchTerm) {
      // Search users if search query is provided
      result = await UserService.searchUsers(searchTerm);
    } else {
      // Get all users
      result = await UserService.getAllUsers();
    }

    if (!result.success) {
      return NextResponse.json(
        createErrorResponse(result.message, result.error),
        { status: 400 }
      );
    }

    return NextResponse.json(
      createSuccessResponse(result.message, result.data),
      { status: 200 }
    );
  } catch (error) {
    logRequest(request, 'GET /api/users [ERROR]');

    return NextResponse.json(
      createErrorResponse(
        'Failed to retrieve users',
        error instanceof Error ? error.message : 'Unknown error'
      ),
      { status: 500 }
    );
  }
};

/**
 * Handle GET /api/users/:id
 * Get a single user by ID
 * 
 * @param request - The HTTP request object
 * @param userId - The user ID from the URL parameter
 * @returns JSON response with user data or error
 */
export const getUserByIdHandler = async (
  request: NextRequest,
  userId: string
): Promise<NextResponse> => {
  try {
    logRequest(request, `GET /api/users/${userId}`);

    // Validate user ID
    if (!userId || userId.trim() === '') {
      return NextResponse.json(
        createErrorResponse('User ID is required'),
        { status: 400 }
      );
    }

    const result = await UserService.getUserById(userId);

    if (!result.success) {
      return NextResponse.json(
        createErrorResponse(result.message),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse(result.message, result.data),
      { status: 200 }
    );
  } catch (error) {
    logRequest(request, `GET /api/users/${userId} [ERROR]`);

    return NextResponse.json(
      createErrorResponse(
        'Failed to retrieve user',
        error instanceof Error ? error.message : 'Unknown error'
      ),
      { status: 500 }
    );
  }
};

/**
 * Handle POST /api/users
 * Create a new user
 * 
 * @param request - The HTTP request object
 * @returns JSON response with created user or error
 */
export const createUserHandler = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    logRequest(request, 'POST /api/users');

    // Parse request body
    let body: CreateUserRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        createErrorResponse('Invalid JSON in request body'),
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        createErrorResponse(
          'Validation failed',
          'Missing required fields: name and email'
        ),
        { status: 400 }
      );
    }

    // Create user via service
    const result = await UserService.createUser(body);

    if (!result.success) {
      return NextResponse.json(
        createErrorResponse(result.message, result.error),
        { status: 400 }
      );
    }

    return NextResponse.json(
      createSuccessResponse('User created successfully', result.data),
      { status: 201 }
    );
  } catch (error) {
    logRequest(request, 'POST /api/users [ERROR]');

    return NextResponse.json(
      createErrorResponse(
        'Failed to create user',
        error instanceof Error ? error.message : 'Unknown error'
      ),
      { status: 500 }
    );
  }
};

/**
 * Handle unsupported methods
 * 
 * @param request - The HTTP request object
 * @param method - The HTTP method
 * @returns JSON response with method not allowed error
 */
export const methodNotAllowedHandler = (
  request: NextRequest,
  method: string
): NextResponse => {
  logRequest(request, `${method} /api/users [METHOD_NOT_ALLOWED]`);

  return NextResponse.json(
    createErrorResponse(`${method} method is not allowed for this endpoint`),
    { status: 405 }
  );
};
