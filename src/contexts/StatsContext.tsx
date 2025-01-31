import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { SpotifyStream } from '../types/SpotifyData';
import { filterStreamsByDate } from '../utils/filterStreamsByDate';
import { useDataContext } from './DataContext';

// Define interfaces for clarity
interface MostSkippedSong {
    song: string;
    count: number;
}

interface MostSkippedArtist {
    artist: string;
    count: number;
}

interface StatsContextType {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    highestListeningDay: {
        day: string;
        count: number;
        streams: SpotifyStream[];
    } | null;
    mostPlayedSongOnHighestDay: MostSkippedSong | null;
    longestListeningDay: {
        day: string;
        ms: number;
    } | null;
    longestSingleStream: SpotifyStream | null;
    skipStats: {
        total: number;
        mostSkippedSong: MostSkippedSong | null;
        mostSkippedArtist: MostSkippedArtist | null;
    };
    incognitoCount: number;
    favoritePlatform: {
        platform: string;
        count: number;
    } | null;
    offlineStats: {
        count: number;
        ms: number;
    };
    totalListeningTime: number;
    averageSongDuration: number;
    uniqueArtists: number;
    uniqueSongs: number;
    topCountry: {
        country: string;
        count: number;
    } | null;
    mostActiveListeningHour: {
        hour: number;
        count: number;
    } | null;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

// Custom hook for easy access to the context
export const useStatsContext = (): StatsContextType => {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error('useStatsContext must be used within a StatsProvider');
    }
    return context;
};

interface StatsProviderProps {
    children: ReactNode;
}

