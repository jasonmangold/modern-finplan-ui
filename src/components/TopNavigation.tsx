
import { NavLink } from "react-router-dom";

const navigationItems = [
  { title: "Home", url: "/home", tourId: "home-nav" },
  { title: "Analysis", url: "/analysis", tourId: "analysis-nav" },
  { title: "Education", url: "/education", tourId: "education-nav" },
  { title: "Calculators", url: "/calculators", tourId: "calculators-nav" },
  { title: "Presentation", url: "/presentation", tourId: "presentation-nav" },
];

export const TopNavigation = () => {
  return (
    <nav className="flex space-x-6">
      {navigationItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          data-tour={item.tourId}
          className={({ isActive }) =>
            `py-2 px-3 rounded-md font-medium text-sm transition-colors ${
              isActive
                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};
