// Utility function for conditional CSS class merging
import { cn } from '~/lib/utils';
// React Router components for navigation and location detection
import { Link, useLocation } from 'react-router';
// Syncfusion UI button component for consistent styling
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

/**
 * Header component props interface
 * Defines the structure for configurable header content
 */
interface Props {
    title: string; // Main heading text
    description: string; // Subtitle or description text
    ctaText?: string; // Optional call-to-action button text
    ctaUrl?: string; // Optional call-to-action button URL
}

/**
 * Header Component
 *
 * Reusable header component that adapts its styling based on the current route.
 * Provides dynamic title, description, and optional call-to-action button.
 *
 * Features:
 * - Responsive typography that scales with screen size
 * - Route-aware styling (larger text on home page)
 * - Optional CTA button with icon and navigation
 * - Consistent design system integration
 *
 * @param title - Main heading text to display
 * @param description - Subtitle or description text
 * @param ctaText - Optional text for call-to-action button
 * @param ctaUrl - Optional URL for call-to-action navigation
 */
const Header = ({ title, description, ctaText, ctaUrl }: Props) => {
    // Get current location to conditionally apply styles
    const location = useLocation();

    return (
        <header className="header">
            <article>
                {/* Dynamic title with route-based sizing */}
                <h1
                    className={cn(
                        'text-dark-100',
                        location.pathname === '/'
                            ? 'text-2xl md:text-4xl font-bold' // Larger text for home page
                            : 'text-xl md:text-2xl font-semibold' // Smaller text for other pages
                    )}
                >
                    {title}
                </h1>

                {/* Dynamic description with route-based sizing */}
                <p
                    className={cn(
                        'text-gray-100 font-normal',
                        location.pathname === '/'
                            ? 'text-2xl md:text-lg ' // Larger description for home
                            : 'text-sm md:text-lg' // Standard size for other pages
                    )}
                >
                    {description}
                </p>
            </article>

            {/* Optional call-to-action button with navigation */}
            {ctaText && ctaUrl && (
                <Link to={ctaUrl}>
                    <ButtonComponent
                        type="button"
                        className="button-class !h-11 !w-full md:w-[240px]"
                    >
                        <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
                        <span className="p-16-semibold text-white">{ctaText}</span>
                    </ButtonComponent>
                </Link>
            )}
        </header>
    );
};

export default Header;
