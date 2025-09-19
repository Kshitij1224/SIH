import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // Update active link when hash changes
  useEffect(() => {
    const updateActiveLink = () => {
      const hash = window.location.hash || '#/';
      setActiveLink(hash);
    };
    
    // Set initial active link
    updateActiveLink();
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateActiveLink);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', updateActiveLink);
    };
  }, []);

  // Function to handle navigation and scroll to top
  const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('href');
    if (target) {
      // Close profile dropdown if open
      setShowProfileDropdown(false);
      // Update the URL
      window.location.hash = target;
      // Update active link
      setActiveLink(target);
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '#/') {
      return activeLink === '#/' || activeLink === '';
    }
    return activeLink.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-5 md:px-6">
        <div className="relative flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="blue heart"
                role="img"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.2 2.58C11.49 5.01 13.16 4 14.9 4 17.4 4 19.4 6 19.4 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">MedX</span>
            </div>
          </div>

          {/* Center Navigation (absolute centered) */}
          <div className="absolute inset-x-0 hidden md:flex justify-center">
            <div className="flex items-baseline space-x-4">
              <a 
                href="#/" 
                onClick={handleNavigation}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('#/') 
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </a>
              <a 
                href="#/departments" 
                onClick={handleNavigation}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('#/departments') 
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Departments
              </a>
              <a 
                href="#/doctors" 
                onClick={handleNavigation}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('#/doctors') 
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Doctors
              </a>
              <a 
                href="#/patients" 
                onClick={handleNavigation}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('#/patients') 
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Patients
              </a>
              <a 
                href="#/staff" 
                onClick={handleNavigation}
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('#/staff') 
                    ? 'text-blue-700 bg-blue-100' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Staff
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center space-x-4">
            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">Dr. Admin</p>
                  <p className="text-xs text-gray-500">Hospital Administrator</p>
                </div>
              </button>
              
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Dr. Admin</p>
                    <p className="text-xs text-gray-500">admin@medxhospital.in</p>
                  </div>
                  <a
                    href="#/settings"
                    onClick={handleNavigation}
                    className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${
                      isActive('#/settings') 
                        ? 'text-blue-700 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>View Profile</span>
                  </a>
                  <button
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      // Clear any user data from localStorage
                      localStorage.removeItem('user');
                      // Redirect to the main loading page
                      window.location.href = '/';
                    }}
                  >
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;