import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/all" className="text-4xl font-extrabold text-red-500">
          Haunting Tales
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            Share Your Story
          </Link>
          <Link
            to="/all"
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            All Stories
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
