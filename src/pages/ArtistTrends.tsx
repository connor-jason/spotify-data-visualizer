import React from 'react';
import { useDataContext } from '../contexts/DataContext';
import { SpotifyStream } from '../types/SpotifyData';
import TopArtistsChart from '../charts/TopArtistsCharts';

const ArtistTrends: React.FC = () => {
    const { streams } = useDataContext();

    // Count total plays per artist
    const topArtists = React.useMemo(() => {
        const artistMap: Record<string, number> = {};

        streams.forEach((s: SpotifyStream) => {
            const artist = s.master_metadata_album_artist_name;
            if (artist) {
                artistMap[artist] = (artistMap[artist] || 0) + 1;
            }
        });

        const arr = Object.entries(artistMap).map(([artist, count]) => ({ artist, count }));
        arr.sort((a, b) => b.count - a.count);
        return arr.slice(0, 10);
    }, [streams]);

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl text-center text-spotify-green font-bold mb-6">Top Artists</h1>

            {topArtists.length > 0 ? (
                <TopArtistsChart data={topArtists} />
            ) : (
                <p className="text-spotify-lightGray text-center">No data found.</p>
            )}
        </div>
    );
};

export default ArtistTrends;
