/**
 * Server Configuration and Utilities
 * 
 * Centralized server setup, configuration, and utility functions.
 * Can be extended to include database connections, external service integrations, etc.
 */

/**
 * Server Configuration
 */
export const serverConfig = {
  // API Configuration
  api: {
    version: '1.0.0',
    prefix: '/api',
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Pagination defaults
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Response timeout
  responseTimeout: 30000, // 30 seconds
};

/**
 * Initialize Server
 * Sets up any necessary configurations and services
 */
export const initializeServer = (): void => {
  console.log(`Server initializing in ${serverConfig.server.nodeEnv} mode...`);
  console.log(`API Version: ${serverConfig.api.version}`);
};

/**
 * Helper: Get HTTP Status Message
 * Maps HTTP status codes to messages
 * 
 * @param statusCode - HTTP status code
 * @returns Status message
 */
export const getStatusMessage = (statusCode: number): string => {
  const statusMessages: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
  };

  return statusMessages[statusCode] || 'Unknown Status';
};

/**
 * Helper: Generate Request ID
 * Creates a unique ID for request tracking
 * 
 * @returns Unique request ID
 */
export const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
