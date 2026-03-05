/**
 * Response Utility
 * 
 * Standardizes all API responses across the application.
 * Provides consistent response format for both success and error scenarios.
 */

/**
 * Standard API Response Format
 * All API endpoints return responses in this format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp?: string;
}

/**
 * Creates a success response
 * @param message - Response message
 * @param data - Response data
 * @returns Formatted success response
 */
export const createSuccessResponse = <T = any>(
  message: string,
  data?: T
): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Creates an error response
 * @param message - Error message
 * @param error - Detailed error information
 * @returns Formatted error response
 */
export const createErrorResponse = (
  message: string,
  error?: string
): ApiResponse => {
  return {
    success: false,
    message,
    error: error || message,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Creates a response object with custom status and data
 * @param success - Whether the operation was successful
 * @param message - Response message
 * @param data - Response data (optional)
 * @returns Formatted API response
 */
export const createResponse = <T = any>(
  success: boolean,
  message: string,
  data?: T
): ApiResponse<T> => {
  return {
    success,
    message,
    ...(data && { data }),
    timestamp: new Date().toISOString(),
  };
};
