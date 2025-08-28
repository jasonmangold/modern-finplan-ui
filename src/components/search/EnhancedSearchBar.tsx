import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearch } from "@/contexts/SearchContext";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { SearchResults } from "./SearchResults";
import { RecentSearches } from "./RecentSearches";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export const EnhancedSearchBar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    globalSearchTerm,
    setGlobalSearchTerm,
    searchResults,
    setSearchResults,
    lastSearchResults,
    setLastSearchResults,
    isSearching,
    setIsSearching,
    showResults,
    setShowResults,
    lastSearchTerm,
    setLastSearchTerm,
    recentSearches,
    addRecentSearch
  } = useSearch();

  const { performSearch } = useGlobalSearch();

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (globalSearchTerm.trim()) {
        setIsSearching(true);
        const results = performSearch(globalSearchTerm);
        setSearchResults(results);
        setIsSearching(false);
        setShowResults(true);
        setShowRecentSearches(false);
        // Add to recent searches when search completes
        if (results.length > 0) {
          addRecentSearch(globalSearchTerm.trim());
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [globalSearchTerm, performSearch, setSearchResults, setIsSearching, setShowResults, addRecentSearch]);

  // Handle result selection
  const handleResultClick = useCallback((result: any) => {
    setLastSearchResults(searchResults);
    setLastSearchTerm(globalSearchTerm);
    setShowResults(false);
    setShowRecentSearches(false);
    setGlobalSearchTerm("");
    
    // Navigate to the appropriate route with state
    if (result.category === 'analysis') {
      // For analysis reports, navigate with goal type and specific report
      navigate('/analysis', { 
        state: { 
          selectedGoal: result.state?.goalType,
          selectedReport: result.state?.reportName,
          autoOpen: true
        }
      });
    } else if (result.category === 'calculator') {
      // For calculators, navigate with specific calculator selected
      navigate('/calculators', {
        state: {
          selectedFolder: result.state?.folder,
          selectedCalculator: result.state?.calculatorId,
          autoOpen: true
        }
      });
    } else if (result.category === 'education') {
      // For education materials, navigate with specific document
      navigate('/education', {
        state: {
          selectedDocument: result.state?.documentId,
          autoOpen: true
        }
      });
    } else {
      // Fallback to original navigation
      navigate(result.route, { state: result.state });
    }
    
    toast({
      title: "Navigating to result",
      description: result.title,
    });
  }, [searchResults, globalSearchTerm, setLastSearchResults, setLastSearchTerm, setShowResults, setShowRecentSearches, setGlobalSearchTerm, navigate]);

  // Handle recent search selection
  const handleRecentSearchClick = useCallback((term: string) => {
    setGlobalSearchTerm(term);
    setShowRecentSearches(false);
    inputRef.current?.focus();
  }, [setGlobalSearchTerm]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showResults || searchResults.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          setShowResults(false);
          setShowRecentSearches(false);
          inputRef.current?.blur();
          break;
      }
    };

    if (showResults) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showResults, searchResults, selectedIndex, handleResultClick, setShowResults]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowResults(false);
        setShowRecentSearches(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowResults]);

  // Clear search
  const clearSearch = () => {
    setGlobalSearchTerm("");
    setShowResults(false);
    setShowRecentSearches(false);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  // On mobile, show icon-only unless expanded or has search term
  if (isMobile && !isExpanded && !globalSearchTerm) {
    return (
      <div className="flex items-center gap-2">
        {/* Search button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="h-9 w-9 p-0 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
        >
          <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative" ref={resultsRef}>
      <div className="flex items-center gap-2">
        {/* Search input container */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 z-10" />
          <Input 
            ref={inputRef}
            placeholder="Search calculators, reports, education..."
            value={globalSearchTerm}
            onChange={(e) => setGlobalSearchTerm(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) {
                setShowResults(true);
              } else if (!globalSearchTerm.trim() && recentSearches.length > 0) {
                setShowRecentSearches(true);
              }
            }}
            onBlur={() => {
              if (isMobile && !globalSearchTerm) {
                setIsExpanded(false);
              }
            }}
            autoFocus={isMobile && isExpanded}
            className={`pl-10 pr-10 ${isMobile ? 'w-48' : 'w-72'} border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors focus:bg-white dark:focus:bg-gray-800 text-gray-900 dark:text-gray-100`}
          />
          
          {/* Loading/Clear button */}
          {globalSearchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 z-10"
            >
              {isSearching ? (
                <div className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      <SearchResults
        results={searchResults}
        onResultClick={handleResultClick}
        isVisible={showResults}
      />

      {/* Recent Searches Dropdown */}
      <RecentSearches
        recentSearches={recentSearches}
        onRecentSearchClick={handleRecentSearchClick}
        isVisible={showRecentSearches}
      />
    </div>
  );
};