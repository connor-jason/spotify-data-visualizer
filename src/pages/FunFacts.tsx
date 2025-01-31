import React from 'react';
import { useStatsContext } from '../contexts/StatsContext';

const FunFacts: React.FC = () => {
    const {
        highestListeningDay,
        mostPlayedSongOnHighestDay,
        longestListeningDay,
        longestSingleStream,
        skipStats,
        incognitoCount,
        favoritePlatform,
        offlineStats,
        totalListeningTime,
        averageSongDuration,
        uniqueArtists,
        uniqueSongs,
        topCountry,
        mostActiveListeningHour,
    } = useStatsContext();

  return (
        <div className="px-4 py-6">
            <h1 className="text-3xl text-center text-spotify-green font-bold mb-6">Fun Facts</h1>

            {highestListeningDay === null && longestListeningDay === null && longestSingleStream === null && skipStats.total === 0 && incognitoCount === 0 && !favoritePlatform && offlineStats.count === 0 && totalListeningTime === 0 && averageSongDuration === 0 && uniqueArtists === 0 && uniqueSongs === 0 && topCountry === null && mostActiveListeningHour === null ? (
                <p className="text-spotify-lightGray text-center">No data in this date range.</p>
            ) : (
                <div className="text-spotify-lightGray space-y-6 max-w-3xl mx-auto">
                {/* Highest Listening Day (Count) */}
                {highestListeningDay && (
                    <div className="bg-spotify-dark p-4 rounded shadow">
                        <h2 className="text-xl text-spotify-green mb-2">Highest Listening Day (by Count)</h2>
                        <p>
                            <strong>Date:</strong> {highestListeningDay.day}
                            <br />
                            <strong>Streams:</strong> {highestListeningDay.count}
                        </p>
                        {mostPlayedSongOnHighestDay && mostPlayedSongOnHighestDay.song && (
                            <p className="mt-2">
                            <strong>Most-Played Song on {highestListeningDay.day}:</strong>{' '}
                                {mostPlayedSongOnHighestDay.song} ({mostPlayedSongOnHighestDay.count} plays)
                            </p>
                        )}
                    </div>
                )}

                {/* Longest Listening Day (ms_played) */}
                {longestListeningDay && (
                    <div className="bg-spotify-dark p-4 rounded shadow">
                        <h2 className="text-xl text-spotify-green mb-2">
                            Longest Listening Day (by Total Duration)
                        </h2>
                        <p>
                            <strong>Date:</strong> {longestListeningDay.day}
                            <br />
                            <strong>Total ms_played:</strong>{' '}
                            {longestListeningDay.ms.toLocaleString()} ms
                        </p>
                        <p className="text-sm text-gray-300">
                            (~{(longestListeningDay.ms / 60000).toFixed(2)} minutes)
                        </p>
                    </div>
                )}

                {/* Longest Single-Track Session */}
                {longestSingleStream && (
                    <div className="bg-spotify-dark p-4 rounded shadow">
                        <h2 className="text-xl text-spotify-green mb-2">Longest Single-Track Session</h2>
                        <p>
                            <strong>Track:</strong>{' '}
                                {longestSingleStream.master_metadata_track_name || 'Unknown Track'}
                            <br />
                            <strong>Artist:</strong>{' '}
                                {longestSingleStream.master_metadata_album_artist_name || 'Unknown Artist'}
                            <br />
                            <strong>Duration (ms):</strong>{' '}
                                {longestSingleStream.ms_played.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-300">
                            (~{(longestSingleStream.ms_played / 60000).toFixed(2)} minutes)
                        </p>
                        <p className="mt-2 text-sm">Played on: {longestSingleStream.ts}</p>
                    </div>
                )}

                {/* Skip Stats (Total, Most Skipped Song, Most Skipped Artist) */}
                <div className="bg-spotify-dark p-4 rounded shadow">
                    <h2 className="text-xl text-spotify-green mb-2">Skip Stats</h2>
                    <p>
                        You skipped <strong>{skipStats.total}</strong> times in this range.
                    </p>
                        {skipStats.mostSkippedSong && (
                    <p className="mt-2">
                        <strong>Most Skipped Song:</strong> {skipStats.mostSkippedSong.song}{' '}
                        ({skipStats.mostSkippedSong.count} time{skipStats.mostSkippedSong.count !== 1 ? 's' : ''})
                    </p>
                    )}
                    {skipStats.mostSkippedArtist && (
                    <p className="mt-2">
                        <strong>Most Skipped Artist:</strong> {skipStats.mostSkippedArtist.artist}{' '}
                        ({skipStats.mostSkippedArtist.count} time{skipStats.mostSkippedArtist.count !== 1 ? 's' : ''})
                    </p>
                    )}
                </div>

                {/* Incognito Listening */}
                <div className="bg-spotify-dark p-4 rounded shadow">
                    <h2 className="text-xl text-spotify-green mb-2">Incognito Listening</h2>
                    <p>
                        You listened in <strong>incognito mode</strong> <strong>{incognitoCount}</strong> time{incognitoCount !== 1 ? 's' : ''}.
                    </p>
                </div>

                {/* Favorite Platform */}
                {favoritePlatform && (
                    <div className="bg-spotify-dark p-4 rounded shadow">
                        <h2 className="text-xl text-spotify-green mb-2">Favorite Platform</h2>
                        <p>
                            <strong>{favoritePlatform.platform}</strong> was used{' '}
                            <strong>{favoritePlatform.count}</strong> time{favoritePlatform.count !== 1 ? 's' : ''}.
                        </p>
                    </div>
                )}

                {/* Offline Listening Stats */}
                <div className="bg-spotify-dark p-4 rounded shadow">
                    <h2 className="text-xl text-spotify-green mb-2">Offline Listening</h2>
                    <p>
                        Total offline streams: <strong>{offlineStats.count}</strong>
                    <br />
                        Total offline ms_played:{' '}
                    <strong>{offlineStats.ms.toLocaleString()}</strong> ms
                    <br />
                        (~{(offlineStats.ms / 60000).toFixed(2)} minutes)
                    </p>
                </div>

                {/* Total Listening Time */}
                <div className="bg-spotify-dark p-4 rounded shadow">
                    <h2 className="text-xl text-spotify-green mb-2">Total Listening Time</h2>
                    <p>
                        You have listened for a total of <strong>{totalListeningTime.toLocaleString()}</strong> ms
                    <br />
                        (~{(totalListeningTime / 60000).toFixed(2)} minutes)
                    </p>
                </div>

                {/* Average Song Duration Played */}
                <div className="bg-spotify-dark p-4 rounded shadow">
                    <h2 className="text-xl text-spotify-green mb-2">Average Song Duration Played</h2>
                    <p>
                        On average, you listened to each song for <strong>{averageSongDuration.toFixed(2)}</strong> ms
                    <br />
                        (~{(averageSongDuration / 60000).toFixed(2)} minutes)
                    </p>
                </div>

                {/* Number of Unique Artists and Songs */}
                <div className="bg-spotify-dark p-4 rounded shadow">
                    <h2 className="text-xl text-spotify-green mb-2">Diversity of Your Listening</h2>
                    <p>
                        <strong>Unique Artists:</strong> {uniqueArtists}
                        <br />
                        <strong>Unique Songs:</strong> {uniqueSongs}
                    </p>
                </div>

                {/* Top Country of Connection */}
                {topCountry && (
                    <div className="bg-spotify-dark p-4 rounded shadow">
                        <h2 className="text-xl text-spotify-green mb-2">Top Country of Connection</h2>
                        <p>
                            <strong>{topCountry.country}</strong> was your top connection country with{' '}
                            <strong>{topCountry.count}</strong> streams.
                        </p>
                    </div>
                )}

                {/* Most Active Listening Hour */}
                {mostActiveListeningHour && (
                    <div className="bg-spotify-dark p-4 rounded shadow">
                        <h2 className="text-xl text-spotify-green mb-2">Most Active Listening Hour</h2>
                        <p>
                            Your peak listening hour was <strong>{mostActiveListeningHour.hour}:00</strong> with{' '}
                            <strong>{mostActiveListeningHour.count}</strong> streams.
                        </p>
                    </div>
                )}
                </div>
            )}
        </div>
    );
};

export default FunFacts;
