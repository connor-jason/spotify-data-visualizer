import React from 'react';
import { SpotifyStream } from '../types/SpotifyData';
import { useDataContext } from '../DataContext';

const Home: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const { setStreams } = useDataContext();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const files = Array.from(e.target.files).filter((file) => file.name.endsWith('.json'));
  setFiles(files);

  const newStreams: SpotifyStream[] = [];

  for (const file of files) {
    try {
      const data = await file.text(); // Read the file contents as text
      const json = JSON.parse(data); // Parse the JSON

      // Ensure the JSON is an array of SpotifyStream objects
      if (Array.isArray(json)) {
        json.forEach((track: any) => {
          if (track && track.ts) {
            // Push valid streams into the newStreams array
            newStreams.push({
              ts: track.ts || '',
              username: track.username || '',
              platform: track.platform || '',
              ms_played: track.ms_played || 0,
              conn_country: track.conn_country || '',
              ip_addr_decrypted: track.ip_addr_decrypted || '',
              user_agent_decrypted: track.user_agent_decrypted || '',
              master_metadata_track_name: track.master_metadata_track_name || null,
              master_metadata_album_artist_name: track.master_metadata_album_artist_name || null,
              master_metadata_album_album_name: track.master_metadata_album_album_name || null,
              spotify_track_uri: track.spotify_track_uri || null,
              episode_name: track.episode_name || null,
              episode_show_name: track.episode_show_name || null,
              spotify_episode_uri: track.spotify_episode_uri || null,
              reason_start: track.reason_start || null,
              reason_end: track.reason_end || null,
              shuffle: track.shuffle || null,
              skipped: track.skipped || null,
              offline: track.offline || null,
              offline_timestamp: track.offline_timestamp || null,
              incognito_mode: track.incognito_mode || null,
            });
          }
        });
      } else {
        console.error(`File ${file.name} does not contain a valid array.`);
      }
    } catch (error) {
      console.error(`Error parsing file ${file.name}:`, error);
    }
  }

  // Add new streams to the existing streams
  setStreams((prev) => [...prev, ...newStreams]);

  alert(`Successfully processed ${files.length} file(s) and added ${newStreams.length} streams.`);
};


  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-3xl text-spotify-green mb-4">Spotify Data Visualizer</h1>
      <p className="mb-4 text-spotify-lightGray">
        Upload your folder of Spotify JSON files
      </p>
      {/* File Input */}
      <input
        id="file-upload"
        type="file"
        accept=".json"
        multiple
        onChange={handleFileUpload}
        {...({ webkitdirectory: "true" } as any)} // Bypass checking for webkitdirectory
        className="hidden" // Hide the default file input
      />
      {/* Custom Label */}
      <label
        htmlFor="file-upload"
        className="px-6 py-2 bg-spotify-green text-spotify-darker rounded-full font-semibold cursor-pointer"
      >
        Choose Folder
      </label>
    </div>
  );
};

export default Home;
