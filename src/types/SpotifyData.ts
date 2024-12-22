export interface SpotifyStream {
    ts: string; // YYYY-MM-DD HH:MM:SS
    username: string;
    platform: string;
    ms_played: number;
    conn_country: string;
    ip_addr_decrypted: string;
    user_agent_decrypted: string;
    master_metadata_track_name: string | null;
    master_metadata_album_artist_name: string | null;
    master_metadata_album_album_name: string | null;
    spotify_track_uri: string | null;
    episode_name: string | null;
    episode_show_name: string | null;
    spotify_episode_uri: string | null;
    reason_start: string | null;
    reason_end: string | null;
    shuffle: boolean | null;
    skipped: boolean | null;
    offline: boolean | null;
    offline_timestamp: number | null;
    incognito_mode: boolean | null;
  }
  
  