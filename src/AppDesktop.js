import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Mail, Linkedin, Github, BarChart, Code, Database, FileText, Bot, ChevronLeft, Layers, Zap, Award, GraduationCap, ExternalLink, ChevronRight, MessageSquare, Calendar, ArrowUpRight } from 'lucide-react';
import { projects, blogPosts, linkedinPosts, education, certifications } from './data';
import { useScrollRevealAll, useScrollProgress } from './hooks';
import InsightsPageDesktop from './InsightsPageDesktop';

// Skills data with icon components
const skills = [
  { name: 'Python', icon: <Code size={36} className="text-blue-400" />, description: 'Pandas, NumPy, Feature Engineering, Data Processing' },
  { name: 'SQL', icon: <Database size={36} className="text-emerald-400" />, description: 'Joins, CTEs, Window Functions, Analytics Queries' },
  { name: 'Power BI', icon: <BarChart size={36} className="text-indigo-400" />, description: 'Dashboard Design, DAX, KPI Modeling' },
  { name: 'Data Analytics', icon: <BarChart size={36} className="text-purple-400" />, description: 'Data Cleaning, EDA, Business Insights' },
  { name: 'Excel', icon: <FileText size={36} className="text-emerald-400" />, description: 'Advanced Formulas, Pivot Tables, Forecasting' },
  { name: 'Machine Learning', icon: <Bot size={36} className="text-pink-400" />, description: 'Logistic Regression, Classification, Model Evaluation' },
  { name: 'BigQuery', icon: <Database size={36} className="text-violet-400" />, description: 'Analytics Tables, SQL Modeling, Snapshots' },
  { name: 'Data Warehousing', icon: <Database size={36} className="text-indigo-500" />, description: 'ETL Concepts, Star Schema, Fact & Dimension Tables' },
  { name: 'Real-time Analytics', icon: <Zap size={36} className="text-amber-400" />, description: 'Automated Pipelines, Live Market Monitoring' },
  { name: 'n8n Automation', icon: <Zap size={36} className="text-orange-400" />, description: 'n8n Workflows, Scheduled Data Pipelines' },
  { name: 'APIs', icon: <Code size={36} className="text-cyan-400" />, description: 'REST APIs, JSON, Data Ingestion' },
  { name: 'Data Visualization', icon: <Layers size={36} className="text-orange-500" />, description: 'Insight Narratives, Business Dashboards' },
];

// ──────────────────────────────────────────────
// SUB-COMPONENTS
// ──────────────────────────────────────────────

const SectionBadge = ({ children }) => (
  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
    {children}
  </span>
);

const ProjectCard = ({ project, navigateToPage, theme }) => (
  <div
    className={`project-card rounded-2xl overflow-hidden cursor-pointer border
      ${theme === 'dark'
        ? 'bg-[#13131f] border-white/[0.06] hover:border-indigo-500/40'
        : 'bg-white border-gray-200 hover:border-indigo-400'} shadow-lg hover:shadow-2xl`}
    onClick={() => navigateToPage('project-detail', project.id)}
  >
    <div className="relative h-56 overflow-hidden">
      <img src={project.image} alt={project.title}
        className="proj-img w-full h-full object-cover transition-transform duration-700"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/1a1a2e/6366f1?text=Project'; }} />
      <div className={`proj-overlay absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'bg-black/60' : 'bg-white/70'}`}>
        <span className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg">View Details</span>
      </div>
      <div className="absolute top-3 right-3 flex gap-2">
        {project.tags.slice(0, 3).map(t => (
          <span key={t} className="px-2 py-1 rounded-md text-[10px] font-semibold bg-black/50 text-white backdrop-blur-sm">{t}</span>
        ))}
      </div>
    </div>
    <div className="p-6">
      <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
      <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map(t => (
          <span key={t} className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600'}`}>{t}</span>
        ))}
      </div>
      <div className="flex gap-4 pt-2 border-t border-gray-800/30">
        {project.liveDemo && project.liveDemo !== '#' && (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            <BarChart size={13} /> Live Demo <ArrowUpRight size={11} />
          </a>
        )}
        {project.githubRepo && (
          <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            <Github size={13} /> GitHub <ArrowUpRight size={11} />
          </a>
        )}
      </div>
    </div>
  </div>
);

