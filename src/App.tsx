import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArtistTrends from './pages/ArtistTrends';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="h-full overflow-hidden">
      <Router>
        <Navbar />

        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artist-trends" element={<ArtistTrends />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
