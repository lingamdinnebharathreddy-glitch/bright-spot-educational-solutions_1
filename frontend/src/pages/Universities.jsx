import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Trophy, Percent, CreditCard, ChevronRight, Filter, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [maxFee, setMaxFee] = useState(200000);
  const [maxRanking, setMaxRanking] = useState(100);

  const apiHost = 'http://localhost:5000';

  const fetchUniversities = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (searchText) params.append('search', searchText);
      if (selectedCourse) params.append('course', selectedCourse);
      
      const response = await fetch(`${apiHost}/api/universities?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch university records');
      const data = await response.json();

      // Perform fee and ranking client-side sub-filtering for high accuracy
      let filtered = data;
      
      if (maxFee) {
        filtered = filtered.filter(u => 
          u.courses.some(c => c.fee <= maxFee)
        );
      }

      if (maxRanking) {
        filtered = filtered.filter(u => {
          const rank = parseInt(u.rankings?.replace(/[^0-9]/g, '') || '999', 10);
          return rank <= maxRanking;
        });
      }

      setUniversities(filtered);
    } catch (err) {
      console.error(err);
      
      // Fallback offline mock data containing seed universities
      const mockList = [
        {
          _id: 'krishna_u',
          name: 'Krishna University',
          location: 'Machilipatnam, Andhra Pradesh',
          rankings: 'State Rank #12 | NAAC A',
          feesRange: '₹30,000 - ₹1,20,000 / year',
          placements: '88% Placement Success Rate',
          logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%230B2545"/><path d="M50 20L20 35L50 50L80 35L50 20Z" fill="%23D4AF37"/></svg>`,
          courses: [
            { name: 'B.Tech Computer Science', fee: 80000 },
            { name: 'B.Sc Digital Electronics', fee: 45000 },
            { name: 'MBA Leadership', fee: 65000 },
            { name: 'MCA', fee: 70000 }
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
          courses: [
            { name: 'B.Tech CS (AI & ML)', fee: 140000 },
            { name: 'MBA International Finance', fee: 170000 },
            { name: 'B.Sc Forensic Science', fee: 95000 }
          ]
        },
        {
          _id: 'marwadi_u',
          name: 'Marwadi University',
          location: 'Rajkot, Gujarat',
          rankings: 'NAAC A+ Accredited',
          feesRange: '₹75,000 - ₹1,80,000 / year',
          placements: '92% Placements | 480+ Recruiters',
          logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%230B2545"/><polygon points="50,15 80,75 20,75" fill="%23D4AF37"/></svg>`,
          courses: [
            { name: 'B.Tech Software Engineering', fee: 110000 },
            { name: 'MBA Business Analytics', fee: 135000 },
            { name: 'BCA Mobile Architecture', fee: 75000 }
          ]
        },
        {
          _id: 'weltec',
          name: 'Weltec College of Engineering',
          location: 'Vadodara, Gujarat',
          rankings: 'GTU Top Affiliated',
          feesRange: '₹40,000 - ₹90,000 / year',
          placements: '90% Tech Placements',
          logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="20" fill="%23D4AF37"/><path d="M30 30H70V45H30V30Z" fill="%230B2545"/></svg>`,
          courses: [
            { name: 'B.Tech Information Technology', fee: 90000 },
            { name: 'Diploma in Network Admin', fee: 40000 },
            { name: 'MCA Database Systems', fee: 85000 }
          ]
        }
      ];

      // Perform local offline filtering
      let offlineFiltered = mockList;
      if (searchText) {
        const query = searchText.toLowerCase();
        offlineFiltered = offlineFiltered.filter(u => u.name.toLowerCase().includes(query) || u.location.toLowerCase().includes(query));
      }
      if (selectedCourse) {
        const query = selectedCourse.toLowerCase();
        offlineFiltered = offlineFiltered.filter(u => u.courses.some(c => c.name.toLowerCase().includes(query)));
      }
      if (maxFee) {
        offlineFiltered = offlineFiltered.filter(u => u.courses.some(c => c.fee <= maxFee));
      }
      if (maxRanking) {
        offlineFiltered = offlineFiltered.filter(u => {
          const rank = parseInt(u.rankings.replace(/[^0-9]/g, '') || '999', 10);
          return rank <= maxRanking;
        });
      }

      setUniversities(offlineFiltered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [searchText, selectedCourse, maxFee, maxRanking]);

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedCourse('');
    setMaxFee(200000);
    setMaxRanking(100);
  };

  return (
    <div className="relative w-full pb-16 min-h-screen">
      
      {/* Background visual blobs */}
      <div className="glow-blob w-[300px] h-[300px] bg-brand-blue/10 top-0 left-0" />
      <div className="glow-blob w-[350px] h-[350px] bg-brand-gold/10 bottom-10 right-0" />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 space-y-3 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Prestige Roster</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white tracking-tight">
          Explore Our Partner Universities
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Filter and compare leading engineering, science, vocational, and management campuses. Select a university to view courses, hostels, faculty, and brochures.
        </p>
      </section>

      {/* ================= UNIVERSITIES FILTER DESK ================= */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 glass-panel border-slate-200/50 dark:border-slate-800/60 p-6 rounded-2xl h-fit space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-brand-gold" />
              <span>Search Filters</span>
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

          {/* Text Search */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Campuses / City Name</label>
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl dark:text-white focus:ring-1 focus:ring-brand-gold"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Course Multiselect/Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Course Category</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-slate-600 dark:text-slate-300 focus:ring-1 focus:ring-brand-gold focus:outline-none"
            >
              <option value="">All Disciplines</option>
              <option value="Computer Science">Computer Science & IT</option>
              <option value="Engineering">Engineering (B.Tech)</option>
              <option value="MBA">Business (MBA/BBA)</option>
              <option value="Forensic">Forensic Science</option>
              <option value="Diploma">Diploma Courses</option>
              <option value="MCA">MCA / Application Software</option>
            </select>
          </div>

          {/* Fee budget limit */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>Max Fee (₹/year)</span>
              <span className="text-brand-blue dark:text-brand-gold">₹{maxFee.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="40000"
              max="200000"
              step="5000"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-brand-gold bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-1.5"
            />
          </div>

          {/* Ranking limit */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>National Ranking Limit</span>
              <span className="text-brand-blue dark:text-brand-gold">Top {maxRanking}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={maxRanking}
              onChange={(e) => setMaxRanking(Number(e.target.value))}
              className="w-full accent-brand-gold bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-1.5"
            />
          </div>

        </div>

        {/* Results grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-2">
              <span className="w-8 h-8 rounded-full border-4 border-brand-gold border-t-transparent animate-spin" />
              <p className="text-xs text-slate-400 font-bold">Scanning university records...</p>
            </div>
          ) : universities.length === 0 ? (
            <div className="glass-panel border-dashed border-2 border-slate-250 dark:border-slate-800 p-12 text-center rounded-2xl space-y-4">
              <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">No Universities Matched Your Filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Try widening your fee ranges slider, searching for different course keywords, or click **Reset** to see the general index roster.
              </p>
              <button onClick={handleResetFilters} className="btn-gold !text-xs !px-4 !py-2">
                Show All Campuses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {universities.map((uni, idx) => (
                <motion.div
                  key={uni._id || uni.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="glass-card-gold flex flex-col justify-between h-full rounded-2xl overflow-hidden p-5 space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3.5">
                      {uni.logo && uni.logo.startsWith('data:') ? (
                        <img src={uni.logo} alt={uni.name} className="w-12 h-12 rounded-xl object-contain shadow-sm shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-brand-gold/15 flex items-center justify-center text-xl shadow-sm shrink-0 font-bold">
                          {uni.logo || '🏫'}
                        </div>
                      )}
                      <div>
                        <h3 className="font-extrabold text-sm text-brand-dark dark:text-white leading-snug line-clamp-1">{uni.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="text-[10px] font-medium line-clamp-1">{uni.location}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-slate-200/50 dark:border-slate-850" />

                    {/* Stats Highlights */}
                    <div className="space-y-2.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-brand-gold shrink-0" />
                        <span className="line-clamp-1">{uni.rankings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-brand-blue dark:text-brand-goldLight shrink-0" />
                        <span className="line-clamp-1">{uni.placements}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-brand-navy dark:text-slate-400 shrink-0" />
                        <span>{uni.feesRange}</span>
                      </div>
                    </div>

                    {/* Quick Courses Preview */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Popular Degrees</label>
                      <div className="flex flex-wrap gap-1">
                        {uni.courses?.slice(0, 3).map((c, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase"
                          >
                            {c.name.split('B.Tech').join('').split('Master of').join('').substring(0, 24)}
                          </span>
                        ))}
                        {uni.courses?.length > 3 && (
                          <span className="text-[9px] font-bold text-brand-gold mt-0.5">+{uni.courses.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/universities/${uni._id || uni.id}`}
                    className="w-full flex items-center justify-center gap-1 py-3 rounded-xl bg-slate-100 hover:bg-brand-gold dark:bg-slate-900 dark:hover:bg-brand-gold/30 text-xs font-bold tracking-wide text-brand-dark dark:text-slate-200 hover:text-brand-dark transition-all mt-4 border border-transparent dark:border-slate-800"
                  >
                    <span>Analyze Admission Pipeline</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                </motion.div>
              ))}
            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default Universities;
