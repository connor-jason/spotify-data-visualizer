import React, { createContext, useContext, useState } from 'react';
import { SpotifyStream } from '../types/SpotifyData';

// Context type
interface DataContextProps {
    streams: SpotifyStream[];
    setStreams: React.Dispatch<React.SetStateAction<SpotifyStream[]>>;
}

// Create context
const DataContext = createContext<DataContextProps>({
    streams: [],
    setStreams: () => {},
});

// Provider
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [streams, setStreams] = useState<SpotifyStream[]>([]); // State to hold the streams

    return (
        <DataContext.Provider value={{ streams, setStreams }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom hook
export const useDataContext = () => useContext(DataContext);
