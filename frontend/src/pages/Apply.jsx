import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, FileText, Landmark, GraduationCap, Phone, Mail, User, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const Apply = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredUni, setPreferredUni] = useState('');
  const [preferredCourse, setPreferredCourse] = useState('');
  const [documentName, setDocumentName] = useState('12th Marksheet');
  const [documentFile, setDocumentFile] = useState(null);

  const [universities, setUniversities] = useState([]);
  const apiHost = 'http://localhost:5000';

  // Seed standard partner data as static fallback for select menus
  const seedUnisMock = [
    { id: 'krishna_u', name: 'Krishna University', courses: ['B.Tech Computer Science & Engineering', 'B.Sc Digital Electronics & Communication', 'Master of Business Administration (MBA)', 'Master of Computer Applications (MCA)'] },
    { id: 'sandip_u', name: 'Sandip University', courses: ['B.Tech Computer Science (AI & Machine Learning)', 'MBA International Finance & Consulting', 'B.Sc Forensic Science & Cyber Investigation'] },
    { id: 'marwadi_u', name: 'Marwadi University', courses: ['B.Tech Software Engineering', 'MBA Business Analytics & Big Data', 'BCA Mobile Application Architecture'] },
    { id: 'weltec', name: 'Weltec College of Engineering', courses: ['B.Tech Information Technology & Cyber Security', 'Diploma in Practical Network Administration', 'MCA Database Systems & Security'] }
  ];

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setFullName(localStorage.getItem('userName') || '');
      setEmail(localStorage.getItem('userEmail') || '');
    } else {
      setIsLoggedIn(false);
    }

    const loadUniversitiesList = async () => {
      try {
        const res = await fetch(`${apiHost}/api/universities`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUniversities(data);
        
        const queryUni = searchParams.get('uni');
        const queryCourse = searchParams.get('course');
        
        if (queryUni) {
          setPreferredUni(queryUni);
          setStep(2);
        } else if (data.length > 0) {
          setPreferredUni(data[0].name);
        }
        
        if (queryCourse) {
          setPreferredCourse(queryCourse);
        }
      } catch (err) {
        setUniversities(seedUnisMock);
        
        const queryUni = searchParams.get('uni');
        const queryCourse = searchParams.get('course');
        
        if (queryUni) {
          setPreferredUni(queryUni);
          setStep(2);
        } else {
          setPreferredUni(seedUnisMock[0].name);
        }
        
        if (queryCourse) {
          setPreferredCourse(queryCourse);
        }
      }
    };

    loadUniversitiesList();
  }, [searchParams]);

  // Update course select options when selected university shifts
  const getCoursesForSelectedUni = () => {
    const uniMatch = universities.find(u => u.name === preferredUni);
    if (!uniMatch) return [];
    
    // Mapped standard schema structure
    if (uniMatch.courses && typeof uniMatch.courses[0] === 'object') {
      return uniMatch.courses.map(c => c.name);
    }
    
    // Mapped static fallback arrays
    return uniMatch.courses || [];
  };

  useEffect(() => {
    const availableCourses = getCoursesForSelectedUni();
    if (availableCourses.length > 0) {
      setPreferredCourse(availableCourses[0]);
    }
  }, [preferredUni, universities]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !phone.trim()) {
        setError('Please fill out all contact fields before proceeding.');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!preferredUni || !preferredCourse) {
        setError('Please select a university and specific course.');
        return;
      }
      setError('');
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setError('');
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('A secure student portal session is required. Please login first.');
      return;
    }

    setLoading(true);
    try {
      const selectedUniMatch = universities.find(u => u.name === preferredUni);
      const uniId = selectedUniMatch?._id || selectedUniMatch?.id || 'krishna_u';

      // 1. Submit application meta details
      const response = await fetch(`${apiHost}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          universityId: uniId,
          universityName: preferredUni,
          courseName: preferredCourse,
          userName: fullName,
          userEmail: email,
          userPhone: phone,
          documents: documentFile ? [{ name: documentName, url: `/uploads/${documentFile.name}` }] : []
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Filing registration failed.');

      // 2. Submit document upload if present in input
      if (documentFile) {
        const formData = new FormData();
        formData.append('document', documentFile);
        formData.append('name', documentName);

        await fetch(`${apiHost}/api/auth/upload-doc`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Application submission failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full pb-16 min-h-screen">
      
      {/* Decorative Blur Blobs */}
      <div className="glow-blob w-[400px] h-[400px] bg-brand-gold/10 -top-20 -left-20" />
      <div className="glow-blob w-[350px] h-[350px] bg-brand-blue/10 bottom-10 right-0" />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Online Registrations</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white tracking-tight">
          Admissions Counseling Desk
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto">
          Complete our unified application form. Select your targeted university and course to trigger instant portfolio audits.
        </p>
      </section>

      {/* Main Registration Portal */}
      <section className="max-w-3xl mx-auto px-6 mt-6">
        
        {/* Guest user notification */}
        {!isLoggedIn && (
          <div className="glass-panel border-rose-500/20 p-5 rounded-2xl flex items-start gap-4 mb-6 shadow-sm">
            <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-brand-dark dark:text-white">Secure Student Account Required</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                To submit admission files, track verification timelines, and receive official admission letters, you must log in or sign up first.
              </p>
              <div className="pt-2">
                <Link to="/login" className="text-xs font-bold text-brand-gold hover:underline">
                  Go to Login / Register Panel →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Wizard panel */}
        <div className="glass-panel border-brand-gold/25 p-8 rounded-3xl shadow-xl relative bg-gradient-to-b from-white/95 to-brand-light/35 dark:from-slate-950/65 dark:to-slate-900/10">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-brand-blue to-brand-navy" />
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-between gap-2 max-w-sm mx-auto mb-10 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center border font-bold ${step >= 1 ? 'border-brand-gold text-brand-gold bg-brand-gold/15' : ''}`}>1</span>
              <span className={step >= 1 ? 'text-brand-dark dark:text-white' : ''}>Personal</span>
            </div>
            <div className="flex-1 h-[2px] bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center border font-bold ${step >= 2 ? 'border-brand-gold text-brand-gold bg-brand-gold/15' : ''}`}>2</span>
              <span className={step >= 2 ? 'text-brand-dark dark:text-white' : ''}>Choice</span>
            </div>
            <div className="flex-1 h-[2px] bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center border font-bold ${step >= 3 ? 'border-brand-gold text-brand-gold bg-brand-gold/15' : ''}`}>3</span>
              <span className={step >= 3 ? 'text-brand-dark dark:text-white' : ''}>Portfolio</span>
            </div>
          </div>

          <hr className="border-slate-200/50 dark:border-slate-850 mb-6" />

          {success ? (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-extrabold text-brand-dark dark:text-white">Application Dispatched!</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Thank you, **{fullName}**! Your academic registration files for **{preferredCourse}** at **{preferredUni}** have been submitted. Our admission committee will update your status soon.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/dashboard" className="btn-gold !text-xs">
                  Go to Student Dashboard
                </Link>
                <button
                  onClick={() => {
                    setStep(1);
                    setSuccess(false);
                    setFullName(localStorage.getItem('userName') || '');
                    setPhone('');
                  }}
                  className="btn-glass !text-xs"
                >
                  Submit Another Form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              
              {error && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-bold rounded-xl leading-normal">
                  {error}
                </div>
              )}

              {/* STEP 1: PERSONAL CONTACT DETAILS */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold mb-2">Step 1: Student Information</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Full Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                        required
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Email Address *</label>
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

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Mobile Contact Number *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                        required
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CHOICE MATCH SELECTS */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold mb-2">Step 2: Academy Preferences</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Preferred University *</label>
                    <div className="relative">
                      <select
                        value={preferredUni}
                        onChange={(e) => setPreferredUni(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-brand-gold"
                        required
                      >
                        {universities.map((uni, idx) => (
                          <option key={idx} value={uni.name}>{uni.name}</option>
                        ))}
                      </select>
                      <Landmark className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Course Interested *</label>
                    <div className="relative">
                      <select
                        value={preferredCourse}
                        onChange={(e) => setPreferredCourse(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-brand-gold"
                        required
                      >
                        {getCoursesForSelectedUni().map((cName, idx) => (
                          <option key={idx} value={cName}>{cName}</option>
                        ))}
                      </select>
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PORTFOLIO FILE UPLOADS */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold mb-2">Step 3: Document Attachments</h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Document Identifier Name</label>
                    <input
                      type="text"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="e.g. 12th Board Marksheet, Aadhaar Card"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Attach Document File *</label>
                    <div className="p-6 bg-slate-100 dark:bg-slate-900/50 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center space-y-3 relative">
                      <FileText className="w-8 h-8 text-brand-gold mx-auto" />
                      
                      <div className="text-xs text-slate-500">
                        {documentFile ? (
                          <span className="font-bold text-brand-blue dark:text-brand-goldLight">{documentFile.name} ({(documentFile.size / 1024).toFixed(1)} KB)</span>
                        ) : (
                          <span>Drag and drop transcripts PDF or image files</span>
                        )}
                      </div>

                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        required={!documentFile}
                      />
                      
                      <div className="text-[8px] text-slate-400 uppercase tracking-wider">Supports PDF, JPG, PNG (Max 10MB)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200/50 dark:border-slate-850">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-glass !text-xs flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-gold !text-xs flex items-center gap-1.5"
                  >
                    <span>Proceed Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !isLoggedIn}
                    className="btn-gold !text-xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>{loading ? 'Dispatched Inbound...' : 'Complete & Submit Portal'}</span>
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};

export default Apply;
