import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Sparkles, User, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Dark/Light Theme Manager
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  // Update authentication session on mounting & route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('userName');
    if (token) {
      setUser({ token, role, name });
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Universities', path: '/universities' },
    { label: 'Courses', path: '/courses' },
    { label: 'Events', path: '/events' },
    { label: 'Admissions', path: '/apply' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Branding Logo */}
        <Link to="/" className="flex items-center space-x-2.5 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-dark to-brand-navy dark:from-brand-blue dark:to-brand-accent flex items-center justify-center border border-brand-gold/30 shadow-md">
            <Sparkles className="w-5 h-5 text-brand-gold group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm md:text-base tracking-tight text-brand-dark dark:text-white leading-none">
              BRIGHT SPOT
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-brand-gold uppercase tracking-wider mt-0.5 leading-none">
              Educational Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wide hover:text-brand-gold dark:hover:text-brand-goldLight transition-colors ${
                isActive(link.path)
                  ? 'text-brand-gold dark:text-brand-goldLight border-b-2 border-brand-gold pb-1'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action controls & Auth Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          
          {/* Light/Dark Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors border border-transparent dark:border-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-brand-gold" />}
          </button>

          {/* User state button */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center space-x-1.5 text-xs font-bold text-white bg-brand-dark dark:bg-brand-blue border border-white/10 dark:border-slate-800 hover:bg-brand-navy px-4 py-2 rounded-xl transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl border border-rose-500/20 dark:border-rose-500/10 text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2.5">
              <Link
                to="/login"
                className="btn-gold !px-4 !py-2.5 !rounded-xl !text-[11px] !shadow-sm flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </Link>
              <Link
                to="/admin-login"
                className="btn-glass !px-4 !py-2.5 !rounded-xl !text-[11px] !shadow-sm flex items-center gap-1 border-brand-gold/45 text-brand-dark dark:text-brand-goldLight"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile controls bar */}
        <div className="flex items-center space-x-3 lg:hidden">
          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-brand-gold" />}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Glass Drawer Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full glass-panel border-t border-slate-200/50 dark:border-slate-800/80 p-6 flex flex-col space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold tracking-wide hover:text-brand-gold ${
                isActive(link.path)
                  ? 'text-brand-gold dark:text-brand-goldLight'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <hr className="border-slate-200 dark:border-slate-800" />
          
          {user ? (
            <div className="flex flex-col space-y-2">
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center space-x-2 text-center text-sm font-bold text-white bg-brand-dark dark:bg-brand-blue py-3 rounded-xl shadow"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>My Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-center text-sm font-bold border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 py-3 rounded-xl"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center btn-gold !text-xs"
              >
                Student Login
              </Link>
              <Link
                to="/admin-login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center btn-glass border-brand-gold/45 text-brand-dark dark:text-brand-goldLight !text-xs"
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;
