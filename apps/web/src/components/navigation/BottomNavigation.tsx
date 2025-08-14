import { NavLink } from 'react-router-dom';
import { 
  CompassIcon, 
  CalendarIcon, 
  MapIcon, 
  CameraIcon, 
  UserIcon 
} from '../icons';

const navItems = [
  { to: '/discover', label: 'Discover', icon: CompassIcon },
  { to: '/plan', label: 'Plan', icon: CalendarIcon },
  { to: '/trip/current/today', label: 'Experience', icon: MapIcon },
  { to: '/memories/latest', label: 'Memories', icon: CameraIcon },
  { to: '/profile', label: 'Profile', icon: UserIcon },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center text-xs ${
                isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

