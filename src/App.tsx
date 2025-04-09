
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import FDCalculator from "./pages/FDCalculator";
import RDCalculator from "./pages/RDCalculator";
import EMICalculator from "./pages/EMICalculator";
import PPFCalculator from "./pages/PPFCalculator";
import LoanCalculator from "./pages/LoanCalculator";
import IncomeTaxCalculator from "./pages/IncomeTaxCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/fd-calculator" element={<FDCalculator />} />
          <Route path="/rd-calculator" element={<RDCalculator />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/ppf-calculator" element={<PPFCalculator />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