export const StatsProvider: React.FC<StatsProviderProps> = ({ children }) => {
    const { streams } = useDataContext();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Filter streams by date range
    const filteredStreams = useMemo<SpotifyStream[]>(() => {
        return filterStreamsByDate(streams, startDate, endDate);
    }, [streams, startDate, endDate]);

    // Highest Listening Day (by count)
    const highestListeningDay = useMemo<{ day: string; count: number; streams: SpotifyStream[] } | null>(() => {
        if (filteredStreams.length === 0) return null;

        const dayMap: Record<string, { count: number; streams: SpotifyStream[] }> = {};

        filteredStreams.forEach((s) => {
            const day = s.ts.split(' ')[0];
            if (!dayMap[day]) dayMap[day] = { count: 0, streams: [] };
            dayMap[day].count++;
            dayMap[day].streams.push(s);
        });

        let bestDay = '';
        let maxCount = 0;
        Object.entries(dayMap).forEach(([day, info]) => {
            if (info.count > maxCount) {
                bestDay = day;
                maxCount = info.count;
            }
        });

        if (!bestDay) return null;
        return {
            day: bestDay,
            count: maxCount,
            streams: dayMap[bestDay].streams,
        };
    }, [filteredStreams]);

    // Most-Played Song On That Highest Listening Day
    const mostPlayedSongOnHighestDay = useMemo<MostSkippedSong | null>(() => {
        if (!highestListeningDay) return null;
        const { streams } = highestListeningDay;

        const songMap: Record<string, number> = {};
        streams.forEach((s) => {
            if (s.master_metadata_track_name) songMap[s.master_metadata_track_name] = (songMap[s.master_metadata_track_name] || 0) + 1;
        });

        let topSong: string = '';
        let topCount: number = 0;
        Object.entries(songMap).forEach(([song, count]) => {
            if (count > topCount) {
                topSong = song;
                topCount = count;
            }
        });

        if (!topSong) return null;
        return { song: topSong, count: topCount };
    }, [highestListeningDay]);

    // Longest Listening Day (by total ms_played)
    const longestListeningDay = useMemo<{ day: string; ms: number } | null>(() => {
        if (filteredStreams.length === 0) return null;

        const dayMsMap: Record<string, number> = {};
        filteredStreams.forEach((s) => {
            const day = s.ts.split(' ')[0];
            dayMsMap[day] = (dayMsMap[day] || 0) + s.ms_played;
        });

        let bestDay = '';
        let maxMs = 0;
        Object.entries(dayMsMap).forEach(([day, msSum]) => {
            if (msSum > maxMs) {
            bestDay = day;
            maxMs = msSum;
            }
        });

        if (!bestDay) return null;
        return { day: bestDay, ms: maxMs };
    }, [filteredStreams]);

    // Longest Single-Track Session (max ms_played in one stream)
    const longestSingleStream = useMemo<SpotifyStream | null>(() => {
        if (filteredStreams.length === 0) return null;

        let maxStream: SpotifyStream | null = null;
        let maxMs = 0;

        filteredStreams.forEach((s) => {
            if (s.ms_played > maxMs) {
                maxMs = s.ms_played;
                maxStream = s;
            }
        });

        return maxStream;
    }, [filteredStreams]);

    // Skip Stats (total, most skipped song, most skipped artist)
    const skipStats = useMemo<{
        total: number;
        mostSkippedSong: MostSkippedSong | null;
        mostSkippedArtist: MostSkippedArtist | null;
    }>(() => {
        const skippedStreams = filteredStreams.filter((s) => s.skipped === true);
        const total = skippedStreams.length;
        if (total === 0) {
            return {
                total: 0,
                mostSkippedSong: null,
                mostSkippedArtist: null,
            };
        }

        // Count how many times each song was skipped
        const songMap: Record<string, number> = {};
        // Count how many times each artist was skipped
        const artistMap: Record<string, number> = {};

        skippedStreams.forEach((s) => {
            if (s.master_metadata_track_name) songMap[s.master_metadata_track_name] = (songMap[s.master_metadata_track_name] || 0) + 1;
            if (s.master_metadata_album_artist_name) artistMap[s.master_metadata_album_artist_name] = (artistMap[s.master_metadata_album_artist_name] || 0) + 1;
        });

        // Find the top song
        let mostSkippedSong: MostSkippedSong | null = null;
        let songMaxCount = 0;
        Object.entries(songMap).forEach(([song, count]) => {
            if (count > songMaxCount) {
                songMaxCount = count;
                mostSkippedSong = { song, count };
            }
        });

        // Find the top artist
        let mostSkippedArtist: MostSkippedArtist | null = null;
        let artistMaxCount = 0;
        Object.entries(artistMap).forEach(([artist, count]) => {
            if (count > artistMaxCount) {
                artistMaxCount = count;
                mostSkippedArtist = { artist, count };
            }
        });

        return {
            total,
            mostSkippedSong,
            mostSkippedArtist,
        };
    }, [filteredStreams]);

    // Incognito Streams
    const incognitoCount = useMemo<number>(() => {
        return filteredStreams.filter((s) => s.incognito_mode === true).length;
    }, [filteredStreams]);

    // Favorite Platform (by usage count)
    const favoritePlatform = useMemo<{ platform: string; count: number } | null>(() => {
        if (filteredStreams.length === 0) return null;
        const platformMap: Record<string, number> = {};
        filteredStreams.forEach((s) => {
            if (s.platform) {
                platformMap[s.platform] = (platformMap[s.platform] || 0) + 1;
            }
        });

        let bestPlatform = '';
        let maxCount = 0;
        Object.entries(platformMap).forEach(([plt, count]) => {
            if (count > maxCount) {
                bestPlatform = plt;
                maxCount = count;
            }
        });

        return bestPlatform ? { platform: bestPlatform, count: maxCount } : null;
    }, [filteredStreams]);

    // Offline Stats
    const offlineStats = useMemo<{
        count: number;
        ms: number;
    }>(() => {
        const offlineStreams = filteredStreams.filter((s) => s.offline === true);
        const totalOffline = offlineStreams.length;
        const totalOfflineMs = offlineStreams.reduce((acc, s) => acc + s.ms_played, 0);

        return {
            count: totalOffline,
            ms: totalOfflineMs,
        };
    }, [filteredStreams]);

    // Total Listening Time
    const totalListeningTime = useMemo<number>(() => {
        return filteredStreams.reduce((acc, s) => acc + s.ms_played, 0);
    }, [filteredStreams]);

    // Average Song Duration Played
    const averageSongDuration = useMemo<number>(() => {
        if (filteredStreams.length === 0) return 0;
            
        return filteredStreams.reduce((acc, s) => acc + s.ms_played, 0) / filteredStreams.length;
    }, [filteredStreams]);

    // 11. Number of Unique Artists and Songs
    const uniqueArtists = useMemo<number>(() => {
        const artistSet = new Set<string>();
        filteredStreams.forEach((s) => {
            if (s.master_metadata_album_artist_name) {
                artistSet.add(s.master_metadata_album_artist_name);
            }
        });
        return artistSet.size;
    }, [filteredStreams]);

    const uniqueSongs = useMemo<number>(() => {
        const songSet = new Set<string>();
        filteredStreams.forEach((s) => {
            if (s.master_metadata_track_name) {
                songSet.add(s.master_metadata_track_name);
            }
        });
        return songSet.size;
    }, [filteredStreams]);

    // 12. Top Country of Connection
    const topCountry = useMemo<{ country: string; count: number } | null>(() => {
        if (filteredStreams.length === 0) return null;
        const countryMap: Record<string, number> = {};
        filteredStreams.forEach((s) => {
            if (s.conn_country) {
                countryMap[s.conn_country] = (countryMap[s.conn_country] || 0) + 1;
            }
        });

        let bestCountry = '';
        let maxCount = 0;
        Object.entries(countryMap).forEach(([country, count]) => {
            if (count > maxCount) {
                bestCountry = country;
                maxCount = count;
            }
        });

        return bestCountry ? { country: bestCountry, count: maxCount } : null;
    }, [filteredStreams]);

    // 13. Most Active Listening Hour
    const mostActiveListeningHour = useMemo<{ hour: number; count: number } | null>(() => {
        if (filteredStreams.length === 0) return null;
        const hourMap: Record<number, number> = {};
        filteredStreams.forEach((s) => {
            const date = new Date(s.ts);
            const hour = date.getHours();
            hourMap[hour] = (hourMap[hour] || 0) + 1;
        });

        let bestHour = 0;
        let maxCount = 0;
        Object.entries(hourMap).forEach(([hour, count]) => {
            const hr = Number(hour);
            if (count > maxCount) {
                bestHour = hr;
                maxCount = count;
            }
        });

        return { hour: bestHour, count: maxCount };
    }, [filteredStreams]);

    const value: StatsContextType = {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
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
    };

    return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};
