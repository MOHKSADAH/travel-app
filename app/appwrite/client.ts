/**
 * Appwrite Client Configuration Module
 *
 * This module sets up and exports the Appwrite client configuration and service instances
 * for authentication, database operations, and file storage.
 *
 * Required Environment Variables (.env):
 * - VITE_APPWRITE_API_ENDPOINT: Appwrite server endpoint URL
 * - VITE_APPWRITE_PROJECT_ID: Appwrite project identifier
 * - VITE_APPWRITE_API_KEY: API key for server-side operations
 * - VITE_APPWRITE_DATABASE_ID: Main database identifier
 * - VITE_APPWRITE_USERS_COLLECTION_ID: Users collection identifier
 * - VITE_APPWRITE_TRIPS_COLLECTION_ID: Trips collection identifier
 *
 * @module appwrite/client
 */

import { Account, Client, Databases, Storage } from 'appwrite';

/**
 * Central configuration object for Appwrite services
 * @type {Object}
 */
export const appwriteConfig = {
    endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    tripCollectionId: import.meta.env.VITE_APPWRITE_TRIPS_COLLECTION_ID,
};

const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
