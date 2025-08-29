// ========================================
// IMPORTS & DEPENDENCIES
// ========================================

// Authentication and user management imports
import { getAllUsers, getUser } from '~/appwrite/auth';

// Reusable UI components for the dashboard
import { Header, TripCard, StatsCard } from '../../../components';

// TypeScript route types for type safety
import type { Route } from './+types/dashboard';

// Dashboard analytics and statistics functions
import {
    getTripsByTravelStyle, // Fetches trip distribution by travel style (luxury, budget, etc.)
    getUserGrowthPerDay, // Tracks daily user registration growth
    getUsersAndTripsStats, // Calculates overall dashboard statistics
} from '~/appwrite/dashboard';

// Trip data management
import { getAllTrips } from '~/appwrite/trips';

// Utility functions for data parsing and manipulation
import { parseTripData } from '~/lib/utils';

// Syncfusion chart components for data visualization
import {
    Category,
    ChartComponent,
    ColumnSeries,
    DataLabel,
    Inject,
    SeriesCollectionDirective,
    SeriesDirective,
    SplineAreaSeries,
    Tooltip,
} from '@syncfusion/ej2-react-charts';

// Syncfusion grid components for tabular data display
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

// Pre-configured chart axis settings
import { tripXAxis, tripYAxis, userXAxis, useryAxis } from '~/constants';

// ========================================
// DATA LOADER FUNCTION
// ========================================

/**
 * Client-side data loader that fetches all dashboard data in parallel
 * This runs before the component renders to ensure data is available
 * Uses Promise.all for optimal performance by loading data concurrently
 */
export const clientLoader = async () => {
    // Parallel data fetching for better performance
    const [user, dashboardStats, trips, userGrowth, tripsByTravelStyle, AllUsers] =
        await Promise.all([
            await getUser(), // Get current authenticated user
            await getUsersAndTripsStats(), // Fetch overall statistics
            await getAllTrips(4, 0), // Get 4 most recent trips
            await getUserGrowthPerDay(), // Daily user growth data for charts
            await getTripsByTravelStyle(), // Trip distribution by style
            await getAllUsers(4, 0), // Get 4 most recent users
        ]);

    // Transform raw trip data into usable format for UI components
    const allTrips = trips.allTrips.map(({ $id, tripDetail, imageUrls }) => ({
        id: $id,
        ...parseTripData(tripDetail), // Parse JSON trip details into structured data
        imageUrls: imageUrls ?? [], // Ensure imageUrls is always an array
    }));

    // Format user data for grid display with fallback values
    const mappedUsers: UsersItineraryCount[] = AllUsers.users.map((user) => ({
        imageUrl: user.imageUrl,
        name: user.name,
        count: user.itineraryCount ?? Math.floor(Math.random() * 10 + 1), // Fallback for missing data
    }));

    // Return all processed data to the component
    return {
        user, // Current authenticated user data
        dashboardStats, // Overall statistics (users, trips, etc.)
        allTrips, // Processed trip data for cards display
        userGrowth, // Daily user growth for charts
        tripsByTravelStyle, // Trip distribution data for charts
        allUsers: mappedUsers, // Formatted user data for grids
    };
};

// ========================================
// MAIN DASHBOARD COMPONENT
// ========================================

/**
 * Main dashboard component that displays analytics, charts, and data grids
 * Provides an overview of the travel app's performance and user engagement
 */
