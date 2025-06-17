
import { useState } from "react";
import { ChevronRight, Home } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  hasUnsavedChanges?: boolean;
  lastSavedTime?: string | null;
}

export const PageHeader = ({ hasUnsavedChanges, lastSavedTime }: PageHeaderProps) => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { name: 'Home', href: '/', icon: Home }
    ];
    
    const routeNames: Record<string, string> = {
      'analysis': 'Analysis',
      'education': 'Education',
      'calculators': 'Calculators',
      'presentation': 'Presentation'
    };
    
    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      breadcrumbs.push({
        name: routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="border-b border-gray-200/60 dark:border-gray-700/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
      {/* Breadcrumb Navigation */}
      <div className="px-6 lg:px-8 py-3">
        <nav className="flex items-center space-x-1 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
              <Link
                to={breadcrumb.href}
                className={`group flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 ${
                  index === breadcrumbs.length - 1
                    ? 'text-gray-900 dark:text-gray-100 font-medium bg-gray-100/60 dark:bg-gray-800/60'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/30'
                }`}
              >
                {index === 0 && breadcrumb.icon && (
                  <breadcrumb.icon className="h-3.5 w-3.5" />
                )}
                {breadcrumb.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Status Bar */}
      <AnimatePresence>
        {(hasUnsavedChanges || lastSavedTime) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-6 lg:px-8 py-2 bg-blue-50/50 dark:bg-blue-900/10 border-t border-blue-200/60 dark:border-blue-800/60"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasUnsavedChanges && (
                  <Badge variant="outline" className="text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                    Unsaved changes
                  </Badge>
                )}
                {lastSavedTime && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Last saved: {lastSavedTime}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Cmd+S to save
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
