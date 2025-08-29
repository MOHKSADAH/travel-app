// React Router hooks for navigation and location detection
import { Link, useLocation } from 'react-router';
// Syncfusion UI components for tag/chip display
import { ChipListComponent, ChipDirective, ChipsDirective } from '@syncfusion/ej2-react-buttons';
// Utility functions for string manipulation and class merging
import { getFirstWord, cn } from '~/lib/utils';

/**
 * TripCard Component Props
 * Defines the structure of data needed to render a trip card
 */
interface TripCardProps {
    id: string; // Unique identifier for the trip
    name: string; // Name/title of the trip
    location: string; // Destination location
    imageUrl: string; // URL for trip thumbnail image
    tags: string[]; // Array of tags/categories
    price: string; // Formatted price string
}

/**
 * TripCard Component
 *
 * Displays a clickable card showing trip information with consistent styling.
 * Used in trip listings, search results, and recommendations.
 *
 * Features:
 * - Responsive image display
 * - Dynamic route-based navigation
 * - Tag chips with alternating colors
 * - Price indicator pill
 * - Location display with icon
 *
 * @param props - TripCardProps containing trip details
 */
const TripCard = ({ id, name, location, imageUrl, tags, price }: TripCardProps) => {
    // Get current location for dynamic routing
    const path = useLocation();

    return (
        <Link
            to={
                // Dynamic routing based on current path
                path.pathname === '/' || path.pathname.startsWith('/travel')
                    ? `/travel/${id}` // User-facing trip details
                    : `/trips/${id}` // Admin trip management
            }
            className="trip-card"
        >
            {/* Trip thumbnail image */}
            <img src={imageUrl} alt={name} />

            {/* Trip title and location section */}
            <article>
                <h2>{name}</h2>
                <figure>
                    <img src="/assets/icons/location-mark.svg" alt="Location" className="size-4" />
                    <figcaption>{location}</figcaption>
                </figure>
            </article>

            {/* Tags/categories section with color-coded chips */}
            <div className="mt-5 pl-[18px] pr-3.5 pb-5">
                <ChipListComponent id="travel-chip">
                    <ChipsDirective>
                        {tags?.map((tag, index) => (
                            <ChipDirective
                                key={index}
                                text={getFirstWord(tag)}
                                cssClass={cn(
                                    // Alternate between pink and green for visual variety
                                    index === 1
                                        ? '!bg-pink-50 !text-pink-500'
                                        : '!bg-success-50 !text-success-700'
                                )}
                            />
                        ))}
                    </ChipsDirective>
                </ChipListComponent>
            </div>

            {/* Price indicator pill */}
            <article className="tripCard-pill">{price}</article>
        </Link>
    );
};

export default TripCard;
