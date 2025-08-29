// Reusable UI components
import { Header, TripCard } from 'components';
// React Router hooks and types for pagination
import { useSearchParams, type LoaderFunctionArgs } from 'react-router';
// Appwrite service functions for trip data
import { getAllTrips, getTripById } from '~/appwrite/trips';
// Utility for parsing trip data from JSON
import { parseTripData } from '~/lib/utils';
// Route type definitions for type safety
import type { Route } from './+types/trips';
// React hooks for component state
import { useState } from 'react';
// Syncfusion pagination component
import { PagerComponent } from '@syncfusion/ej2-react-grids';

/**
 * Data Loader Function for Trips Page
 *
 * Handles server-side data fetching with pagination support.
 * Processes raw trip data into a format ready for display.
 *
 * Features:
 * - Paginated trip loading (8 per page)
 * - URL-based page tracking
 * - Data transformation for UI components
 *
 * @param request - HTTP request object containing URL and params
 * @returns Processed trip data and total count for pagination
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
    // Pagination configuration
    const limit = 8; // Items per page
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const offset = (page - 1) * limit; // Calculate data offset

    // Fetch paginated trip data from Appwrite
    const { allTrips, total } = await getAllTrips(limit, offset);

    // Process and return formatted trip data
    return {
        trips: allTrips.map(({ $id, tripDetail, imageUrls }) => ({
            id: $id,
            ...parseTripData(tripDetail), // Parse JSON trip details
            imageUrls: imageUrls ?? [], // Ensure imageUrls is an array
        })),
        total, // Total count for pagination
    };
};

/**
 * Trips Management Component
 *
 * Main admin interface for viewing and managing AI-generated trips.
 * Provides paginated grid of trips with quick access to details.
 *
 * Features:
 * - Grid layout of trip cards
 * - Pagination controls
 * - Quick trip creation access
 * - URL-synced page state
 *
 * @param props - Route component props containing loader data
 */
const Trips = ({ loaderData }: Route.ComponentProps) => {
    // Extract and type-cast trip data from loader
    const trips = loaderData.trips as Trip[] | [];

    // Initialize pagination from URL params
    const [searchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page') || '1');
    const [currentPage, setCurrentPage] = useState(initialPage);

    /**
     * Handle page changes in the grid
     * Updates both component state and URL params
     */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.search = `?page=${page}`; // Update URL to reflect page
    };

    return (
        <main className="all-users wrapper">
            {/* Page header with trip creation CTA */}
            <Header
                title="Manage Trips"
                description="View and edit AI-Generated trips"
                ctaText="Create Trip"
                ctaUrl="/trips/create"
            />

            <section>
                <h1 className="p-24-semibold text-dark-100 mb-4">Manage Trips</h1>

                {/* Grid of trip cards */}
                <div className="trip-grid mb-4">
                    {trips.map(
                        ({
                            id,
                            name,
                            imageUrls,
                            itinerary,
                            interests,
                            travelStyle,
                            estimatedPrice,
                        }) => (
                            <TripCard
                                id={id}
                                key={id}
                                name={name}
                                location={itinerary?.[0]?.location ?? ''} // First destination
                                imageUrl={imageUrls[0]} // Primary image
                                tags={[interests, travelStyle]} // Combined tags
                                price={estimatedPrice}
                            />
                        )
                    )}
                </div>

                {/* Pagination controls */}
                <PagerComponent
                    cssClass="mb-4"
                    totalRecordsCount={loaderData.total}
                    pageSize={8} // Items per page
                    currentPage={currentPage}
                    click={(args) => handlePageChange(args.currentPage)}
                />
            </section>
        </main>
    );
};

export default Trips;
