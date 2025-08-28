import { SearchResult } from '@/contexts/SearchContext';
import { 
  Calculator, 
  Target, 
  BookOpen, 
  GraduationCap, 
  Palmtree, 
  Shield, 
  Heart,
  ChevronRight 
} from 'lucide-react';

interface SearchResultItemProps {
  result: SearchResult;
  onClick: () => void;
  isSelected?: boolean;
}

export const SearchResultItem = ({ result, onClick, isSelected }: SearchResultItemProps) => {
  // Icon mapping
  const getIcon = (iconName?: string) => {
    const iconMap: Record<string, any> = {
      Calculator,
      Target,
      BookOpen,
      GraduationCap,
      Palmtree,
      Shield,
      Heart
    };

    const IconComponent = iconName ? iconMap[iconName] : Calculator;
    return IconComponent || Calculator;
  };

  const Icon = getIcon(result.icon);

  // Category-specific styling
  const getCategoryStyle = () => {
    switch (result.category) {
      case 'calculator':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-500/10';
      case 'analysis':
        return 'text-green-600 bg-green-50 dark:bg-green-500/10';
      case 'education':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-500/10';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-500/10';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 text-left transition-all duration-150 hover:bg-white/50 dark:hover:bg-gray-800/30 focus:bg-white/70 dark:focus:bg-gray-800/50 focus:outline-none group ${
        isSelected ? 'bg-white/70 dark:bg-gray-800/50' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryStyle()}`}>
          <Icon className="h-4 w-4" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {result.title}
            </h4>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex-shrink-0 capitalize">
              {result.category}
            </span>
          </div>
          {result.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {result.description}
            </p>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
      </div>
    </button>
  );
};