import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="text-white py-4 flex justify-center items-center">
            <div className="space-x-4">
                <Link to="/">Home</Link>
                <Link to="/artists">Artist Trends</Link>
                <Link to="/songs">Song Trends</Link>
                <Link to="/overtime">Plays Over Time</Link>
                <Link to="/funfacts">Fun Facts</Link>
            </div>
        </nav>
    );
};

export default Navbar;
