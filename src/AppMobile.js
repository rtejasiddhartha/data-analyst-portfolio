import React, { useState, useEffect } from 'react';
import { Sun, Moon, Download, Mail, Linkedin, Github, BarChart, Code, Database, FileText, Bot, ChevronLeft, Layers, Zap, Award, GraduationCap, ExternalLink, ChevronRight, MessageSquare, ArrowUpRight, Menu, X } from 'lucide-react';
import { projects, blogPosts, linkedinPosts, education, certifications } from './data';
import { useScrollRevealAll, useScrollProgress } from './hooks';
import InsightsPageMobile from './InsightsPageMobile';

const skills = [
  { name: 'Python', icon: <Code size={28} className="text-blue-400" />, desc: 'Pandas, NumPy, Scikit-learn' },
  { name: 'SQL', icon: <Database size={28} className="text-emerald-400" />, desc: 'Querying, Data Manipulation' },
  { name: 'Power BI', icon: <BarChart size={28} className="text-indigo-400" />, desc: 'Dashboard Design, DAX' },
  { name: 'Data Analytics', icon: <BarChart size={28} className="text-purple-400" />, desc: 'Cleaning, EDA, Insights' },
  { name: 'Excel', icon: <FileText size={28} className="text-emerald-400" />, desc: 'Formulas, Pivot Tables' },
  { name: 'Machine Learning', icon: <Bot size={28} className="text-pink-400" />, desc: 'Regression, Classification' },
  { name: 'BigQuery', icon: <Database size={28} className="text-violet-400" />, desc: 'Analytics, SQL Modeling' },
  { name: 'Data Warehousing', icon: <Database size={28} className="text-indigo-500" />, desc: 'ETL, Star Schema' },
  { name: 'Real-time Analytics', icon: <Zap size={28} className="text-amber-400" />, desc: 'Pipelines, Monitoring' },
  { name: 'n8n Automation', icon: <Zap size={28} className="text-orange-400" />, desc: 'Workflows, Scheduling' },
  { name: 'APIs', icon: <Code size={28} className="text-cyan-400" />, desc: 'REST, JSON, Ingestion' },
  { name: 'Data Visualization', icon: <Layers size={28} className="text-orange-500" />, desc: 'Narratives, Dashboards' },
];

const SectionBadge = ({ children }) => (
  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
    {children}
  </span>
);

