import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Mail, Linkedin, Github, BarChart, Code, Database, FileText, Bot, ChevronLeft, Layers, Zap, Award, GraduationCap, ExternalLink, ChevronRight, MessageSquare, ArrowUpRight } from 'lucide-react';
import { projects, blogPosts, linkedinPosts, education, certifications } from './data';
import { useScrollRevealAll, useScrollProgress } from './hooks';
import InsightsPageTablet from './InsightsPageTablet';

const skills = [
  { name: 'Python', icon: <Code size={32} className="text-blue-400" />, desc: 'Pandas, NumPy, Feature Engineering, Data Processing' },
  { name: 'SQL', icon: <Database size={32} className="text-emerald-400" />, desc: 'Joins, CTEs, Window Functions, Analytics' },
  { name: 'Power BI', icon: <BarChart size={32} className="text-indigo-400" />, desc: 'Dashboard Design, DAX, KPI Modeling' },
  { name: 'Data Analytics', icon: <BarChart size={32} className="text-purple-400" />, desc: 'Data Cleaning, EDA, Business Insights' },
  { name: 'Excel', icon: <FileText size={32} className="text-emerald-400" />, desc: 'Advanced Formulas, Pivot Tables, Forecasting' },
  { name: 'Machine Learning', icon: <Bot size={32} className="text-pink-400" />, desc: 'Logistic Regression, Classification, Evaluation' },
  { name: 'BigQuery', icon: <Database size={32} className="text-violet-400" />, desc: 'Analytics Tables, SQL Modeling, Snapshots' },
  { name: 'Data Warehousing', icon: <Database size={32} className="text-indigo-500" />, desc: 'ETL Concepts, Star Schema, Fact Tables' },
  { name: 'Real-time Analytics', icon: <Zap size={32} className="text-amber-400" />, desc: 'Automated Pipelines, Live Monitoring' },
  { name: 'n8n Automation', icon: <Zap size={32} className="text-orange-400" />, desc: 'n8n Workflows, Scheduled Pipelines' },
  { name: 'APIs', icon: <Code size={32} className="text-cyan-400" />, desc: 'REST APIs, JSON, Data Ingestion' },
  { name: 'Data Visualization', icon: <Layers size={32} className="text-orange-500" />, desc: 'Insight Narratives, Business Dashboards' },
];

