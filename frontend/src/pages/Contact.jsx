import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, ShieldCheck, HeartHandshake, Facebook, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admission Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 8000);
    }, 1000);
  };

  return (
    <div className="relative w-full pb-16">
      
      {/* Decorative Blur Ambient Blobs */}
      <div className="glow-blob w-[300px] h-[300px] bg-brand-blue/10 top-0 left-0" />
      <div className="glow-blob w-[350px] h-[350px] bg-brand-gold/10 bottom-10 right-0" />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Reach Out</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white tracking-tight">
          Connect With Our Counselors
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto">
          Have queries regarding credit transfers, admission eligibility, or scholarship waivers? Fill out our form or drop into our offices!
        </p>
      </section>

      {/* Primary Content grid */}
      <section className="max-w-7xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Columns: Branch Addresses (Lg: 5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel border-brand-gold/15 p-6 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Vadodara Head Office</h3>
            <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>104, Blue Diamond Plaza, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span>vadodara@brightspot.com</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Mumbai Central Branch</h3>
            <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Office 12, Gold Horizon Towers, Bandra West, Mumbai 400050.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+91 98765 43211</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span>mumbai@brightspot.com</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl space-y-4">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Nashik Consulting Branch</h3>
            <ul className="space-y-3.5 text-xs text-slate-650 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>Sandip Heights, Trimbak Road, Nashik, Maharashtra 422002.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+91 98765 43212</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span>nashik@brightspot.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Columns: Inquiry Form (Lg: 7 columns) */}
        <div className="lg:col-span-7">
          <div className="glass-panel border-brand-gold/25 p-8 rounded-3xl shadow-xl relative bg-gradient-to-b from-white/95 to-brand-light/35 dark:from-slate-950/65 dark:to-slate-900/10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-brand-blue to-brand-navy" />
            
            <div className="space-y-1 mb-6">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">Direct Inquiries</span>
              <h3 className="font-extrabold text-base text-brand-dark dark:text-white">Leave An Academic Inquiry</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Fill out the coordinates. Our advisors will respond with a verified email dossier or phone analysis inside 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-4 animate-fadeIn">
                <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto" />
                <h2 className="text-xl font-extrabold text-brand-dark dark:text-white">Inquiry Lodged Successfully!</h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Thank you for connecting! One of our senior academic advisors has flagged your request and will contact you via email or mobile shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Target Subject / Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-brand-gold"
                  >
                    <option value="Admission Enquiry">Admission Placement Enquiry</option>
                    <option value="Scholarship Application">Scholarship Eligibility Evaluation</option>
                    <option value="Career Counseling Session">1-on-1 Career Counseling Reservation</option>
                    <option value="Credit Transfer Programs">Credit Transfer Pathway Info</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Detailed Inquiry Message *</label>
                  <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your current grades, preferred university (Krishna, Sandip, Marwadi, Weltec), or course questions..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold !text-xs !w-full flex items-center justify-center gap-1.5 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Transmitting Enquiry...' : 'Lodge Counselor Inquiry'}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </section>

      {/* ================= GEOGRAPHIC EMBEDDED MAP ================= */}
      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-4">
        <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Geographic Location Map</h3>
        <div className="w-full h-[350px] rounded-3xl overflow-hidden glass-panel border-slate-200/50 dark:border-slate-800/80 shadow-md">
          {/* Custom Google Maps Embed targeting rc dutt road alkapuri Vadodara */}
          <iframe
            title="Bright Spot Vadodara Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0238128362624!2d73.16788807535878!3d22.31495914269894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8bc19d99723%3A0xc34cf407677bf188!2sR.C.%20Dutt%20Rd%2C%20Alkapuri%2C%20Vadodara%2C%20Gujarat%20390007!5e0!3m2!1sen!2sin!4v1716719943542!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'contrast(0.9) brightness(0.95)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </div>
  );
};

export default Contact;
