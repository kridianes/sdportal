import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from '../icons';

const navItems = [
  { to: '/discover', label: 'Discover' },
  { to: '/plan', label: 'Plan' },
  { to: '/trip/current/today', label: 'Experience' },
  { to: '/memories/latest', label: 'Memories' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-app py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            TravelPlanner
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/profile"
              className={({ isActive }) => 
                `text-sm font-medium ${
                  isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              Profile
            </NavLink>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `text-sm font-medium ${
                      isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/profile"
                className={({ isActive }) => 
                  `text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

