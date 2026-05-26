import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info & Newsletter */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-brand-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-dark" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-white tracking-tight leading-none">BRIGHT SPOT</span>
                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider mt-0.5 leading-none">Educational Solutions</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your gateway to premium global education. Empowering students with dynamic counseling, scholarship guidance, and direct university placements since 2012.
            </p>
            
            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <label htmlFor="newsletter" className="block text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1.5">
                Stay Updated on Admissions
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-slate-800/70 border border-slate-700/50 text-slate-200 text-xs px-3.5 py-2 rounded-l-xl focus:ring-1 focus:ring-brand-gold focus:outline-none w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-gold hover:bg-brand-goldHover text-brand-dark px-3 rounded-r-xl transition-all"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-brand-goldLight mt-1.5 font-medium animate-fadeIn">
                  🎉 Subscribed successfully for scholarship alerts!
                </p>
              )}
            </form>
          </div>

          {/* Quick Links Menu */}
          <div className="space-y-4 lg:pl-10">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Counseling Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-brand-gold transition-colors">Career Guidance Board</Link>
              </li>
              <li>
                <Link to="/universities" className="hover:text-brand-gold transition-colors">University Course Search</Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-brand-gold transition-colors">Admission Registration</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-gold transition-colors">Seminars & Webinars</Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-brand-gold transition-colors">Scholarship Articles</Link>
              </li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Primary Office Center
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Vadodara Center:</strong><br />
                  104, Blue Diamond Plaza, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>admissions@brightspot.com</span>
              </li>
            </ul>
          </div>

          {/* Multi-branch Locations */}
          <div className="space-y-4">
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Branch Offices
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <strong className="text-slate-300">Mumbai Central Office:</strong>
                <p>Office 12, Gold Horizon Towers, Bandra West, Mumbai 400050.</p>
              </div>
              <div>
                <strong className="text-slate-300">Nashik Hub Center:</strong>
                <p>Sandip Heights, Trimbak Road, Nashik, Maharashtra 422002.</p>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-slate-800 my-8" />

        {/* Footer Base */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bright Spot Educational Solutions. All rights reserved.</p>
          
          {/* Social Anchors */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
