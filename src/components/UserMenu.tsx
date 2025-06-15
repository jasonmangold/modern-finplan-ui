
import { useState } from "react";
import { User, HelpCircle, FileText, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SettingsDialog } from "./SettingsDialog";

export const UserMenu = () => {
  const [showSettings, setShowSettings] = useState(false);

  const handleHelp = () => {
    console.log("Help clicked");
  };

  const handleSampleFiles = () => {
    console.log("Sample Files clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-lg">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
          <DropdownMenuItem onClick={handleHelp} className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSampleFiles} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            Sample Files
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowSettings(true)} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog 
        open={showSettings} 
        onOpenChange={setShowSettings} 
      />
    </>
  );
};
