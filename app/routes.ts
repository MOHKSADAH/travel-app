/**
 * Application Route Configuration
 *
 * This file defines the routing structure for the entire application using React Router v7.
 * It organizes routes into two main sections: public routes and protected admin routes.
 *
 * Route Structure:
 * 1. Public Routes
 *    - /sign-in: User authentication page
 *    - /: Main travel planning page (index route)
 *
 * 2. API Routes
 *    - /api/create-trip: Endpoint for AI trip generation
 *
 * 3. Admin Routes (Protected)
 *    All admin routes are wrapped in admin-layout.tsx which handles:
 *    - Authentication
 *    - Admin role verification
 *    - Navigation sidebar
 *
 *    Admin Routes:
 *    - /dashboard: Analytics and overview
 *    - /all-users: User management
 *    - /trips: Trip listing
 *    - /trips/create: New trip creation
 *    - /trips/:tripId: Individual trip details
 */

import { type RouteConfig, route, layout, index } from '@react-router/dev/routes';

export default [
    // Public Authentication
    route('sign-in', 'routes/root/sign-in.tsx'),

    // API Endpoints
    route('api/create-trip', 'routes/api/create-trip.ts'),

    // Protected Admin Section
    layout('routes/admin/admin-layout.tsx', [
        route('dashboard', 'routes/admin/dashboard.tsx'), // Analytics dashboard
        route('all-users', 'routes/admin/all-users.tsx'), // User management
        route('trips', 'routes/admin/trips.tsx'), // Trip listing
        route('trips/create', 'routes/admin/create-trip.tsx'), // Trip creation
        route('trips/:tripId', 'routes/admin/trip-detail.tsx'), // Trip details
    ]),

    // Public Layout Section
    layout(`routes/root/page-layout.tsx`, [
        index('routes/root/travel-page.tsx'), // Main public travel page (index route)
    ]),
] satisfies RouteConfig;
