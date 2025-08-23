import { ID, OAuthProvider, Query } from 'appwrite';
import { redirect } from 'react-router';
import { account, appwriteConfig, database } from '~/appwrite/client';

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(OAuthProvider.Google);
    } catch (e) {
        console.error('loginWithGoogle', e);
    }
};

export const getUser = async () => {
    try {
        const user = await account.get();

        if (!user) return redirect('/sign-in');

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId']),
            ]
        );
    } catch (e) {
        console.error(e);
    }
};

export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (e) {
        console.log('Error logging out user:', e);
        return false;
    }
};
export const getGooglePicture = async (): Promise<string | null> => {
    try {
        // Get the current user session
        const session = await account.getSession('current');

        // Get the OAuth2 token from the session
        const oAuthToken = session.providerAccessToken;

        if (!oAuthToken) {
            console.log('No OAuth token available');
            return null;
        }

        // Make a request to the Google People API to get the profile photo
        const response = await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos',
            {
                headers: {
                    Authorization: `Bearer ${oAuthToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.error('Failed to fetch profile photo:', response.statusText);
            return null;
        }

        const data = await response.json();

        // Google People API returns photos array, we want the first (primary) photo
        const profilePhotoUrl = data.photos?.[0]?.url;

        return profilePhotoUrl || null;
    } catch (e) {
        console.error('Error fetching Google profile picture:', e);
        return null;
    }
};
export const storeUserData = async () => {
    try {
        const user = await account.get();

        if (!user) return null;

        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', user.$id)]
        );

        if (documents.length > 0) return documents[0];

        const imageUrl = await getGooglePicture();

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: user.$id,
                email: user.email,
                name: user.name,
                imageUrl,
                joinedAt: new Date().toISOString(),
            }
        );
        return newUser;
    } catch (e) {
        console.log('Error storing user data:', e);
    }
};

export const getExistingUser = async () => {
    try {
    } catch (e) {
        console.error(e);
    }
};
