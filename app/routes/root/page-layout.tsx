import React from 'react';
// React Router hook for programmatic navigation
import { useNavigate } from 'react-router';
// Appwrite authentication function
import { logoutUser } from '~/appwrite/auth';

/**
 * Page Layout Component
 *
 * Base layout component for public-facing pages.
 * Provides common navigation and authentication controls.
 *
 * TODO: Enhance with:
 * - Full navigation menu
 * - Header with branding
 * - User profile section
 * - Footer with links
 * - Responsive design
 *
 * Current Features:
 * - Logout functionality
 * - Dashboard access
 * - Basic navigation
 */
const PageLayout = () => {
    const navigate = useNavigate();

    /**
     * Handle user logout
     * Terminates session and redirects to sign-in
     */
    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    };

    return (
        <div>
            {/* Logout button with icon */}
            <button onClick={handleLogout} className="cursor-pointer">
                <img src="/assets/icons/logout.svg" alt="Sign out" className="size-6" />
            </button>

            {/* Dashboard navigation */}
            <button onClick={() => navigate(`/dashboard`)}>Dashboard</button>
        </div>
    );
};

export default PageLayout;