const ProjectCard = ({ project, navigateToPage, theme }) => {
  const d = theme === 'dark';
  return (
    <div className={`project-card rounded-2xl overflow-hidden cursor-pointer border ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'} shadow-lg`}
      onClick={() => navigateToPage('project-detail', project.id)}>
      <div className="relative h-44 overflow-hidden">
        <img src={project.image} alt={project.title} className="proj-img w-full h-full object-cover transition-transform duration-700"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/1a1a2e/6366f1?text=Project'; }} />
        <div className={`proj-overlay absolute inset-0 flex items-center justify-center ${d ? 'bg-black/60' : 'bg-white/70'}`}>
          <span className="px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold">View Details</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className={`text-base font-bold mb-2 ${d ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
        <p className={`text-xs leading-relaxed mb-3 ${d ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 5).map(t => (
            <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${d ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{t}</span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveDemo && project.liveDemo !== '#' && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400"><BarChart size={11} /> Demo <ArrowUpRight size={10} /></a>
          )}
          {project.githubRepo && (
            <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400"><Github size={11} /> GitHub <ArrowUpRight size={10} /></a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectDetailPage = ({ project, setCurrentPage, theme }) => {
  const d = theme === 'dark';
  if (!project) return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${d ? 'bg-[#0a0a12] text-white' : 'bg-gray-50 text-gray-800'}`}>
      <p className="text-lg mb-4">Project not found.</p>
      <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
        className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold">Back to Projects</button>
    </div>
  );
  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150); }}
        className={`flex items-center mb-6 px-4 py-2 rounded-full text-sm font-semibold ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'}`}>
        <ChevronLeft size={16} className="mr-1" /> Back
      </button>
      <div className={`rounded-2xl p-5 border shadow-xl ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
        <h1 className="text-xl font-bold mb-4 grad-text">{project.title}</h1>
        <img src={project.image} alt={project.title} className="w-full rounded-xl mb-5 shadow-lg"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x300/1a1a2e/6366f1?text=Project'; }} />
        <p className={`text-sm leading-relaxed mb-4 ${d ? 'text-gray-300' : 'text-gray-700'}`}>{project.fullDescription}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(t => <span key={t} className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${d ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{t}</span>)}
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.liveDemo && project.liveDemo !== '#' && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"><BarChart size={14} /> Live Demo</a>}
          {project.githubRepo && <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1 ${d ? 'bg-white/5 text-gray-200 border border-white/10' : 'bg-gray-100 text-gray-700'}`}><Github size={14} /> GitHub</a>}
        </div>
        <div className={`p-4 rounded-xl ${d ? 'bg-white/[0.03] border border-white/[0.06]' : 'bg-gray-50'}`}>
          <h3 className="text-sm font-bold mb-2 grad-text">Logic and Approach</h3>
          <p className={`text-xs leading-relaxed ${d ? 'text-gray-400' : 'text-gray-600'}`}>{project.aiSummary}</p>
        </div>
      </div>
    </div>
  );
};

const BlogPage = ({ setCurrentPage, theme, blogPosts: bp, linkedinPosts: lp }) => {
  const d = theme === 'dark';
  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="text-2xl font-bold text-center mb-8 grad-text">Daily Byte Blog & Posts</h1>
      <div className="space-y-6">
        {lp.map(post => (
          <div key={post.id} className={`p-4 rounded-xl ${d ? 'bg-[#13131f] border border-white/[0.06]' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center mb-2">
              <img src={post.profilePic} alt={post.author} className="w-8 h-8 rounded-full mr-2 object-cover" />
              <div><p className="text-xs font-semibold">{post.author}</p><p className="text-[10px] opacity-50">{post.date}</p></div>
            </div>
            <p className="text-xs opacity-80 mb-2">{post.content}</p>
            <div className="flex gap-3 text-[10px] opacity-50">
              <span className="flex items-center gap-1"><Layers size={10} /> {post.likes} Likes</span>
              <span className="flex items-center gap-1"><MessageSquare size={10} /> {post.comments} Comments</span>
            </div>
          </div>
        ))}
        {bp.map(post => (
          <div key={post.id} className={`p-4 rounded-xl cursor-pointer ${d ? 'bg-[#13131f] border border-white/[0.06]' : 'bg-white border border-gray-200'}`}
            onClick={() => setCurrentPage('blog-post', post.id)}>
            <h3 className="text-sm font-bold mb-1 grad-text">{post.title}</h3>
            <p className="text-[10px] opacity-50 mb-1">{post.date}</p>
            <p className="text-xs opacity-70">{post.snippet}</p>
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
    <div className={`min-h-screen pt-20 pb-12 px-4 ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <button onClick={() => setCurrentPage('blog')} className={`flex items-center mb-6 px-4 py-2 rounded-full text-sm font-semibold ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-700'}`}><ChevronLeft size={16} className="mr-1" /> Back</button>
      <div className={`rounded-2xl p-5 border ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
        <h1 className="text-xl font-bold mb-3 grad-text">{post.title}</h1>
        <p className="text-xs opacity-50 mb-4">{post.date}</p>
        <p className={`text-sm leading-relaxed ${d ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</p>
      </div>
    </div>
  );
};

const AppMobile = () => {
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrent] = useState('home');
  const [selectedProjectId, setSelProject] = useState(null);
  const [selectedBlogPostId, setSelBlog] = useState(null);
  const [currentProjectPageIndex, setProjPage] = useState(0);
  const [isMobileMenuOpen, setMenuOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' });

  const scrollProgress = useScrollProgress();
  useScrollRevealAll();

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  useEffect(() => { document.documentElement.classList.remove('dark', 'light'); document.documentElement.classList.add(theme); }, [theme]);
  useEffect(() => { const fn = () => setIsScrolled(window.scrollY > 40); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { if (formStatus.type === 'success' || formStatus.type === 'error') { const t = setTimeout(() => setFormStatus({ type: 'idle', message: '' }), 5000); return () => clearTimeout(t); } }, [formStatus]);
  useEffect(() => { const timer = setTimeout(() => { document.querySelectorAll('.reveal:not(.visible)').forEach(el => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.1 }); obs.observe(el); }); }, 100); return () => clearTimeout(timer); }, [currentPage]);

  const scrollToSection = (id) => { setCurrent('home'); setMenuOpen(false); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100); };
  const navigateToPage = (page, id = null) => { setCurrent(page); setMenuOpen(false); if (page === 'project-detail') setSelProject(id); else setSelProject(null); if (page === 'blog-post') setSelBlog(id); else setSelBlog(null); window.scrollTo(0, 0); };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'sending', message: 'Sending...' });
    const fd = new URLSearchParams();
    fd.append('name', contactName); fd.append('email', contactEmail); fd.append('message', contactMessage);
    try {
      const r = await fetch('/.netlify/functions/send-contact-email', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: fd.toString() });
      if (r.ok) { setFormStatus({ type: 'success', message: 'Sent! I\'ll get back to you soon.' }); setContactName(''); setContactEmail(''); setContactMessage(''); }
      else { const data = await r.json(); setFormStatus({ type: 'error', message: `Failed: ${data.message || 'Unknown'}` }); }
    } catch (err) { setFormStatus({ type: 'error', message: 'Failed. Check connection.' }); }
  };

  const projectsPerPage = 1;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const displayed = projects.slice(currentProjectPageIndex * projectsPerPage, (currentProjectPageIndex + 1) * projectsPerPage);
  const d = theme === 'dark';

  const renderHome = () => (
    <>
      {/* HERO */}
      <section id="hero" className={`relative min-h-screen flex items-center justify-center px-5 py-8 overflow-hidden ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="absolute top-1/3 left-1/4 w-[280px] h-[280px] rounded-full opacity-20 blur-[80px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,.4), transparent 70%)' }} />
        <div className="relative z-10 text-center max-w-full">
          <div className="anim-hero">
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4 border ${d ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>Data Analyst</span>
          </div>
          <h1 className="anim-hero-d1 mb-3">
            <span className={`block text-lg font-medium mb-1 ${d ? 'text-gray-400' : 'text-gray-600'}`}>Hi, I'm Sid</span>
            <span className="block text-[1.75rem] font-extrabold leading-[1.15] grad-text">A Data Analyst Building Decision-Ready Insights from Real-World Data</span>
          </h1>
          <p className={`anim-hero-d2 text-sm max-w-sm mx-auto mt-4 mb-8 ${d ? 'text-gray-400' : 'text-gray-600'}`}>
            I design end-to-end analytics solutions using Python, SQL, Power BI, and AI — from raw data pipelines to business-ready dashboards.
          </p>
          <div className="anim-hero-d3 flex items-center justify-center gap-3">
            <button onClick={() => scrollToSection('projects')} className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-lg">View Projects</button>
            <a href="/TejaSiddhartha_DataAnalyst.pdf" target="_blank" rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold border ${d ? 'bg-white/5 text-gray-200 border-white/10' : 'bg-white text-gray-700 border-gray-200'}`}>
              <span className="flex items-center gap-1.5"><Download size={13} /> Resume</span>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`py-12 px-4 scroll-mt-12 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="reveal">
          <div className="text-center mb-8"><SectionBadge>About Me</SectionBadge></div>
          <div className={`rounded-2xl p-5 border ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'} shadow-lg`}>
            <div className="flex flex-col items-center gap-4 mb-5">
              <div className={`w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-2 ${d ? 'border-indigo-500/40' : 'border-indigo-200'}`}>
                <img src="/sid-photo.jpg" alt="Teja Siddhartha" className="w-full h-full object-cover object-left"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/144x144/1a1a2e/6366f1?text=TS'; }} />
              </div>
              <div className="flex gap-2">
                {[{ href: 'https://www.linkedin.com/in/rtejasiddhartha/', icon: <Linkedin size={18} />, c: 'text-blue-400' },
                  { href: 'https://github.com/rtejasiddhartha/', icon: <Github size={18} />, c: d ? 'text-gray-300' : 'text-gray-600' },
                  { href: 'mailto:rtejasiddhartha18@gmail.com', icon: <Mail size={18} />, c: 'text-rose-400' }
                ].map((s, i) => <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl ${d ? 'bg-white/5 border border-white/10' : 'bg-gray-100'} ${s.c}`}>{s.icon}</a>)}
              </div>
              <a href="/TejaSiddhartha_DataAnalyst.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold">View Resume</a>
              <button onClick={() => scrollToSection('education-certifications')} className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1 border ${d ? 'bg-white/5 text-gray-200 border-white/10' : 'bg-gray-100 text-gray-700 border-gray-200'}`}><Award size={14} /> Certifications</button>
            </div>
            <h3 className="text-lg font-bold mb-2 grad-warm">Hi, I'm Teja Siddhartha</h3>
            <p className={`text-xs font-medium mb-3 ${d ? 'text-indigo-300' : 'text-indigo-600'}`}>Data Analyst | SQL • Python • Power BI | End-to-End Analytics</p>
            <p className={`text-xs leading-relaxed mb-3 ${d ? 'text-gray-300' : 'text-gray-700'}`}>I am a Data Analyst experienced in building end-to-end analytics solutions across finance, customer analytics, healthcare, retail, and digital asset markets. I transform raw data into structured datasets, well-defined KPIs, and interactive dashboards that support business and operational decisions.</p>
            <p className={`text-xs leading-relaxed mb-3 ${d ? 'text-gray-300' : 'text-gray-700'}`}>I work extensively with Python, SQL, Power BI, Excel, and BigQuery to design analytics pipelines — from ingestion and cleaning to modeling and visualization. My experience includes normalized OLTP schema design, OLAP modeling for multi-dimensional analysis, EDA, feature engineering, KPI architecture, and dashboard development.</p>
            <p className={`text-xs leading-relaxed mb-5 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Across projects, I have analyzed crypto market trends, customer churn risk, wearable health data, and large-scale retail transactions, applying descriptive and predictive analytics to quantify risk and generate actionable insights. I focus on building analytics solutions that are technically robust, interpretable, and aligned with real business needs.</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[{ v: '4+', l: 'Analytics Projects', s: 'Finance, Crypto, Healthcare & Retail' }, { v: '5+', l: 'Certifications', s: 'SQL, Python, Power BI & AI' }, { v: '14+', l: 'Tools & Tech', s: 'End-to-End Projects' }].map((s, i) => (
                <div key={i} className={`p-3 rounded-xl border ${d ? 'bg-white/[0.03] border-indigo-500/20' : 'bg-gray-50 border-gray-100'}`}>
                  <h4 className="text-lg font-bold grad-text">{s.v}</h4>
                  <p className={`text-[9px] font-medium ${d ? 'text-gray-300' : 'text-gray-700'}`}>{s.l}</p>
                  <p className={`text-[8px] ${d ? 'text-gray-500' : 'text-gray-400'}`}>{s.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* EDUCATION & CERTS */}
      <section id="education-certifications" className={`py-12 px-4 scroll-mt-12 ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="reveal">
          <div className="text-center mb-8"><SectionBadge>Credentials</SectionBadge>
          <h2 className="text-xl font-bold text-center mb-6 grad-text">Education & Certifications</h2></div>
          <h3 className="text-sm font-bold mb-4 flex items-center gap-1.5 grad-cool"><GraduationCap size={18} /> Education</h3>
          <div className="space-y-3 mb-6">
            {education.map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border ${d ? 'bg-[#13131f] border-blue-900/40' : 'bg-white border-gray-200'}`}>
                <h4 className={`text-xs font-semibold mb-0.5 ${d ? 'text-white' : 'text-gray-900'}`}>{item.degree}</h4>
                <p className={`text-[10px] ${d ? 'text-gray-400' : 'text-gray-500'}`}>{item.institution}</p>
              </div>
            ))}
          </div>
          <h3 className="text-sm font-bold mb-4 flex items-center gap-1.5 grad-green"><Award size={18} /> Certifications</h3>
          <div className="space-y-3">
            {certifications.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                className={`flex items-center justify-between p-4 rounded-xl border group ${d ? 'bg-[#13131f] border-emerald-900/30 hover:border-emerald-400/50' : 'bg-white border-gray-200 hover:border-emerald-400'}`}>
                <div>
                  <h4 className={`text-xs font-semibold mb-0.5 ${d ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                  <p className={`text-[10px] ${d ? 'text-gray-400' : 'text-gray-500'}`}>{item.issuer}</p>
                </div>
                <ExternalLink size={14} className={`${d ? 'text-gray-600 group-hover:text-emerald-400' : 'text-gray-400 group-hover:text-emerald-500'} transition-colors`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* PROJECTS */}
      <section id="projects" className={`py-12 px-4 scroll-mt-12 ${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="reveal">
          <div className="text-center mb-8"><SectionBadge>Portfolio</SectionBadge>
          <h2 className="text-xl font-bold text-center mb-6 grad-text">My Projects</h2></div>
          <div className="space-y-5">
            {displayed.map(p => <ProjectCard key={p.id} project={p} navigateToPage={navigateToPage} theme={theme} />)}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button onClick={() => setProjPage(i => (i - 1 + totalPages) % totalPages)} className="p-2 rounded-full bg-indigo-600 text-white"><ChevronLeft size={18} /></button>
              <span className={`text-xs font-semibold ${d ? 'text-gray-400' : 'text-gray-600'}`}>{currentProjectPageIndex + 1} / {totalPages}</span>
              <button onClick={() => setProjPage(i => (i + 1) % totalPages)} className="p-2 rounded-full bg-indigo-600 text-white"><ChevronRight size={18} /></button>
            </div>
          )}
        </div>
      </section>

      <div className="section-line" />

      {/* SKILLS */}
      <section id="skills" className={`py-12 px-4 scroll-mt-12 ${d ? 'bg-[#0a0a12]' : 'bg-gray-50'}`}>
        <div className="reveal">
          <div className="text-center mb-8"><SectionBadge>Toolbox</SectionBadge>
          <h2 className="text-xl font-bold text-center mb-6 grad-text">My Skills</h2></div>
          <div className="grid grid-cols-3 gap-3">
            {skills.map((skill, i) => (
              <div key={i} className={`skill-card flex flex-col items-center p-3 rounded-xl border text-center ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                <div className="mb-2">{skill.icon}</div>
                <h3 className={`text-[10px] font-bold mb-0.5 ${d ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
                <p className={`text-[8px] leading-tight ${d ? 'text-gray-500' : 'text-gray-500'}`}>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-line" />

      {/* CONTACT */}
      <section id="contact" className={`py-12 px-4 scroll-mt-12${d ? 'bg-[#0c0c16]' : 'bg-white'}`}>
        <div className="reveal">
          <div className="text-center mb-8"><SectionBadge>Contact</SectionBadge>
          <h2 className="text-xl font-bold text-center mb-6 grad-text">Get in Touch</h2></div>
          <div className={`rounded-2xl p-5 border ${d ? 'bg-[#13131f] border-white/[0.06]' : 'bg-white border-gray-200'} shadow-lg`}>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input type="text" value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Your Name" required
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:ring-2 focus:ring-indigo-500 outline-none ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="your@example.com" required
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:ring-2 focus:ring-indigo-500 outline-none ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
              </div>
              <div>
                <label className={`block text-xs font-semibold mb-1 ${d ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea rows="3" value={contactMessage} onChange={e => setContactMessage(e.target.value)} placeholder="Your message..." required
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:ring-2 focus:ring-indigo-500 outline-none resize-none ${d ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900'}`} />
              </div>
              <button type="submit" disabled={formStatus.type === 'sending'}
                className={`w-full py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold ${formStatus.type === 'sending' ? 'opacity-50' : ''}`}>
                {formStatus.type === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus.message && <p className={`text-center text-xs font-semibold ${formStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{formStatus.message}</p>}
            </form>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            {[{ href: 'https://www.linkedin.com/in/rtejasiddhartha/', icon: <Linkedin size={20} />, c: 'text-blue-400' },
              { href: 'https://github.com/rtejasiddhartha/', icon: <Github size={20} />, c: d ? 'text-gray-300' : 'text-gray-600' },
              { href: 'mailto:rtejasiddhartha18@gmail.com', icon: <Mail size={20} />, c: 'text-rose-400' }
            ].map((s, i) => <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-xl ${d ? 'bg-white/5 border border-white/10' : 'bg-gray-100'} ${s.c}`}>{s.icon}</a>)}
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
      case 'insights': return <InsightsPageMobile theme={theme} navigateToPage={navigateToPage} blogPosts={blogPosts} linkedinPosts={linkedinPosts} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${d ? 'bg-[#0a0a12] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 transition-all duration-300
        ${isScrolled ? `glass shadow-md ${d ? 'bg-[#0a0a12]/85 border-b border-white/[0.04]' : 'bg-white/85 border-b border-gray-100'}` : 'bg-transparent'}`}>
        <div className="flex justify-between items-center">
          <button onClick={() => navigateToPage('home')} className={`text-lg font-bold ${d ? 'text-white' : 'text-gray-900'}`}>
            <span className="grad-text">Sid</span><span className={d ? 'text-gray-400' : 'text-gray-500'}>'s Portfolio</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className={`p-2 rounded-xl ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-600'}`}>
              {d ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMenuOpen(!isMobileMenuOpen)} aria-label="Menu"
              className={`p-2 rounded-xl ${d ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-100 text-gray-600'}`}>
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <nav className={`absolute top-full left-0 w-full z-40 flex flex-col items-center py-6 space-y-4 transition-all duration-300 origin-top
          ${d ? 'bg-[#0a0a12]/95 glass' : 'bg-white/95 glass shadow-lg'}
          ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
          {['hero:Home', 'about:About', 'projects:Projects', 'skills:Skills', 'contact:Contact'].map(item => {
            const [id, label] = item.split(':');
            return <button key={id} onClick={() => scrollToSection(id)} className={`text-sm font-medium ${d ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{label}</button>;
          })}
        </nav>
      </header>

      <main className="pt-12">{renderPage()}</main>

      <footer className={`py-6 px-4 text-center text-[10px] ${d ? 'bg-[#08080e] text-gray-500 border-t border-white/[0.04]' : 'bg-gray-900 text-gray-400'}`}>
        <p>&copy; 2026 Teja Siddhartha Rajam. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppMobile;
