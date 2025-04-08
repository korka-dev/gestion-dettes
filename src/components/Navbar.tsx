import React from 'react';
import { Link } from 'react-router-dom';
import { Store, UserPlus, Users } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6" />
            <span className="font-bold text-lg">Gestion Boutique</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 hover:bg-indigo-700 px-3 py-2 rounded-md"
            >
              <Users className="h-5 w-5" />
              <span>Clients</span>
            </Link>
            <Link
              to="/add-client"
              className="flex items-center space-x-1 hover:bg-indigo-700 px-3 py-2 rounded-md"
            >
              <UserPlus className="h-5 w-5" />
              <span>Nouveau Client</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;