import React from 'react';
import { useDataContext } from '../contexts/DataContext';
import { SpotifyStream } from '../types/SpotifyData';
import TopSongsChart from '../charts/TopSongsChart';

const SongTrends: React.FC = () => {
    const { streams } = useDataContext();

    // Count total plays per song
    const topSongs = React.useMemo(() => {
        const songMap: Record<string, number> = {};

        streams.forEach((s: SpotifyStream) => {
            const track = s.master_metadata_track_name;
            if (track) {
                songMap[track] = (songMap[track] || 0) + 1;
            }
        });

        const arr = Object.entries(songMap).map(([song, count]) => ({ song, count }));
        arr.sort((a, b) => b.count - a.count);
        return arr.slice(0, 10);
    }, [streams]);

  return (
        <div className="px-4 py-6">
            <h1 className="text-3xl text-center text-spotify-green font-bold mb-6">Top Songs</h1>

            {topSongs.length > 0 ? (
                <TopSongsChart data={topSongs} />
            ) : (
                <p className="text-spotify-lightGray text-center">No data found.</p>
            )}
        </div>
    );
};

export default SongTrends;
