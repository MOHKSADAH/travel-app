// React Router types for loader function
import type { LoaderFunctionArgs } from 'react-router';
// Appwrite service functions for trip data
import { getAllTrips, getTripById } from '~/appwrite/trips';
// Route type definitions
import type { Route } from './+types/trip-detail';
// Utility functions for styling and data parsing
import { cn, getFirstWord, parseTripData } from '~/lib/utils';
// Reusable UI components
import Header from 'components/Header';
import { InfoPill, TripCard } from 'components';
// Syncfusion UI components for tags/chips
import {
    Chip,
    ChipDirective,
    ChipListComponent,
    ChipsDirective,
} from '@syncfusion/ej2-react-buttons';

/**
 * Data Loader for Trip Detail Page
 *
 * Fetches detailed information for a specific trip and related trips
 * for recommendations. Handles data transformation for UI consumption.
 *
 * Features:
 * - Parallel data loading for performance
 * - Trip detail retrieval by ID
 * - Related trips fetching
 * - Data parsing and transformation
 *
 * @param params - URL parameters containing tripId
 * @returns Processed trip data and related trips
 */
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    // Validate required tripId parameter
    if (!tripId) throw new Error('Trip ID is required');

    // Parallel fetch of trip details and related trips
    const [trip, trips] = await Promise.all([
        getTripById(tripId), // Main trip details
        getAllTrips(4, 0), // 4 related trips for recommendations
    ]);

    // Process and return formatted data
    return {
        trip, // Main trip details
        allTrips: trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
            id: $id,
            ...parseTripData(tripDetail), // Parse JSON trip data
            imageUrls: imageUrls ?? [], // Ensure imageUrls exists
        })),
    };
};

/**
 * Trip Detail Component
 *
 * Displays comprehensive information about a specific trip.
 * Shows trip details, itinerary, images, and related recommendations.
 *
 * Features:
 * - Photo gallery with featured image
 * - Day-by-day itinerary
 * - Trip categorization tags
 * - Weather and timing information
 * - Related trip recommendations
 *
 * @param props - Route component props containing trip data
 */
