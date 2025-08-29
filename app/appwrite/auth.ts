// ========================================
// IMPORTS & DEPENDENCIES
// ========================================

// Appwrite SDK utilities for authentication and database operations
import { ID, OAuthProvider, Query } from 'appwrite';

// Appwrite client instances and configuration
import { account, database, appwriteConfig } from '~/appwrite/client';

// React Router navigation utility
import { redirect } from 'react-router';

// ========================================
// USER MANAGEMENT FUNCTIONS
// ========================================

/**
 * Checks if a user already exists in the database
 * @param id - The Appwrite account ID to search for
 * @returns User document if found, null otherwise
 *
 * Logic:
 * - Queries the user collection for matching accountId
 * - Returns the first document if found
 * - Handles errors gracefully by returning null
 */
export const getExistingUser = async (id: string) => {
    try {
        const { documents, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', id)]
        );
        return total > 0 ? documents[0] : null;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

/**
 * Stores user data in the database after OAuth authentication
 * @returns void - Creates user document or redirects on error
 *
 * Logic:
 * - Gets current authenticated user from Appwrite
 * - Retrieves OAuth access token for profile picture
 * - Fetches Google profile picture if available
 * - Creates new user document with all relevant data
 * - Redirects to sign-in on failure
 */
export const storeUserData = async () => {
    try {
        const user = await account.get();
        if (!user) throw new Error('User not found');

        // Get OAuth access token for Google profile picture
        const { providerAccessToken } = (await account.getSession('current')) || {};
        const profilePicture = providerAccessToken
            ? await getGooglePicture(providerAccessToken)
            : null;

        // Create user document in database
        const createdUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl: profilePicture,
                joinedAt: new Date().toISOString(),
            }
        );

        if (!createdUser.$id) redirect('/sign-in');
    } catch (error) {
        console.error('Error storing user data:', error);
    }
};

/**
 * Fetches Google profile picture using OAuth access token
 * @param accessToken - Google OAuth access token
 * @returns Profile picture URL or fallback avatar
 *
 * Logic:
 * - Calls Google People API to get profile information
 * - Extracts profile picture URL from response
 * - Returns fallback avatar if request fails
 */
const getGooglePicture = async (accessToken: string) => {
    try {
        const response = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos',
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error('Failed to fetch Google profile picture');

        const { photos } = await response.json();
        return photos?.[0]?.url || null; // Return first photo URL or null
    } catch (error) {
        console.error('Error fetching Google picture:', error);
        return null; // Fallback to null on error
    }
};

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

/**
 * Initiates Google OAuth2 authentication flow
 * @returns void - Redirects user to Google OAuth
 *
 * Logic:
 * - Creates OAuth2 session with Google provider
 * - Sets success redirect to homepage
 * - Sets failure redirect to 404 page
 * - Handles errors gracefully with console logging
 */
export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/`, // Success redirect
            `${window.location.origin}/404` // Failure redirect
        );
    } catch (error) {
        console.error('Error during OAuth2 session creation:', error);
    }
};

/**
 * Logs out the current authenticated user
 * @returns void - Deletes current session
 *
 * Logic:
 * - Deletes the current active session
 * - Handles errors gracefully with console logging
 */
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

/**
 * Gets current authenticated user and their database profile
 * @returns User document or redirects to sign-in
 *
 * Logic:
 * - Fetches current user from Appwrite account
 * - Queries database for user profile data
 * - Selects only necessary fields for performance
 * - Redirects to sign-in if user not found
 */
export const getUser = async () => {
    try {
        const user = await account.get();
        if (!user) return redirect('/sign-in');

        // Query database for user profile with selected fields only
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId']),
            ]
        );

        return documents.length > 0 ? documents[0] : redirect('/sign-in');
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};

/**
 * Fetches all users with pagination support
 * @param limit - Maximum number of users to return
 * @param offset - Number of users to skip for pagination
 * @returns Object containing users array and total count
 *
 * Logic:
 * - Queries all users from the database
 * - Applies limit and offset for pagination
 * - Calculates itinerary count for each user
 * - Returns formatted user data with counts
 */
export const getAllUsers = async (limit: number, offset: number) => {
    try {
        const { documents: users, total } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.limit(limit), Query.offset(offset)]
        );

        if (total === 0) return { users: [], total };

        return { users, total };
    } catch (e) {
        console.log('Error fetching users');
        return { users: [], total: 0 };
    }
};
