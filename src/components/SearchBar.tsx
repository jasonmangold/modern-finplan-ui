
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useLocation } from "react-router-dom";

interface SearchBarProps {
  localSearchTerm: string;
  setLocalSearchTerm: (term: string) => void;
}

export const SearchBar = ({ localSearchTerm, setLocalSearchTerm }: SearchBarProps) => {
  const location = useLocation();

  // Determine search placeholder based on current page
  const getSearchPlaceholder = () => {
    if (location.pathname === '/education') {
      return 'Search reports...';
    }
    return 'Search...';
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input 
        placeholder={getSearchPlaceholder()}
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="pl-10 w-64 border-gray-200 bg-gray-50/50 hover:bg-white transition-colors focus:bg-white"
      />
      {localSearchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocalSearchTerm("")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
