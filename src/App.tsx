
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import Education from "./pages/Education";
import Calculators from "./pages/Calculators";
import Presentation from "./pages/Presentation";
import NotFound from "./pages/NotFound";
import { SearchProvider } from "./contexts/SearchContext";
import { FormProvider } from "./contexts/FormContext";
import { PresentationProvider } from "./contexts/PresentationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SearchProvider>
          <FormProvider>
            <PresentationProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/calculators" element={<Calculators />} />
                  <Route path="/presentation" element={<Presentation />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </PresentationProvider>
          </FormProvider>
        </SearchProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
