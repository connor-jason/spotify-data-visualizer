import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="text-white py-4 flex justify-center items-center">
      <div className="space-x-4">
        <Link className="hover:underline" to="/">Home</Link>
        <Link className="hover:underline" to="/artist-trends">Artist Trends</Link>
      </div>
    </nav>
  );
};

export default Navbar;
