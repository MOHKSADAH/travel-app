// Syncfusion chart configuration types for axis customization
import type { AxisModel } from '@syncfusion/ej2-react-charts';
// Utility function for date formatting
import { formatDate } from '~/lib/utils';

/**
 * Navigation sidebar configuration
 * Defines the main navigation items for the admin dashboard
 * Each item includes icon, label, and routing information
 */
export const sidebarItems = [
    {
        id: 1,
        icon: '/assets/icons/home.svg',
        label: 'Dashboard',
        href: '/dashboard',
    },
    {
        id: 3,
        icon: '/assets/icons/users.svg',
        label: 'All Users',
        href: '/all-users',
    },
    {
        id: 4,
        icon: '/assets/icons/itinerary.svg',
        label: 'AI Trips',
        href: '/trips',
    },
];

/**
 * Sample chart data for analytics visualization
 * Represents monthly data with multiple series (y1, y2, y3) across 6 months
 * Used in dashboard charts to demonstrate trend visualization
 *
 * Data Structure:
 * - x: Month abbreviation (category axis)
 * - y1, y2, y3: Different data series for multi-line charts
 */
export const chartOneData: object[] = [
    {
        x: 'Jan',
        y1: 0.5,
        y2: 1.5,
        y3: 0.7,
    },
    {
        x: 'Feb',
        y1: 0.8,
        y2: 1.2,
        y3: 0.9,
    },
    {
        x: 'Mar',
        y1: 1.2,
        y2: 1.8,
        y3: 1.5,
    },
    {
        x: 'Apr',
        y1: 1.5,
        y2: 2.0,
        y3: 1.8,
    },
    {
        x: 'May',
        y1: 1.8,
        y2: 2.5,
        y3: 2.0,
    },
    {
        x: 'Jun',
        y1: 2.0,
        y2: 2.8,
        y3: 2.5,
    },
];

/**
 * Travel style options for trip customization
 * Defines different types of travel experiences users can select
 * Used in trip creation forms and filtering
 */
export const travelStyles = [
    'Relaxed',
    'Luxury',
    'Adventure',
    'Cultural',
    'Nature & Outdoors',
    'City Exploration',
];

/**
 * Interest categories for personalized trip recommendations
 * Helps match users with relevant activities and destinations
 * Used in AI trip generation algorithms
 */
export const interests = [
    'Food & Culinary',
    'Historical Sites',
    'Hiking & Nature Walks',
    'Beaches & Water Activities',
    'Museums & Art',
    'Nightlife & Bars',
    'Photography Spots',
    'Shopping',
    'Local Experiences',
];

/**
 * Budget range options for trip planning
 * Categorizes trips by price range to help users find suitable options
 */
export const budgetOptions = ['Budget', 'Mid-range', 'Luxury', 'Premium'];

/**
 * Group type options for travel planning
 * Defines different travel party compositions for personalized recommendations
 */
export const groupTypes = ['Solo', 'Couple', 'Family', 'Friends', 'Business'];

/**
 * Footer link labels for the application
 * Standard legal/policy links displayed in the footer
 */
export const footers = ['Terms & Condition', 'Privacy Policy'];

/**
 * Form field configuration for select/dropdown inputs
 * Defines which fields should be rendered as dropdown components
 * Used in dynamic form rendering and validation
 */
export const selectItems = [
    'groupType',
    'travelStyle',
    'interest',
    'budget',
] as (keyof TripFormData)[];

/**
 * ComboBox data mapping for form dropdowns
 * Maps form field names to their corresponding option arrays
 * Provides type-safe access to dropdown options
 */
export const comboBoxItems = {
    groupType: groupTypes,
    travelStyle: travelStyles,
    interest: interests,
    budget: budgetOptions,
} as Record<keyof TripFormData, string[]>;

/**
 * Syncfusion Chart Axis Configurations
 * Pre-configured axis settings for consistent chart styling across the application
 */

// User analytics chart axes configuration
export const userXAxis: AxisModel = { valueType: 'Category', title: 'Day' };
export const useryAxis: AxisModel = {
    minimum: 0,
    maximum: 10,
    interval: 2,
    title: 'Count',
};

