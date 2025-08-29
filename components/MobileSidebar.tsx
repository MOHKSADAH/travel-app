// @ts-nocheck
// Syncfusion UI component for mobile navigation
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import React from 'react';
// React Router navigation component
import { Link } from 'react-router';
// Navigation items shared between mobile and desktop views
import NavItems from './NavItems';

/**
 * MobileSidebar Component
 *
 * Responsive sidebar navigation for mobile devices.
 * Provides a collapsible menu with app logo and navigation items.
 *
 * Features:
 * - Slide-over sidebar with backdrop
 * - Touch-friendly interaction
 * - Auto-close on document click
 * - Consistent navigation items with desktop
 * - Smooth animations
 *
 * Uses Syncfusion's SidebarComponent for reliable mobile interactions
 */
const MobileSidebar = () => {
    /**
     * Toggle sidebar visibility
     * Called when menu button is clicked
     */
    const toggleSidebar = () => {
        sidebar.toggle();
    };

    // Reference to Syncfusion sidebar instance
    let sidebar: SidebarComponent;

    return (
        <div className="mobile-sidebar wrapper">
            {/* App header with logo and menu button */}
            <header>
                <Link to="/">
                    <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                    <h1>Travelo</h1>
                </Link>
                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-6" />
                </button>
            </header>

            {/* Syncfusion Sidebar with navigation items */}
            <SidebarComponent
                width={270} // Fixed width for consistent UX
                ref={(Sidebar) => (sidebar = Sidebar)}
                created={() => sidebar.hide()} // Initially hidden
                closeOnDocumentClick={true} // Close when clicking outside
                showBackdrop={true} // Dim background when open
                type="over" // Slide over content
            >
                <NavItems handleClick={toggleSidebar} />
            </SidebarComponent>
        </div>
    );
};

export default MobileSidebar;
