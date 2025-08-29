// Utility functions for trend calculation and class name merging
import { calculateTrendPercentage, cn } from '~/lib/utils';

/**
 * StatsCard Component Props
 * Defines the data structure for displaying metric statistics
 */
interface StatsCard {
    headerTitle: string; // Title of the metric
    total: number; // Total count/value of the metric
    lastMonthCount: number; // Previous month's count
    currentMonthCount: number; // Current month's count
}

/**
 * StatsCard Component
 *
 * Displays a metric card with month-over-month trend comparison.
 * Used in dashboard to show key performance indicators (KPIs).
 *
 * Features:
 * - Visual trend indicators (up/down arrows)
 * - Color-coded percentage changes
 * - Responsive layout with trend visualization
 * - Month-over-month comparison
 *
 * @param props - StatsCard interface properties
 */
const StatsCard = ({ headerTitle, total, lastMonthCount, currentMonthCount }: StatsCard) => {
    // Calculate trend direction and percentage change
    const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);

    // Flag for visual indication of negative trends
    const isDecrement = trend === 'decrement';

    return (
        <article className="stats-card">
            {/* Metric title */}
            <h3 className="text-base font-medium">{headerTitle}</h3>

            <div className="content">
                <div className="flex flex-col gap-4">
                    {/* Total metric value */}
                    <h2 className="text-4xl font-semibold">{total}</h2>

                    {/* Trend comparison section */}
                    <div className="flex items-center gap-2 ">
                        <figure className="flex items-center gap-1">
                            {/* Dynamic trend arrow icon */}
                            <img
                                src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`}
                                className="size-5"
                                alt="arrow"
                            />
                            {/* Percentage change with dynamic styling */}
                            <figcaption
                                className={cn(
                                    'text-sm font-medium',
                                    // Color-code based on trend direction
                                    isDecrement ? 'text-red-500' : 'text-success-700'
                                )}
                            >
                                {Math.round(percentage)}%
                            </figcaption>
                        </figure>
                        <p className="text-sm font-medium text-gray-100 truncate">vs last Month</p>
                    </div>
                </div>
                {/* Trend visualization graph */}
                <img
                    src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`}
                    className="xl:w-32 w-full h-full md:h-32 xl:h-full"
                    alt="trend graph"
                />
            </div>
        </article>
    );
};

export default StatsCard;
