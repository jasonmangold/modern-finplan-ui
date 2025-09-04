import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface QuickSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "How much can I contribute to a Roth IRA?",
  "What are the benefits of a 401(k) plan?",
  "When should I start collecting Social Security?",
  "What estate planning documents do I need?",
  "How do I calculate my retirement needs?",
  "What types of life insurance are available?"
];

export const QuickSuggestions = ({ onSuggestionClick }: QuickSuggestionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="px-4 pb-2 border-t border-border/20"
    >
      <div className="flex items-center gap-2 mb-3 pt-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">Popular questions:</span>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSuggestionClick(suggestion)}
              className="w-full justify-start text-left h-auto py-2 px-3 text-xs hover:bg-accent/50 whitespace-normal"
            >
              {suggestion}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};