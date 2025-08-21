import { Header, TripCard, StatsCard } from '../../../components';

const dashboard = () => {
    const user = { name: 'Gray Doe' };
    const dashboardStats = {
        totalUsers: 12500,
        usersJoined: { currentMonth: 213, lastMonth: 198 },
        totalTrips: 3231,
        tripsCreated: { currentMonth: 120, lastMonth: 250 },
        userRole: { total: 40, currentMonth: 15, lastMonth: 15 },
    };

    const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

    return (
        <main className="dashboard wrapper">
            <Header
                title={`Welcome ${user?.name ?? 'Guest'} 🍕`}
                description="Track activity, trends and popular destinations in real time."
            />
            <section className="flex flex-col gap-6">
                <div className="grid grid-col-1 md:grid-cols-3 gap-6 w-full">
                    <StatsCard
                        headerTitle="Total Users"
                        total={totalUsers}
                        currentMonthCount={usersJoined.currentMonth}
                        lastMonthCount={usersJoined.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Total Trips"
                        total={totalTrips}
                        currentMonthCount={tripsCreated.currentMonth}
                        lastMonthCount={tripsCreated.lastMonth}
                    />
                    <StatsCard
                        headerTitle="Active Users"
                        total={userRole.total}
                        currentMonthCount={userRole.currentMonth}
                        lastMonthCount={userRole.lastMonth}
                    />
                </div>
            </section>
            <TripCard />
        </main>
    );
};

export default dashboard;
