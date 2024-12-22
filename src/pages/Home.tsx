import React from 'react';

const Home: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).filter((file) => file.name.endsWith('.json'));
    setFiles(files);
    console.log('Selected files:', files);
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
      {/* Display Selected Files */}
      <div>
        <p>Files:</p>
        {files.map((file, index) => (
          <div key={index}>
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
