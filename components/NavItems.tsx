// React Router hooks for navigation and data access
import { Link, useLoaderData, useNavigate } from 'react-router';
// Sidebar navigation configuration
import { sidebarItems } from '~/constants';
// React Router component for active route styling
import { NavLink } from 'react-router';
// Utility for conditional class names
import { cn } from '~/lib/utils';
// Authentication function for user logout
import { logoutUser } from '~/appwrite/auth';

/**
 * NavItems Props
 * Optional click handler for mobile navigation
 */
interface NavItemsProps {
    handleClick?: () => void; // Optional callback for mobile menu item clicks
}

/**
 * NavItems Component
 *
 * Primary navigation component used in both desktop sidebar and mobile menu.
 * Displays navigation links, user profile, and logout functionality.
 *
 * Features:
 * - Active route highlighting
 * - Icon + label navigation items
 * - User profile display
 * - Logout functionality
 * - Responsive design support
 *
 * @param props - NavItemsProps for mobile interaction
 */
const NavItems = ({ handleClick }: NavItemsProps) => {
    // Get authenticated user data from route loader
    const user = useLoaderData();
    const navigate = useNavigate();

    /**
     * Handle user logout
     * Calls Appwrite logout and redirects to sign-in
     */
    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    };

    return (
        <section className="nav-items">
            {/* App logo and title */}
            <Link to="/" className="link-logo">
                <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                <h1>Travelo</h1>
            </Link>

            <div className="container">
                {/* Main navigation menu */}
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div
                                    className={cn('group nav-item', {
                                        'bg-primary-100 !text-white': isActive, // Highlight active route
                                    })}
                                    onClick={handleClick}
                                >
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={`group-hover:brightness-0 size-0 group-hover:invert ${
                                            isActive ? 'brightness-0 invert' : 'text-dark-200'
                                        }`}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User profile and logout section */}
                <footer className="nav-footer">
                    {/* User avatar (with no-referrer for Google profile pics) */}
                    <img src={user?.imageUrl} alt={user?.name} referrerPolicy="no-referrer" />
                    {/* User info */}
                    <article className="flex flex-col">
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </article>
                    {/* Logout button */}
                    <button onClick={handleLogout} className="cursor-pointer">
                        <img src="/assets/icons/logout.svg" alt="Sign out" className="size-6" />
                    </button>
                </footer>
            </div>
        </section>
    );
};

export default NavItems;
