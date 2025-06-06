
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
    <nav className="flex space-x-6">
      {navigationItems.map((item) => (
        <NavLink
          key={item.title}
          to={item.url}
          className={({ isActive }) =>
            `py-2 px-3 rounded-md font-medium text-sm transition-colors ${
              isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};
