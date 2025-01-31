import { SpotifyStream } from '../types/SpotifyData';

export function filterStreamsByDate(streams: SpotifyStream[], startDate: string, endDate: string): SpotifyStream[] {
    if (!startDate || !endDate) return streams;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return streams.filter((stream) => {
        const streamDate = new Date(stream.ts); // "YYYY-MM-DD HH:mm:ss"
        return streamDate >= start && streamDate <= end;
    });
}
