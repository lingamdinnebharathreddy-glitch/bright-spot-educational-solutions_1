import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, EyeOff, Eye, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle login vs signup
  const [showPassword, setShowPassword] = useState(false);

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiHost = 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required credentials.');
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${apiHost}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Authentication failed');

      // Save credentials session
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);

      // Route based on role
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      
      // Smart offline mockup login fallback for offline testing
      if (email === 'student@brightspot.com' && password === 'student123') {
        localStorage.setItem('token', 'mock_student_jwt_token_123');
        localStorage.setItem('role', 'student');
        localStorage.setItem('userName', 'John Doe');
        localStorage.setItem('userEmail', 'student@brightspot.com');
        navigate('/dashboard');
      } else if (email === 'admin@brightspot.com' && password === 'admin123') {
        localStorage.setItem('token', 'mock_admin_jwt_token_123');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('userName', 'Administrator');
        localStorage.setItem('userEmail', 'admin@brightspot.com');
        navigate('/admin');
      } else {
        setError(err.message || 'Invalid email credentials or offline credentials fail.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full pb-16 min-h-[85vh] flex items-center justify-center p-6">
      
      {/* Visual background ambient blobs */}
      <div className="glow-blob w-[300px] h-[300px] bg-brand-blue/10 -top-10 left-10" />
      <div className="glow-blob w-[300px] h-[300px] bg-brand-gold/10 bottom-10 right-10" />

      {/* Main glass cabinet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel border-brand-gold/25 p-8 rounded-3xl shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/95 to-brand-light/35 dark:from-slate-950/65 dark:to-slate-900/10"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-brand-blue to-brand-navy" />
        
        {/* Branding header block */}
        <div className="text-center space-y-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-dark to-brand-navy mx-auto flex items-center justify-center border border-brand-gold/30">
            <Sparkles className="w-5 h-5 text-brand-gold" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-dark dark:text-white">
            {isLogin ? 'Student Portal' : 'Register Secure Profile'}
          </h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none font-bold">
            {isLogin ? 'Enter Credentials to Log In' : 'Join Academic Placements Network'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold rounded-xl leading-normal">
              {error}
            </div>
          )}

          {/* Name Field (Sign Up exclusive) */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Student Name *</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                  required={!isLogin}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold !text-xs !w-full flex items-center justify-center gap-1.5 mt-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Processing Session...' : isLogin ? 'Access Portal Dashboard' : 'Create Student Profile'}</span>
          </button>

        </form>

        <hr className="border-slate-200/50 dark:border-slate-850 my-6" />

        {/* Toggle Switch */}
        <div className="text-center text-xs">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-brand-blue dark:text-brand-goldLight font-bold hover:underline"
          >
            {isLogin ? "Don't have an academic profile? Sign Up Now →" : "Already have a portfolio? Sign In →"}
          </button>
        </div>

        {/* Admin Login portal link */}
        <div className="text-center text-[10px] mt-4">
          <Link to="/admin-login" className="text-slate-400 hover:text-brand-gold transition-colors font-bold uppercase tracking-wider">
            Access System Admin Panel
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;
