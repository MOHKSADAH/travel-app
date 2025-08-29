// ========================================
// IMPORTS & DEPENDENCIES
// ========================================

// Appwrite query utilities for database operations
import { Query } from 'appwrite';

// Appwrite client configuration and database instance
import { appwriteConfig, database } from './client';

// ========================================
// TRIP DATA MANAGEMENT FUNCTIONS
// ========================================

/**
 * Fetches all trips with pagination and sorting
 * @param limit - Maximum number of trips to return
 * @param offset - Number of trips to skip for pagination
 * @returns Object containing trips array and total count
 *
 * Logic:
 * - Queries trip collection with limit and offset
 * - Orders trips by creation date (newest first)
 * - Returns empty array if no trips found
 * - Provides total count for pagination UI
 */
export const getAllTrips = async (limit: number, offset: number) => {
    const allTrips = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc('createdAt')]
    );

    if (allTrips.total === 0) {
        console.error('No trips found');
        return { allTrips: [], total: 0 };
    }

    return {
        allTrips: allTrips.documents,
        total: allTrips.total,
    };
};

/**
 * Fetches a single trip by its ID
 * @param tripId - The unique identifier of the trip
 * @returns Trip document or null if not found
 *
 * Logic:
 * - Queries database for specific trip document
 * - Returns null if trip doesn't exist
 * - Logs error message for debugging
 */
export const getTripById = async (tripId: string) => {
    const trips = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId,
        tripId
    );
    if (!trips.$id) {
        console.log('Trip not found');
        return null;
    }
    return trips;
};
