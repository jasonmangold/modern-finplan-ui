
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TopNavigation } from "./TopNavigation";

export const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
      <div className="h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            eAdvisys
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="no-client">
              <SelectTrigger className="w-52 border-gray-200 bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-client">No Client Selected</SelectItem>
                <SelectItem value="paul-sally">Paul Johnson & Sally Johnson</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="modern-button border-gray-200 hover:bg-gray-50">
              Save
            </Button>
            <Button variant="outline" size="sm" className="modern-button bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
              New Client
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <TopNavigation />
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64 border-gray-200 bg-gray-50/50 hover:bg-white transition-colors focus:bg-white"
              />
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
