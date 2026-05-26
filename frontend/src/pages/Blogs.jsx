import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Calendar, User, X, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Reading Modal States
  const [activeArticle, setActiveArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiHost = 'http://localhost:5000';

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);

      const res = await fetch(`${apiHost}/api/blogs?${params.toString()}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error('Fetch blogs error, applying offline fallback seeder:', err);
      
      // Fallback offline mock blogs seeder
      const mockList = [
        {
          _id: 'blog_1',
          title: 'Top 5 Scholarships You Can Unlock in 2026',
          category: 'Scholarships',
          summary: 'Explore full and partial tuition fee scholarships, financial grants, state sponsorship schemes, and direct consultant-allocated discounts for your higher studies.',
          content: 'Higher education is a life-changing investment, but the cost can often seem daunting. Fortunately, multiple avenues of financial aid are available to talented students. \n\n1. **Merit-Based Institutional Scholarships**: Universities like Sandip and Marwadi reward top board scorers (85% and above) with direct tuition cuts ranging from 25% to 100%. \n2. **State Government Sponsorships**: State-specific grants help minority and low-income students cover living and books costs.\n3. **Consultancy Strategic Aid**: Applying through authorized consultancies like Bright Spot guarantees direct, corporate-backed scholarship brackets.\n\nTo lock in your scholarship, make sure to submit your transcript files early during the counseling cycle!',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600',
          readTime: '4 min read',
          date: 'May 24, 2026',
          author: 'Meera Deshpande'
        },
        {
          _id: 'blog_2',
          title: 'Computer Science: Specialization vs General Degree',
          category: 'Career Guidance',
          summary: 'Should you select B.Tech in AI & ML, Cyber Security, Software Engineering, or go with a general Computer Science degree? Let us analyze the job market trends.',
          content: 'With the technology sector shifting rapidly, high school graduates face a crucial question: is it better to study general Computer Science or select a specialized track like AI, Cloud Computing, or Cyber Security?\n\n**General B.Tech CS**: Offers broad foundations. You learn networking, databases, algorithms, and software testing. It keeps your options flexible, letting you transition into any tech branch later.\n\n**Specialized B.Tech (AI & ML / Cyber Security)**: Highly focused. For instance, Sandip University offers B.Tech AI & ML in partnership with IBM, putting you straight onto neural networks and machine learning engineering. Weltec provides Cyber Security labs that groom you specifically for security audit and penetration testing roles.\n\nOur recommendation? If you have a clear passion for algorithms or systems security, jump into the specialization. If you are still exploring, go general and pick your niche in post-graduation!',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600',
          readTime: '6 min read',
          date: 'May 20, 2026',
          author: 'Dr. Vivek Sharma'
        },
        {
          _id: 'blog_3',
          title: 'Cracking IELTS/TOEFL: Expert Tips for Study Abroad',
          category: 'Study Abroad',
          summary: 'Planning to transfer credits abroad or study internationally? Here is a high-impact guide to preparing for your English language exams.',
          content: 'For Indian students looking to transfer academic credits to universities in Europe or North America, proving English proficiency is a critical bottleneck. \n\n1. **Active Listening**: Listen to English podcasts or news broadcasts without subtitles to train your ear for accents (British, American, and Australian).\n2. **Academic Reading**: Practice scanning long paragraphs and summarize key arguments. Time management is crucial; speed-reading saves lives in the IELTS reading block.\n3. **Structured Writing**: Keep essay arguments logical. Do not use over-complicated vocabulary if you do not know the exact contextual syntax.\n\nRegister for our Bright Spot IELTS coaching bootcamp to take regular mock tests!',
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600',
          readTime: '5 min read',
          date: 'May 15, 2026',
          author: 'Sarah Dsouza'
        }
      ];

      // Perform local fallback category filter
      let filtered = mockList;
      if (selectedCategory) {
        filtered = filtered.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());
      }
      setBlogs(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const handleOpenReader = (blog) => {
    setActiveArticle(blog);
    setIsModalOpen(true);
  };

  const handleCloseReader = () => {
    setIsModalOpen(false);
    setActiveArticle(null);
  };

  const categories = [
    { label: 'All Resources', value: '' },
    { label: 'Scholarships', value: 'Scholarships' },
    { label: 'Career Guidance', value: 'Career Guidance' },
    { label: 'Study Abroad', value: 'Study Abroad' },
    { label: 'Admissions Tips', value: 'Admissions Tips' }
  ];

  return (
    <div className="relative w-full pb-16 min-h-screen">
      
      {/* Decorative Blur Ambient Blobs */}
      <div className="glow-blob w-[300px] h-[300px] bg-brand-blue/10 top-0 left-0" />
      <div className="glow-blob w-[350px] h-[350px] bg-brand-gold/10 bottom-10 right-0" />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Advisor Insights</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark dark:text-white tracking-tight">
          Educational Blogs & Articles
        </h1>
        <p className="text-xs md:text-sm text-slate-500 max-w-lg mx-auto">
          Deep dives into university comparison metrics, scholarship timelines, preparation guidelines, and tech hiring trend analysis.
        </p>
      </section>

      {/* ================= CATEGORY TABS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-center overflow-x-auto whitespace-nowrap scrollbar-none gap-2">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
              selectedCategory === cat.value
                ? 'bg-brand-dark border-brand-gold text-brand-gold dark:bg-slate-900 dark:border-brand-goldLight'
                : 'bg-white/60 dark:bg-slate-950/20 border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-gold/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Blogs Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-2">
            <span className="w-8 h-8 rounded-full border-4 border-brand-gold border-t-transparent animate-spin" />
            <p className="text-xs text-slate-400 font-bold">Scanning article library...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="glass-panel border-dashed border-2 border-slate-250 dark:border-slate-850 p-12 text-center rounded-2xl">
            <h3 className="font-extrabold text-sm text-brand-dark dark:text-white">No Articles Registered Under This Tag</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed mt-1">Select another resources button to view active advisory dossiers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog._id || blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel border-slate-200/50 dark:border-slate-800/40 rounded-3xl overflow-hidden flex flex-col h-full shadow-md group hover:border-brand-gold/40 transition-colors"
              >
                {/* Cover Image */}
                <div className="h-44 relative overflow-hidden shrink-0">
                  <img
                    src={blog.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-xs border border-brand-gold/20 text-brand-goldLight text-[8px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                    {blog.category}
                  </span>
                </div>

                {/* Text Context */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-xs md:text-sm text-brand-dark dark:text-white leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-[11px] text-slate-550 dark:text-slate-405 leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-850" />

                  {/* Metadata nodes */}
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider shrink-0">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{blog.readTime || '3 min read'}</span>
                    </div>
                    <button
                      onClick={() => handleOpenReader(blog)}
                      className="flex items-center gap-0.5 text-brand-blue dark:text-brand-goldLight hover:underline font-extrabold"
                    >
                      <span>Read Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= FULL BLOG DOSSIER READER MODAL ================= */}
      {isModalOpen && activeArticle && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="w-full max-w-2xl h-[580px] max-h-[85vh] glass-panel border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
          >
            {/* Header banner */}
            <div className="p-4 bg-gradient-to-r from-brand-dark to-brand-navy text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-brand-gold" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider">Advisor Dossier Reader</h3>
              </div>
              <button
                onClick={handleCloseReader}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Article body */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 bg-slate-50/50 dark:bg-slate-950/20">
              
              <div className="space-y-3">
                <span className="bg-brand-gold/20 text-brand-goldDark dark:text-brand-goldLight px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide">
                  {activeArticle.category}
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-brand-dark dark:text-white leading-tight">
                  {activeArticle.title}
                </h2>
                
                {/* Meta details bar */}
                <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Author: {activeArticle.author || 'Advisor Board'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{activeArticle.readTime || '3 min'}</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-200/50 dark:border-slate-850" />

              {/* Cover Banner */}
              <div className="w-full h-48 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                <img
                  src={activeArticle.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600'}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* full text */}
              <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap font-medium">
                {activeArticle.content}
              </div>

            </div>

            {/* Footer banner */}
            <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-850 flex items-center justify-end shrink-0">
              <button
                onClick={handleCloseReader}
                className="btn-gold !text-[10px] !px-4.5 !py-2"
              >
                Close Article
              </button>
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Blogs;
