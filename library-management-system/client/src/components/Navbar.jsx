import { useAuth } from '../context/AuthContext';
import { LogoutIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <LogoutIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;