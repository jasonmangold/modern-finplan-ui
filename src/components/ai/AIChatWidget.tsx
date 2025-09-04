import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { QuickSuggestions } from './QuickSuggestions';
import { aiChatService } from './aiChatService';
import type { ChatMessage as ChatMessageType } from './types';

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI financial planning assistant. I can help answer questions about retirement, investments, insurance, and more using our comprehensive educational resources. What would you like to know?",
      timestamp: Date.now(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(async () => {
      const aiResponse = await aiChatService.getResponse(messageText);
      setIsTyping(false);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: Date.now(),
        sources: aiResponse.sources
      }]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 60 : 600,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 right-6 z-50"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <Card className="w-96 glass-morphism shadow-2xl border-0 overflow-hidden" 
                  style={{ height: isMinimized ? '60px' : '600px' }}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/20 bg-background/95 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="font-semibold text-sm">AI Financial Assistant</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Content */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 540, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col overflow-hidden"
                  >
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                        {messages.map((message) => (
                          <ChatMessage key={message.id} message={message} />
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Quick Suggestions */}
                      {messages.length === 1 && (
                        <div className="flex-shrink-0">
                          <QuickSuggestions onSuggestionClick={handleSendMessage} />
                        </div>
                      )}

                      {/* Input */}
                      <div className="flex-shrink-0 p-4 border-t border-border/20 bg-background/95 backdrop-blur-sm">
                        <div className="flex gap-2">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask about retirement, investments, insurance..."
                            className="flex-1 bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20"
                            disabled={isTyping}
                          />
                          <Button
                            onClick={() => handleSendMessage()}
                            size="sm"
                            disabled={!inputValue.trim() || isTyping}
                            className="px-3"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};