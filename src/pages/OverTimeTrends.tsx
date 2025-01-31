import React from 'react';
import { useDataContext } from '../contexts/DataContext';
import PlaysOverTimeChart from '../charts/PlaysOverTimeChart';

interface DayCount {
    day: string;
    count: number;
}

const OverTimeTrends: React.FC = () => {
    const { streams } = useDataContext();

    // Compute daily plays from streams
    const dailyPlays = React.useMemo(() => {
        const playsMap: Record<string, number> = {};

        streams.forEach(stream => {
            const day = stream.ts.split(' ')[0];
            playsMap[day] = (playsMap[day] || 0) + 1;
        });

        const result: DayCount[] = Object.entries(playsMap).map(([day, count]) => ({
            day,
            count,
        }));

        // Sort the result by day ascending
        result.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

        return result;
    }, [streams]);

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl text-center text-spotify-green font-bold mb-6">Plays Over Time</h1>

            {dailyPlays.length > 0 ? (
                <PlaysOverTimeChart data={dailyPlays} threshold={1000} />
            ) : (
                <p className="text-spotify-lightGray text-center">No data found.</p>
            )}
        </div>
    );
};

export default OverTimeTrends;
