import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Trophy, Percent, GraduationCap, Download, CheckCircle, Send, Landmark, Users, BookOpen, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const UniversityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Application Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState('');

  // Brochure Download States
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const apiHost = 'http://localhost:5000';

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiHost}/api/universities/${id}`);
        if (!res.ok) throw new Error('Details not found');
        const data = await res.json();
        setUniversity(data);
        if (data.courses?.length > 0) {
          setSelectedCourse(data.courses[0].name);
        }
      } catch (err) {
        console.error('Fetch detail error, applying offline fallback mapping:', err);
        
        // Offline Fallback match based on ID string
        const mockList = [
          {
            _id: 'krishna_u',
            name: 'Krishna University',
            location: 'Machilipatnam, Andhra Pradesh',
            rankings: 'State Rank #12 | NAAC A Grade',
            feesRange: '₹30,000 - ₹1,20,000 / year',
            placements: '88% Placement Success Rate',
            logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%230B2545"/><path d="M50 20L20 35L50 50L80 35L50 20Z" fill="%23D4AF37"/></svg>`,
            campusImages: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470'],
            overview: 'Krishna University is a state-funded institution catering to academic excellence. Established in 2008, it boasts exceptional infrastructure, digital laboratories, and dedicated placement teams facilitating stellar industrial pathways.',
            courses: [
              { name: 'B.Tech Computer Science & Engineering', fee: 80000, duration: '4 Years', description: 'Comprehensive study of computing paradigms, algorithms, hardware architectures, and modern software development pipelines.', curriculum: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Machine Learning Essentials'] },
              { name: 'B.Sc Digital Electronics & Communication', fee: 45000, duration: '3 Years', description: 'Focuses on modern microprocessors, VLSI design principles, communication physics, and automation hardware systems.', curriculum: ['Analog Circuits', 'Digital Communication Protocols', 'Microcontrollers & IoT', 'Signal Processing'] },
              { name: 'Master of Business Administration (MBA)', fee: 65000, duration: '2 Years', description: 'Global business management course targeting operations, digital marketing, corporate finance, and leadership workflows.', curriculum: ['Organizational Behavior', 'Financial Analysis', 'Strategic Operations', 'Digital Brand Management'] },
              { name: 'Master of Computer Applications (MCA)', fee: 70000, duration: '2 Years', description: 'Advanced postgraduate software program teaching application architecture, distributed computing, and database scaling.', curriculum: ['Advanced Java Programming', 'Cloud Architecture', 'Mobile App Development', 'Cyber Security Protocols'] }
            ],
            academicStructure: 'Semester-based pattern with continuous internal assessments (CIA), laboratory workshops, and a mandatory final semester capstone project.',
            hostelDetails: 'Excellent separate male/female residence facilities offering high-speed Wi-Fi, hygienic cafeteria dining, indoor gymnasiums, and round-the-clock medical care.',
            facultyHighlights: [
              'Dr. A. K. R. Prasad - PhD in Computer Science (30+ research journals)',
              'Prof. S. Lakshmi - Expert in VLSI Digital Designs & Systems',
              'Dr. Raghav Reddy - MBA Dean, Former Chief Business Strategist'
            ]
          },
          {
            _id: 'sandip_u',
            name: 'Sandip University',
            location: 'Nashik, Maharashtra',
            rankings: 'Top Private Rank #3 | NAAC A+',
            feesRange: '₹95,000 - ₹2,50,000 / year',
            placements: '94% Placements | Highest ₹18 LPA',
            logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%23134074"/><circle cx="50" cy="50" r="30" stroke="%23D4AF37" stroke-width="6"/></svg>`,
            campusImages: ['https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1486'],
            overview: 'Sandip University is a world-class educational hub sprawling across 250+ acres. Known for its global curriculum, industry integration, and international exchanges, it nurtures students to become global business leaders.',
            courses: [
              { name: 'B.Tech Computer Science (AI & ML)', fee: 140000, duration: '4 Years', description: 'Premium software curriculum designed in partnership with IBM, teaching neural networks, deep learning models, and automation systems.', curriculum: ['Python for AI', 'Applied Neural Networks', 'Natural Language Processing', 'Data Warehousing'] },
              { name: 'MBA International Finance & Consulting', fee: 170000, duration: '2 Years', description: 'Superb financial counseling course. Trains students in international trade, investment modeling, risk auditing, and fintech.', curriculum: ['Global Financial Markets', 'Fintech Security', 'Investment Banking', 'Risk Assessment & Auditing'] },
              { name: 'B.Sc Forensic Science & Cyber Investigation', fee: 95000, duration: '3 Years', description: 'Hands-on scientific course focused on crime scene recreation, DNA analysis, cyber forensics, and digital fraud prevention.', curriculum: ['Criminal Law & Codes', 'Digital Evidence Forensics', 'Toxicology Systems', 'Ballistic Analysis'] }
            ],
            academicStructure: 'Choice-Based Credit System (CBCS) allowing students to select dual majors and interdisciplinary minors along with international exchange options.',
            hostelDetails: 'State-of-the-art multi-sharing AC and Non-AC hostel rooms, laundry operations, organic student mess, swimming pool access, and robust multi-tier security.',
            facultyHighlights: [
              'Dr. Mukesh Pathak - Member of International Forensic Guild',
              'Dr. Cheryl Dsouza - Artificial Intelligence Pioneer',
              'Prof. Anand Joshi - Harvard Alumnus, Business Policy Expert'
            ]
          }
        ];

        // Find match in offline pool, default to Krishna University if no ID matches
        const matched = mockList.find(item => item._id === id || id.toLowerCase().includes(item._id.split('_')[0])) || mockList[0];
        setUniversity(matched);
        if (matched.courses?.length > 0) {
          setSelectedCourse(matched.courses[0].name);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Load User Data into fields automatically if logged in
  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    const storedEmail = localStorage.getItem('userEmail') || '';
    setFullName(name);
    setEmail(storedEmail);
  }, []);

  // simulated brochure downloader
  const handleDownloadBrochure = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            
            // Trigger actual simulated file save
            const blob = new Blob([`Official Academic Brochure for ${university?.name}. Prepared by Bright Spot Educational Solutions.`], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${university?.name.replace(/\s+/g, '_')}_Brochure.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Submit Admission application directly
  const handleApplyNow = async (e) => {
    e.preventDefault();
    setApplyError('');
    setApplySuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      setApplyError('Please login to your Student Portal to file applications.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!fullName || !email || !phone || !selectedCourse) {
      setApplyError('Please fill out all mandatory fields.');
      return;
    }

    setIsApplying(true);
    try {
      const response = await fetch(`${apiHost}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          universityId: university._id || university.id,
          universityName: university.name,
          courseName: selectedCourse,
          userName: fullName,
          userEmail: email,
          userPhone: phone,
          documents: []
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Submission failed');

      setApplySuccess(true);
      setFullName('');
      setPhone('');
    } catch (err) {
      console.error(err);
      setApplyError(err.message || 'Application submission failed. Try again.');
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-2">
        <span className="w-10 h-10 rounded-full border-4 border-brand-gold border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-slate-400">Loading university catalog...</p>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold text-brand-dark dark:text-white">University Not Found</h2>
        <p className="text-xs text-slate-400 mt-2">The university ID might be invalid or deleted.</p>
        <Link to="/universities" className="btn-gold !text-xs mt-6 inline-block">Return to Catalog</Link>
      </div>
    );
  }

  const tabLabels = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses Offered' },
    { id: 'hostel', label: 'Facilities & Hostel' },
    { id: 'faculty', label: 'Academic & Faculty' }
  ];

  return (
    <div className="relative w-full pb-16">
      
      {/* Dynamic Header Cover Image */}
      <div className="w-full h-[250px] md:h-[350px] relative">
        <img
          src={university.campusImages?.[0] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1470'}
          alt={university.name}
          className="w-full h-full object-cover filter brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
      </div>

      {/* ================= PROFILE CARD METADATA ================= */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 md:-mt-24 relative z-10">
        <div className="glass-panel border-brand-gold/15 p-6 rounded-3xl flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 border border-brand-gold/30 shadow-md shrink-0 bg-gradient-to-br from-slate-50 to-brand-light">
              {university.logo && university.logo.startsWith('data:') ? (
                <img src={university.logo} alt={university.name} className="w-full h-full object-contain" />
              ) : (
                <span className="text-4xl">{university.logo || '🏫'}</span>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-extrabold text-brand-dark dark:text-white tracking-tight leading-tight">{university.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-1 text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span className="text-xs font-semibold">{university.location}</span>
              </div>
            </div>
          </div>

          {/* Action buttons (Brochure and fast apply triggers) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 pt-2">
            <button
              onClick={handleDownloadBrochure}
              disabled={isDownloading}
              className="btn-glass !px-5 !py-3 !text-xs !rounded-xl border-brand-gold/25 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-brand-gold" />
              <span>{isDownloading ? `Downloading (${downloadProgress}%)` : 'Download Brochure'}</span>
            </button>
            <a
              href="#apply-portal"
              className="btn-gold !px-5 !py-3 !text-xs !rounded-xl text-center"
            >
              Consultant Apply Now
            </a>
          </div>

        </div>
      </section>

      {/* ================= TABS NAVIGATION ================= */}
      <section className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Tabs Catalog */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap scrollbar-none">
            {tabLabels.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-brand-gold text-brand-gold dark:text-brand-goldLight'
                    : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-355'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENTS SWITCH */}
          <div className="min-h-[250px] tab-content-active">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl border-white/20 dark:border-slate-800/40 space-y-4">
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Institution Overview</h3>
                  <p className="text-xs md:text-sm text-slate-650 dark:text-slate-300 leading-relaxed">{university.overview}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-panel p-5 rounded-xl flex items-center space-x-4">
                    <Trophy className="w-8 h-8 text-brand-gold shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-xs text-brand-dark dark:text-white">Rankings Registry</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{university.rankings}</p>
                    </div>
                  </div>
                  <div className="glass-panel p-5 rounded-xl flex items-center space-x-4">
                    <Percent className="w-8 h-8 text-brand-blue shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-xs text-brand-dark dark:text-white">Placements Record</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{university.placements}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Academic Pattern & Syllabus</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{university.academicStructure || 'Choice-Based Credit System structure (CBCS) mapping double majors, industrial labs sessions, and internship projects evaluation.'}</p>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold mb-2">Academic Degree Roster</h3>
                {university.courses?.map((course, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-5 rounded-2xl border-white/20 dark:border-slate-800/40 space-y-3 shadow-sm hover:border-brand-gold/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <h4 className="font-extrabold text-sm text-brand-dark dark:text-white">{course.name}</h4>
                      <span className="bg-brand-gold/15 text-brand-goldDark dark:text-brand-goldLight border border-brand-gold/20 px-3 py-1 rounded-md text-[10px] font-extrabold uppercase">
                        ₹{course.fee?.toLocaleString()}/yr
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Duration: {course.duration || '4 Years'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Landmark className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Accredited</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {course.description}
                    </p>

                    {course.curriculum && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Syllabus Highlights</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-650 dark:text-slate-300">
                          {course.curriculum.map((topic, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hostel' && (
              <div className="glass-panel p-6 rounded-2xl border-white/20 dark:border-slate-800/40 space-y-4">
                <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Residential Facilities</h3>
                <p className="text-xs md:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                  {university.hostelDetails || 'Secureseparate male/female residence towers. Features air-conditioned options, laundry wings, biometric security logs, study lounges with high-speed Wi-Fi networks, and a dynamic student mess offering organic, hygienic vegetarian cuisine.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {['Separate AC/Non-AC Wings', '24/7 Biometric Logs', 'Hygienic Cafeteria', 'Free Wi-Fi Study Lounges', 'Power Backup', 'Gym & Squash Courts'].map((fac, i) => (
                    <div key={i} className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-center text-[10px] font-bold text-slate-600 dark:text-slate-350 bg-white/30 dark:bg-slate-900/30">
                      {fac}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faculty' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Senior Faculty Council</h3>
                  <div className="space-y-3">
                    {university.facultyHighlights?.map((fac, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40">
                        <Users className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 dark:text-slate-300 leading-normal">{fac}</span>
                      </div>
                    )) || (
                      <p className="text-xs text-slate-400 italic">No academic staff lists registered.</p>
                    )}
                  </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Key Recruiters</h4>
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {['Tata Consultancy Services', 'Infosys', 'Capgemini', 'IBM India', 'Cognizant', 'L&T Infotech', 'Wipro Technologies'].map((comp, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-xl text-[10px] font-bold"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Apply Form Portal */}
        <div id="apply-portal" className="lg:col-span-1">
          <div className="glass-panel border-brand-gold/30 p-6 rounded-3xl space-y-5 shadow-xl relative overflow-hidden bg-gradient-to-b from-white/95 to-brand-light/30 dark:from-slate-950/60 dark:to-slate-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold via-brand-blue to-brand-navy" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">Fast Application desk</span>
              <h3 className="font-extrabold text-base text-brand-dark dark:text-white">Apply Through Consultancy</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed">
                Direct seat filing system. No processing charges. Pre-filled for {university.name}.
              </p>
            </div>

            <hr className="border-slate-200/50 dark:border-slate-850" />

            {applySuccess ? (
              <div className="p-6 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-extrabold text-sm text-brand-dark dark:text-white">Registration Complete!</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed">
                  Your entry files for {university.name} have been created. Track verification timelines on your student dashboard.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-gold !text-xs !w-full"
                >
                  Go to Student Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyNow} className="space-y-4">
                
                {applyError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold rounded-xl leading-normal">
                    {applyError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Select Preferred Course *</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-brand-gold"
                    required
                  >
                    {university.courses?.map((c, i) => (
                      <option key={i} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Upload Transcripts (Mock)</label>
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 text-center border-dashed border border-slate-350 dark:border-slate-800 rounded-xl">
                    <span className="text-[9px] text-slate-400 font-bold block">10th & 12th PDF or JPG</span>
                    <span className="text-[8px] text-slate-400 block mt-0.5">Will read mock folders upload</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isApplying}
                  className="btn-gold !w-full flex items-center justify-center gap-1.5 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isApplying ? 'Submitting Application...' : 'Lodge Entry Application'}</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </section>

    </div>
  );
};

export default UniversityDetail;