// Trip analytics chart axes configuration
export const tripXAxis: AxisModel = {
    valueType: 'Category',
    title: 'Travel Styles',
    majorGridLines: { width: 0 }, // Hide major grid lines for cleaner appearance
};

export const tripYAxis: AxisModel = {
    minimum: 0,
    maximum: 10,
    interval: 2,
    title: 'Count',
};

/**
 * Confetti Animation Configuration
 * Settings for celebration animations when trips are successfully created
 * Used with canvas-confetti library for visual feedback
 */
export const CONFETTI_SETTINGS = {
    particleCount: 200, // Number of confetti pieces
    spread: 60, // Spread of the confetti burst
    colors: ['#ff0', '#ff7f00', '#ff0044', '#4c94f4', '#f4f4f4'], // Confetti colors
    decay: 0.95, // Gravity decay of the confetti
};

// Left-side confetti burst configuration
export const LEFT_CONFETTI = {
    ...CONFETTI_SETTINGS,
    angle: 45, // Direction of the confetti burst (45 degrees from bottom-left)
    origin: { x: 0, y: 1 }, // Bottom-left corner origin
};

// Right-side confetti burst configuration
export const RIGHT_CONFETTI = {
    ...CONFETTI_SETTINGS,
    angle: 135, // Direction of the confetti burst (135 degrees from bottom-right)
    origin: { x: 1, y: 1 }, // Bottom-right corner origin
};

/**
 * Mock Data for Development and Testing
 * These constants provide sample data for development, testing, and demo purposes
 * In production, this data would be replaced by actual database queries
 */

// Sample user profile for testing
export const user = { name: 'Gray Doe' };

// Sample dashboard statistics with trend data
export const dashboardStats = {
    totalUsers: 12500,
    usersJoined: { currentMonth: 213, lastMonth: 198 },
    totalTrips: 3231,
    tripsCreated: { currentMonth: 120, lastMonth: 250 },
    userRole: { total: 40, currentMonth: 15, lastMonth: 15 },
};

// Sample trip data for development and demonstration
export const allTrips = [
    {
        id: 1,
        name: 'Tropical Rewind',
        imageUrls: ['/assets/images/sample1.jpg'],
        itinerary: [{ location: 'Thailand' }],
        tags: ['Adventure', 'Culture'],
        travelStyle: 'Solo',
        estimatedPrice: '$1,000',
    },
    {
        id: 2,
        name: 'French Reverie',
        imageUrls: ['/assets/images/sample2.jpg'],
        itinerary: [{ location: 'Paris' }],
        tags: ['Relaxation', 'Culinary'],
        travelStyle: 'Family',
        estimatedPrice: '$2,000',
    },
    {
        id: 3,
        name: 'Zen Break',
        imageUrls: ['/assets/images/sample3.jpg'],
        itinerary: [{ location: 'Japan' }],
        tags: ['Shopping', 'Luxury'],
        travelStyle: 'Couple',
        estimatedPrice: '$3,000',
    },
    {
        id: 4,
        name: 'Adventure in Westeros',
        imageUrls: ['/assets/images/sample4.jpg'],
        itinerary: [{ location: 'Croatia' }],
        tags: ['Historical', 'Culture'],
        travelStyle: 'Friends',
        estimatedPrice: '$4,000',
    },
];

// Sample user data for testing user management features
export const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        imageUrl: '/assets/images/david.webp',
        dateJoined: formatDate('2025-01-01'),
        itineraryCreated: 10,
        status: 'user',
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        imageUrl: '/assets/images/david.webp',
        dateJoined: formatDate('2025-01-02'),
        itineraryCreated: 4,
        status: 'user',
    },
    {
        id: 3,
        name: 'John Smith',
        email: 'john.smith@example.com',
        imageUrl: '/assets/images/david.webp',
        dateJoined: formatDate('2025-01-03'),
        itineraryCreated: 8,
        status: 'admin',
    },
];
