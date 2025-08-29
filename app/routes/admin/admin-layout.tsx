// Syncfusion sidebar component for navigation
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
// Reusable navigation components
import { MobileSidebar, NavItems } from '../../../components';
// React Router components for nested routing
import { Outlet, redirect } from 'react-router';
// Appwrite auth client
import { account } from '~/appwrite/client';
// Authentication utility functions
import { getExistingUser, storeUserData } from '~/appwrite/auth';

/**
 * Client-side Loader for Admin Layout
 *
 * Handles authentication and authorization for admin routes.
 * Protects admin routes from unauthorized access.
 *
 * Features:
 * - Session validation
 * - Admin role verification
 * - User data persistence
 * - Unauthorized access prevention
 *
 * Flow:
 * 1. Check for authenticated session
 * 2. Verify admin privileges
 * 3. Store/retrieve user data
 * 4. Handle redirects for unauthorized access
 */
export async function clientLoader() {
    try {
        // Check for authenticated session
        const user = await account.get();

        // Redirect to sign-in if no active session
        if (!user.$id) return redirect('/sign-in');

        // Check user's admin status
        const existingUser = await getExistingUser(user.$id);
        if (existingUser?.status === 'user') {
            // Redirect non-admin users to main site
            return redirect('/');
        }

        // Create or return user data
        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.log('Error in clientLoader', e);
        return redirect('/sign-in');
    }
}

/**
 * Admin Layout Component
 *
 * Main layout for admin section of the application.
 * Provides navigation and content structure for admin pages.
 *
 * Features:
 * - Responsive sidebar navigation
 * - Mobile-friendly navigation
 * - Nested route rendering
 * - Consistent admin UI structure
 */
const AdminLayout = () => (
    <div className="admin-layout">
        {/* Mobile Navigation Sidebar */}
        <MobileSidebar />

        {/* Desktop Navigation Sidebar */}
        <aside className="w-full max-w-[270px] hidden lg:block">
            <SidebarComponent width={270} enableGestures={false}>
                <NavItems />
            </SidebarComponent>
        </aside>

        {/* Main Content Area */}
        <aside className="children">
            <Outlet />
        </aside>
    </div>
);

export default AdminLayout;
