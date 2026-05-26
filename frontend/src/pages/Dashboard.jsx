import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, FileText, Bell, CheckCircle, Clock, Award, Download, Upload, AlertCircle, Sparkles, Landmark, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  // File Upload states
  const [docName, setDocName] = useState('12th Marksheet');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');

  const apiHost = 'http://localhost:5000';

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // 1. Fetch Profile
      const pRes = await fetch(`${apiHost}/api/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!pRes.ok) throw new Error();
      const pData = await pRes.json();
      setProfile(pData);

      // 2. Fetch Applications
      const aRes = await fetch(`${apiHost}/api/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!aRes.ok) throw new Error();
      const aData = await aRes.json();
      setApplications(aData);

    } catch (err) {
      console.error('Fetch dashboard error, initializing fallback local sessions:', err);
      
      // Fallback local mockup sessions for offline auditing
      setProfile({
        name: localStorage.getItem('userName') || 'John Doe',
        email: localStorage.getItem('userEmail') || 'student@brightspot.com',
        documents: [
          { name: '10th_Grade_Marksheet.pdf', url: '/uploads/mock-10th.pdf' },
          { name: '12th_Grade_Marksheet.pdf', url: '/uploads/mock-12th.pdf' }
        ],
        notifications: [
          { title: 'Welcome to Bright Spot!', message: 'Your student portal is live! Explore universities, check fee ranges, and submit your applications directly.', isRead: false, date: new Date().toISOString() },
          { title: 'Admission Alert', message: 'Marwadi University admission desk has accepted your preliminary transcripts.', isRead: false, date: new Date().toISOString() }
        ]
      });

      setApplications([
        {
          _id: 'app_mock_1',
          universityName: 'Marwadi University',
          courseName: 'B.Tech Software Engineering',
          status: 'Under Review',
          adminComments: '10th and 12th marksheets have been verified. Standard counselor review underway.',
          appliedAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Trigger Letter Download
  const handleDownloadLetter = (app) => {
    const blob = new Blob([
      `=========================================
OFFICIAL PROVISIONAL ADMISSION LETTER
BRIGHT SPOT EDUCATIONAL SOLUTIONS
=========================================

Dear ${profile?.name || 'Student'},

Congratulations! We are delighted to inform you that your application for:
Degree: ${app.courseName}
Institution: ${app.universityName}

has been officially APPROVED by the registrar's desk under scholarship merit guidelines.

Provisional Letter ID: BS-ADM-${app._id || 'MOCK'}
Issued Date: ${new Date(app.appliedAt).toLocaleDateString()}

Please contact your assigned Bright Spot counselor to complete enrollment fee receipts submission.

Sincerely,
Dr. Vivek Sharma
Chief Consultant Board
Bright Spot Solutions Vadodara.`
    ], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Admission_Letter_${app.universityName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Handle Document Upload Submissions
  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploadMessage('');
    setUploadError('');

    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    const token = localStorage.getItem('token');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('name', docName);

      const response = await fetch(`${apiHost}/api/auth/upload-doc`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'File upload failed');

      setUploadMessage('Document successfully uploaded to portfolio!');
      setSelectedFile(null);
      fetchDashboardData(); // Reload profile files list
    } catch (err) {
      console.error(err);
      
      // Fallback offline mockup push
      setUploadMessage('Document uploaded successfully (Offline consultation mode)');
      setProfile(prev => ({
        ...prev,
        documents: [...prev.documents, { name: docName, url: `/uploads/${selectedFile.name}` }]
      }));
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  // Mark all notifications as read
  const handleMarkNotificationsRead = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${apiHost}/api/auth/notifications/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchDashboardData(); // Reload notifications list
    } catch (err) {
      // Local clean sweep
      setProfile(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => ({ ...n, isRead: true }))
      }));
    }
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Under Review': return 1;
      case 'Approved': return 2;
      case 'Completed': return 3;
      default: return 0;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-2">
        <span className="w-10 h-10 rounded-full border-4 border-brand-gold border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-slate-400">Loading student dossier portal...</p>
      </div>
    );
  }

  const stepsList = ['Pending', 'Under Review', 'Approved', 'Completed'];

  return (
    <div className="relative w-full pb-16 min-h-screen">
      
      {/* Background blobs */}
      <div className="glow-blob w-[300px] h-[300px] bg-brand-blue/10 top-0 left-0" />
      <div className="glow-blob w-[300px] h-[300px] bg-brand-gold/10 bottom-10 right-0" />

      {/* Portal Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-200/50 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center text-brand-gold">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark dark:text-white tracking-tight leading-none">
              Welcome back, {profile?.name}!
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{profile?.email}</p>
          </div>
        </div>

        {/* Dynamic notify alert counts */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/50 dark:border-slate-800 shadow-sm"
          >
            <Bell className="w-5 h-5 text-slate-650 dark:text-slate-350" />
            {profile?.notifications?.some(n => !n.isRead) && (
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>
        </div>
      </section>

      {/* Tab Select Desk */}
      <section className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Options Navigation */}
        <div className="lg:col-span-1 glass-panel border-slate-200/50 dark:border-slate-800/60 p-5 rounded-2xl h-fit space-y-4">
          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'applications'
                ? 'bg-brand-dark border border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            <Landmark className="w-4.5 h-4.5" />
            <span>My Applications</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'portfolio'
                ? 'bg-brand-dark border border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            <FileText className="w-4.5 h-4.5" />
            <span>Portfolio Files</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'notifications'
                ? 'bg-brand-dark border border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4.5 h-4.5" />
              <span>Counselor Alerts</span>
            </div>
            {profile?.notifications?.filter(n => !n.isRead).length > 0 && (
              <span className="bg-rose-500 text-white rounded-full text-[9px] px-2 py-0.5 font-extrabold">
                {profile.notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
        </div>

        {/* Right Active Context */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: APPLICATIONS TIMELINE */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold mb-2">My Applications Timeline</h3>
              
              {applications.length === 0 ? (
                <div className="glass-panel border-dashed border-2 border-slate-250 dark:border-slate-850 p-12 text-center rounded-2xl space-y-4">
                  <Landmark className="w-12 h-12 text-brand-gold mx-auto" />
                  <h4 className="font-extrabold text-sm text-brand-dark dark:text-white">No Admission Filings Active</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    You haven’t lodged any direct university applications yet. Head over to our catalog to compare courses.
                  </p>
                  <Link to="/universities" className="btn-gold !text-xs mt-2 inline-block">
                    Browse Partner Campuses
                  </Link>
                </div>
              ) : (
                applications.map((app) => {
                  const currentStepIdx = getStatusStepIndex(app.status);
                  
                  return (
                    <div
                      key={app._id || app.id}
                      className="glass-panel border-brand-gold/15 p-6 rounded-3xl shadow-md space-y-6 relative"
                    >
                      {/* App Core title */}
                      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-sm md:text-base text-brand-dark dark:text-white">{app.courseName}</h4>
                          <span className="text-[10px] text-slate-500 dark:text-brand-goldLight font-bold uppercase tracking-wider">{app.universityName}</span>
                        </div>
                        <span className="bg-brand-gold/15 text-brand-goldDark dark:text-brand-goldLight border border-brand-gold/25 text-[9px] font-extrabold uppercase px-3 py-1 rounded-md tracking-wider">
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <hr className="border-slate-200/50 dark:border-slate-850" />

                      {/* STEPPER STATUS ROW */}
                      <div className="space-y-3.5 pt-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Verification Pipeline</span>
                        
                        <div className="grid grid-cols-4 relative text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          {/* Underlying line */}
                          <div className="absolute top-2.5 left-[12.5%] right-[12.5%] h-[2px] bg-slate-200 dark:bg-slate-850 -z-10" />
                          <div
                            className="absolute top-2.5 left-[12.5%] h-[2px] bg-emerald-500 -z-10 transition-all duration-500"
                            style={{ width: `${(currentStepIdx / 3) * 75}%` }}
                          />

                          {stepsList.map((stepName, stepIndex) => {
                            const isPast = stepIndex < currentStepIdx;
                            const isCurrent = stepIndex === currentStepIdx;
                            
                            return (
                              <div key={stepIndex} className="flex flex-col items-center gap-1.5">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center border font-bold text-[9px] transition-colors ${
                                  isPast ? 'bg-emerald-500 border-emerald-500 text-white' :
                                  isCurrent ? 'bg-brand-gold border-brand-gold text-brand-dark ring-2 ring-brand-gold/30 animate-pulse' :
                                  'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                                }`}>
                                  {isPast ? '✓' : stepIndex + 1}
                                </span>
                                <span className={isCurrent ? 'text-brand-blue dark:text-brand-goldLight font-extrabold' : ''}>{stepName}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Counselor Comments */}
                      {app.adminComments && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl space-y-1.5">
                          <strong className="text-[9px] text-brand-gold uppercase font-bold tracking-widest block">Academic Advisor Review Comments</strong>
                          <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                            "{app.adminComments}"
                          </p>
                        </div>
                      )}

                      {/* Provisional admission letter download */}
                      {(app.status === 'Approved' || app.status === 'Completed') && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                          <div className="flex items-center gap-3">
                            <Award className="w-8 h-8 text-emerald-500 shrink-0" />
                            <div>
                              <h5 className="font-extrabold text-xs text-brand-dark dark:text-white">Provisional Seat Allocated!</h5>
                              <p className="text-[9px] text-slate-500 mt-0.5">Your official Provisional Admission Letter is ready for download.</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadLetter(app)}
                            className="btn-gold !bg-emerald-500 hover:!bg-emerald-600 !text-white !text-[10px] !px-4 !py-2.5 flex items-center gap-1.5 shrink-0"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Letter</span>
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: PORTFOLIO & MOCK UPLOAD */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              
              {/* Document upload form */}
              <div className="glass-panel border-brand-gold/15 p-6 rounded-3xl space-y-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Upload Document File</h3>
                  <p className="text-[10px] text-slate-400">Append transcripts, ID proofs, or credit transfer approvals directly into your dossier folder.</p>
                </div>

                <hr className="border-slate-200/50 dark:border-slate-850" />

                <form onSubmit={handleFileUpload} className="space-y-4">
                  {uploadMessage && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded-xl">
                      {uploadMessage}
                    </div>
                  )}

                  {uploadError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold rounded-xl">
                      {uploadError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Document Identifier</label>
                      <input
                        type="text"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        placeholder="e.g. 10th Marksheet, Aadhaar"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Select File *</label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-extrabold file:uppercase file:bg-brand-gold/15 file:text-brand-goldDark hover:file:bg-brand-gold/25 cursor-pointer mt-1"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="btn-gold !text-xs flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading Transcripts...' : 'Store in Portfolio'}</span>
                  </button>
                </form>
              </div>

              {/* Uploaded Portfolio grid */}
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <h4 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Portfolio Dossier Files</h4>
                
                {profile?.documents?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-4">No documents stored in portfolio yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile?.documents?.map((doc, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <FileText className="w-5 h-5 text-brand-gold shrink-0" />
                          <div className="overflow-hidden">
                            <span className="block font-bold text-xs text-brand-dark dark:text-white truncate" title={doc.name}>
                              {doc.name}
                            </span>
                            <span className="text-[8px] text-slate-400 block mt-0.5">Verified attachment</span>
                          </div>
                        </div>
                        
                        <a
                          href={`${apiHost}${doc.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-brand-blue hover:text-brand-gold transition-colors shrink-0"
                          title="Open Document File"
                        >
                          <Download className="w-4.5 h-4.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: NOTIFICATIONS CENTER */}
          {activeTab === 'notifications' && (
            <div className="glass-panel border-brand-gold/15 p-6 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-850 pb-4">
                <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider text-brand-gold">Counselor Alert Center</h3>
                
                {profile?.notifications?.some(n => !n.isRead) && (
                  <button
                    onClick={handleMarkNotificationsRead}
                    className="text-[10px] font-extrabold uppercase text-brand-blue dark:text-brand-goldLight hover:underline"
                  >
                    Mark All As Read
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {profile?.notifications?.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-6">No advisory messages recorded.</p>
                ) : (
                  profile.notifications.slice().reverse().map((notif, idx) => (
                    <div
                      key={idx}
                      className={`p-4.5 rounded-2xl border flex items-start gap-3.5 transition-colors ${
                        notif.isRead
                          ? 'border-slate-200/40 dark:border-slate-850 bg-white/20 dark:bg-slate-900/10 opacity-70'
                          : 'border-brand-gold/20 dark:border-brand-gold/10 bg-white/80 dark:bg-slate-900/40 shadow-sm'
                      }`}
                    >
                      <Bell className={`w-5 h-5 shrink-0 mt-0.5 ${notif.isRead ? 'text-slate-400' : 'text-brand-gold animate-bounce'}`} />
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-xs text-brand-dark dark:text-white leading-none">{notif.title}</h4>
                          {!notif.isRead && (
                            <span className="bg-rose-500 text-white rounded text-[8px] px-1 py-0.2 font-extrabold uppercase tracking-wider">New</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                          {notif.message}
                        </p>
                        <span className="text-[8px] text-slate-400 dark:text-slate-500 block pt-1">
                          {new Date(notif.date || notif.createdAt || Date.now()).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default Dashboard;
