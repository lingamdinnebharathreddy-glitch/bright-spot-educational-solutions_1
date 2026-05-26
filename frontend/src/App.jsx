import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';

// Route Pages
import Home from './pages/Home';
import About from './pages/About';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import Courses from './pages/Courses';
import Apply from './pages/Apply';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

// Scroll To Top Navigation Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Route Security Guard for Students
const StudentRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token || role !== 'student') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Route Security Guard for Administrators
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token || role !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

export const App = () => {
  
  // Set dynamically customized meta headers for premium SEO experience
  useEffect(() => {
    document.title = 'Bright Spot Educational Solutions | Gateway to Global Education';
    
    // Dynamically insert high-fidelity Google Icons and Fonts stylesheet elements to index html
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;450;600;750;850&family=Playfair+Display:ital,wght@0,500;0,700;1,550&display=swap';
    document.head.appendChild(fontLink);
  }, []);

  return (
    <BrowserRouter>
      {/* Resets scrolling heights on route changes */}
      <ScrollToTop />
      
      <div className="flex flex-col min-h-screen relative font-sans transition-colors duration-300">
        
        {/* Floating Glassmorphic Header */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main className="flex-grow bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/universities/:id" element={<UniversityDetail />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Protected Stepper timelined Dashboard */}
            <Route
              path="/dashboard"
              element={
                <StudentRoute>
                  <Dashboard />
                </StudentRoute>
              }
            />

            {/* Protected Administrative Dashboard */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }
            />

            {/* Fallback Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Premium Information Directory */}
        <Footer />

        {/* Pulsating Contact badges */}
        <WhatsAppButton />

        {/* Slide-out AI Consultant */}
        <Chatbot />

      </div>
    </BrowserRouter>
  );
};

export default App;