const ProjectDetailPage = ({ project, setCurrentPage, theme }) => {
  if (!project) return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a12] text-white' : 'bg-gray-50 text-gray-800'}`}>
      <p className="text-xl mb-4">Project not found.</p>
      <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">Back to Projects</button>
    </div>
  );
  return (
    <div className={`min-h-screen pt-24 pb-16 px-6 lg:px-24 ${theme === 'dark' ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
        className={`flex items-center mb-8 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${theme === 'dark' ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
        <ChevronLeft size={18} className="mr-1" /> Back to Projects
      </button>
      <div className={`max-w-4xl mx-auto rounded-2xl p-8 lg:p-10 border shadow-2xl ${theme === 'dark' ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 grad-text">{project.title}</h1>
        <img src={project.image} alt={project.title} className="w-full h-auto object-contain rounded-xl mb-8 shadow-lg"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/1a1a2e/6366f1?text=Project'; }} />
        <p className={`text-base leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{project.fullDescription}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map(t => <span key={t} className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600'}`}>{t}</span>)}
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          {project.liveDemo && project.liveDemo !== '#' && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 shadow-lg transition-all hover:shadow-indigo-500/20">
              <BarChart size={16} /> Live Demo
            </a>
          )}
          {project.githubRepo && (
            <a href={project.githubRepo} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm shadow-md transition-all ${theme === 'dark' ? 'bg-white/5 text-gray-200 hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              <Github size={16} /> GitHub Repo
            </a>
          )}
        </div>
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-gray-50 border border-gray-100'}`}>
          <h3 className="text-lg font-semibold mb-3 grad-text">Logic and Approach</h3>
          <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{project.aiSummary}</p>
        </div>
      </div>
    </div>
  );
};

const BlogPage = ({ setCurrentPage, theme, blogPosts: bp, linkedinPosts: lp }) => (
  <div className={`min-h-screen pt-24 pb-16 px-6 lg:px-24 ${theme === 'dark' ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
    <h1 className="text-4xl font-bold text-center mb-12 grad-text">Daily Byte Blog & Posts</h1>
    <div className="max-w-4xl mx-auto grid gap-8">
      <div className={`rounded-2xl p-6 border ${theme === 'dark' ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'} shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6 grad-cool">My Latest Posts</h2>
        <div className="space-y-4">
          {lp.map(post => (
            <div key={post.id} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-gray-50 border border-gray-100'}`}>
              <div className="flex items-center mb-3">
                <img src={post.profilePic} alt={post.author} className="w-9 h-9 rounded-full mr-3 object-cover" />
                <div><p className="font-semibold text-sm">{post.author}</p><p className="text-xs opacity-60">{post.date}</p></div>
              </div>
              <p className="text-sm opacity-85 mb-2">{post.content}</p>
              <div className="flex items-center gap-4 text-xs opacity-60">
                <span className="flex items-center gap-1"><Layers size={12} /> {post.likes} Likes</span>
                <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments} Comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`rounded-2xl p-6 border ${theme === 'dark' ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'} shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6 grad-warm">In-depth Articles</h2>
        <div className="space-y-4">
          {bp.map(post => (
            <div key={post.id} className={`rounded-xl p-5 transition-all hover:scale-[1.005] border cursor-pointer
              ${theme === 'dark' ? 'bg-white/[0.03] border-white/[0.06] hover:border-indigo-500/40' : 'bg-gray-50 border-gray-100 hover:border-indigo-400'}`}
              onClick={() => setCurrentPage('blog-post', post.id)}>
              <h3 className="text-lg font-semibold mb-1 grad-text">{post.title}</h3>
              <p className="text-xs opacity-60 mb-2">{post.date}</p>
              <p className="text-sm opacity-75 mb-3">{post.snippet}</p>
              <span className="text-indigo-400 font-semibold text-sm flex items-center gap-1">Read More <ArrowUpRight size={13} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BlogPostDetail = ({ post, setCurrentPage, theme }) => {
  if (!post) return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#0a0a12] text-white' : 'bg-gray-50 text-gray-800'}`}>
      <p className="text-xl mb-4">Blog post not found.</p>
      <button onClick={() => setCurrentPage('blog')} className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold">Back to Blog</button>
    </div>
  );
  return (
    <div className={`min-h-screen pt-24 pb-16 px-6 lg:px-24 ${theme === 'dark' ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button onClick={() => setCurrentPage('blog')}
        className={`flex items-center mb-8 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${theme === 'dark' ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
        <ChevronLeft size={18} className="mr-1" /> Back to Blog
      </button>
      <div className={`max-w-3xl mx-auto rounded-2xl p-8 border shadow-2xl ${theme === 'dark' ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 grad-text">{post.title}</h1>
        <p className="text-sm opacity-60 mb-6">{post.date}</p>
        <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</p>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// MAIN DESKTOP APP
// ──────────────────────────────────────────────

const AppDesktop = () => {
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPageState] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
  const [currentProjectPageIndex, setCurrentProjectPageIndex] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });

  const scrollProgress = useScrollProgress();
  useScrollRevealAll();

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (formStatus.type === 'success' || formStatus.type === 'error') {
      const t = setTimeout(() => setFormStatus({ type: 'idle', message: '' }), 5000);
      return () => clearTimeout(t);
    }
  }, [formStatus]);

  // Re-init scroll reveal when page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); }
        }, { threshold: 0.1 });
        observer.observe(el);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const scrollToSection = (id) => {
    setCurrentPageState('home');
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const navigateToPage = (page, id = null) => {
    setCurrentPageState(page);
    if (page === 'project-detail') setSelectedProjectId(id); else setSelectedProjectId(null);
    if (page === 'blog-post') setSelectedBlogPostId(id); else setSelectedBlogPostId(null);
    window.scrollTo(0, 0);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'sending', message: 'Sending message...' });
    const formData = new URLSearchParams();
    formData.append('name', contactName);
    formData.append('email', contactEmail);
    formData.append('message', contactMessage);
    try {
      const response = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        setContactName(''); setContactEmail(''); setContactMessage('');
      } else {
        const d = await response.json();
        setFormStatus({ type: 'error', message: `Failed: ${d.message || 'Unknown error'}` });
      }
    } catch (err) {
      setFormStatus({ type: 'error', message: 'Failed to send. Check your connection.' });
    }
  };

  const projectsPerPage = 2;
  const totalProjectPages = Math.ceil(projects.length / projectsPerPage);
  const displayedProjects = projects.slice(currentProjectPageIndex * projectsPerPage, (currentProjectPageIndex + 1) * projectsPerPage);
  const goNext = () => setCurrentProjectPageIndex(i => (i + 1) % totalProjectPages);
  const goPrev = () => setCurrentProjectPageIndex(i => (i - 1 + totalProjectPages) % totalProjectPages);

  const d = theme === 'dark';

  const renderHome = () => (
    <>
      {/* ═══ HERO ═══ */}
      <section id="hero" className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-24
        ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className={`hero-grid absolute inset-0 ${d ? '' : 'hero-grid'}`} style={d ? {} : { backgroundImage: 'linear-gradient(rgba(99,102,241,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.07) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,.4), transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,.35), transparent 70%)' }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="anim-hero">
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border
              ${d ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
              Data & BI Analyst
            </span>
          </div>
          <h1 className="anim-hero-d1 mb-4">
            <span className={`block text-3xl lg:text-4xl font-medium mb-2 ${d ? 'text-gray-300' : 'text-gray-600'}`}>Hi, I'm Sid</span>
            <span className="block text-5xl lg:text-[4.5rem] font-extrabold leading-[1.08] grad-text pb-2">
              A Data Analyst Building Decision-Ready Insights from Real-World Data
            </span>
          </h1>
          <p className={`anim-hero-d2 text-lg lg:text-xl max-w-3xl mx-auto mt-6 mb-10 ${d ? 'text-gray-400' : 'text-gray-600'}`}>
            I design end-to-end analytics solutions using Python, SQL, Power BI, and AI — from raw data pipelines to business-ready dashboards that support confident decision-making.
          </p>
          <div className="anim-hero-d3 flex items-center justify-center gap-4 flex-wrap">
            <button onClick={() => scrollToSection('projects')}
              className="px-7 py-3.5 rounded-full bg-indigo-600 text-white font-semibold text-sm shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/20 transition-all">
              View Projects
            </button>
            <a href="/TejaSiddhartha_DataAnalyst.pdf" target="_blank" rel="noopener noreferrer"
              className={`px-7 py-3.5 rounded-full font-semibold text-sm transition-all border
                ${d ? 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}>
              <span className="flex items-center gap-2"><Download size={16} /> Resume</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className={`py-20 px-6 lg:px-24 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-12"><SectionBadge>About Me</SectionBadge></div>
          <div className={`rounded-2xl p-8 lg:p-10 border shadow-xl ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
            <div className="grid grid-cols-5 gap-12 items-start">
              {/* Left: Content (3 cols) */}
              <div className="col-span-3">
                <h3 className="text-3xl font-bold mb-3 grad-warm">Hi, I'm Teja Siddhartha</h3>
                <p className={`text-lg font-medium mb-4 ${d ? 'text-indigo-300' : 'text-indigo-600'}`}>
                  Data & BI Analyst | SQL • Python • Power BI | End-to-End Analytics
                </p>
                <p className={`text-base leading-relaxed mb-4 ${d ? 'text-gray-300' : 'text-gray-700'}`}>
                  I am a Data Analyst experienced in building end-to-end analytics solutions across finance, customer analytics, healthcare, retail, and digital asset markets. I transform raw data into structured datasets, well-defined KPIs, and interactive dashboards that support business and operational decisions.
                </p>
                <p className={`text-base leading-relaxed mb-4 ${d ? 'text-gray-300' : 'text-gray-700'}`}>
                  I work extensively with Python, SQL, Power BI, Excel, and BigQuery to design analytics pipelines — from ingestion and cleaning to modeling and visualization. My experience includes normalized OLTP schema design, OLAP modeling for multi-dimensional analysis, EDA, feature engineering, KPI architecture, and dashboard development.
                </p>
                <p className={`text-base leading-relaxed mb-8 ${d ? 'text-gray-300' : 'text-gray-700'}`}>
                  Across projects, I have analyzed crypto market trends, customer churn risk, wearable health data, and large-scale retail transactions, applying descriptive and predictive analytics to quantify risk and generate actionable insights. I focus on building analytics solutions that are technically robust, interpretable, and aligned with real business needs.
                </p>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: '4+', label: 'End-to-End Analytics', sub: 'Projects across Finance, Crypto, Healthcare & Retail' },
                    { val: '5+', label: 'Industry Certifications', sub: 'SQL, Python, Power BI & AI' },
                    { val: '14+', label: 'Core Tools & Technologies', sub: 'Used Across End-to-End Projects' },
                  ].map((s, i) => (
                    <div key={i} className={`p-4 rounded-xl text-center border ${d ? 'bg-white/[0.03] border-indigo-500/20' : 'bg-gray-50 border-gray-100'}`}>
                      <h4 className="text-2xl font-bold grad-text mb-1">{s.val}</h4>
                      <p className={`text-xs font-semibold ${d ? 'text-gray-200' : 'text-gray-800'}`}>{s.label}</p>
                      <p className={`text-[10px] mt-0.5 ${d ? 'text-gray-400' : 'text-gray-500'}`}>{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Photo + links (2 cols) */}
              <div className="col-span-2 flex flex-col items-center gap-6 pt-2">
                <div className={`w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border-2 ${d ? 'border-indigo-500/40' : 'border-indigo-200'}`}>
                  <img src="/sid-photo.jpg" alt="Teja Siddhartha Rajam" className="w-full h-full object-cover object-left"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/256x256/1a1a2e/6366f1?text=TS'; }} />
                </div>
                <div className="flex gap-3">
                  {[
                    { href: 'https://www.linkedin.com/in/rtejasiddhartha/', icon: <Linkedin size={22} />, color: 'text-blue-400' },
                    { href: 'https://github.com/rtejasiddhartha/', icon: <Github size={22} />, color: d ? 'text-gray-300' : 'text-gray-600' },
                    { href: 'mailto:rtejasiddhartha18@gmail.com', icon: <Mail size={22} />, color: 'text-rose-400' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label="social"
                      className={`p-3 rounded-xl transition-all hover:scale-110 ${d ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${s.color}`}>
                      {s.icon}
                    </a>
                  ))}
                </div>
                <a href="/TejaSiddhartha_DataAnalyst.pdf" target="_blank" rel="noopener noreferrer"
                  className="w-full text-center px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-lg">
                  View Resume (PDF)
                </a>
                <button onClick={() => scrollToSection('education-certifications')}
                  className={`w-full text-center px-5 py-3 rounded-full font-semibold text-sm transition-all border flex items-center justify-center gap-2
                    ${d ? 'bg-white/5 text-gray-200 border-white/10 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'}`}>
                  <Award size={16} /> View Certifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ═══ EDUCATION & CERTS ═══ */}
      <section id="education-certifications" className={`py-20 px-6 lg:px-24 ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-12"><SectionBadge>Credentials</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-bold grad-text">Education & Certifications</h2>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 grad-cool"><GraduationCap size={24} /> Education</h3>
              <div className="space-y-4">
                {education.map((item, i) => (
                  <div key={i} className={`p-5 rounded-xl border transition-all hover:scale-[1.01] ${d ? 'bg-[#13131f] border-blue-900/40 hover:border-blue-400/50' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
                    <h4 className={`text-base font-semibold mb-1 ${d ? 'text-white' : 'text-gray-900'}`}>{item.degree}</h4>
                    <p className={`text-sm ${d ? 'text-gray-400' : 'text-gray-500'}`}>{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 grad-green"><Award size={24} /> Certifications</h3>
              <div className="space-y-4">
                {certifications.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between p-5 rounded-xl border transition-all hover:scale-[1.01] group ${d ? 'bg-[#13131f] border-emerald-900/30 hover:border-emerald-400/50' : 'bg-white border-gray-200 hover:border-emerald-400'}`}>
                    <div>
                      <h4 className={`text-base font-semibold mb-0.5 ${d ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                      <p className={`text-sm ${d ? 'text-gray-400' : 'text-gray-500'}`}>{item.issuer}</p>
                    </div>
                    <ExternalLink size={16} className={`${d ? 'text-gray-600 group-hover:text-emerald-400' : 'text-gray-400 group-hover:text-emerald-500'} transition-colors`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className={`py-20 px-6 lg:px-24 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-12"><SectionBadge>Portfolio</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-bold grad-text">My Projects</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {displayedProjects.map(p => <ProjectCard key={p.id} project={p} navigateToPage={navigateToPage} theme={theme} />)}
          </div>
          {totalProjectPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-4">
              <button onClick={goPrev} disabled={currentProjectPageIndex === 0}
                className={`p-3 rounded-full transition-all ${currentProjectPageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:scale-110'}`}>
                <ChevronLeft size={20} />
              </button>
              <span className={`text-sm font-semibold ${d ? 'text-gray-400' : 'text-gray-600'}`}>{currentProjectPageIndex + 1} / {totalProjectPages}</span>
              <button onClick={goNext} disabled={currentProjectPageIndex === totalProjectPages - 1}
                className={`p-3 rounded-full transition-all ${currentProjectPageIndex === totalProjectPages - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:scale-110'}`}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="section-line" />

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className={`py-20 px-6 lg:px-24 ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto reveal">
          <div className="text-center mb-12"><SectionBadge>Toolbox</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-bold grad-text">My Skills</h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {skills.map((skill, i) => (
              <div key={i} className={`skill-card flex flex-col items-center p-6 rounded-2xl border text-center group
                ${d ? 'bg-[#13131f] border-white/[0.06] hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-400'}`}>
                <div className={`p-3 rounded-xl mb-3 ${d ? 'bg-white/[0.04]' : 'bg-gray-50'}`}>{skill.icon}</div>
                <h3 className={`text-sm font-bold mb-1.5 ${d ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
                <p className={`text-xs leading-relaxed ${d ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'} transition-colors`}>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className={`py-20 px-6 lg:px-24 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="max-w-xl mx-auto reveal">
          <div className="text-center mb-10"><SectionBadge>Contact</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-bold grad-text">Get in Touch</h2>
          </div>
          <div className={`rounded-2xl p-8 border shadow-xl ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
            <form onSubmit={handleContactSubmit} className="space-y-5">
              {[
                { id: 'name', label: 'Name', type: 'text', val: contactName, set: setContactName, ph: 'Your Name' },
                { id: 'email', label: 'Email', type: 'email', val: contactEmail, set: setContactEmail, ph: 'your@example.com' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className={`block text-sm font-semibold mb-1.5 ${d ? 'text-gray-300' : 'text-gray-700'}`}>{f.label}</label>
                  <input type={f.type} id={f.id} name={f.id} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} required
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all
                      ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`} />
                </div>
              ))}
              <div>
                <label htmlFor="message" className={`block text-sm font-semibold mb-1.5 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea id="message" name="message" rows="4" value={contactMessage} onChange={e => setContactMessage(e.target.value)} placeholder="Your message..." required
                  className={`w-full px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none
                    ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'}`} />
              </div>
              <button type="submit" disabled={formStatus.type === 'sending'}
                className={`w-full py-3.5 rounded-full bg-indigo-600 text-white font-semibold text-sm shadow-lg hover:bg-indigo-700 transition-all hover:shadow-indigo-500/20
                  ${formStatus.type === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {formStatus.type === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus.message && (
                <p className={`text-center text-sm font-semibold ${formStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{formStatus.message}</p>
              )}
            </form>
          </div>
          <div className="mt-10 text-center">
            <p className={`text-sm font-semibold mb-4 ${d ? 'text-gray-400' : 'text-gray-600'}`}>Connect with Me</p>
            <div className="flex justify-center gap-4">
              {[
                { href: 'https://www.linkedin.com/in/rtejasiddhartha/', icon: <Linkedin size={24} />, color: 'text-blue-400' },
                { href: 'https://github.com/rtejasiddhartha/', icon: <Github size={24} />, color: d ? 'text-gray-300' : 'text-gray-600' },
                { href: 'mailto:rtejasiddhartha18@gmail.com', icon: <Mail size={24} />, color: 'text-rose-400' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label="social"
                  className={`p-3 rounded-xl transition-all hover:scale-110 ${d ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${s.color}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'project-detail': return <ProjectDetailPage project={projects.find(p => p.id === selectedProjectId)} setCurrentPage={navigateToPage} theme={theme} />;
      case 'blog': return <BlogPage setCurrentPage={navigateToPage} theme={theme} blogPosts={blogPosts} linkedinPosts={linkedinPosts} />;
      case 'blog-post': return <BlogPostDetail post={blogPosts.find(p => p.id === selectedBlogPostId)} setCurrentPage={navigateToPage} theme={theme} />;
      case 'insights': return <InsightsPageDesktop theme={theme} navigateToPage={navigateToPage} blogPosts={blogPosts} linkedinPosts={linkedinPosts} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Scroll Progress */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-24 transition-all duration-300
        ${isScrolled
          ? `glass shadow-lg ${d ? 'bg-[#0a0a12]/80 border-b border-white/[0.04]' : 'bg-white/80 border-b border-gray-100'}`
          : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => navigateToPage('home')}
            className={`text-xl font-bold tracking-tight transition-opacity hover:opacity-80 ${d ? 'text-white' : 'text-gray-900'}`}>
            <span className="grad-text">Sid</span><span className={d ? 'text-gray-400' : 'text-gray-500'}>'s Portfolio</span>
          </button>
          <nav className="flex items-center gap-8">
            {[
              { label: 'Home', action: () => scrollToSection('hero') },
              { label: 'About', action: () => scrollToSection('about') },
              { label: 'Projects', action: () => scrollToSection('projects') },
              { label: 'Skills', action: () => scrollToSection('skills') },
              { label: 'Contact', action: () => scrollToSection('contact') },
            ].map(n => (
              <button key={n.label} onClick={n.action}
                className={`text-sm font-medium transition-colors ${d ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                {n.label}
              </button>
            ))}
          </nav>
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className={`p-2.5 rounded-xl transition-all ${d ? 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
            {d ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="pt-16">{renderPageContent()}</main>

      <footer className={`py-8 px-6 text-center text-xs ${d ? 'bg-[#08080e] text-gray-500 border-t border-white/[0.04]' : 'bg-gray-900 text-gray-400'}`}>
        <p>&copy; 2026 Teja Siddhartha Rajam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppDesktop;
