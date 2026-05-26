import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, GraduationCap, CheckCircle, Trophy, Globe, Award, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  const [universities, setUniversities] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [statStudents, setStatStudents] = useState(0);
  const [statUnis, setStatUnis] = useState(0);
  const [statRate, setStatRate] = useState(0);
  const [statScholarships, setStatScholarships] = useState(0);

  const apiHost = 'http://localhost:5000';

  // Count Up Statistics Animation
  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setStatStudents(Math.min(Math.floor((15200 / steps) * currentStep), 15200));
      setStatUnis(Math.min(Math.floor((120 / steps) * currentStep), 120));
      setStatRate(Number(Math.min((99.2 / steps) * currentStep, 99.2).toFixed(1)));
      setStatScholarships(Math.min(Math.floor((2800 / steps) * currentStep), 2800));

      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  // Fetch Universities & Testimonials from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uRes = await fetch(`${apiHost}/api/universities`);
        const uData = await uRes.json();
        setUniversities(uData.slice(0, 4)); // Show first 4
      } catch (err) {
        // Fallback mockup data if offline
        setUniversities([
          { _id: '1', name: 'Krishna University', location: 'Andhra Pradesh', rankings: 'State #12', placements: '88%', feesRange: '₹30k - ₹1.2L', logo: '🎓' },
          { _id: '2', name: 'Sandip University', location: 'Nashik, MH', rankings: 'NAAC A+', placements: '94%', feesRange: '₹95k - ₹2.5L', logo: '🏫' },
          { _id: '3', name: 'Marwadi University', location: 'Rajkot, GJ', rankings: 'NAAC A+', placements: '92%', feesRange: '₹75k - ₹1.8L', logo: '🌟' },
          { _id: '4', name: 'Weltec College', location: 'Vadodara, GJ', rankings: 'GTU Top', placements: '90%', feesRange: '₹40k - ₹90k', logo: '🛠️' }
        ]);
      }

      try {
        const tRes = await fetch(`${apiHost}/api/testimonials`);
        const tData = await tRes.json();
        setTestimonials(tData);
      } catch (err) {
        setTestimonials([
          { name: 'Rohan Deshmukh', text: 'Bright Spot completely simplified my admission to Sandip University. They evaluated my marksheet and secured a 40% Merit Scholarship!', rating: 5, course: 'B.Tech AI', university: 'Sandip University' },
          { name: 'Anjali Sharma', text: 'The advisors at Bright Spot sat down with me for 2 hours, assessed my interests, and recommended Weltec for practical tech training. Extremely helpful!', rating: 5, course: 'B.Tech Cyber Security', university: 'Weltec College' }
        ]);
      }
    };

    fetchData();
  }, []);

  const whatsappMessage = 'Hello Bright Spot Educational Solutions, I would like to know more about admissions.';
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="relative w-full pb-16 overflow-hidden">
      
      {/* Decorative Blur Ambient Blobs */}
      <div className="glow-blob w-[500px] h-[500px] bg-brand-blue/20 dark:bg-brand-blue/15 -top-40 -left-40" />
      <div className="glow-blob w-[450px] h-[450px] bg-brand-gold/15 dark:bg-brand-gold/10 top-[40%] right-[-100px]" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel border-brand-gold/30 text-brand-navy dark:text-brand-goldLight text-xs font-bold uppercase tracking-wider mb-6 animate-pulse-gold"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Award Winning Admission Consultancy</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-dark dark:text-white leading-tight font-sans max-w-4xl"
        >
          Shape Your Future With <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-gold to-brand-navy dark:from-brand-goldLight dark:via-brand-gold dark:to-brand-goldHover">
            Bright Spot Educational Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm md:text-base text-slate-650 dark:text-brand-goldLight max-w-2xl leading-relaxed font-semibold uppercase tracking-wider"
        >
          Your Trusted Partner for University Admissions & Career Guidance
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link to="/apply" className="btn-gold w-full sm:w-auto flex items-center justify-center gap-2">
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/universities" className="btn-glass w-full sm:w-auto flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Explore Universities</span>
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy !bg-emerald-600 hover:!bg-emerald-700 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Talk on WhatsApp</span>
          </a>
        </motion.div>
      </section>

      {/* ================= STATISTICS COUNT-UP BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="glass-panel border-brand-gold/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-blue/5 pointer-events-none" />
          
          <div className="space-y-2 relative z-10 border-b sm:border-b-0 sm:border-r border-slate-200/50 dark:border-slate-800/50 pb-6 sm:pb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue dark:text-brand-gold font-mono">
              {statStudents.toLocaleString()}+
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Students Admitted</p>
          </div>

          <div className="space-y-2 relative z-10 border-b sm:border-b-0 lg:border-r border-slate-200/50 dark:border-slate-800/50 pb-6 sm:pb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue dark:text-brand-gold font-mono">
              {statUnis}+
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Partner Universities</p>
          </div>

          <div className="space-y-2 relative z-10 border-b sm:border-b-0 sm:border-r border-slate-200/50 dark:border-slate-800/50 pb-6 sm:pb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue dark:text-brand-gold font-mono">
              {statRate}%
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Success Rate</p>
          </div>

          <div className="space-y-2 relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue dark:text-brand-gold font-mono">
              {statScholarships.toLocaleString()}+
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Scholarships Processed</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED UNIVERSITIES CAROUSEL ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Prestige Institutions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark dark:text-white">
              Featured Partner Universities
            </h2>
          </div>
          <Link
            to="/universities"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-blue dark:text-brand-goldLight hover:underline"
          >
            <span>View All Partner Campuses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Universities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((uni, i) => (
            <motion.div
              key={uni._id || uni.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card-gold flex flex-col h-full rounded-2xl overflow-hidden p-5 space-y-4"
            >
              <div className="flex items-center space-x-3.5">
                {uni.logo && uni.logo.startsWith('data:') ? (
                  <img src={uni.logo} alt={uni.name} className="w-12 h-12 rounded-xl object-contain shadow-sm shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-2xl shadow-sm shrink-0">
                    {uni.logo || '🎓'}
                  </div>
                )}
                <div>
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white leading-snug line-clamp-1">{uni.name}</h3>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{uni.location}</span>
                </div>
              </div>

              <hr className="border-slate-200/50 dark:border-slate-800/50" />

              <div className="space-y-2 text-xs flex-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rankings:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 line-clamp-1 text-right">{uni.rankings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Placements:</span>
                  <span className="font-semibold text-brand-blue dark:text-brand-goldLight">{uni.placements}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fee Range:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{uni.feesRange}</span>
                </div>
              </div>

              <Link
                to={`/universities/${uni._id || uni.id}`}
                className="w-full text-center py-2.5 rounded-xl bg-slate-100 hover:bg-brand-gold dark:bg-slate-900 dark:hover:bg-brand-gold/30 text-xs font-bold tracking-wide text-brand-dark dark:text-slate-200 hover:text-brand-dark transition-all"
              >
                Explore Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SCHOLARSHIP HIGH-LIGHTS BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="glass-panel border-brand-gold/25 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-blue/15 pointer-events-none" />
          
          <div className="space-y-4 lg:w-2/3 relative z-10">
            <div className="inline-flex items-center gap-1 bg-brand-gold/20 text-brand-goldDark dark:text-brand-goldLight px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Scholarship Pool Live</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark dark:text-white leading-tight">
              Unlock Up To 100% Merit Scholarships
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We guide you through the process of filing financial applications. Based on your 10th and 12th board marks, we map your profiles to institutional grants at Sandip and Marwadi universities to secure zero-tuition offers!
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Immediate Board Score Spot Evaluation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Full & Partial Tuition Fee Waivers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Specialized State Sponsorship Filings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct Consultant Brackets Secured</span>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/3 w-full flex flex-col justify-center items-center relative z-10 bg-slate-900/5 dark:bg-white/5 border border-white/10 dark:border-slate-800 p-6 rounded-2xl shadow-inner">
            <Award className="w-16 h-16 text-brand-gold animate-bounce mb-3" />
            <h3 className="font-extrabold text-lg text-brand-dark dark:text-white mb-1">Evaluating for 2026</h3>
            <p className="text-[10px] text-slate-400 text-center mb-4 leading-relaxed">Submit your high-school transcripts under our smart form portal.</p>
            <Link to="/apply" className="btn-gold !w-full text-center text-xs">
              Check Scholarship Slot
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CAREER GUIDANCE BANNER ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-brand-dark to-brand-navy dark:from-slate-900 dark:to-brand-accent p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-white border border-white/10">
          <div className="space-y-4 md:w-2/3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/15 px-3 py-1 rounded-full border border-brand-gold/20">
              Interactive AI Assistant
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
              Confused About Choosing Your Degree?
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Meet **BrightBot**, our state-of-the-art AI Career Counselor. Input your preferred field, fee parameters, or post-degree targets, and get immediate matches from our active academic catalog!
            </p>
          </div>
          <div className="shrink-0 flex items-center md:w-1/3 justify-center">
            <button
              onClick={() => {
                // Scroll to or click the Chatbot bubble
                const botBtn = document.querySelector('[aria-label="Open AI Counseling Chat"]');
                if (botBtn) {
                  const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
                  botBtn.dispatchEvent(clickEvent);
                }
              }}
              className="btn-gold !bg-brand-gold text-brand-dark flex items-center justify-center gap-2 hover:-translate-y-1 duration-300 animate-pulse-gold"
            >
              <MessageCircle className="w-5 h-5 fill-brand-dark" />
              <span>Talk to BrightBot</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= ADMISSION PROCESS TIMELINE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-12 relative">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Your Academic Journey</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark dark:text-white">
            Simplified Admission Process
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">
            From initial counseling to dynamic letter dispatchment, we manage every milestone.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 pt-6">
          {/* Timeline Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-brand-gold via-brand-blue to-brand-navy dark:from-brand-goldLight dark:via-brand-gold dark:to-brand-goldHover -z-10" />

          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4 relative"
          >
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-lg ring-4 ring-brand-gold/15">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5 px-4">
              <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">Step 01</span>
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Career Counseling</h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                Consult with our senior advisors or **BrightBot** to map your specific skills and preferred parameters.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center text-center space-y-4 relative"
          >
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-brand-blue/40 flex items-center justify-center text-brand-blue shadow-lg ring-4 ring-brand-blue/15">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 px-4">
              <span className="text-[10px] uppercase font-bold text-brand-blue dark:text-brand-goldLight tracking-widest block">Step 02</span>
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Filing Application</h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                Complete our unified registration stepper and securely upload transcripts directly in the student portal.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center space-y-4 relative"
          >
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-brand-navy/40 flex items-center justify-center text-brand-navy dark:text-brand-goldLight shadow-lg ring-4 ring-brand-navy/15">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 px-4">
              <span className="text-[10px] uppercase font-bold text-brand-navy dark:text-brand-goldLight tracking-widest block">Step 03</span>
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Desk Verification</h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                Our support team audits files and manages immediate seat lodge logs directly with the registrar board.
              </p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col items-center text-center space-y-4 relative"
          >
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-lg ring-4 ring-brand-gold/15">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 px-4">
              <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">Step 04</span>
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">Offer Dispatch</h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                Unlock merit scholarships and download your official provisional admission letter inside 10 days!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STUDENT TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Trust & Excellence</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark dark:text-white">
            What Our Admitted Students Say
          </h2>
        </div>

        {/* Testimonials Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-panel border-slate-200/50 dark:border-slate-800/40 p-6 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="flex space-x-1 text-brand-gold">
                {[...Array(test.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold" />
                ))}
              </div>

              <p className="text-xs md:text-sm text-slate-650 dark:text-slate-300 leading-relaxed italic">
                "{test.text}"
              </p>

              <div className="flex items-center space-x-3.5 pt-2">
                {test.avatar ? (
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-brand-gold/30" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center text-sm font-bold text-brand-dark uppercase border border-brand-gold/30">
                    {test.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-extrabold text-xs text-brand-dark dark:text-white">{test.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold">{test.course} - {test.university}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