const TripDetail = ({ loaderData }: Route.ComponentProps) => {
    // Parse trip data and extract image URLs
    const tripData = parseTripData(loaderData?.trip?.tripDetail);
    const imageUrls = loaderData?.trip?.imageUrls || [];

    // Destructure trip details for easy access
    const {
        name, // Trip title
        duration, // Trip length in days
        itinerary, // Daily activities
        travelStyle, // Travel style (luxury, adventure, etc.)
        groupType, // Group size/type
        budget, // Budget category
        interests, // Trip focus/activities
        estimatedPrice, // Cost estimate
        description, // Trip overview
        bestTimeToVisit, // Seasonal recommendations
        weatherInfo, // Climate information
        country, // Destination country
    } = tripData || {};

    // Extract related trips for recommendations
    const allTrips = loaderData.allTrips as Trip[] | [];

    /**
     * Configuration for category pills/tags
     * Each item includes text and background styling
     */
    const pillItems = [
        { text: travelStyle, bg: '!bg-pink-50 !text-red-400' }, // Style tag
        { text: groupType, bg: '!bg-primary-50 !text-primary-500' }, // Group tag
        { text: budget, bg: '!bg-success-50 !text-success-700' }, // Budget tag
        { text: interests, bg: '!bg-navy-50 !text-navy-600' }, // Interest tag
    ];

    /**
     * Timing and weather information sections
     * Grouped for consistent rendering
     */
    const visitTimeAndWeatherInfo = [
        { title: 'Best Time to Visit:', content: bestTimeToVisit },
        { title: 'Weather Information:', content: weatherInfo },
    ];

    return (
        <main className="travel-detail wrapper">
            {/* Page Header */}
            <Header
                title="Trip Details"
                description="View and edit AI-generated travel itineraries"
            />

            <section className="container wrapper-md">
                {/* Trip Title and Quick Info */}
                <header>
                    <h1 className="p-40-semibold text-dark-100 ">{name}</h1>
                    <div className="flex items-center gap-5">
                        {/* Duration indicator */}
                        <InfoPill
                            text={`${duration} day plan`}
                            image="/assets/icons/calendar.svg"
                        />
                        {/* Main destinations (first 3) */}
                        <InfoPill
                            text={
                                itinerary
                                    ?.slice(0, 3)
                                    .map((item) => item.location)
                                    .join(', ') || ''
                            }
                            image="/assets/icons/location-mark.svg"
                        />
                    </div>
                </header>

                {/* Photo Gallery Grid */}
                <section className="gallery">
                    {imageUrls.map((url: string, i: number) => (
                        <img
                            src={url}
                            key={i}
                            className={cn(
                                'w-full rounded-xl object-cover',
                                // First image is larger (feature image)
                                i === 0
                                    ? 'md: col-span-2 md: row-span-2 h-[330px]'
                                    : 'md:row-span-1 h-[150px]'
                            )}
                        />
                    ))}
                </section>
                {/* Trip Categories and Rating Section */}
                <section className="flex gap-3 md:gap-5 items-center flex-wrap">
                    {/* Category Tags */}
                    <ChipListComponent id="travel-chip">
                        <ChipsDirective>
                            {pillItems.map((pill, i) => (
                                <ChipDirective
                                    key={i}
                                    text={getFirstWord(pill.text)}
                                    cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                                />
                            ))}
                        </ChipsDirective>
                    </ChipListComponent>

                    {/* Rating Stars */}
                    <ul className="flex gap-1 items-center">
                        {Array(5)
                            .fill('null')
                            .map((_, index) => (
                                <li key={index}>
                                    <img
                                        src="/assets/icons/star.svg"
                                        alt="Star"
                                        className="size-[18px]"
                                    />
                                </li>
                            ))}
                        {/* Rating Score Chip */}
                        <li className="ml-1">
                            <ChipListComponent>
                                <ChipsDirective>
                                    <ChipDirective text="4.9/5" cssClass="!bg-black !text-white" />
                                </ChipsDirective>
                            </ChipListComponent>
                        </li>
                    </ul>

                    {/* Trip Summary Section */}
                    <section className="title">
                        <article>
                            {/* Trip Title with Key Details */}
                            <h3>
                                {duration}-Day {country} {travelStyle} Trip
                            </h3>
                            {/* Trip Categories */}
                            <p>
                                {budget}, {groupType} and {interests}
                            </p>
                        </article>
                        {/* Price Display */}
                        <h2 style={{ marginLeft: '170px' }}>{estimatedPrice}</h2>
                    </section>

                    {/* Trip Description */}
                    <p className="text-sm md:text-lg font-normal text-dark-500">{description}</p>

                    {/* Day-by-Day Itinerary Section */}
                    <ul className="itinerary space-y-8">
                        {itinerary?.map((dayPlan: DayPlan, index: number) => (
                            <li key={index} className="mb-8">
                                {/* Day Header with Location */}
                                <h3 className="text-xl font-semibold mb-4">
                                    Day{dayPlan.day} : {dayPlan.location}
                                </h3>
                                {/* Daily Activities */}
                                <ul className="space-y-6 pl-4">
                                    {dayPlan.activities.map((activity, index: number) => (
                                        <li key={index} className="flex flex-col">
                                            {/* Activity Time */}
                                            <div className="p-18-bold font-semibold mb-2">
                                                {activity.time}
                                            </div>
                                            {/* Activity Description */}
                                            <p className="pl-6 text-dark-500">
                                                {activity.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    {/* Visit Time and Weather Information */}
                    {visitTimeAndWeatherInfo.map((section) => (
                        <section key={section.title} className="visit">
                            <h3 className="font-semibold">{section.title}</h3>
                            <ul className="space-y-3 px-3">
                                {section.content?.map((item) => (
                                    <li key={item}>
                                        <p className="flex-grow">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </section>
            </section>

            {/* Related Trips Section */}
            <section className="flex flex-col gap-6">
                <h2 className="p-24-semibold text-dark-200">Popular Trips</h2>
                {/* Grid of Related Trip Cards */}
                <div className="trip-grid">
                    {allTrips.map(
                        ({
                            id,
                            name,
                            imageUrls,
                            itinerary,
                            interests,
                            travelStyle,
                            estimatedPrice,
                        }) => (
                            <TripCard
                                id={id}
                                key={id}
                                name={name}
                                location={itinerary?.[0]?.location ?? ''} // First destination
                                imageUrl={imageUrls[0]} // Primary image
                                tags={[interests, travelStyle]} // Trip categories
                                price={estimatedPrice} // Trip cost
                            />
                        )
                    )}
                </div>
            </section>
        </main>
    );
};

export default TripDetail;
