
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "@/contexts/SearchContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Calculators from "./pages/Calculators";
import Education from "./pages/Education";
import Presentation from "./pages/Presentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full">
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/analysis" element={<Layout><Analysis /></Layout>} />
              <Route path="/calculators" element={<Layout><Calculators /></Layout>} />
              <Route path="/education" element={<Layout><Education /></Layout>} />
              <Route path="/presentation" element={<Layout><Presentation /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </SearchProvider>
  </QueryClientProvider>
);

export default App;
