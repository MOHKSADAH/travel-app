// External utility libraries for styling and date manipulation
import { clsx, type ClassValue } from 'clsx'; // Conditional class name utility
import { twMerge } from 'tailwind-merge'; // Tailwind CSS class merging utility
import dayjs from 'dayjs'; // Lightweight date manipulation library

/**
 * Class Name utility function for combining and merging CSS classes
 * Combines clsx for conditional classes with tailwind-merge for proper Tailwind class merging
 *
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 *
 * Usage: cn('base-class', { 'conditional-class': isTrue }, 'another-class')
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Date formatting utility function
 * Converts ISO date strings or date objects to human-readable format
 *
 * @param dateString - ISO date string (e.g., "2024-01-15T10:30:00Z")
 * @returns Formatted date string in "Month DD, YYYY" format (e.g., "January 15, 2024")
 */
export const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('MMMM DD, YYYY');
};

/**
 * Markdown JSON parser utility
 * Extracts and parses JSON content from markdown code blocks
 * Used for processing AI-generated trip data that comes wrapped in markdown
 *
 * @param markdownText - Markdown text containing ```json code blocks
 * @returns Parsed JSON object or null if parsing fails
 *
 * Expected format: ```json\n{...}\n```
 */
export function parseMarkdownToJson(markdownText: string): unknown | null {
    // Regex to extract content between ```json and ``` markers
    const regex = /```json\n([\s\S]+?)\n```/;
    const match = markdownText.match(regex);

    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    }
    console.error('No valid JSON found in markdown text.');
    return null;
}

/**
 * Trip data parser with type safety
 * Parses JSON string data into typed Trip objects with error handling
 *
 * @param jsonString - JSON string containing trip data
 * @returns Parsed Trip object or null if parsing/validation fails
 */
export function parseTripData(jsonString: string): Trip | null {
    try {
        const data: Trip = JSON.parse(jsonString);

        return data;
    } catch (error) {
        console.error('Failed to parse trip data:', error);
        return null;
    }
}

/**
 * Extract first word from a string
 * Safely extracts the first word while handling edge cases like empty strings
 * Used for extracting first names from full names or initial values from text
 *
 * @param input - Input string to extract first word from (defaults to empty string)
 * @returns First word or empty string if no valid word found
 */
export function getFirstWord(input: string = ''): string {
    return input.trim().split(/\s+/)[0] || '';
}

/**
 * Calculate trend percentage between two time periods
 * Compares current month data with previous month to determine growth trends
 * Used in dashboard analytics to show month-over-month changes
 *
 * @param countOfThisMonth - Current month's count/value
 * @param countOfLastMonth - Previous month's count/value for comparison
 * @returns TrendResult object with trend direction and percentage change
 *
 * Trend Types:
 * - 'increment': Positive growth (green indicators)
 * - 'decrement': Negative growth (red indicators)
 * - 'no change': No difference between periods
 */
export const calculateTrendPercentage = (
    countOfThisMonth: number,
    countOfLastMonth: number
): TrendResult => {
    // Handle edge case: previous month had zero count
    if (countOfLastMonth === 0) {
        return countOfThisMonth === 0
            ? { trend: 'no change', percentage: 0 }
            : { trend: 'increment', percentage: 100 };
    }

    // Calculate absolute change and percentage difference
    const change = countOfThisMonth - countOfLastMonth;
    const percentage = Math.abs((change / countOfLastMonth) * 100);

    // Determine trend direction based on change value
    if (change > 0) {
        return { trend: 'increment', percentage };
    } else if (change < 0) {
        return { trend: 'decrement', percentage };
    } else {
        return { trend: 'no change', percentage: 0 };
    }
};

/**
 * Format camelCase keys to human-readable labels
 * Converts form field names to display-friendly labels
 * Used in form validation and error messaging
 *
 * @param key - camelCase key from TripFormData type
 * @returns Formatted string with proper spacing and capitalization
 *
 * Example: 'firstName' becomes 'First Name'
 */
export const formatKey = (key: keyof TripFormData) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};
