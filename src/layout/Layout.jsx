import { useState } from 'react';
import { Menu, X, BarChart3, Users, Clock, FileText, Settings, LogOut, Home  } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { name: 'Home', path: '/', icon: Home},
  { name: 'Employees', path: '/employees', icon: Users },
  { name: 'Shifts', path: '/shifts', icon: Clock },
  // { name: 'Reports', path: '/reports', icon: FileText },
  // { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed z-50 top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
            <Link to={"/"}>
                <span className={`flex items-center gap-2 text-indigo-600 font-bold text-2xl transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                    {isOpen && (
                    <>
                        <img src="src\assets\logo.png" alt="ShiftWise Logo" className="w-7 h-7" />
                        ShiftWise
                    </>
                    )}
                </span>
            </Link>
            
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>


        {/* Navigation */}
        <nav className="mt-6">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }
                  ${!isOpen ? 'justify-center' : ''}
                `}
                title={!isOpen ? item.name : ''}
              >
                <IconComponent 
                  size={20} 
                  className={`${isOpen ? 'mr-3' : ''} flex-shrink-0`}
                />
                <span className={`font-medium text-sm transition-all duration-300 ${
                  isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'
                }`}>
                  {item.name}
                </span>
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 mt-6">
          <button
            onClick={handleLogout}
            className={`flex items-center w-auto px-3 py-3 mx-2 mt-3 rounded-lg transition-all duration-200 group relative text-gray-700 hover:bg-red-50 hover:text-red-600
              ${!isOpen ? 'justify-center' : ''}
            `}
            title={!isOpen ? 'Logout' : ''}
          >
            <LogOut
              size={20}
              className={`${isOpen ? 'mr-3' : ''} flex-shrink-0`}
            />
            <span className={`font-medium text-sm transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 w-0 overflow-hidden'
            }`}>
              Logout
            </span>
            {/* Tooltip for collapsed state */}
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}