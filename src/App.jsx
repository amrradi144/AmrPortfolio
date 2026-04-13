import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const backToTopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    window.addEventListener('scroll', handleScroll);
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[960px] mx-auto px-6 pb-32">
      {/* NAV */}
      <nav id="mainNav" className={`flex justify-between items-center py-4 border-b border-border sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-brandBg/75 backdrop-blur-lg shadow-2xl py-3' : 'bg-transparent'}`}>
        <a href="#" className="font-disp text-[1.1rem] tracking-[3px] text-gold hover:scale-105 transition-transform">AMR.DEV</a>
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-2 text-[0.6rem] text-green tracking-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-custom"></span> Available
          </div>
          {['about', 'work', 'stack', 'experience', 'resume', 'contact'].map((link) => (
            <a key={link} href={`#${link === 'work' ? 'projects' : link === 'stack' ? 'skills' : link}`} className="text-[0.6rem] tracking-[3px] text-muted uppercase transition-all hover:text-gold relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={toggleMenu} className="flex flex-col gap-1 md:hidden z-[200]">
          <span className={`w-5 h-px bg-text transition-all ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
          <span className={`w-5 h-px bg-text transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-px bg-text transition-all ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
        </button>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 h-screen bg-brandBg/95 backdrop-blur-2xl z-[150] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex justify-between items-center p-6 border-b border-border">
          <span className="font-disp text-[1.1rem] tracking-[3px] text-gold">AMR.DEV</span>
          <button onClick={toggleMenu} className="w-9 h-9 border border-border flex items-center justify-center text-text text-xl font-mono hover:border-gold hover:text-gold transition-all">✕</button>
        </div>
        <div className="flex-1 flex flex-col justify-center px-8 gap-2 overflow-y-auto">
          {[
            { id: 'about', label: 'ABOUT', num: '—' },
            { id: 'projects', label: 'WORK', num: '01' },
            { id: 'skills', label: 'STACK', num: '02' },
            { id: 'experience', label: 'EXPERIENCE', num: '03' },
            { id: 'resume', label: 'RESUME', num: '05' },
            { id: 'contact', label: 'CONTACT', num: '06' }
          ].map((link, idx) => (
            <a key={link.id} href={`#${link.id}`} onClick={toggleMenu} className="flex items-center gap-5 py-2.5 border-b border-border group transition-all hover:pl-2">
              <span className="text-[0.55rem] text-gold tracking-widest min-w-[24px]">{link.num}</span>
              <span className="font-disp text-[1.4rem] tracking-[3px] text-text group-hover:text-gold transition-colors">{link.label}</span>
            </a>
          ))}
        </div>
        <div className="p-8 border-t border-border flex justify-between items-center bg-brandBg/50">
          <div className="flex items-center gap-2 text-[0.55rem] text-green tracking-widest uppercase">
            <span className="w-1 h-1 rounded-full bg-green animate-pulse-custom"></span> Available
          </div>
          <div className="flex gap-6 text-[0.6rem] tracking-widest text-muted uppercase">
            <a href="https://github.com/amrradi144" target="_blank" className="hover:text-gold transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/amr-mohamed-abdul-radi" target="_blank" className="hover:text-gold transition-colors">LINKEDIN</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="py-20 relative">
        <div className="text-[0.62rem] tracking-[5px] text-muted uppercase mb-8 reveal">New Valley, Egypt — Junior Backend Developer</div>
        <h1 className="font-disp text-[clamp(5rem,16vw,11rem)] leading-[0.88] tracking-tight relative">
          <span className="block text-text reveal">AMR</span>
          <span className="block text-transparent text-stroke-gold tracking-[3px] reveal">MOHAMED</span>
          <span className="block text-text font-serif italic text-[clamp(2rem,6vw,4.5rem)] leading-[1.1] mt-2 reveal">Abdul-Radi</span>
        </h1>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 text-right">
          <div className="reveal"><p className="text-[0.65rem] tracking-[2px] text-muted uppercase">Specialization</p><strong className="block text-[0.75rem] text-gold font-normal">.NET Backend</strong></div>
          <div className="reveal"><p className="text-[0.65rem] tracking-[2px] text-muted uppercase">Architecture</p><strong className="block text-[0.75rem] text-gold font-normal">Clean / CQRS</strong></div>
          <div className="reveal"><p className="text-[0.65rem] tracking-[2px] text-muted uppercase">University</p><strong className="block text-[0.75rem] text-gold font-normal">Assiut — CS</strong></div>
        </div>
        <p className="max-w-[480px] font-mono text-[0.78rem] text-muted leading-[1.9] mt-12 border-l-2 border-gold2 pl-5 italic reveal">
          Building production-grade RESTful APIs with Clean Architecture, CQRS patterns, real-time SignalR features, and Redis caching — delivered during a 10-week internship at AZM Squad.
        </p>
        <div className="flex gap-3 mt-10 flex-wrap reveal">
          <a href="mailto:amrmohammedradi@gmail.com" className="text-[0.65rem] tracking-[2px] uppercase px-6 py-2.5 bg-gold text-brandBg font-mono transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(201,168,76,0.3)] relative overflow-hidden group">
            Get in touch
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-500 group-hover:left-full"></span>
          </a>
          <a href="https://github.com/amrradi144" target="_blank" className="text-[0.65rem] tracking-[2px] uppercase px-6 py-2.5 border border-border text-muted font-mono transition-all hover:border-gold2 hover:text-gold hover:-translate-y-0.5">GitHub ↗</a>
          <a href="https://linkedin.com/in/amr-mohamed-abdul-radi" target="_blank" className="text-[0.65rem] tracking-[2px] uppercase px-6 py-2.5 border border-border text-muted font-mono transition-all hover:border-gold2 hover:text-gold hover:-translate-y-0.5">LinkedIn ↗</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mb-20">
        <div className="grid grid-cols-[3px_1fr] gap-8 md:gap-4 reveal">
          <div className="bg-gradient-to-b from-gold via-gold2 to-transparent rounded-[2px]"></div>
          <p className="text-[0.78rem] text-muted leading-[2] italic">
            Junior Backend Developer specializing in <em className="text-gold not-italic">ASP.NET Core</em> with hands-on experience building <strong className="text-text font-medium">RESTful APIs</strong> following <em className="text-gold not-italic">Clean Architecture</em> and <em className="text-gold not-italic">CQRS</em> patterns. Proficient in <strong className="text-text font-medium">C#</strong>, <strong className="text-text font-medium">Entity Framework Core</strong>, <strong className="text-text font-medium">SQL Server</strong>, <strong className="text-text font-medium">JWT authentication</strong>, and real-time features using <em className="text-gold not-italic">SignalR</em>. Completed a 3-month Full-Stack Development internship at <strong className="text-text font-medium">AZM Squad</strong>, delivering two production-grade backend systems. Currently pursuing a <strong className="text-text font-medium">B.Sc. in Computer Science</strong> at <em className="text-gold not-italic">Assiut University</em> (Expected 2028).
          </p>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-border py-3 my-16 group">
        <div className="flex gap-12 whitespace-nowrap animate-tick group-hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-gold">ASP.NET Core</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-muted">Clean Architecture</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-gold">CQRS / MediatR</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-muted">Entity Framework Core</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-gold">SignalR</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-muted">Redis</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-gold">JWT Auth</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-muted">Domain-Driven Design</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-gold">SQL Server</span><span className="text-muted">—</span>
              <span className="text-[0.6rem] tracking-[3px] uppercase text-muted">XUnit</span><span className="text-muted">—</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* PROJECTS */}
      <section id="projects" className="mb-28">
        <div className="flex items-baseline gap-6 mb-12 reveal">
          <span className="text-[0.6rem] text-green tracking-[2px]">01</span>
          <span className="font-disp text-[2.2rem] tracking-[2px]">SELECTED WORK</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border mb-[2px] hover:border-gold2 transition-colors reveal">
          <div className="p-10 border-b md:border-b-0 md:border-right border-border">
            <div className="text-[0.58rem] text-muted tracking-[3px] mb-6">Project — 01 / 2025</div>
            <h3 className="font-disp text-5xl tracking-tight leading-none mb-4">NOVA<em className="font-serif italic text-[1.6rem] block text-gold not-italic">CRM</em></h3>
            <p className="text-[0.75rem] text-muted leading-[1.9]">Enterprise CRM backend with real-time domain event broadcasting, Redis-backed token security, and full observability via Serilog correlation IDs.</p>
          </div>
          <div className="p-10 flex flex-col justify-between">
            <div className="flex flex-col gap-2.5 mb-6">
              {[
                "Real-time SignalR hub — DealWon & CustomerCreated events",
                "Redis JWT revocation + distributed dashboard cache",
                "AutoMapper ProjectTo<T>() — zero N+1 issues",
                "XUnit + NSubstitute + InMemory EF Core"
              ].map(f => (
                <div key={f} className="text-[0.7rem] text-muted py-2 border-b border-border flex gap-2.5 hover:text-text hover:pl-1 transition-all">
                  <span className="text-green flex-shrink-0">//</span> {f}
                </div>
              ))}
            </div>
            <div>
              <div className="flex flex-wrap gap-1 mb-6">
                {['.NET 8', 'Clean Arch', 'DDD', 'CQRS', 'Redis', 'SignalR', 'Serilog', 'XUnit'].map(t => (
                  <span key={t} className="text-[0.55rem] tracking-tighter px-2 py-[2px] border border-border text-muted hover:border-gold2 hover:text-gold transition-all">{t}</span>
                ))}
              </div>
              <a href="https://github.com/amrradi144/NovaCRM" target="_blank" className="text-[0.6rem] tracking-[2px] text-gold uppercase hover:translate-x-1 transition-transform inline-block">View on GitHub →</a>
            </div>
          </div>
        </div>

        <a href="https://github.com/amrradi144/Coursera" target="_blank" className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-8 border border-border p-8 md:px-10 mb-[2px] hover:border-gold2 hover:translate-x-1 transition-all group reveal">
          <div className="font-disp text-[3.5rem] text-border leading-none transition-colors group-hover:text-gold2 hidden md:block">02</div>
          <div>
            <h3 className="font-disp text-[1.6rem] tracking-tight mb-1">BYWAY API</h3>
            <p className="text-[0.7rem] text-muted leading-[1.6] mb-3 max-w-xl">Full LMS backend — courses, instructors, cart & checkout with JWT RBAC and consistent ApiResponse&lt;T&gt; error handling.</p>
            <div className="flex flex-wrap gap-1.5">
               {['.NET 8', 'EF Core', 'MediatR', 'JWT', 'Swagger', 'SQL Server'].map(t => (
                  <span key={t} className="text-[0.55rem] tracking-tighter px-2 py-[2px] border border-border text-muted">{t}</span>
                ))}
            </div>
          </div>
          <span className="font-disp text-[2rem] text-muted transition-all group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mb-28">
        <div className="flex items-baseline gap-6 mb-12 reveal">
          <span className="text-[0.6rem] text-green tracking-[2px]">02</span>
          <span className="font-disp text-[2.2rem] tracking-[2px]">TECH STACK</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>
        <div className="border border-border reveal">
          <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_1fr] px-6 py-2.5 bg-s2 border-b border-border text-[0.55rem] tracking-[3px] text-muted uppercase">
            <span>Method</span><span>Skill</span><span className="text-right hidden md:block">Level</span>
          </div>
          <div className="flex flex-col">
            {[
              { m: 'GET', p: '/skills/asp-net-core', lvl: 'Production-ready', type: 'get' },
              { m: 'GET', p: '/skills/c-sharp', lvl: 'Production-ready', type: 'get' },
              { m: 'GET', p: '/skills/entity-framework-core', lvl: 'Advanced', type: 'get' },
              { m: 'POST', p: '/arch/clean-architecture', lvl: 'Advanced', type: 'post' },
              { m: 'POST', p: '/arch/cqrs-mediatr', lvl: 'Advanced', type: 'post' },
              { m: 'POST', p: '/arch/domain-driven-design', lvl: 'Intermediate', type: 'post' },
              { m: 'PUT', p: '/infra/redis-caching', lvl: 'Intermediate', type: 'put' },
              { m: 'PUT', p: '/infra/signalr-realtime', lvl: 'Intermediate', type: 'put' },
              { m: 'PUT', p: '/infra/jwt-authentication', lvl: 'Advanced', type: 'put' },
              { m: 'GET', p: '/tools/sql-server', lvl: 'Advanced', type: 'get' },
              { m: 'GET', p: '/tools/xunit-nsubstitute', lvl: 'Intermediate', type: 'get' },
              { m: 'GET', p: '/tools/serilog-swagger', lvl: 'Intermediate', type: 'get' },
            ].map((s, i) => (
              <div key={i} className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_1fr] items-center px-6 py-3.5 border-b border-border last:border-b-0 hover:bg-s1 hover:translate-x-1 transition-all reveal">
                <span className={`text-[0.58rem] font-medium tracking-widest px-2 py-[2px] text-center border mr-4 ${s.type === 'get' ? 'bg-green/10 text-green border-green/20' : s.type === 'post' ? 'bg-gold/10 text-gold border-gold/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'}`}>{s.m}</span>
                <span className="text-[0.72rem] text-text font-mono truncate">{s.p.split('/').map((part, pi) => pi === 2 ? <span key={pi} className="text-gold">/{part}</span> : part)}</span>
                <span className="text-[0.65rem] text-muted text-right hidden md:block">{s.lvl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mb-28">
        <div className="flex items-baseline gap-6 mb-12 reveal">
          <span className="text-[0.6rem] text-green tracking-[2px]">03</span>
          <span className="font-disp text-[2.2rem] tracking-[2px]">EXPERIENCE</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_2fr] group reveal">
          <div className="p-8 md:pl-0">
            <div className="font-disp text-[3rem] md:text-[4rem] text-border leading-none transition-colors group-hover:text-gold2">2025</div>
            <div className="text-[0.65rem] tracking-[2px] text-gold mt-2 uppercase">AZM Squad</div>
            <div className="text-[0.6rem] text-muted mt-1 tracking-widest">Jul — Oct · 10 Weeks</div>
          </div>
          <div className="bg-border relative hidden md:block">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 border-gold bg-brandBg"></div>
          </div>
          <div className="p-8 md:pr-0">
            <div className="font-disp text-[2rem] tracking-tight mb-6">BACKEND INTERN</div>
            <div className="flex flex-col gap-3">
              {[
                "Completed 10-week Full-Stack program — built two production APIs",
                "Applied Clean Architecture, CQRS with MediatR, and DDD",
                "Implemented JWT with refresh tokens and Redis blacklisting",
                "Integrated SignalR real-time hubs and Redis caching",
                "Optimized AutoMapper projections and EF Core modeling"
              ].map(b => (
                <div key={b} className="text-[0.73rem] text-muted leading-relaxed flex gap-3 hover:text-text hover:translate-x-1 transition-all reveal">
                  <span className="text-green flex-shrink-0">→</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="mb-28">
        <div className="flex items-baseline gap-6 mb-12 reveal">
          <span className="text-[0.6rem] text-green tracking-[2px]">04</span>
          <span className="font-disp text-[2.2rem] tracking-[2px]">EDUCATION</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>
        <div className="border border-border p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 hover:border-gold2 transition-all reveal">
          <div className="w-12 h-12 border border-gold2 flex items-center justify-center text-2xl">🎓</div>
          <div className="flex flex-col gap-2">
            <div className="font-disp text-2xl md:text-3xl tracking-tight leading-none uppercase">B.SC. COMPUTER SCIENCE & INFORMATION</div>
            <div className="text-[0.7rem] text-gold tracking-widest">Faculty of Computers and Information, Assiut University</div>
            <div className="flex gap-8 flex-wrap mt-1">
              {[
                { l: 'Status', v: 'Currently 2nd Year' },
                { l: 'Expected Graduation', v: '2028' },
                { l: 'Location', v: 'Assiut, Egypt' }
              ].map(d => (
                <div key={d.l} className="flex flex-col">
                  <span className="text-[0.5rem] tracking-[3px] text-muted uppercase">{d.l}</span>
                  <span className="text-[0.72rem] text-text">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="mb-28">
        <div className="flex items-baseline gap-6 mb-12 reveal">
          <span className="text-[0.6rem] text-green tracking-[2px]">05</span>
          <span className="font-disp text-[2.2rem] tracking-[2px]">RESUME</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>
        <div className="border border-border overflow-hidden hover:border-gold2 transition-all reveal">
          <iframe className="w-full h-[400px] md:h-[600px] border-none bg-s1" src="https://drive.google.com/file/d/1w3_89KNrsQEjAOu-suCfgfQiKxf7xcyi/preview" allow="autoplay" loading="lazy"></iframe>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:px-8 bg-s2 border-t border-border gap-4">
            <div className="flex flex-col">
              <span className="text-[0.55rem] tracking-[4px] text-muted uppercase">Document</span>
              <span className="text-[0.8rem] text-text">Amr Mohamed — Backend Developer CV</span>
            </div>
            <div className="flex gap-2.5 w-full md:w-auto">
              <a href="https://drive.google.com/file/d/1w3_89KNrsQEjAOu-suCfgfQiKxf7xcyi/view?usp=drive_link" target="_blank" className="flex-1 md:flex-none text-[0.6rem] tracking-[2px] uppercase px-5 py-2.5 border border-gold2 text-gold flex items-center justify-center gap-2 hover:bg-gold hover:text-brandBg hover:-translate-y-0.5 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                View Full
              </a>
              <a href="https://drive.google.com/uc?export=download&id=1w3_89KNrsQEjAOu-suCfgfQiKxf7xcyi" target="_blank" className="flex-1 md:flex-none text-[0.6rem] tracking-[2px] uppercase px-5 py-2.5 border border-gold2 text-gold flex items-center justify-center gap-2 hover:bg-gold hover:text-brandBg hover:-translate-y-0.5 transition-all">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                Download
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="flex items-baseline gap-6 mb-12 reveal">
          <span className="text-[0.6rem] text-green tracking-[2px]">06</span>
          <span className="font-disp text-[2.2rem] tracking-[2px]">CONTACT</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>
        <div className="p-12 border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-[2px] hover:border-gold2 transition-all reveal">
          <div className="font-disp text-[clamp(2rem,5vw,3.5rem)] tracking-widest leading-none">OPEN TO<br/><span className="text-gold">OPPORTUNITIES</span></div>
          <div className="flex flex-col gap-2">
            <p className="text-[0.65rem] text-muted tracking-tight">Junior backend roles · Internships · Freelance APIs</p>
            <a href="mailto:amrmohammedradi@gmail.com" className="text-[0.65rem] tracking-[2px] uppercase px-6 py-2.5 bg-gold text-brandBg font-mono hover:-translate-y-0.5 transition-all text-center">Send a message →</a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
          {[
            { l: 'Email', v: 'amrmohammedradi@gmail.com', h: 'mailto:amrmohammedradi@gmail.com' },
            { l: 'Phone', v: '+20 109 842 3855', h: 'tel:+201098423855' },
            { l: 'GitHub', v: 'github.com/amrradi144', h: 'https://github.com/amrradi144' },
            { l: 'LinkedIn', v: 'linkedin.com/in/amr-mohamed-abdul-radi', h: 'https://linkedin.com/in/amr-mohamed-abdul-radi' }
          ].map(c => (
            <a key={c.l} href={c.h} target={c.h.startsWith('http') ? '_blank' : ''} className="p-8 border border-border flex flex-col gap-4 hover:bg-s1 hover:border-gold2 hover:-translate-y-0.5 transition-all reveal">
              <span className="text-[0.55rem] tracking-[4px] text-muted uppercase">{c.l}</span>
              <span className="text-[0.85rem] text-text hover:text-gold transition-colors">{c.v}</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-20 pt-8 border-t border-border flex justify-between items-center reveal">
        <span className="text-[0.58rem] tracking-[2px] text-muted uppercase">© 2026 — AMR MOHAMED ABDUL-RADI</span>
        <span className="text-[0.58rem] tracking-[2px] text-muted uppercase">New Valley · EGYPT</span>
      </footer>

      {/* BACK TO TOP */}
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 w-10 h-10 bg-s2 border border-border text-gold flex items-center justify-center font-disp text-xl cursor-pointer z-90 transition-all hover:bg-gold hover:text-brandBg hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(201,168,76,0.3)] ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>↑</button>
    </div>
  );
};

export default App;
