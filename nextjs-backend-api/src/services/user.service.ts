/**
 * User Service
 * 
 * Contains all business logic related to user operations.
 * Handles CRUD operations and data manipulation.
 * This layer is independent of HTTP/framework concerns.
 */

import { User, CreateUserRequest, UserServiceResponse } from '@/types/user.types';

/**
 * In-memory user database
 * In production, this would be replaced with actual database operations
 */
const usersDatabase: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    createdAt: new Date('2024-02-20').toISOString(),
  },
];

/**
 * User Service Class
 * Encapsulates all user-related business logic
 */
export class UserService {
  /**
   * Get all users
   * 
   * @returns Response with all users
   */
  static async getAllUsers(): Promise<UserServiceResponse> {
    try {
      return {
        success: true,
        data: [...usersDatabase],
        message: 'Users retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve users',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get user by ID
   * 
   * @param id - User ID
   * @returns Response with user data or error
   */
  static async getUserById(id: string): Promise<UserServiceResponse> {
    try {
      const user = usersDatabase.find((u) => u.id === id);

      if (!user) {
        return {
          success: false,
          data: null,
          message: 'User not found',
        };
      }

      return {
        success: true,
        data: user,
        message: 'User retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve user',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create a new user
   * 
   * @param createUserRequest - User data for creation
   * @returns Response with created user or error
   */
  static async createUser(
    createUserRequest: CreateUserRequest
  ): Promise<UserServiceResponse> {
    try {
      // Validate input
      if (!createUserRequest.name || !createUserRequest.email) {
        return {
          success: false,
          data: null,
          message: 'Missing required fields: name and email',
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(createUserRequest.email)) {
        return {
          success: false,
          data: null,
          message: 'Invalid email format',
        };
      }

      // Check if email already exists
      const emailExists = usersDatabase.some(
        (u) => u.email === createUserRequest.email
      );
      if (emailExists) {
        return {
          success: false,
          data: null,
          message: 'User with this email already exists',
        };
      }

      // Create new user
      const newUser: User = {
        id: String(usersDatabase.length + 1),
        name: createUserRequest.name,
        email: createUserRequest.email,
        createdAt: new Date().toISOString(),
      };

      // Add to database
      usersDatabase.push(newUser);

      return {
        success: true,
        data: newUser,
        message: 'User created successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get user count
   * 
   * @returns Number of users in database
   */
  static async getUserCount(): Promise<number> {
    return usersDatabase.length;
  }

  /**
   * Search users by name
   * 
   * @param searchTerm - Term to search for
   * @returns Response with matching users
   */
  static async searchUsers(searchTerm: string): Promise<UserServiceResponse> {
    try {
      if (!searchTerm) {
        return {
          success: false,
          data: null,
          message: 'Search term is required',
        };
      }

      const results = usersDatabase.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        success: true,
        data: results,
        message: `Found ${results.length} user(s)`,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to search users',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
