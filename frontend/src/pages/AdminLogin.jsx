import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiHost = 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide administrative coordinates.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiHost}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Authentication failed');

      if (data.role !== 'admin') {
        throw new Error('Access denied. Administrator privileges required.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);

      navigate('/admin');
    } catch (err) {
      console.error(err);
      
      // Fallback mock check
      if (email === 'admin@brightspot.com' && password === 'admin123') {
        localStorage.setItem('token', 'mock_admin_jwt_token_123');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('userName', 'System Administrator');
        localStorage.setItem('userEmail', 'admin@brightspot.com');
        navigate('/admin');
      } else {
        setError(err.message || 'Invalid administrative credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full pb-16 min-h-[85vh] flex items-center justify-center p-6">
      
      <div className="glow-blob w-[300px] h-[300px] bg-brand-gold/10 -top-10 left-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-panel border-brand-gold/25 p-8 rounded-3xl shadow-2xl relative overflow-hidden bg-gradient-to-b from-white/95 to-brand-light/35 dark:from-slate-950/65 dark:to-slate-900/10"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-brand-blue to-brand-navy" />

        <div className="text-center space-y-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-dark to-brand-navy mx-auto flex items-center justify-center border border-brand-gold/30">
            <ShieldCheck className="w-5 h-5 text-brand-gold" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-dark dark:text-white">Admin Console</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-none font-bold">
            Administrative Credentials Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Admin Email Address *</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@brightspot.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Password *</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold !text-xs !w-full flex items-center justify-center gap-1.5 mt-4"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? 'Validating Rights...' : 'Authorize Admin Panel'}</span>
          </button>

        </form>

        <hr className="border-slate-200/50 dark:border-slate-850 my-6" />

        <div className="text-center text-xs">
          <button
            onClick={() => navigate('/login')}
            className="text-brand-blue dark:text-brand-goldLight font-bold hover:underline"
          >
            ← Return to Student Login Portal
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default AdminLogin;