const ProjectCard = ({ project, navigateToPage, theme }) => {
  const d = theme === 'dark';
  return (
    <div className={`project-card rounded-2xl overflow-hidden cursor-pointer border ${d ? 'bg-[#13131f] border-white/[0.06] hover:border-indigo-500/40' : 'bg-white border-gray-200 hover:border-indigo-400'} shadow-lg`}
      onClick={() => navigateToPage('project-detail', project.id)}>
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.title} className="proj-img w-full h-full object-cover transition-transform duration-700"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/1a1a2e/6366f1?text=Project'; }} />
        <div className={`proj-overlay absolute inset-0 flex items-center justify-center ${d ? 'bg-black/60' : 'bg-white/70'}`}>
          <span className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold">View Details</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className={`text-base font-bold mb-2 ${d ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
        <p className={`text-xs leading-relaxed mb-3 ${d ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map(t => <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${d ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{t}</span>)}
        </div>
        <div className="flex gap-4">
          {project.liveDemo && project.liveDemo !== '#' && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-xs font-semibold text-indigo-400"><BarChart size={12} /> Demo <ArrowUpRight size={11} /></a>}
          {project.githubRepo && <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-xs font-semibold text-indigo-400"><Github size={12} /> GitHub <ArrowUpRight size={11} /></a>}
        </div>
      </div>
    </div>
  );
};

const ProjectDetailPage = ({ project, setCurrentPage, theme }) => {
  const d = theme === 'dark';
  if (!project) return (<div className={`min-h-screen flex flex-col items-center justify-center ${d ? 'bg-[#0a0a12] text-white' : 'bg-gray-50 text-gray-800'}`}><p className="text-xl mb-4">Project not found.</p><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150); }} className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold">Back to Projects</button></div>);
  return (
    <div className={`min-h-screen pt-24 pb-16 px-8 ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150); }} className={`flex items-center mb-8 px-5 py-2.5 rounded-full text-sm font-semibold ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'}`}><ChevronLeft size={18} className="mr-1" /> Back</button>
      <div className={`max-w-3xl mx-auto rounded-2xl p-8 border shadow-xl ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
        <h1 className="text-2xl font-bold mb-5 grad-text">{project.title}</h1>
        <img src={project.image} alt={project.title} className="w-full rounded-xl mb-6 shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/1a1a2e/6366f1?text=Project'; }} />
        <p className={`text-sm leading-relaxed mb-5 ${d ? 'text-gray-300' : 'text-gray-700'}`}>{project.fullDescription}</p>
        <div className="flex flex-wrap gap-2 mb-6">{project.tags.map(t => <span key={t} className={`px-3 py-1 rounded-full text-xs font-medium ${d ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{t}</span>)}</div>
        <div className="flex flex-wrap gap-3 mb-6">
          {project.liveDemo && project.liveDemo !== '#' && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold flex items-center gap-2"><BarChart size={16} /> Live Demo</a>}
          {project.githubRepo && <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 ${d ? 'bg-white/5 text-gray-200 border border-white/10' : 'bg-gray-100 text-gray-700'}`}><Github size={16} /> GitHub</a>}
        </div>
        <div className={`p-5 rounded-xl ${d ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-gray-50'}`}>
          <h3 className="text-base font-bold mb-2 grad-text">Logic and Approach</h3>
          <p className={`text-sm leading-relaxed ${d ? 'text-gray-400' : 'text-gray-600'}`}>{project.aiSummary}</p>
        </div>
      </div>
    </div>
  );
};

const BlogPage = ({ setCurrentPage, theme, blogPosts: bp, linkedinPosts: lp }) => {
  const d = theme === 'dark';
  return (
    <div className={`min-h-screen pt-24 pb-16 px-8 ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="text-3xl font-bold text-center mb-10 grad-text">Daily Byte Blog & Posts</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {lp.map(post => (
          <div key={post.id} className={`p-5 rounded-xl ${d ? 'bg-[#13131f] border border-white/[0.06]' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center mb-3"><img src={post.profilePic} alt={post.author} className="w-9 h-9 rounded-full mr-3 object-cover" /><div><p className="text-sm font-semibold">{post.author}</p><p className="text-xs opacity-50">{post.date}</p></div></div>
            <p className="text-sm opacity-80 mb-2">{post.content}</p>
            <div className="flex gap-4 text-xs opacity-50"><span className="flex items-center gap-1"><Layers size={12} /> {post.likes} Likes</span><span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments} Comments</span></div>
          </div>
        ))}
        {bp.map(post => (
          <div key={post.id} className={`p-5 rounded-xl cursor-pointer border ${d ? 'bg-[#13131f] border-white/[0.06] hover:border-indigo-500/40' : 'bg-white border-gray-200 hover:border-indigo-400'}`} onClick={() => setCurrentPage('blog-post', post.id)}>
            <h3 className="text-base font-bold mb-1 grad-text">{post.title}</h3>
            <p className="text-xs opacity-50 mb-2">{post.date}</p>
            <p className="text-sm opacity-70">{post.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogPostDetail = ({ post, setCurrentPage, theme }) => {
  const d = theme === 'dark';
  if (!post) return <div className={`min-h-screen flex items-center justify-center ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}><button onClick={() => setCurrentPage('blog')} className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm">Back</button></div>;
  return (
    <div className={`min-h-screen pt-24 pb-16 px-8 ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button onClick={() => setCurrentPage('blog')} className={`flex items-center mb-8 px-5 py-2.5 rounded-full text-sm font-semibold ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'}`}><ChevronLeft size={18} className="mr-1" /> Back</button>
      <div className={`max-w-3xl mx-auto rounded-2xl p-8 border ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
        <h1 className="text-2xl font-bold mb-4 grad-text">{post.title}</h1>
        <p className="text-sm opacity-50 mb-6">{post.date}</p>
        <p className={`text-base leading-relaxed ${d ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</p>
      </div>
    </div>
  );
};

const AppTablet = () => {
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrent] = useState('home');
  const [selectedProjectId, setSelProject] = useState(null);
  const [selectedBlogPostId, setSelBlog] = useState(null);
  const [currentProjectPageIndex, setProjPage] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });

  const scrollProgress = useScrollProgress();
  useScrollRevealAll();
  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');
  useEffect(() => { document.documentElement.classList.remove('dark', 'light'); document.documentElement.classList.add(theme); }, [theme]);
  useEffect(() => { const fn = () => setIsScrolled(window.scrollY > 50); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { if (formStatus.type === 'success' || formStatus.type === 'error') { const t = setTimeout(() => setFormStatus({ type: 'idle', message: '' }), 5000); return () => clearTimeout(t); } }, [formStatus]);
  useEffect(() => { const timer = setTimeout(() => { document.querySelectorAll('.reveal:not(.visible)').forEach(el => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.1 }); obs.observe(el); }); }, 100); return () => clearTimeout(timer); }, [currentPage]);

  const scrollToSection = (id) => { setCurrent('home'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100); };
  const navigateToPage = (page, id = null) => { setCurrent(page); if (page === 'project-detail') setSelProject(id); else setSelProject(null); if (page === 'blog-post') setSelBlog(id); else setSelBlog(null); window.scrollTo(0, 0); };

  const handleContactSubmit = async (e) => {
    e.preventDefault(); setFormStatus({ type: 'sending', message: 'Sending...' });
    const fd = new URLSearchParams(); fd.append('name', contactName); fd.append('email', contactEmail); fd.append('message', contactMessage);
    try {
      const r = await fetch('/.netlify/functions/send-contact-email', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: fd.toString() });
      if (r.ok) { setFormStatus({ type: 'success', message: 'Sent! I\'ll get back to you soon.' }); setContactName(''); setContactEmail(''); setContactMessage(''); }
      else { const data = await r.json(); setFormStatus({ type: 'error', message: `Failed: ${data.message || 'Unknown'}` }); }
    } catch (err) { setFormStatus({ type: 'error', message: 'Failed. Check connection.' }); }
  };

  const projectsPerPage = 2;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const displayed = projects.slice(currentProjectPageIndex * projectsPerPage, (currentProjectPageIndex + 1) * projectsPerPage);
  const d = theme === 'dark';

  const renderHome = () => (
    <>
      {/* HERO */}
      <section id="hero" className={`relative min-h-screen flex items-center justify-center px-8 py-12 overflow-hidden ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="hero-grid absolute inset-0" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,.4), transparent 70%)' }} />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="anim-hero"><span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-5 border ${d ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>Data & BI Analyst</span></div>
          <h1 className="anim-hero-d1 mb-4">
            <span className={`block text-2xl font-medium mb-2 ${d ? 'text-gray-300' : 'text-gray-600'}`}>Hi, I'm Sid</span>
            <span className="block text-[2.75rem] font-extrabold leading-[1.1] grad-text pb-1">A Data Analyst Building Decision-Ready Insights from Real-World Data</span>
          </h1>
          <p className={`anim-hero-d2 text-base max-w-2xl mx-auto mt-5 mb-9 ${d ? 'text-gray-400' : 'text-gray-600'}`}>
            I design end-to-end analytics solutions using Python, SQL, Power BI, and AI — from raw data pipelines to business-ready dashboards that support confident decision-making.
          </p>
          <div className="anim-hero-d3 flex items-center justify-center gap-4">
            <button onClick={() => scrollToSection('projects')} className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-lg">View Projects</button>
            <a href="/TejaSiddhartha_DataAnalyst.pdf" target="_blank" rel="noopener noreferrer" className={`px-6 py-3 rounded-full text-sm font-semibold border ${d ? 'bg-white/5 text-gray-200 border-white/10' : 'bg-white text-gray-700 border-gray-200'}`}>
              <span className="flex items-center gap-2"><Download size={15} /> Resume</span>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-16 px-8 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="reveal max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 grad-text">About Me</h2>
          <div className={`rounded-2xl p-8 border shadow-xl ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
            <div className="grid grid-cols-3 gap-8 items-start">
              <div className="col-span-2">
                <h3 className="text-2xl font-bold mb-2 grad-warm">Hi, I'm Teja Siddhartha</h3>
                <p className={`text-sm font-medium mb-3 ${d ? 'text-indigo-300' : 'text-indigo-600'}`}>Data & BI Analyst | SQL • Python • Power BI | End-to-End Analytics</p>
                <p className={`text-sm leading-relaxed mb-3 ${d ? 'text-gray-300' : 'text-gray-700'}`}>I am a Data Analyst experienced in building end-to-end analytics solutions across finance, customer analytics, healthcare, retail, and digital asset markets. I transform raw data into structured datasets, well-defined KPIs, and interactive dashboards that support business and operational decisions.</p>
                <p className={`text-sm leading-relaxed mb-3 ${d ? 'text-gray-300' : 'text-gray-700'}`}>I work extensively with Python, SQL, Power BI, Excel, and BigQuery to design analytics pipelines — from ingestion and cleaning to modeling and visualization. My experience includes normalized OLTP schema design, OLAP modeling for multi-dimensional analysis, EDA, feature engineering, KPI architecture, and dashboard development.</p>
                <p className={`text-sm leading-relaxed mb-6 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Across projects, I have analyzed crypto market trends, customer churn risk, wearable health data, and large-scale retail transactions, applying descriptive and predictive analytics to quantify risk and generate actionable insights. I focus on building analytics solutions that are technically robust, interpretable, and aligned with real business needs.</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[{ v: '4+', l: 'End-to-End Analytics', s: 'Finance, Crypto, Healthcare & Retail' }, { v: '5+', l: 'Industry Certifications', s: 'SQL, Python, Power BI & AI' }, { v: '14+', l: 'Core Tools & Tech', s: 'End-to-End Analytics Projects' }].map((s, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${d ? 'bg-white/[0.03] border-indigo-500/20' : 'bg-gray-50 border-gray-100'}`}>
                      <h4 className="text-xl font-bold grad-text">{s.v}</h4>
                      <p className={`text-[10px] font-semibold ${d ? 'text-gray-200' : 'text-gray-800'}`}>{s.l}</p>
                      <p className={`text-[9px] ${d ? 'text-gray-400' : 'text-gray-500'}`}>{s.s}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className={`w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-2 ${d ? 'border-indigo-500/40' : 'border-indigo-200'}`}>
                  <img src="/sid-photo.jpg" alt="Teja Siddhartha" className="w-full h-full object-cover object-left" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/176x176/1a1a2e/6366f1?text=TS'; }} />
                </div>
                <div className="flex gap-2">
                  {[{ href: 'https://www.linkedin.com/in/rtejasiddhartha/', icon: <Linkedin size={20} />, c: 'text-blue-400' }, { href: 'https://github.com/rtejasiddhartha/', icon: <Github size={20} />, c: d ? 'text-gray-300' : 'text-gray-600' }, { href: 'mailto:rtejasiddhartha18@gmail.com', icon: <Mail size={20} />, c: 'text-rose-400' }].map((s, i) =>
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl ${d ? 'bg-white/5 border border-white/10' : 'bg-gray-100'} ${s.c}`}>{s.icon}</a>
                  )}
                </div>
                <a href="/TejaSiddhartha_DataAnalyst.pdf" target="_blank" rel="noopener noreferrer" className="w-full text-center px-4 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold">View Resume</a>
                <button onClick={() => scrollToSection('education-certifications')} className={`w-full text-center px-4 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 border ${d ? 'bg-white/5 text-gray-200 border-white/10' : 'bg-gray-100 text-gray-700 border-gray-200'}`}><Award size={14} /> Certifications</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* EDUCATION & CERTS */}
      <section id="education-certifications" className={`py-16 px-8 ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="reveal max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 grad-text">Education & Certifications</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-bold mb-5 flex items-center gap-2 grad-cool"><GraduationCap size={20} /> Education</h3>
              <div className="space-y-3">{education.map((item, i) => (<div key={i} className={`p-5 rounded-xl border ${d ? 'bg-[#13131f] border-blue-900/40' : 'bg-white border-gray-200'}`}><h4 className={`text-sm font-semibold mb-0.5 ${d ? 'text-white' : 'text-gray-900'}`}>{item.degree}</h4><p className={`text-xs ${d ? 'text-gray-400' : 'text-gray-500'}`}>{item.institution}</p></div>))}</div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-5 flex items-center gap-2 grad-green"><Award size={20} /> Certifications</h3>
              <div className="space-y-3">{certifications.map((item, i) => (<a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-5 rounded-xl border group ${d ? 'bg-[#13131f] border-emerald-900/30 hover:border-emerald-400/50' : 'bg-white border-gray-200 hover:border-emerald-400'}`}><div><h4 className={`text-sm font-semibold mb-0.5 ${d ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4><p className={`text-xs ${d ? 'text-gray-400' : 'text-gray-500'}`}>{item.issuer}</p></div><ExternalLink size={14} className={`${d ? 'text-gray-600 group-hover:text-emerald-400' : 'text-gray-400 group-hover:text-emerald-500'} transition-colors`} /></a>))}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* PROJECTS */}
      <section id="projects" className={`py-16 px-8 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="reveal max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 grad-text">My Projects</h2>
          <div className="grid grid-cols-2 gap-6">{displayed.map(p => <ProjectCard key={p.id} project={p} navigateToPage={navigateToPage} theme={theme} />)}</div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button onClick={() => setProjPage(i => (i - 1 + totalPages) % totalPages)} disabled={currentProjectPageIndex === 0} className={`p-2.5 rounded-full transition-all ${currentProjectPageIndex === 0 ? 'opacity-30' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}><ChevronLeft size={18} /></button>
              <span className={`text-sm font-semibold ${d ? 'text-gray-400' : 'text-gray-600'}`}>{currentProjectPageIndex + 1} / {totalPages}</span>
              <button onClick={() => setProjPage(i => (i + 1) % totalPages)} disabled={currentProjectPageIndex === totalPages - 1} className={`p-2.5 rounded-full transition-all ${currentProjectPageIndex === totalPages - 1 ? 'opacity-30' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}><ChevronRight size={18} /></button>
            </div>
          )}
        </div>
      </section>

      <div className="section-line" />

      {/* SKILLS */}
      <section id="skills" className={`py-16 px-8 ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="reveal max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 grad-text">My Skills</h2>
          <div className="grid grid-cols-4 gap-4">
            {skills.map((skill, i) => (
              <div key={i} className={`skill-card flex flex-col items-center p-4 rounded-xl border text-center group ${d ? 'bg-[#13131f] border-white/[0.06] hover:border-indigo-500/30' : 'bg-white border-gray-200 hover:border-indigo-400'}`}>
                <div className={`p-2 rounded-lg mb-2 ${d ? 'bg-white/[0.04]' : 'bg-gray-50'}`}>{skill.icon}</div>
                <h3 className={`text-xs font-bold mb-1 ${d ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
                <p className={`text-[10px] leading-relaxed ${d ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'} transition-colors`}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* CONTACT */}
      <section id="contact" className={`py-16 px-8 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="reveal max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 grad-text">Get in Touch</h2>
          <div className={`rounded-2xl p-6 border shadow-xl ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div><label className={`block text-xs font-semibold mb-1 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Name</label><input type="text" value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Your Name" required className={`w-full px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-indigo-500 outline-none ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`} /></div>
              <div><label className={`block text-xs font-semibold mb-1 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Email</label><input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="your@example.com" required className={`w-full px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-indigo-500 outline-none ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`} /></div>
              <div><label className={`block text-xs font-semibold mb-1 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Message</label><textarea rows="4" value={contactMessage} onChange={e => setContactMessage(e.target.value)} placeholder="Your message..." required className={`w-full px-4 py-3 rounded-xl text-sm border focus:ring-2 focus:ring-indigo-500 outline-none resize-none ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`} /></div>
              <button type="submit" disabled={formStatus.type === 'sending'} className={`w-full py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold ${formStatus.type === 'sending' ? 'opacity-50' : ''}`}>{formStatus.type === 'sending' ? 'Sending...' : 'Send Message'}</button>
              {formStatus.message && <p className={`text-center text-sm font-semibold ${formStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{formStatus.message}</p>}
            </form>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            {[{ href: 'https://www.linkedin.com/in/rtejasiddhartha/', icon: <Linkedin size={22} />, c: 'text-blue-400' }, { href: 'https://github.com/rtejasiddhartha/', icon: <Github size={22} />, c: d ? 'text-gray-300' : 'text-gray-600' }, { href: 'mailto:rtejasiddhartha18@gmail.com', icon: <Mail size={22} />, c: 'text-rose-400' }].map((s, i) =>
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-xl ${d ? 'bg-white/5 border border-white/10' : 'bg-gray-100'} ${s.c}`}>{s.icon}</a>
            )}
          </div>
        </div>
      </section>
    </>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'project-detail': return <ProjectDetailPage project={projects.find(p => p.id === selectedProjectId)} setCurrentPage={navigateToPage} theme={theme} />;
      case 'blog': return <BlogPage setCurrentPage={navigateToPage} theme={theme} blogPosts={blogPosts} linkedinPosts={linkedinPosts} />;
      case 'blog-post': return <BlogPostDetail post={blogPosts.find(p => p.id === selectedBlogPostId)} setCurrentPage={navigateToPage} theme={theme} />;
      case 'insights': return <InsightsPageTablet theme={theme} navigateToPage={navigateToPage} blogPosts={blogPosts} linkedinPosts={linkedinPosts} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-8 transition-all duration-300 ${isScrolled ? `glass shadow-lg ${d ? 'bg-[#0a0a12]/80 border-b border-white/[0.04]' : 'bg-white/80 border-b border-gray-100'}` : 'bg-transparent'}`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button onClick={() => navigateToPage('home')} className={`text-xl font-bold ${d ? 'text-white' : 'text-gray-900'}`}>
            <span className="grad-text">Sid</span><span className={d ? 'text-gray-400' : 'text-gray-500'}>'s Portfolio</span>
          </button>
          <nav className="flex items-center gap-6">
            {['hero:Home', 'about:About', 'projects:Projects', 'skills:Skills', 'contact:Contact'].map(item => {
              const [id, label] = item.split(':');
              return <button key={id} onClick={() => scrollToSection(id)} className={`text-xs font-medium ${d ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{label}</button>;
            })}
          </nav>
          <button onClick={toggleTheme} aria-label="Toggle theme" className={`p-2 rounded-xl ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-600'}`}>
            {d ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <main className="pt-16">{renderPage()}</main>
      <footer className={`py-7 px-6 text-center text-xs ${d ? 'bg-[#08080e] text-gray-500 border-t border-white/[0.04]' : 'bg-gray-900 text-gray-400'}`}>
        <p>&copy; 2026 Teja Siddhartha Rajam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppTablet;
