import React, { useMemo } from 'react';
import { useDataContext } from '../DataContext';
import { SpotifyStream } from '../types/SpotifyData';
import TopArtistsChart from '../charts/TopArtistCharts';

const ArtistTrends: React.FC = () => {
  const { streams } = useDataContext();

  // Count total plays per artist
  const topArtists = useMemo(() => {
    const artistMap: Record<string, number> = {};

    streams.forEach((stream: SpotifyStream) => {
      if (stream.master_metadata_album_artist_name) {
        const artist = stream.master_metadata_album_artist_name;
        // If artist not in map, initialize to 0 then increment by 1
        if (!artistMap[artist]) {
          artistMap[artist] = 0;
        }
        artistMap[artist]++;
      }
    });

    // Convert to array and sort
    const arr = Object.entries(artistMap).map(([artist, count]) => ({ artist, count }));
    arr.sort((a, b) => b.count - a.count); // Sort by count descending

    // Take top 10 for the chart
    return arr.slice(0, 10);
  }, [streams]);

  return (
    <div>
      <h2 className="text-2xl mb-4 text-spotify-green text-center font-bold">Top Artists</h2>
      {topArtists.length > 0 ? (
        <TopArtistsChart data={topArtists} />
      ) : (
        <p className="text-spotify-lightGray">No JSON data found. Please upload your files on the home page.</p>
      )}
    </div>
  );
};

export default ArtistTrends;
