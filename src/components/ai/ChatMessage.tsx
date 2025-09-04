import { motion } from 'framer-motion';
import { Bot, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ChatMessage as ChatMessageType } from './types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';

  const handleSourceClick = (source: string) => {
    // Navigate to Education page and search for the source
    window.location.href = `/education?search=${encodeURIComponent(source)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted border border-border'
      }`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-lg px-3 py-2 ${
          isUser
            ? 'bg-primary text-primary-foreground ml-4'
            : 'bg-muted border border-border/50'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Sources:</p>
              <div className="space-y-1">
                {message.sources.map((source, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSourceClick(source)}
                    className="h-auto p-2 justify-start text-left hover:bg-accent/50 w-full"
                  >
                    <ExternalLink className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="text-xs truncate">{source}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-muted-foreground mt-1 ${isUser ? 'mr-3' : 'ml-3'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </motion.div>
  );
};