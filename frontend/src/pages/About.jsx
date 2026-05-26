import React from 'react';
import { Target, Eye, ShieldCheck, Award, Users, BookOpen, Clock, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Vivek Sharma',
      role: 'Chief Academic Counselor & Founder',
      desc: 'Former Vice Chancellor with 25+ years in education administration. Directs our overall strategic partnerships.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop'
    },
    {
      name: 'Meera Deshpande',
      role: 'Head of Global Scholarships & Grants',
      desc: 'Expert in securing state sponsorships and merit grants. Guided over 4,500 students in financial filings.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1374&auto=format&fit=crop'
    },
    {
      name: 'Rakesh Patel',
      role: 'Director of University Affiliations',
      desc: 'Manages registrar relations and curriculum matches for Krishna, Sandip, Marwadi, and Weltec.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop'
    },
    {
      name: 'Sarah Dsouza',
      role: 'Student Relations Lead & IELTS Coach',
      desc: 'Oversees the student dashboard system, notifications dispatches, and pre-departure counseling.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1374&auto=format&fit=crop'
    }
  ];

  const values = [
    { icon: <Target className="w-6 h-6 text-brand-gold" />, title: 'Mission', desc: 'To streamline admissions through radical transparent counsel, unlocking top-tier academic entries for students of all background tiers.' },
    { icon: <Eye className="w-6 h-6 text-brand-gold" />, title: 'Vision', desc: 'To become India’s most trusted, digitally-integrated full-stack educational advisory platform by 2030.' },
    { icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />, title: 'Integrity', desc: 'Zero hidden agent charges. Zero false promises. Accurate placement ratings, courses fee breakdowns, and verified seat filings.' }
  ];

  return (
    <div className="relative w-full pb-16">
      
      {/* Ambient background blur blobs */}
      <div className="glow-blob w-[400px] h-[400px] bg-brand-blue/15 -top-20 -right-20" />
      <div className="glow-blob w-[400px] h-[400px] bg-brand-gold/10 bottom-[20%] left-[-100px]" />

      {/* ================= HEADER SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Who We Are</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark dark:text-white tracking-tight">
          Bright Spot Educational Solutions
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Established in 2012, Bright Spot is a premier multi-branch higher education advisory. We serve as a direct bridge between ambitious students and elite technical and management institutions.
        </p>
      </section>

      {/* ================= CORE VALUES & MISSION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="glass-panel border-white/20 dark:border-slate-800/40 rounded-2xl p-6 space-y-3 shadow-md hover:border-brand-gold/45 duration-350"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-dark dark:bg-slate-900 flex items-center justify-center border border-brand-gold/30">
                {v.icon}
              </div>
              <h3 className="font-extrabold text-base text-brand-dark dark:text-white">{v.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= EXPERTISE TIMELINE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">End-To-End Counseling</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark dark:text-white">
            Our Consultancy Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="glass-panel border-brand-gold/10 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="text-4xl font-extrabold text-brand-gold/35 absolute right-4 top-4">01</div>
            <Users className="w-8 h-8 text-brand-blue dark:text-brand-goldLight" />
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Career Counseling</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We analyze student profiles, academic track records, and professional dreams to outline accurate degree options and career growth curves.
            </p>
          </div>

          <div className="glass-panel border-brand-gold/10 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="text-4xl font-extrabold text-brand-gold/35 absolute right-4 top-4">02</div>
            <BookOpen className="w-8 h-8 text-brand-blue dark:text-brand-goldLight" />
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Admission Assistance</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              From compiling recommendation packets to digital forms lodgments at partner universities, we manage document verification seamlessly.
            </p>
          </div>

          <div className="glass-panel border-brand-gold/10 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="text-4xl font-extrabold text-brand-gold/35 absolute right-4 top-4">03</div>
            <Award className="w-8 h-8 text-brand-blue dark:text-brand-goldLight" />
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Scholarship Scouting</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our specialists match board marks directly to fee-waivers tables, securing merit discounts and state sponsorships.
            </p>
          </div>

          <div className="glass-panel border-brand-gold/10 p-6 rounded-2xl space-y-3 relative overflow-hidden">
            <div className="text-4xl font-extrabold text-brand-gold/35 absolute right-4 top-4">04</div>
            <HeartHandshake className="w-8 h-8 text-brand-blue dark:text-brand-goldLight" />
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Visa & Pre-Departure</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We assist in bank credit references, fee receipts dispatches, visa filings, and secure student hostels check-in guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* ================= TEAM MEMBERS grid ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Our Mentors</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark dark:text-white">
            Meet Our Senior Advisory Council
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel border-slate-200/50 dark:border-slate-800/40 rounded-3xl overflow-hidden flex flex-col h-full shadow-md group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4">
                  <h4 className="font-extrabold text-sm text-white">{t.name}</h4>
                  <span className="text-[10px] text-brand-goldLight font-semibold">{t.role}</span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= OFFICE TIMELINE & STATS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="glass-panel border-brand-gold/15 p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/5 dark:bg-white/5">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Global Network</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark dark:text-white leading-tight">
              A Decade of Seamless Placements
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
              From our flagship center in Vadodara to hubs in Nashik and Mumbai, Bright Spot has supported engineering and management students nationwide. Over 90% of our clients secure placements within six months of graduation.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="text-center p-3.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl flex-1 shadow-sm">
                <Clock className="w-5 h-5 text-brand-gold mx-auto mb-1.5" />
                <span className="block font-extrabold text-sm text-brand-dark dark:text-white">24 Hour</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">File Turnaround</span>
              </div>
              <div className="text-center p-3.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl flex-1 shadow-sm">
                <Users className="w-5 h-5 text-brand-gold mx-auto mb-1.5" />
                <span className="block font-extrabold text-sm text-brand-dark dark:text-white">100% Free</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Counseling Session</span>
              </div>
            </div>
          </div>

          <div className="space-y-3.5 border-t md:border-t-0 md:border-l border-slate-250 dark:border-slate-800/80 pt-6 md:pt-0 md:pl-8">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Registered Office Centers</h3>
            
            <div className="space-y-3 text-xs text-slate-650 dark:text-slate-400">
              <div>
                <strong className="text-brand-dark dark:text-brand-goldLight font-bold">Vadodara Head Office:</strong>
                <p className="mt-0.5 leading-relaxed">104, Blue Diamond Plaza, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007.</p>
              </div>
              <div>
                <strong className="text-brand-dark dark:text-brand-goldLight font-bold">Mumbai Center:</strong>
                <p className="mt-0.5 leading-relaxed">Office 12, Gold Horizon Towers, Bandra West, Mumbai 400050.</p>
              </div>
              <div>
                <strong className="text-brand-dark dark:text-brand-goldLight font-bold">Nashik Hub Center:</strong>
                <p className="mt-0.5 leading-relaxed">Sandip Heights, Trimbak Road, Nashik, Maharashtra 422002.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
