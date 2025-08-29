// React Router components for navigation
import { Link, redirect } from 'react-router';
// Syncfusion UI button component
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
// Appwrite authentication functions
import { loginWithGoogle } from '~/appwrite/auth';
// Appwrite account client for session management
import { account } from '~/appwrite/client';

/**
 * Client-side Loader for Sign In Page
 *
 * Checks for existing authenticated session and redirects if found.
 * Prevents authenticated users from seeing the sign-in page.
 *
 * Features:
 * - Session validation
 * - Automatic redirect for authenticated users
 * - Error handling for auth checks
 */
export async function clientLoader() {
    try {
        // Check for existing authenticated session
        const user = await account.get();

        // Redirect to home if user is already logged in
        if (user.$id) return redirect('/');
    } catch (e) {
        console.log('Error fetching user', e);
    }
}

/**
 * Sign In Component
 *
 * Provides OAuth-based authentication interface for users.
 * Focuses on Google sign-in for simplified authentication.
 *
 * Features:
 * - Clean, focused UI
 * - Google OAuth integration
 * - Glassmorphism design
 * - Responsive layout
 */
const SignIn = () => {
    return (
        <main className="auth">
            {/* Glassmorphism container for visual effect */}
            <section className="size-full glassmorphism flex-center px-6">
                <div className="sign-in-card">
                    {/* App branding header */}
                    <header className="header">
                        <Link to="/">
                            <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                        </Link>
                        <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
                    </header>

                    {/* Welcome message and value proposition */}
                    <article>
                        <h2 className="p-28-semibold text-dark-100 text-center">
                            Start Your Travel Journey
                        </h2>

                        <p className="p-18-regular text-center text-gray-100 !leading-7">
                            Sign in with Google to manage destinations, itineraries, and user
                            activity with ease.
                        </p>
                    </article>

                    {/* Google OAuth sign-in button */}
                    <ButtonComponent
                        type="button"
                        iconCss="e-search-icon"
                        className="button-class !h-11 !w-full"
                        onClick={loginWithGoogle} // Initiate Google OAuth flow
                    >
                        {/* Google icon */}
                        <img src="/assets/icons/google.svg" className="size-5" alt="google" />
                        {/* Button text */}
                        <span className="p-18-semibold text-white">Sign in with Google</span>
                    </ButtonComponent>
                </div>
            </section>
        </main>
    );
};
export default SignIn;
