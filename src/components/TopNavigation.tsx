
import { NavLink } from "react-router-dom";

const navigationItems = [
  { title: "Home", url: "/" },
  { title: "Analysis", url: "/analysis" },
  { title: "Education", url: "/education" },
  { title: "Calculators", url: "/calculators" },
  { title: "Presentation", url: "/presentation" },
];

export const TopNavigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6">
        <div className="flex space-x-8">
          {navigationItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) =>
                `py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
