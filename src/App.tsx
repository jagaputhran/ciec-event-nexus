
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Future routes will be added here */}
            <Route path="/events" element={<div className="p-6"><h1 className="text-2xl font-bold">Events Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/budget" element={<div className="p-6"><h1 className="text-2xl font-bold">Budget Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/planners" element={<div className="p-6"><h1 className="text-2xl font-bold">Event Planners</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/leadership" element={<div className="p-6"><h1 className="text-2xl font-bold">Leadership Hierarchy</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports & Analytics</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600">Coming soon...</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
