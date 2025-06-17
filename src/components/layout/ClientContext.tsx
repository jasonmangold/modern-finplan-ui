
import { useState } from "react";
import { ChevronDown, User, Building2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ClientContextProps {
  selectedClient: string;
  clientFiles: string[];
  onClientChange: (client: string) => void;
  onNewClient: () => void;
}

export const ClientContext = ({ 
  selectedClient, 
  clientFiles, 
  onClientChange, 
  onNewClient 
}: ClientContextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isClientSelected = selectedClient !== "No Client Selected";

  return (
    <div className="px-6 lg:px-8 py-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 dark:from-gray-800/50 dark:to-gray-700/30 border-b border-gray-200/40 dark:border-gray-700/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg">
              {isClientSelected ? (
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <Building2 className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Client
                </span>
                {isClientSelected && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    <span className={`text-base ${isClientSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {selectedClient}
                    </span>
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="start" 
                  className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-gray-200/60 dark:border-gray-700/60 shadow-xl"
                >
                  <div className="p-2">
                    <Button 
                      onClick={onNewClient}
                      className="w-full justify-start text-left h-auto p-3 bg-blue-500/10 dark:bg-blue-400/10 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 border-2 border-dashed border-blue-300/60 dark:border-blue-600/60"
                      variant="ghost"
                    >
                      <Plus className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-blue-700 dark:text-blue-300">New Client</div>
                        <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Create a new client profile</div>
                      </div>
                    </Button>
                  </div>
                  <DropdownMenuSeparator />
                  {clientFiles.filter(file => file !== "No Client Selected").map((client) => (
                    <DropdownMenuItem
                      key={client}
                      onClick={() => onClientChange(client)}
                      className="cursor-pointer p-3 hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
                    >
                      <User className="h-4 w-4 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">{client}</div>
                        <div className="text-xs text-gray-500">Client profile</div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isClientSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              Ready for analysis
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
