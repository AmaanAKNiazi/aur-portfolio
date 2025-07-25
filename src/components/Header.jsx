// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' }, 
    { name: 'Stories', path: '/stories' },
    { name: 'Archives', path: '/archives' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resources', path: '/resources' },
    { name: 'Who We Are', path: '/who-we-are' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-gray-900">
              AUR
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Alliance For Urban Rights
            </div>
          </Link>

          {/* Navigation and Dark Mode Toggle */}
          <div className="flex items-center space-x-8">
            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;