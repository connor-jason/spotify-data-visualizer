import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArtistTrends from './pages/ArtistTrends';
import Navbar from './components/Navbar';
import SongTrends from './pages/SongTrends';
import OverTimeTrends from './pages/OverTimeTrends';
import FunFacts from './pages/FunFacts';

const App = () => {

    return (
        <div className="h-full overflow-hidden">
            <Router>
                <Navbar />
                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/artists" element={<ArtistTrends />} />
                        <Route path="/songs" element={<SongTrends />} />
                        <Route path="/overtime" element={<OverTimeTrends />} />
                        <Route path="/funfacts" element={<FunFacts />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
