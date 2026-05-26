import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Clock, CreditCard, ChevronRight, Filter, BookOpen, Sparkles, RefreshCw, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Courses = () => {
  const navigate = useNavigate();
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUni, setSelectedUni] = useState('');
  const [maxFee, setMaxFee] = useState(250000);

  const apiHost = 'http://localhost:5000';

  // Seed standard partner data as static fallback for offline mode
  const seedCoursesMock = [
    // Engineering
    { id: 'c1', name: 'B.Tech Computer Science & Engineering', category: 'Engineering', duration: '4 Years', fee: 80000, uniName: 'Krishna University', uniId: 'krishna_u', description: 'Comprehensive study of computing paradigms, algorithms, and software development pipelines.', curriculum: ['Data Structures & Algorithms', 'Operating Systems', 'Machine Learning Essentials'] },
    { id: 'c2', name: 'B.Tech Computer Science (AI & Machine Learning)', category: 'Engineering', duration: '4 Years', fee: 140000, uniName: 'Sandip University', uniId: 'sandip_u', description: 'IBM partner track focusing on neural networks, automation modeling, and big data processes.', curriculum: ['Python for AI', 'Applied Neural Networks', 'Robotics Systems'] },
    { id: 'c3', name: 'B.Tech Software Engineering', category: 'Engineering', duration: '4 Years', fee: 110000, uniName: 'Marwadi University', uniId: 'marwadi_u', description: 'Practical B.Tech program built on Agile project frameworks, DevOps, and cloud systems scaling.', curriculum: ['Agile Project Management', 'Cloud Computing (AWS/GCP)', 'DevOps Pipelines'] },
    { id: 'c4', name: 'B.Tech Information Technology & Cyber Security', category: 'Engineering', duration: '4 Years', fee: 90000, uniName: 'Weltec College of Engineering', uniId: 'weltec', description: 'Network administration, secure coding, system vulnerability audits, and cryptography.', curriculum: ['Cryptography Algorithms', 'Network Security', 'Ethical Hacking Labs'] },
    // MBA
    { id: 'c5', name: 'Master of Business Administration (MBA)', category: 'MBA', duration: '2 Years', fee: 65000, uniName: 'Krishna University', uniId: 'krishna_u', description: 'Strategic management course covering finance workflows, corporate law, and brand operations.', curriculum: ['Organizational Behavior', 'Financial Analysis', 'Strategic Operations'] },
    { id: 'c6', name: 'MBA International Finance & Consulting', category: 'MBA', duration: '2 Years', fee: 170000, uniName: 'Sandip University', uniId: 'sandip_u', description: 'Global corporate management targeting investment banking, risk auditing, and fintech systems.', curriculum: ['Global Financial Markets', 'Investment Banking', 'Risk Assessment & Auditing'] },
    { id: 'c7', name: 'MBA Business Analytics & Big Data', category: 'MBA', duration: '2 Years', fee: 135000, uniName: 'Marwadi University', uniId: 'marwadi_u', description: 'Equips corporate managers to parse large datasets, execute predictive modeling, and make data-driven decisions.', curriculum: ['Predictive Modeling', 'Tableau & PowerBI Systems', 'Market Research Analytics'] },
    // Arts & Science / Medical
    { id: 'c8', name: 'B.Sc Forensic Science & Cyber Investigation', category: 'Medical', duration: '3 Years', fee: 95000, uniName: 'Sandip University', uniId: 'sandip_u', description: 'Comprehensive program covering DNA forensics, toxicology, and crime scene recreation.', curriculum: ['Criminal Law & Codes', 'Digital Evidence Forensics', 'Toxicology Systems'] },
    { id: 'c9', name: 'B.Sc Digital Electronics & Communication', category: 'Arts & Science', duration: '3 Years', fee: 45000, uniName: 'Krishna University', uniId: 'krishna_u', description: 'Hands-on study of communication physics, microcontrollers programming, and digital circuits design.', curriculum: ['Analog Circuits', 'Digital Communication Protocols', 'Microcontrollers & IoT'] },
    // Study Abroad
    { id: 'c10', name: 'Global Credit Transfer Program (Study Abroad)', category: 'Study Abroad Programs', duration: '2 + 2 Years', fee: 180000, uniName: 'Sandip University', uniId: 'sandip_u', description: 'Start your study catalog under Indian partner branches and seamlessly transfer credits to EU or USA campuses.', curriculum: ['Academic English Preparation', 'International Credits Mapping', 'Intercultural Integration'] },
    // Diploma
    { id: 'c11', name: 'Diploma in Practical Network Administration', category: 'Diploma Courses', duration: '1 Year', fee: 40000, uniName: 'Weltec College of Engineering', uniId: 'weltec', description: 'Fast-track booster certificate teaching router configurations, Cisco routing protocols, and active directory schemes.', curriculum: ['CCNA Certification Prep', 'Windows Server Administration', 'Linux Shell Administration'] }
  ];

  useEffect(() => {
    const fetchCoursesFromDb = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiHost}/api/universities`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Map course structures dynamically from all active universities
        const extracted = [];
        data.forEach(uni => {
          uni.courses?.forEach(c => {
            // Smart category categorization
            let category = 'Arts & Science';
            const nameLower = c.name.toLowerCase();
            if (nameLower.includes('computer') || nameLower.includes('software') || nameLower.includes('engineering') || nameLower.includes('technology')) {
              category = 'Engineering';
            } else if (nameLower.includes('business') || nameLower.includes('mba') || nameLower.includes('management') || nameLower.includes('consult')) {
              category = 'MBA';
            } else if (nameLower.includes('forensic')) {
              category = 'Medical';
            } else if (nameLower.includes('diploma')) {
              category = 'Diploma Courses';
            } else if (nameLower.includes('abroad') || nameLower.includes('transfer')) {
              category = 'Study Abroad Programs';
            }

            extracted.push({
              id: c._id || Math.random().toString(36).substring(2, 9),
              name: c.name,
              category: category,
              duration: c.duration || '4 Years',
              fee: c.fee || 90000,
              uniName: uni.name,
              uniId: uni._id || uni.id,
              description: c.description || 'Verified academic syllabus program.',
              curriculum: c.curriculum || ['Accredited Modules', 'Practical Labs Sessions']
            });
          });
        });

        setCoursesList(extracted.length > 0 ? extracted : seedCoursesMock);
      } catch (err) {
        console.error('Fetch courses failed, loading mockup seeder:', err);
        setCoursesList(seedCoursesMock);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesFromDb();
  }, []);

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedCategory('');
    setSelectedUni('');
    setMaxFee(250000);
  };

  // Perform multi-dimensional client-side filtering
  const getFilteredCourses = () => {
    return coursesList.filter(course => {
      const matchSearch = 
        course.name.toLowerCase().includes(searchText.toLowerCase()) || 
        course.description.toLowerCase().includes(searchText.toLowerCase()) ||
        course.uniName.toLowerCase().includes(searchText.toLowerCase());

      const matchCategory = !selectedCategory || course.category === selectedCategory;
      const matchUni = !selectedUni || course.uniName === selectedUni;
      const matchFee = course.fee <= maxFee;

      return matchSearch && matchCategory && matchUni && matchFee;
    });
  };

  const categories = [
    { label: 'All Fields', value: '' },
    { label: 'Engineering (B.Tech)', value: 'Engineering' },
    { label: 'MBA / Management', value: 'MBA' },
    { label: 'Medical Sciences', value: 'Medical' },
    { label: 'Arts & Science', value: 'Arts & Science' },
    { label: 'Study Abroad', value: 'Study Abroad Programs' },
    { label: 'Diploma Tracks', value: 'Diploma Courses' }
  ];

  const uniqueUnis = Array.from(new Set(coursesList.map(c => c.uniName)));

  return (
    <div className="relative w-full pb-16 min-h-screen">
      
      {/* Visual background blobs */}
      <div className="glow-blob w-[400px] h-[400px] bg-brand-blue/10 -top-20 -left-20" />
      <div className="glow-blob w-[350px] h-[350px] bg-brand-gold/10 bottom-10 right-0" />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Academic Catalog</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white tracking-tight">
          Explore Our Premium Courses
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">
          Compare global syllabus tracks, check annual fee brackets, and register directly into India's leading prestige universities.
        </p>
      </section>

      {/* ================= FILTER PANEL DESK ================= */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 glass-panel border-slate-200/50 dark:border-slate-800/60 p-6 rounded-2xl h-fit space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-brand-gold" />
              <span>Catalog Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-brand-goldLight hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <hr className="border-slate-200/50 dark:border-slate-850" />

          {/* Search courses */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Search Course Title</label>
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search computer science..."
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* University Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Partner University</label>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-700 dark:text-slate-350 focus:ring-1 focus:ring-brand-gold"
            >
              <option value="">All Campuses</option>
              {uniqueUnis.map((uName, idx) => (
                <option key={idx} value={uName}>{uName}</option>
              ))}
            </select>
          </div>

          {/* Fee budget limit */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>Max Annual Fee</span>
              <span className="text-brand-blue dark:text-brand-gold">₹{maxFee.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="40000"
              max="250000"
              step="10000"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-brand-gold bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-1.5"
            />
          </div>

        </div>

        {/* Results Desk */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                  selectedCategory === cat.value
                    ? 'bg-brand-dark border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                    : 'bg-white/60 dark:bg-slate-950/20 border-slate-200/50 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:border-brand-gold/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-2">
              <span className="w-8 h-8 rounded-full border-4 border-brand-gold border-t-transparent animate-spin" />
              <p className="text-xs text-slate-400 font-bold">Scanning curriculum maps...</p>
            </div>
          ) : getFilteredCourses().length === 0 ? (
            <div className="glass-panel border-dashed border-2 border-slate-250 dark:border-slate-850 p-12 text-center rounded-2xl space-y-4">
              <BookOpen className="w-12 h-12 text-brand-gold mx-auto" />
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">No Matching Courses Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mt-1">
                Try widening your fee sliders, clearing search filters, or selecting "All Fields" above.
              </p>
              <button onClick={handleResetFilters} className="btn-gold !text-xs !px-4.5 !py-2">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getFilteredCourses().map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="glass-card-gold flex flex-col justify-between h-full rounded-2xl p-5 border border-brand-gold/10 space-y-4 hover:border-brand-gold/40 transition-colors shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-brand-blue/15 text-brand-blue dark:bg-brand-gold/15 dark:text-brand-goldLight border border-brand-blue/10 dark:border-brand-gold/20 px-2.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide">
                        {course.category}
                      </span>
                      <span className="text-[10px] font-extrabold text-brand-gold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs md:text-sm text-brand-dark dark:text-white leading-snug line-clamp-2">
                        {course.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold block">{course.uniName}</span>
                    </div>

                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                      {course.description}
                    </p>

                    {course.curriculum && (
                      <div className="space-y-1.5 bg-slate-100/40 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/80">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <BookmarkCheck className="w-3.5 h-3.5 text-brand-gold" />
                          <span>Curriculum Focus</span>
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.curriculum.map((item, i) => (
                            <span
                              key={i}
                              className="bg-white dark:bg-slate-950 px-2 py-0.5 border border-slate-200/50 dark:border-slate-800/80 text-[8px] font-extrabold text-slate-500 rounded uppercase"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/40 dark:border-slate-850 pt-4 shrink-0 mt-2">
                    <div>
                      <span className="text-[8px] text-slate-400 uppercase tracking-widest block font-bold">Annual Fee</span>
                      <span className="font-extrabold text-sm text-brand-dark dark:text-white">
                        ₹{course.fee?.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/universities/${course.uniId}`}
                        className="btn-glass !px-3.5 !py-2 !text-[9px] !rounded-xl"
                        title="View campus blueprints"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => navigate(`/apply?uni=${encodeURIComponent(course.uniName)}&course=${encodeURIComponent(course.name)}`)}
                        className="btn-gold !px-3.5 !py-2 !text-[9px] !rounded-xl font-extrabold flex items-center gap-1 hover:shadow-sm"
                      >
                        <span>Apply</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default Courses;
