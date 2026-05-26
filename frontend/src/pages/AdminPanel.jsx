import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Landmark, FileText, Calendar, Plus, Edit, Trash2, Check, RefreshCw, X, ShieldAlert, BookOpen, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('applications');
  const [loading, setLoading] = useState(true);

  // Database States
  const [universities, setUniversities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [events, setEvents] = useState([]);

  // Modal / Add form states
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // University Form fields
  const [uniName, setUniName] = useState('');
  const [uniLocation, setUniLocation] = useState('');
  const [uniRankings, setUniRankings] = useState('');
  const [uniPlacements, setUniPlacements] = useState('');
  const [uniFees, setUniFees] = useState('');
  const [uniOverview, setUniOverview] = useState('');

  // Event Form fields
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('Seminar');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDesc, setEventDesc] = useState('');

  // Application Updates Fields (linked to specific ID)
  const [activeAppId, setActiveAppId] = useState('');
  const [appStatus, setAppStatus] = useState('Pending');
  const [appComments, setAppComments] = useState('');

  const apiHost = 'http://localhost:5000';

  const loadAdminDashboard = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'admin') {
      navigate('/admin-login');
      return;
    }

    setLoading(true);
    try {
      // 1. Fetch universities
      const uRes = await fetch(`${apiHost}/api/universities`);
      const uData = await uRes.json();
      setUniversities(uData);

      // 2. Fetch applications (returns all as Admin)
      const aRes = await fetch(`${apiHost}/api/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const aData = await aRes.json();
      setApplications(aData);

      // 3. Fetch events
      const eRes = await fetch(`${apiHost}/api/events`);
      const eData = await eRes.json();
      setEvents(eData);

    } catch (err) {
      console.error('Fetch admin panel error, loading seeder overrides:', err);
      
      // Fallback offline mock arrays
      setUniversities([
        { _id: 'krishna_u', name: 'Krishna University', location: 'Andhra Pradesh', rankings: 'State #12', placements: '88% rate', feesRange: '₹30k - ₹1.2L' },
        { _id: 'sandip_u', name: 'Sandip University', location: 'Nashik, MH', rankings: 'NAAC A+', placements: '94% rate', feesRange: '₹95k - ₹2.5L' }
      ]);
      setApplications([
        { _id: 'app_mock_1', userName: 'John Doe', userEmail: 'student@brightspot.com', userPhone: '9876543210', universityName: 'Sandip University', courseName: 'B.Tech CS (AI & ML)', status: 'Pending', adminComments: '' }
      ]);
      setEvents([
        { _id: 'event_mock_1', title: 'Global Admission & Scholarship Drive 2026', type: 'Admission Drive', date: 'June 15, 2026', location: 'Mumbai Office' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminDashboard();
  }, []);

  // CRUD: Add University
  const handleAddUniversity = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = {
      name: uniName,
      location: uniLocation,
      rankings: uniRankings || 'NAAC Accredited',
      placements: uniPlacements || '90% placements',
      feesRange: uniFees || '₹50,000 - ₹1,50,000 / yr',
      overview: uniOverview || 'Excellent academic center.',
      logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%230B2545"/><circle cx="50" cy="50" r="20" fill="%23D4AF37"/></svg>`,
      courses: [
        { name: 'B.Tech Information Technology', fee: 90000, duration: '4 Years', description: 'Computing structures.', curriculum: ['Networking', 'Databases'] }
      ]
    };

    try {
      const response = await fetch(`${apiHost}/api/universities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error();
      setIsUniModalOpen(false);
      loadAdminDashboard();
      
      // Clear forms
      setUniName('');
      setUniLocation('');
      setUniOverview('');
    } catch (err) {
      // Local mockup push
      setUniversities(prev => [...prev, { _id: `uni_local_${Date.now()}`, ...payload }]);
      setIsUniModalOpen(false);
    }
  };

  // CRUD: Delete University
  const handleDeleteUniversity = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${apiHost}/api/universities/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error();
      loadAdminDashboard();
    } catch (err) {
      setUniversities(prev => prev.filter(u => u._id !== id));
    }
  };

  // CRUD: Add Scheduled Event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const payload = {
      title: eventTitle,
      type: eventType,
      date: eventDate || 'June 20, 2026',
      time: eventTime || '10:00 AM IST',
      location: eventLocation || 'Mumbai Branch',
      description: eventDesc || 'Counselor seminar drive.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600'
    };

    try {
      const response = await fetch(`${apiHost}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error();
      setIsEventModalOpen(false);
      loadAdminDashboard();
      
      // Clear
      setEventTitle('');
      setEventLocation('');
      setEventDesc('');
    } catch (err) {
      setEvents(prev => [...prev, { _id: `event_local_${Date.now()}`, ...payload }]);
      setIsEventModalOpen(false);
    }
  };

  // CRUD: Delete Event
  const handleDeleteEvent = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${apiHost}/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      loadAdminDashboard();
    } catch (err) {
      setEvents(prev => prev.filter(evt => evt._id !== id));
    }
  };

  // Review Application status & remarks
  const handleUpdateApplicationStatus = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiHost}/api/applications/${activeAppId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: appStatus,
          adminComments: appComments
        })
      });

      if (!response.ok) throw new Error();
      setActiveAppId('');
      loadAdminDashboard();
    } catch (err) {
      // Local offline updates
      setApplications(prev => prev.map(app => 
        app._id === activeAppId 
          ? { ...app, status: appStatus, adminComments: appComments }
          : app
      ));
      setActiveAppId('');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-2">
        <span className="w-10 h-10 rounded-full border-4 border-brand-gold border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-slate-400">Booting Admin workspace...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full pb-16 min-h-screen">
      
      {/* Decors */}
      <div className="glow-blob w-[300px] h-[300px] bg-brand-gold/10 top-0 left-0" />

      {/* Header bar */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-3 flex-col md:flex-row text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-brand-gold flex items-center justify-center text-brand-dark shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark dark:text-white tracking-tight leading-none">Admin Control Panel</h1>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block mt-1">Bright Spot Academic Dashboard</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl text-xs font-bold transition-all"
        >
          Exit Admin Session
        </button>
      </section>

      {/* Dashboard workspace grid */}
      <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 glass-panel border-slate-200/50 dark:border-slate-800 p-5 rounded-2xl h-fit space-y-4">
          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'applications'
                ? 'bg-brand-dark border border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'text-slate-650 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            <FileText className="w-4.5 h-4.5" />
            <span>Review Applications ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'universities'
                ? 'bg-brand-dark border border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'text-slate-650 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            <Landmark className="w-4.5 h-4.5" />
            <span>Manage Campuses ({universities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'events'
                ? 'bg-brand-dark border border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'text-slate-650 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            <Calendar className="w-4.5 h-4.5" />
            <span>Manage Events ({events.length})</span>
          </button>
        </div>

        {/* Core panel workspaces */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: REVIEW APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold mb-2">Student Application Submissions</h3>
              
              {applications.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-8">No admission applications submitted yet.</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app._id || app.id}
                      className="glass-panel border-brand-gold/10 p-5 rounded-2xl shadow-sm space-y-4 relative"
                    >
                      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-sm text-brand-dark dark:text-white">{app.userName}</h4>
                          <span className="text-[9px] text-slate-400 uppercase tracking-widest leading-none font-bold block">{app.userEmail} | Phone: {app.userPhone}</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase tracking-wide border ${
                          app.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' :
                          app.status === 'Under Review' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                          app.status === 'Completed' ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue' :
                          'bg-slate-200/50 border-slate-300 text-slate-500'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <hr className="border-slate-200/50 dark:border-slate-850" />

                      <div className="text-xs text-slate-600 dark:text-slate-350 space-y-1.5 font-medium">
                        <div>
                          <strong className="text-slate-400 uppercase text-[9px] tracking-wide block">Course Choice</strong>
                          <span>{app.courseName} at *{app.universityName}*</span>
                        </div>
                        {app.adminComments && (
                          <div className="mt-2 text-[11px] bg-slate-100 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                            <strong className="text-slate-450 uppercase text-[8px] tracking-widest block mb-0.5">Advisory Review remarks</strong>
                            <span>"{app.adminComments}"</span>
                          </div>
                        )}
                      </div>

                      {/* inline edit drawer toggle */}
                      {activeAppId === app._id ? (
                        <form onSubmit={handleUpdateApplicationStatus} className="bg-slate-100 dark:bg-slate-900/60 p-4.5 rounded-2xl border border-brand-gold/30 space-y-4 animate-fadeIn">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Modify Pipeline Status</label>
                              <select
                                value={appStatus}
                                onChange={(e) => setAppStatus(e.target.value)}
                                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border-none rounded-xl text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-brand-gold"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Approved">Approved (Seat Allocated)</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 uppercase block">Remarks / Comments</label>
                              <input
                                type="text"
                                value={appComments}
                                onChange={(e) => setAppComments(e.target.value)}
                                placeholder="Documents verified successfully..."
                                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-950 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => setActiveAppId('')}
                              className="px-3.5 py-1.5 bg-slate-200 dark:bg-slate-850 text-slate-650 dark:text-slate-350 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-transparent dark:border-slate-800"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3.5 py-1.5 bg-brand-gold hover:bg-brand-goldHover text-brand-dark rounded-lg text-[10px] font-bold uppercase tracking-wider shadow"
                            >
                              Save Status updates
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveAppId(app._id);
                            setAppStatus(app.status);
                            setAppComments(app.adminComments || '');
                          }}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-brand-gold dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-brand-dark rounded-xl text-[10px] font-extrabold uppercase tracking-widest border border-transparent dark:border-slate-800/80 transition-colors"
                        >
                          Modify Pipeline Registry
                        </button>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MANAGE UNIVERSITIES */}
          {activeTab === 'universities' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Prestige Campuses Catalog</h3>
                <button
                  onClick={() => setIsUniModalOpen(true)}
                  className="btn-gold !text-[10px] !px-3.5 !py-2 flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span>Register University</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {universities.map((uni) => (
                  <div
                    key={uni._id || uni.id}
                    className="glass-panel border-brand-gold/10 p-5 rounded-2xl flex flex-col justify-between h-40 shadow-sm"
                  >
                    <div>
                      <h4 className="font-extrabold text-sm text-brand-dark dark:text-white line-clamp-1">{uni.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{uni.location}</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-1.5">Rankings: {uni.rankings}</span>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">Fees: {uni.feesRange}</span>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-slate-100 dark:border-slate-850 pt-2.5 shrink-0 mt-3">
                      <button
                        onClick={() => handleDeleteUniversity(uni._id || uni.id)}
                        className="p-1.5 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Campus Record"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Active Scheduled Drives</h3>
                <button
                  onClick={() => setIsEventModalOpen(true)}
                  className="btn-gold !text-[10px] !px-3.5 !py-2 flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-4.5 h-4.5" />
                  <span>Schedule Event</span>
                </button>
              </div>

              <div className="space-y-4">
                {events.map((evt) => (
                  <div
                    key={evt._id || evt.id}
                    className="glass-panel border-brand-gold/10 p-4.5 rounded-2xl shadow-sm flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-brand-dark dark:text-white">{evt.title}</h4>
                      <div className="flex gap-4 text-[9px] text-slate-400 font-semibold mt-1">
                        <span>Type: {evt.type}</span>
                        <span>Date: {evt.date}</span>
                        <span>Location: {evt.location}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteEvent(evt._id || evt.id)}
                      className="p-2 border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </section>

      {/* ================= MODAL: ADD UNIVERSITY ================= */}
      {isUniModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass-panel border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="p-4 bg-gradient-to-r from-brand-dark to-brand-navy text-white flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider">Register Partner Campus</span>
              <button onClick={() => setIsUniModalOpen(false)} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUniversity} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">University Name *</label>
                  <input
                    type="text"
                    value={uniName}
                    onChange={(e) => setUniName(e.target.value)}
                    placeholder="Marwadi University"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Location *</label>
                  <input
                    type="text"
                    value={uniLocation}
                    onChange={(e) => setUniLocation(e.target.value)}
                    placeholder="Rajkot, Gujarat"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Rankings Highs</label>
                  <input
                    type="text"
                    value={uniRankings}
                    onChange={(e) => setUniRankings(e.target.value)}
                    placeholder="NAAC A+"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Placements %</label>
                  <input
                    type="text"
                    value={uniPlacements}
                    onChange={(e) => setUniPlacements(e.target.value)}
                    placeholder="92% rate"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Fee Range</label>
                  <input
                    type="text"
                    value={uniFees}
                    onChange={(e) => setUniFees(e.target.value)}
                    placeholder="₹50k - ₹1.2L"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Description / Overview *</label>
                <textarea
                  rows="3"
                  value={uniOverview}
                  onChange={(e) => setUniOverview(e.target.value)}
                  placeholder="Overview details..."
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                  required
                />
              </div>

              <button type="submit" className="btn-gold !text-xs !w-full mt-2">
                Commit & Register Campus listing
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL: ADD EVENT ================= */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass-panel border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="p-4 bg-gradient-to-r from-brand-dark to-brand-navy text-white flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider">Schedule Admissions Event</span>
              <button onClick={() => setIsEventModalOpen(false)} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Event Title *</label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Cybersecurity penetration hacking"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Class Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-600 dark:text-slate-350"
                  >
                    <option value="Seminar">Physical Seminar</option>
                    <option value="Webinar">Virtual Webinar</option>
                    <option value="Admission Drive">Spot Admission Drive</option>
                    <option value="Workshop">Technical Workshop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Schedule Date *</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="June 20, 2026"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Schedule Time *</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="10:00 AM IST"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Geographic Location *</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Vadodara Center / Zoom"
                    className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Campaign Description *</label>
                <textarea
                  rows="3"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Brief outlines..."
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white"
                  required
                />
              </div>

              <button type="submit" className="btn-gold !text-xs !w-full mt-2">
                Commit & Launch Scheduled Event
              </button>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
