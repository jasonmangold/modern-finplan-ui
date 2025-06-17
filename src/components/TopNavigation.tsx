
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
    <nav className="flex space-x-1">
      {navigationItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          className={({ isActive }) =>
            `relative py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group ${
              isActive
                ? 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/80 dark:hover:bg-gray-800/50'
            }`
          }
        >
          <span className="relative z-10">{item.title}</span>
          {/* Modern hover effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          {/* Active indicator */}
          <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-500 transition-all duration-200 ${
            ({ isActive }: { isActive: boolean }) => isActive ? 'w-8' : 'w-0 group-hover:w-4'
          }`} />
        </NavLink>
      ))}
    </nav>
  );
};
