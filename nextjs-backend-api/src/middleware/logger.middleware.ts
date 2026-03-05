/**
 * Logger Middleware
 * 
 * Logs all incoming HTTP requests with method, route, and timestamp.
 * Used to track API activity and debug request flow.
 */

import { NextRequest } from 'next/server';

/**
 * Log Entry Interface
 * Structure for storing log information
 */
interface LogEntry {
  timestamp: string;
  method: string;
  pathname: string;
  ip?: string;
}

/**
 * In-memory logs storage
 * In production, this should be replaced with a proper logging service
 */
const logs: LogEntry[] = [];

/**
 * Logger Middleware Function
 * Logs request information to the console and internal log storage
 * 
 * @param request - The incoming HTTP request
 * @param route - The API route being accessed
 */
export const logRequest = (request: NextRequest | undefined, route: string): void => {
  const timestamp = new Date().toISOString();
  const method = request?.method || 'UNKNOWN';
  const pathname = route;

  const logEntry: LogEntry = {
    timestamp,
    method,
    pathname,
  };

  // Store log in memory
  logs.push(logEntry);

  // Console log for development
  console.log(
    `[${timestamp}] ${method.padEnd(6)} ${pathname}`
  );

  // Keep only recent 100 logs in memory to prevent memory leaks
  if (logs.length > 100) {
    logs.shift();
  }
};

/**
 * Get all logs
 * Useful for debugging or monitoring
 * 
 * @returns Array of log entries
 */
export const getLogs = (): LogEntry[] => {
  return [...logs];
};

/**
 * Clear all logs
 * Use carefully in production environments
 */
export const clearLogs = (): void => {
  logs.length = 0;
};
