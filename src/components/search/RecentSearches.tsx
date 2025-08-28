import { Clock, X } from 'lucide-react';

interface RecentSearchesProps {
  recentSearches: string[];
  onRecentSearchClick: (term: string) => void;
  isVisible: boolean;
}

export const RecentSearches = ({ recentSearches, onRecentSearchClick, isVisible }: RecentSearchesProps) => {
  if (!isVisible || recentSearches.length === 0) return null;

  return (
    <div className="absolute top-full right-0 mt-2 z-50" style={{ transform: 'translateX(-50%)' }}>
      {/* Glass morphism container - wider and more frosted */}
      <div className="search-result-glass dark:search-result-glass-dark rounded-xl max-h-96 overflow-hidden min-w-[600px] max-w-4xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 pointer-events-none" />
        
        <div className="relative">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Recent Searches
              </h3>
            </div>
          </div>

          {/* Recent searches list */}
          <div className="p-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onRecentSearchClick(search)}
                className="w-full px-3 py-2 text-left rounded-lg hover:bg-white/20 dark:hover:bg-gray-700/30 transition-colors duration-200 flex items-center justify-between group"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {search}
                </span>
                <Clock className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50/30 dark:bg-gray-800/20 border-t border-gray-200/30 dark:border-gray-700/30">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Click to search again or start typing for new results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};