const dashboard = ({ loaderData }: Route.ComponentProps) => {
    // Extract current user with type safety
    const user = loaderData.user as User | null;

    // Destructure all dashboard data from the loader
    const { dashboardStats, allTrips, userGrowth, tripsByTravelStyle, allUsers } = loaderData;

    // Transform trip data specifically for the interests grid display
    const trips = allTrips.map((trip) => ({
        imageUrl: trip.imageUrls[0], // Use first image as thumbnail
        name: trip.name, // Trip title
        interests: trip.interests, // Trip interests for categorization
    }));

    // Configuration for the data grids at the bottom of the dashboard
    const userAndTrips = [
        {
            title: 'Latest User Signups',
            dataSource: allUsers, // Recent user signups data
            field: 'count', // Field to display (trip count)
            headerText: 'Trips Created', // Column header text
        },
        {
            title: 'Trips based on interests',
            dataSource: trips, // Trip data for interests display
            field: 'interests', // Field to display (interests)
            headerText: 'Interests', // Column header text
        },
    ];

    return (
        <main className="dashboard wrapper">
            {/* ========================================
                HEADER SECTION
                ======================================== */}
            <Header
                title={`Welcome ${user?.name ?? 'Guest'} 🍕`}
                description="Track activity, trends and popular destinations in real time."
            />

            {/* ========================================
                STATISTICS CARDS SECTION
                Display key metrics and trends
                ======================================== */}
            <section className="flex flex-col gap-6">
                <div className="grid grid-col-1 md:grid-cols-3 gap-6 w-full">
                    {/* Total Users Card - Shows user count and monthly growth */}
                    <StatsCard
                        headerTitle="Total Users"
                        total={dashboardStats.totalUsers}
                        currentMonthCount={dashboardStats.usersJoined.currentMonth}
                        lastMonthCount={dashboardStats.usersJoined.lastMonth}
                    />

                    {/* Total Trips Card - Shows trip count and creation trends */}
                    <StatsCard
                        headerTitle="Total Trips"
                        total={dashboardStats.totalTrips}
                        currentMonthCount={dashboardStats.tripsCreated.currentMonth}
                        lastMonthCount={dashboardStats.tripsCreated.lastMonth}
                    />

                    {/* Active Users Card - Shows active user metrics */}
                    <StatsCard
                        headerTitle="Active Users"
                        total={dashboardStats.userRole.total}
                        currentMonthCount={dashboardStats.userRole.currentMonth}
                        lastMonthCount={dashboardStats.userRole.lastMonth}
                    />
                </div>
            </section>

            {/* ========================================
                TRIP CARDS SECTION
                Display recent trips in a grid layout
                ======================================== */}
            <section className="container">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
                <div className="trip-grid">
                    {allTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id.toString()}
                            name={trip.name!} // Trip title
                            imageUrl={trip.imageUrls[0]} // Main trip image
                            location={trip.itinerary?.[0]?.location ?? ''} // First destination
                            tags={[trip.interests!, trip.travelStyle!]} // Trip tags for categorization
                            price={trip.estimatedPrice!} // Trip cost
                        />
                    ))}
                </div>
            </section>

            {/* ========================================
                CHARTS SECTION
                Analytics visualizations for trends
                ======================================== */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8">
                {/* USER GROWTH CHART - Shows daily user registration trends */}
                <ChartComponent
                    id="chart-1"
                    primaryXAxis={{
                        ...userXAxis, // Pre-configured X-axis settings
                        labelStyle: { fontWeight: 'bold' }, // Bold axis labels
                        majorGridLines: { width: 1, color: '#e5e7eb' }, // Subtle grid lines
                    }}
                    primaryYAxis={{
                        ...useryAxis, // Pre-configured Y-axis settings
                        labelStyle: { fontWeight: 'bold' }, // Bold axis labels
                        majorGridLines: { width: 1, color: '#e5e7eb' }, // Subtle grid lines
                    }}
                    title="User Growth"
                    tooltip={{
                        enable: true, // Enable hover tooltips
                        fill: '#fff', // Tooltip background
                        textStyle: { color: '#222', fontWeight: 'bold' }, // Tooltip text styling
                    }}
                    background="#f9fafb" // Light gray chart background
                    chartArea={{ border: { width: 0 } }} // Remove chart border
                    style={{ borderRadius: '16px', boxShadow: '0 2px 12px #e5e7eb' }} // Modern styling
                >
                    {/* Inject required chart services */}
                    <Inject
                        services={[ColumnSeries, SplineAreaSeries, Category, Tooltip, DataLabel]}
                    />
                    <SeriesCollectionDirective>
                        {/* COLUMN SERIES - Shows daily user counts as bars */}
                        <SeriesDirective
                            dataSource={userGrowth} // Data source for chart
                            xName="day" // X-axis field (day)
                            yName="count" // Y-axis field (count)
                            type="Column" // Bar chart type
                            name="Column" // Series name for legend
                            columnWidth={0.4} // Bar width (40% of available space)
                            fill="#06b6d4" // Cyan color for bars
                            cornerRadius={{ topLeft: 12, topRight: 12 }} // Rounded bar tops
                        />

                        {/* SPLINE AREA SERIES - Shows trend line with area fill */}
                        <SeriesDirective
                            dataSource={userGrowth} // Same data source
                            xName="day" // X-axis field (day)
                            yName="count" // Y-axis field (count)
                            type="SplineArea" // Smooth area chart
                            name="Wave" // Series name for legend
                            fill="rgba(71,132,238,0.15)" // Semi-transparent blue fill
                            border={{ width: 4, color: '#38bdf8', dashArray: '0' }} // Solid border line
                            opacity={0.9} // Chart opacity
                            marker={{
                                visible: true, // Show data point markers
                                width: 10, // Marker width
                                height: 10, // Marker height
                                fill: '#38bdf8', // Marker fill color
                                border: { width: 2, color: '#2563eb' }, // Marker border
                                shape: 'Circle', // Circular markers
                            }}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>

                {/* TRIPS TRENDS CHART - Shows trip distribution by travel style */}
                <ChartComponent
                    id="chart-2"
                    primaryXAxis={{
                        ...tripXAxis, // Pre-configured X-axis for trip styles
                        labelStyle: { fontWeight: 'bold' }, // Bold axis labels
                        majorGridLines: { width: 1, color: '#e5e7eb' }, // Subtle grid lines
                    }}
                    primaryYAxis={{
                        ...tripYAxis, // Pre-configured Y-axis for counts
                        labelStyle: { fontWeight: 'bold' }, // Bold axis labels
                        majorGridLines: { width: 1, color: '#e5e7eb' }, // Subtle grid lines
                    }}
                    title="Trips Trends"
                    tooltip={{
                        enable: true, // Enable hover tooltips
                        fill: '#fff', // Tooltip background
                        textStyle: { color: '#222', fontWeight: 'bold' }, // Tooltip text styling
                    }}
                    background="#f9fafb" // Light gray chart background
                    chartArea={{ border: { width: 0 } }} // Remove chart border
                    style={{ borderRadius: '16px', boxShadow: '0 2px 12px #e5e7eb' }} // Modern styling
                >
                    {/* Inject required chart services */}
                    <Inject
                        services={[ColumnSeries, SplineAreaSeries, Category, Tooltip, DataLabel]}
                    />
                    <SeriesCollectionDirective>
                        {/* COLUMN SERIES - Shows trip counts by travel style */}
                        <SeriesDirective
                            dataSource={tripsByTravelStyle} // Trip style distribution data
                            xName="travelStyle" // X-axis field (travel style)
                            yName="count" // Y-axis field (count)
                            type="Column" // Bar chart type
                            name="Travel Style" // Series name for legend
                            columnWidth={0.4} // Bar width (40% of available space)
                            fill="#f59e42" // Orange color for bars
                            cornerRadius={{ topLeft: 12, topRight: 12 }} // Rounded bar tops
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </section>

            {/* ========================================
                DATA GRIDS SECTION
                Display detailed user and trip data
                ======================================== */}
            <section className="user-trip wrapper">
                {/* LATEST USER SIGNUPS GRID */}
                <div className="flex flex-col gap-5">
                    <h3 className="p-20-semibold text-dark-100 ">Latest User Signups</h3>
                    <GridComponent dataSource={allUsers} gridLines="None">
                        <ColumnsDirective>
                            {/* USER NAME COLUMN with avatar and name display */}
                            <ColumnDirective
                                field="name"
                                headerText="Name"
                                width="180"
                                textAlign="Center"
                                template={(props: UserData) => (
                                    <div className="flex items-center gap-2 px-4 justify-center">
                                        <img
                                            src={props.imageUrl}
                                            alt="user"
                                            className="rounded-full size-8 aspect-square border border-gray-200"
                                        />
                                        <span className="truncate max-w-[100px]" title={props.name}>
                                            {props.name}
                                        </span>
                                    </div>
                                )}
                            />

                            {/* TRIP COUNT COLUMN showing number of trips created */}
                            <ColumnDirective
                                field="count"
                                headerText="Trips Created"
                                width="180"
                                textAlign="Center"
                                template={(props: UsersItineraryCount) => (
                                    <span
                                        className="truncate max-w-[120px]"
                                        title={String(props.count)}
                                    >
                                        {props.count}
                                    </span>
                                )}
                            />
                        </ColumnsDirective>
                    </GridComponent>
                </div>

                {/* TRIPS BY INTERESTS GRID */}
                <div className="flex flex-col gap-5">
                    <h3 className="p-20-semibold text-dark-100 ">Trips based on interests</h3>
                    <GridComponent dataSource={trips} gridLines="None">
                        <ColumnsDirective>
                            {/* TRIP NAME COLUMN */}
                            <ColumnDirective
                                field="name"
                                headerText="Name"
                                width="180"
                                textAlign="Center"
                                template={(props: { name: string }) => (
                                    <span className="truncate max-w-[100px]" title={props.name}>
                                        {props.name}
                                    </span>
                                )}
                            />

                            {/* INTERESTS COLUMN with tag display */}
                            <ColumnDirective
                                field="interests"
                                headerText="Interests"
                                width="180"
                                textAlign="Center"
                                template={(props: { interests: string[] | string }) =>
                                    // Handle both array and string interest formats
                                    Array.isArray(props.interests) ? (
                                        <div className="flex flex-wrap gap-1 justify-center">
                                            {props.interests.map((tag: string, idx: number) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 rounded bg-primary-50 text-primary-600 text-xs font-medium"
                                                    title={tag}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span
                                            className="truncate max-w-[120px]"
                                            title={props.interests}
                                        >
                                            {props.interests}
                                        </span>
                                    )
                                }
                            />
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </section>
        </main>
    );
};

// ========================================
// EXPORT
// ========================================

/**
 * Export the dashboard component as the default export
 * This component serves as the main admin dashboard providing:
 * - Real-time statistics and KPIs
 * - Visual analytics through charts
 * - Recent activity data in grids
 * - Trip showcases for quick overview
 */
export default dashboard;
