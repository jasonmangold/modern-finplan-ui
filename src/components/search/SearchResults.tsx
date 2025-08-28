import { SearchResult } from '@/contexts/SearchContext';
import { SearchResultItem } from './SearchResultItem';
import { Calculator, Target, BookOpen } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
  isVisible: boolean;
}

export const SearchResults = ({ results, onResultClick, isVisible }: SearchResultsProps) => {
  if (!isVisible || results.length === 0) return null;

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const categoryConfig = {
    calculator: { 
      label: 'Calculators', 
      icon: Calculator, 
      color: 'text-blue-600' 
    },
    analysis: { 
      label: 'Analysis Reports', 
      icon: Target, 
      color: 'text-green-600' 
    },
    education: { 
      label: 'Education Materials', 
      icon: BookOpen, 
      color: 'text-purple-600' 
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-50">
      {/* Glass morphism container - wider and more frosted */}
      <div className="search-result-glass dark:search-result-glass-dark rounded-xl max-h-96 overflow-hidden min-w-[600px] max-w-4xl">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/5 pointer-events-none" />
        
        <div className="relative">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Search Results
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Scrollable results */}
          <div className="max-h-80 overflow-y-auto">
            {Object.entries(groupedResults).map(([category, categoryResults]) => {
              const config = categoryConfig[category as keyof typeof categoryConfig];
              if (!config) return null;

              return (
                <div key={category} className="border-b border-gray-200/20 dark:border-gray-700/20 last:border-b-0">
                  {/* Category header */}
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex items-center gap-2">
                      <config.icon className={`h-4 w-4 ${config.color}`} />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                        {config.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({categoryResults.length})
                      </span>
                    </div>
                  </div>

                  {/* Category results */}
                  <div className="divide-y divide-gray-200/20 dark:divide-gray-700/20">
                    {categoryResults.slice(0, 5).map((result) => (
                      <SearchResultItem
                        key={result.id}
                        result={result}
                        onClick={() => onResultClick(result)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer with tips */}
          <div className="px-4 py-2 bg-gray-50/30 dark:bg-gray-800/20 border-t border-gray-200/30 dark:border-gray-700/30">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Press <kbd className="px-1 py-0.5 bg-gray-200/50 dark:bg-gray-700/50 rounded text-xs">↑↓</kbd> to navigate, <kbd className="px-1 py-0.5 bg-gray-200/50 dark:bg-gray-700/50 rounded text-xs">Enter</kbd> to select
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};