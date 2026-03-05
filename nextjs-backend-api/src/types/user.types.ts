/**
 * User Type Definitions
 * 
 * This file contains all TypeScript interfaces and types related to the User model.
 * Following strong typing principles to ensure type safety across the application.
 */

/**
 * User Interface
 * Represents the structure of a user in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Create User Request DTO
 * Data Transfer Object for creating a new user
 */
export interface CreateUserRequest {
  name: string;
  email: string;
}

/**
 * Update User Request DTO
 * Data Transfer Object for updating an existing user
 */
export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

/**
 * User Service Response
 * Generic response structure for service layer
 */
export interface UserServiceResponse {
  success: boolean;
  data: User | User[] | null;
  message: string;
  error?: string;
}
