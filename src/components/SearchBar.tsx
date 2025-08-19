
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface SearchBarProps {
  localSearchTerm: string;
  setLocalSearchTerm: (term: string) => void;
}

export const SearchBar = ({ localSearchTerm, setLocalSearchTerm }: SearchBarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine search placeholder - consistent across all pages
  const getSearchPlaceholder = () => {
    return 'Search...';
  };

  // On mobile, show icon-only unless expanded or has search term
  if (isMobile && !isExpanded && !localSearchTerm) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="h-9 w-9 p-0 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
      >
        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </Button>
    );
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
      <Input 
        placeholder={getSearchPlaceholder()}
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        onBlur={() => {
          if (isMobile && !localSearchTerm) {
            setIsExpanded(false);
          }
        }}
        autoFocus={isMobile && isExpanded}
        className={`pl-10 ${isMobile ? 'w-48' : 'w-64'} border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-gray-100`}
      />
      {localSearchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setLocalSearchTerm("");
            if (isMobile) {
              setIsExpanded(false);
            }
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
