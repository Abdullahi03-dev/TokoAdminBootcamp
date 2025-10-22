// import { useEffect } from "react";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/Courses";
// import Students from "./pages/Students";
// import Announcements from "./pages/Announcements";
// import Assignments from "./pages/Assignments";
// import Certificates from './pages/Certificates'
// import Payments from "./pages/Payments";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login", { replace: true, state: { from: location } });
//     }
//   }, [isAuthenticated, navigate, location]);

//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
//           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
//           <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
//           <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
//           <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
//           <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
//           <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Announcements from "./pages/Announcements";
import Assignments from "./pages/Assignments";
import Certificates from './pages/Certificates';
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoutes";
const queryClient = new QueryClient();



const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
