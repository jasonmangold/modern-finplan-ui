
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  localSearchTerm: string;
  setLocalSearchTerm: (term: string) => void;
}

export const SearchBar = ({ localSearchTerm, setLocalSearchTerm }: SearchBarProps) => {
  return (
    <div className="relative group">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
      <Input
        type="text"
        placeholder="Search..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 w-64 bg-white/80 dark:bg-gray-800/80 border-gray-200/60 dark:border-gray-700/60 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200 placeholder:text-gray-400"
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </div>
  );
};
