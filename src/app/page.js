'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicked, setCursorClicked] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalTab, setModalTab] = useState('preview');
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = () => setCursorClicked(true);
    const handleMouseUp = () => setCursorClicked(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'expertise', 'tools', 'certifications', 'contact'];
      let current = 'home';

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = sectionId;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#tools', label: 'Tools' },
    { href: '#certifications', label: 'Certifications' }
  ];

  const figmaProjects = [
    {
      title: 'Uber App Clone',
      description: 'A complete redesign of the Uber mobile app experience, focusing on improved navigation, cleaner interface, and enhanced user flow for booking rides.',
      category: 'UI Design',
      tags: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
      image: '/uber.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/uber-app-clone'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Modern analytics dashboard with data visualization, real-time metrics, and intuitive controls. Designed for optimal data presentation and user interaction.',
      category: 'Dashboard Design',
      tags: ['Figma', 'Data Viz', 'Web Design', 'Charts'],
      image: '/dashboard.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/analytics-dashboard'
    },
    {
      title: 'Snapdeal Clone',
      description: 'Complete e-commerce redesign of Snapdeal with modern UI patterns, improved product discovery, streamlined checkout flow, and enhanced mobile shopping experience for better conversions.',
      category: 'UI Design',
      tags: ['Figma', 'E-commerce', 'Mobile First', 'User Flow'],
      image: '/snapdeal.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/snapdeal-clone'
    }
  ];

  const developmentProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application built with Next.js and React, featuring product management, shopping cart, checkout flow, and payment integration with Stripe.',
      category: 'Full Stack Development',
      tags: ['Next.js', 'React', 'Node.js', 'Stripe API'],
      image: '/ecommerce-dev.png',
      liveUrl: 'https://example-ecommerce.vercel.app',
      repoUrl: 'https://github.com/yourusername/ecommerce-platform'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface built with modern web technologies.',
      category: 'Web Application',
      tags: ['React', 'Tailwind CSS', 'Firebase', 'Real-time'],
      image: '/task-app.png',
      liveUrl: 'https://example-taskapp.vercel.app',
      repoUrl: 'https://github.com/yourusername/task-management-app'
    }
  ];

  const openFigmaModal = (project) => {
    setModalData({ type: 'figma', url: project.figmaUrl, title: project.title });
    setModalTab('figma');
  };

  const openDevModal = (project) => {
    setModalData({ type: 'dev', liveUrl: project.liveUrl, repoUrl: project.repoUrl, title: project.title });
    setModalTab('preview');
  };

  const learningPath = [
    { name: 'JavaScript ES6+', icon: 'fab fa-js', status: 'In Progress' },
    { name: 'React.js', icon: 'fab fa-react', status: 'In Progress' },
    { name: 'Next.js', icon: 'fas fa-code', status: 'In Progress' },
    { name: 'Node.js', icon: 'fab fa-node-js', status: 'In Progress' }
  ];

  const tools = [
    { name: 'Figma', icon: 'fab fa-figma', level: 'Expert' },
    { name: 'HTML', icon: 'fab fa-html5', level: 'Advanced' },
    { name: 'CSS', icon: 'fab fa-css3-alt', level: 'Advanced' },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', level: 'Advanced' },
    { name: 'JavaScript', icon: 'fab fa-js', level: 'Advanced' },
    { name: 'React.js', icon: 'fab fa-react', level: 'Intermediate' },
    { name: 'Next.js', icon: 'fas fa-code', level: 'Intermediate' },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 'Intermediate' },
    { name: 'MongoDB', icon: 'fas fa-database', level: 'Intermediate' },
    { name: 'Git', icon: 'fab fa-git-alt', level: 'Advanced' },
    { name: 'GitHub', icon: 'fab fa-github', level: 'Advanced' },
    { name: 'WordPress', icon: 'fab fa-wordpress', level: 'Intermediate' }
  ];

  const certifications = [
    {
      title: 'UI/UX Design Specialization',
      issuer: 'Coursera',
      date: 'January 2025',
      icon: 'fas fa-certificate',
      color: 'cyan'
    },
    {
      title: 'Machine Learning Fundamentals',
      issuer: 'Google AI',
      date: 'December 2024',
      icon: 'fas fa-brain',
      color: 'violet'
    },
    {
      title: 'Advanced Figma Design',
      issuer: 'Figma Academy',
      date: 'November 2024',
      icon: 'fab fa-figma',
      color: 'cyan'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: 'October 2024',
      icon: 'fas fa-code',
      color: 'amber'
    }
  ];

  const contactCards = [
    {
      title: 'Email',
      icon: 'fas fa-envelope',
      description: 'Send me an email and I\'ll get back to you as soon as possible.',
      link: 'mailto:obaidullahshaikh07@gmail.com',
      linkText: 'Send Email',
      external: false
    },
    {
      title: 'LinkedIn',
      icon: 'fab fa-linkedin',
      description: 'Connect with me professionally and see my career journey.',
      link: 'https://www.instagram.com/ubaidxsk?igsh=dzM2cDJwNTZ1OHZi',
      linkText: 'Visit Profile',
      external: true
    },
    {
      title: 'GitHub',
      icon: 'fab fa-github',
      description: 'Check out my code, projects, and open-source contributions.',
      link: 'https://github.com/obaid16',
      linkText: 'View Projects',
      external: true
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        className={`fixed w-4 h-4 rounded-full bg-cyan-600 pointer-events-none z-[10000] mix-blend-multiply transition-all duration-150 ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        } ${cursorClicked ? 'scale-75' : 'scale-100'}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorClicked ? 0.8 : 1})`
        }}
      />

      {/* Background Orbs */}
      <div className="fixed w-[700px] h-[700px] rounded-full blur-[120px] opacity-10 pointer-events-none top-[-300px] right-[-200px] bg-gradient-to-br from-cyan-600 to-violet-600 animate-[orbFloat_25s_ease-in-out_infinite]" />
      <div className="fixed w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 pointer-events-none bottom-[-200px] left-[-150px] bg-gradient-to-br from-violet-600 to-amber-500 animate-[orbFloat_25s_ease-in-out_8s_infinite]" />
      <div className="fixed w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none top-[40%] left-[40%] bg-gradient-to-br from-cyan-400 to-cyan-700 animate-[orbFloat_25s_ease-in-out_16s_infinite]" />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[linear-gradient(rgba(8,145,178,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(8,145,178,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full px-[5%] py-5 flex justify-between items-center z-[1000] bg-white/80 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-gray-200 transition-all duration-300 shadow-sm">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-3 text-gray-900 no-underline group"
        >
          <div className="w-[38px] h-[38px] bg-gradient-to-br from-cyan-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-extrabold text-[0.95rem] relative overflow-hidden shadow-lg shadow-cyan-600/20">
            <span>OS</span>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
          </div>
          <span className="text-[1.05rem] font-bold">Obaidullah Shaikh</span>
        </a>

        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 rounded ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 rounded ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 rounded ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>

        <ul className={`flex gap-10 list-none items-center ${menuOpen ? 'flex-col absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl py-6 shadow-lg' : 'hidden md:flex'}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-[0.95rem] font-medium transition-all duration-200 relative no-underline ${
                  activeSection === item.href.substring(1)
                    ? 'text-cyan-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-7 py-[0.65rem] bg-gradient-to-br from-cyan-600 to-cyan-700 text-white rounded-xl font-semibold transition-all duration-200 hover:from-cyan-400 hover:to-cyan-600 hover:-translate-y-0.5 shadow-lg shadow-cyan-600/30 hover:shadow-xl hover:shadow-cyan-600/40 no-underline"
            >
              Contact Me
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-[5%] relative z-10">
        <div className="max-w-[1280px] mx-auto w-full pt-24 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Profile Photo */}
          <div className="order-first lg:order-last flex justify-center animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
            <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px]">
              <div className="absolute w-20 h-20 rounded-full blur-[30px] opacity-30 bg-cyan-600 top-[-20px] right-[-20px] animate-[floatDecor_4s_ease-in-out_infinite]" />
              <div className="absolute w-20 h-20 rounded-full blur-[30px] opacity-30 bg-violet-600 bottom-[-20px] left-[-20px] animate-[floatDecor_4s_ease-in-out_2s_infinite]" />
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl relative bg-gradient-to-br from-gray-100 to-gray-200 group">
                <Image
                  src="/360_F_695718337_03TsVxi6J94pn59UAqECYw9ttFKb1ty3.webp"
                  alt="Obaidullah Shaikh"
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-[-4px] rounded-full p-1 bg-gradient-to-br from-cyan-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-[720px]">
            <div className="flex gap-4 mb-10 flex-wrap animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
              <div className="inline-flex items-center gap-[0.6rem] px-5 py-[0.6rem] rounded-full text-sm font-semibold transition-all duration-300 bg-cyan-600/10 border-[1.5px] border-cyan-600/30 text-cyan-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-600/20 hover:border-cyan-600">
                <div className="w-5 h-5 bg-gradient-to-br from-cyan-600 to-violet-600 rounded flex items-center justify-center text-white text-[0.7rem] font-bold">
                  <i className="fab fa-figma" />
                </div>
                <span>Figma UI/UX Designer</span>
              </div>
              <div className="inline-flex items-center gap-[0.6rem] px-5 py-[0.6rem] rounded-full text-sm font-semibold transition-all duration-300 bg-violet-600/10 border-[1.5px] border-violet-600/30 text-violet-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/20 hover:border-violet-600">
                <div className="w-5 h-5 bg-gradient-to-br from-cyan-600 to-violet-600 rounded flex items-center justify-center text-white text-[0.7rem] font-bold">
                  <i className="fas fa-robot" />
                </div>
                <span>AI/ML Student</span>
              </div>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] tracking-[-0.03em] mb-8 animate-[fadeInUp_0.8s_ease_0.4s_backwards] text-gray-900">
              Designing{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-cyan-400 to-violet-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_4s_ease_infinite]">
                intelligent
              </span>
              <br />
              experiences with AI
            </h1>

            <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-600 mb-12 leading-[1.75] font-normal animate-[fadeInUp_0.8s_ease_0.6s_backwards]">
              I&apos;m a Figma specialist who combines the power of AI/ML with user-centered design
              to create beautiful, intelligent interfaces. Currently mastering modern web technologies
              while crafting exceptional user experiences.
            </p>

            <div className="flex gap-5 flex-wrap animate-[fadeInUp_0.8s_ease_1s_backwards]">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="px-10 py-[1.1rem] no-underline rounded-xl font-bold text-base transition-all duration-200 inline-flex items-center gap-[0.6rem] cursor-pointer bg-gradient-to-br from-cyan-600 to-violet-600 text-white shadow-lg shadow-cyan-600/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-600/40"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-10 py-[1.1rem] no-underline rounded-xl font-bold text-base transition-all duration-200 inline-flex items-center gap-[0.6rem] cursor-pointer bg-white text-gray-900 border-[1.5px] border-gray-200 shadow-sm hover:border-cyan-600/50 hover:-translate-y-1 hover:shadow-md hover:bg-cyan-600/5"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-[5%] relative z-10 bg-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-400/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_2s_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl animate-[float_7s_ease-in-out_4s_infinite]"></div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="mb-14 text-center animate-[fadeInUp_0.8s_ease_backwards]">
            <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4">
              About Me
            </div>
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900">
              Who I Am
            </h2>
            <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75]">
              A passionate designer and developer bridging creativity with technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image/Visual */}
            <div className="relative animate-[fadeInLeft_1s_ease_0.2s_backwards]">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-violet-600/20 rounded-[30px] blur-3xl animate-[pulse_3s_ease-in-out_infinite]"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-[30px] p-12 border-[1.5px] border-gray-200 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 animate-[slideInRight_0.8s_ease_0.4s_backwards]">
                      <div className="w-14 h-14 bg-cyan-600/10 rounded-xl flex items-center justify-center text-2xl animate-[bounce_2s_ease-in-out_infinite]">
                        <i className="fas fa-palette text-cyan-600"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">Creative Designer</h4>
                        <p className="text-gray-600 text-sm">Crafting beautiful experiences</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 animate-[slideInRight_0.8s_ease_0.6s_backwards]">
                      <div className="w-14 h-14 bg-violet-600/10 rounded-xl flex items-center justify-center text-2xl animate-[bounce_2s_ease-in-out_0.5s_infinite]">
                        <i className="fas fa-code text-violet-600"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">Full-Stack Developer</h4>
                        <p className="text-gray-600 text-sm">Building modern web applications</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 animate-[slideInRight_0.8s_ease_0.8s_backwards]">
                      <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-2xl animate-[bounce_2s_ease-in-out_1s_infinite]">
                        <i className="fas fa-brain text-amber-500"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">AI Enthusiast</h4>
                        <p className="text-gray-600 text-sm">Exploring machine learning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8 animate-[fadeInRight_1s_ease_0.2s_backwards]">
              <div>
                <h3 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-[-0.02em] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
                  Bringing Ideas to Life Through Design & Code
                </h3>
                <div className="space-y-4 text-gray-600 text-lg leading-[1.8]">
                  <p className="animate-[fadeInUp_0.8s_ease_0.5s_backwards]">
                    Hello! I'm <span className="font-bold text-gray-900">Obaidullah Shaikh</span>, 
                    a UI/UX designer and full-stack developer passionate about creating 
                    meaningful digital experiences that combine beautiful design with powerful functionality.
                  </p>
                  <p className="animate-[fadeInUp_0.8s_ease_0.6s_backwards]">
                    With expertise in <span className="font-semibold text-cyan-600">Figma</span>, I craft 
                    pixel-perfect interfaces and design systems. My development skills span across modern 
                    web technologies including <span className="font-semibold text-cyan-600">React</span>, 
                    <span className="font-semibold text-cyan-600"> Next.js</span>, and 
                    <span className="font-semibold text-cyan-600"> Node.js</span>, allowing me to bring 
                    designs to life with clean, efficient code.
                  </p>
                  <p className="animate-[fadeInUp_0.8s_ease_0.7s_backwards]">
                    Currently, I'm diving deep into <span className="font-semibold text-violet-600">
                    Artificial Intelligence and Machine Learning</span>, exploring how AI can enhance 
                    user experiences and create smarter, more intuitive applications.
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 animate-[fadeInUp_0.8s_ease_0.8s_backwards]">
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-black text-cyan-600 mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Projects</div>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-black text-violet-600 mb-2 group-hover:scale-110 transition-transform duration-300">12+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Technologies</div>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl font-black text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300">4</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Certifications</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-4 animate-[fadeInUp_0.8s_ease_0.9s_backwards]">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="px-8 py-4 bg-gradient-to-br from-cyan-600 to-violet-600 text-white rounded-xl font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-600/40 no-underline inline-flex items-center gap-2 group"
                >
                  Let's Work Together
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
                </a>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="px-8 py-4 bg-white border-[1.5px] border-gray-200 text-gray-900 rounded-xl font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-cyan-600/50 hover:bg-cyan-600/5 no-underline inline-flex items-center gap-2"
                >
                  View Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-[5%] relative z-10 bg-white overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-400/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_2s_infinite]"></div>
        
        <div className="max-w-[1280px] mx-auto mb-14 text-center relative">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4 animate-[fadeInUp_0.6s_ease_backwards]">
            My Work
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900 animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
            A showcase of my design work in Figma and development projects using modern web technologies.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          {/* Figma Projects */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3 animate-[fadeInUp_0.8s_ease_0.6s_backwards]">
              <div className="w-10 h-10 bg-cyan-600/10 rounded-lg flex items-center justify-center">
                <i className="fab fa-figma text-cyan-600 text-xl" />
              </div>
              Figma Design Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {figmaProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white border-[1.5px] border-gray-200 rounded-3xl overflow-hidden transition-all duration-[400ms] hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 animate-[scaleIn_0.8s_ease_backwards]"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div 
                    className="w-full h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group cursor-pointer"
                    onClick={() => openFigmaModal(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-400 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50 flex items-center gap-2 animate-[pulse_2s_ease-in-out_infinite]">
                        <i className="fas fa-external-link-alt"></i>
                        Open Figma
                      </span>
                    </div>
                  </div>
                  <div className="p-9">
                    <span className="inline-block px-4 py-[0.4rem] bg-cyan-600/10 border border-cyan-600/30 rounded-full text-xs font-bold text-cyan-600 uppercase tracking-wide mb-5">
                      {project.category}
                    </span>
                    <h3 className="text-[1.65rem] font-extrabold mb-4 tracking-[-0.02em] text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-[1.7] mb-7 text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-[0.6rem]">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-[0.45rem] bg-gray-100 border border-gray-200 rounded-full text-[0.825rem] font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-600 hover:text-cyan-600 hover:bg-cyan-600/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Projects */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3 animate-[fadeInUp_0.8s_ease_1.1s_backwards]">
              <div className="w-10 h-10 bg-violet-600/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-violet-600 text-xl" />
              </div>
              Development Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {developmentProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white border-[1.5px] border-gray-200 rounded-3xl overflow-hidden transition-all duration-[400ms] hover:-translate-y-3 hover:shadow-2xl hover:border-violet-600/50 animate-[scaleIn_0.8s_ease_backwards]"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <div 
                    className="w-full h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group cursor-pointer"
                    onClick={() => openDevModal(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-400 group-hover:scale-110 group-hover:rotate-2"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50 flex items-center gap-2 animate-[pulse_2s_ease-in-out_infinite]">
                        <i className="fas fa-external-link-alt"></i>
                        Open Project
                      </span>
                    </div>
                  </div>
                  <div className="p-9">
                    <span className="inline-block px-4 py-[0.4rem] bg-violet-600/10 border border-violet-600/30 rounded-full text-xs font-bold text-violet-600 uppercase tracking-wide mb-5">
                      {project.category}
                    </span>
                    <h3 className="text-[1.65rem] font-extrabold mb-4 tracking-[-0.02em] text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-[1.7] mb-7 text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-[0.6rem]">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-[0.45rem] bg-gray-100 border border-gray-200 rounded-full text-[0.825rem] font-semibold text-gray-700 transition-all duration-200 hover:border-violet-600 hover:text-violet-600 hover:bg-violet-600/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Figma embeds and Dev previews */}
      {modalData && (
        <div
          className="fixed inset-0 bg-black/90 z-[10001] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease]"
          onClick={() => setModalData(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-200 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); setModalData(null); }}
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="max-w-[95vw] max-h-[95vh] w-full md:w-[1100px] relative bg-transparent">
            <h3 className="text-white text-2xl font-bold mb-4 text-center">{modalData.title}</h3>

            {/* Figma Embed */}
            {modalData.type === 'figma' && (
              <div className="w-full h-[75vh] rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={"https://www.figma.com/embed?embed_host=share&url=" + encodeURIComponent(modalData.url)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  onClick={(e) => e.stopPropagation()}
                  title={modalData.title}
                />
              </div>
            )}

            {/* Development preview / code */}
            {modalData.type === 'dev' && (
              <div className="w-full h-[75vh] rounded-lg overflow-hidden shadow-2xl bg-white p-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold ${modalTab === 'preview' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={(e) => { e.stopPropagation(); setModalTab('preview'); }}
                  >
                    Preview
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold ${modalTab === 'code' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={(e) => { e.stopPropagation(); setModalTab('code'); }}
                  >
                    Code
                  </button>
                </div>

                <div className="w-full h-[calc(100% - 64px)]">
                  {modalTab === 'preview' ? (
                    modalData.liveUrl ? (
                      <iframe
                        src={modalData.liveUrl}
                        className="w-full h-full border-0"
                        title={modalData.title + ' - Preview'}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">No live preview URL provided.</div>
                    )
                  ) : (
                    modalData.repoUrl ? (
                      <div className="w-full h-full overflow-auto p-4">
                        <a
                          href={modalData.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-600 font-bold break-all"
                        >
                          {modalData.repoUrl}
                        </a>
                        <div className="mt-4 text-sm text-gray-700">Open the repository in a new tab to view the source code.</div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">No repository link provided.</div>
                    )
                  )}
                </div>
              </div>
            )}

            <p className="text-white/70 text-sm text-center mt-4">Click outside to close</p>
          </div>
        </div>
      )}

      {/* Expertise Section */}
      <section id="expertise" className="py-20 px-[5%] relative z-10 bg-gray-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/5 to-violet-400/5 rounded-full blur-3xl animate-[float_9s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-gradient-to-br from-violet-400/5 to-amber-400/5 rounded-full blur-3xl animate-[float_11s_ease-in-out_3s_infinite]"></div>
        
        <div className="max-w-[1280px] mx-auto mb-14 text-center relative">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4 animate-[fadeInUp_0.6s_ease_backwards]">
            What I Do
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900 animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
            My Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
            Bridging design and technology to create intelligent, user-friendly experiences.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* UI/UX Design */}
            <div className="bg-white border-[1.5px] border-gray-200 rounded-3xl p-12 transition-all duration-[400ms] relative overflow-hidden group hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 animate-[fadeInLeft_1s_ease_0.6s_backwards]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-violet-600 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
              <div className="w-[72px] h-[72px] bg-cyan-600/10 rounded-[18px] flex items-center justify-center mb-8 text-[2.5rem] border border-cyan-600/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <i className="fab fa-figma text-cyan-600" />
              </div>
              <h3 className="text-[1.75rem] font-extrabold mb-5 tracking-[-0.02em] text-gray-900">
                Figma UI/UX Design
              </h3>
              <p className="text-gray-600 leading-[1.75] mb-8 text-[1.05rem]">
                Expert in creating beautiful, intuitive interfaces using Figma. I design
                comprehensive design systems, interactive prototypes, and pixel-perfect UI
                components. My designs are user-centered, accessible, and optimized for
                seamless development handoff.
              </p>
              <div className="flex flex-wrap gap-[0.7rem]">
                {['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Wireframing', 'Interaction Design'].map((tag) => (
                  <span
                    key={tag}
                    className="px-[1.1rem] py-2 bg-cyan-600/10 border border-cyan-600/30 rounded-full text-[0.85rem] font-semibold text-cyan-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AI & ML */}
            <div className="bg-white border-[1.5px] border-gray-200 rounded-3xl p-12 transition-all duration-[400ms] relative overflow-hidden group hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 animate-[fadeInRight_1s_ease_0.6s_backwards]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-violet-600 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
              <div className="w-[72px] h-[72px] bg-violet-600/10 rounded-[18px] flex items-center justify-center mb-8 text-[2.5rem] border border-violet-600/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <i className="fas fa-brain text-violet-600" />
              </div>
              <h3 className="text-[1.75rem] font-extrabold mb-5 tracking-[-0.02em] text-gray-900">
                Artificial Intelligence & Machine Learning
              </h3>
              <p className="text-gray-600 leading-[1.75] mb-8 text-[1.05rem]">
                Passionate about artificial intelligence and machine learning. I build
                intelligent systems that learn from data and solve real-world problems.
                Currently exploring how AI can enhance user experiences and create smarter,
                more adaptive interfaces.
              </p>
              <div className="flex flex-wrap gap-[0.7rem]">
                {['Machine Learning', 'Neural Networks', 'Data Science', 'NLP', 'Computer Vision', 'AI/UX'].map((tag) => (
                  <span
                    key={tag}
                    className="px-[1.1rem] py-2 bg-violet-600/10 border border-violet-600/30 rounded-full text-[0.85rem] font-semibold text-violet-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="max-w-[1280px] mt-10 bg-white border-[1.5px] border-gray-200 rounded-3xl p-12 shadow-sm animate-[fadeInUp_1s_ease_0.8s_backwards]">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-400 rounded-[14px] flex items-center justify-center text-[2rem] shadow-lg shadow-amber-500/20 animate-[bounce_2s_ease-in-out_infinite]">
                <i className="fas fa-book text-white" />
              </div>
              <h3 className="text-[1.85rem] font-extrabold tracking-[-0.02em] text-gray-900">
                Currently Learning
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningPath.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 p-6 bg-gray-50 border-[1.5px] border-gray-200 rounded-2xl transition-all duration-300 hover:translate-x-2 hover:border-amber-500 hover:shadow-md hover:bg-amber-500/5 animate-[slideInRight_0.8s_ease_backwards]"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className="w-[52px] h-[52px] bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-[1.75rem] flex-shrink-0">
                    <i className={item.icon + ' text-amber-500'} />
                  </div>
                  <div>
                    <h4 className="text-[1.05rem] font-bold mb-1 text-gray-900">{item.name}</h4>
                    <p className="text-sm text-amber-500 font-semibold">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-[5%] relative z-10 bg-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
        
        <div className="max-w-[1280px] mx-auto mb-14 text-center relative">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4 animate-[fadeInUp_0.6s_ease_backwards]">
            My Toolbox
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900 animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
            Tools & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
            The tools I use to design and build exceptional experiences.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="bg-gray-50 rounded-[28px] p-14 border-[1.5px] border-gray-200 animate-[scaleIn_0.8s_ease_0.6s_backwards]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12 mt-12">
              {tools.map((tool, index) => (
                <div key={index} className="text-center transition-all duration-300 animate-[fadeInUp_0.6s_ease_backwards]" style={{ animationDelay: `${0.7 + index * 0.05}s` }}>
                  <div className="w-[88px] h-[88px] mx-auto mb-6 bg-white border-[1.5px] border-gray-200 rounded-[20px] flex items-center justify-center text-5xl shadow-sm transition-all duration-300 hover:-translate-y-2.5 hover:shadow-xl hover:border-cyan-600/50 hover:bg-cyan-600/5 hover:rotate-6">
                    <i className={tool.icon + ' text-cyan-600'} />
                  </div>
                  <div className="font-bold text-gray-900 mb-2 text-[1.05rem]">{tool.name}</div>
                  <div className="text-[0.9rem] text-gray-600 font-medium">{tool.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-[5%] relative z-10 bg-gray-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-400/5 to-cyan-400/5 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
        
        <div className="max-w-[1280px] mx-auto mb-14 text-center relative">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4 animate-[fadeInUp_0.6s_ease_backwards]">
            Achievements
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900 animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
            Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
            Professional certifications and courses I've completed to enhance my skills.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white border-[1.5px] border-gray-200 rounded-3xl p-8 transition-all duration-[400ms] relative overflow-hidden group hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 animate-[scaleIn_0.8s_ease_backwards]"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                  cert.color === 'cyan' ? 'from-cyan-600 to-cyan-400' :
                  cert.color === 'violet' ? 'from-violet-600 to-violet-400' :
                  'from-amber-500 to-amber-400'
                } scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100`} />
                
                <div className={`w-16 h-16 mx-auto mb-6 ${
                  cert.color === 'cyan' ? 'bg-cyan-600/10 border-cyan-600/20' :
                  cert.color === 'violet' ? 'bg-violet-600/10 border-violet-600/20' :
                  'bg-amber-500/10 border-amber-500/20'
                } border rounded-2xl flex items-center justify-center text-[2rem] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                  <i className={`${cert.icon} ${
                    cert.color === 'cyan' ? 'text-cyan-600' :
                    cert.color === 'violet' ? 'text-violet-600' :
                    'text-amber-500'
                  }`} />
                </div>

                <h3 className="text-[1.25rem] font-extrabold mb-3 text-gray-900 text-center leading-tight">
                  {cert.title}
                </h3>
                
                <div className="flex flex-col items-center gap-2 mb-4">
                  <span className={`inline-block px-4 py-[0.4rem] ${
                    cert.color === 'cyan' ? 'bg-cyan-600/10 border-cyan-600/30 text-cyan-600' :
                    cert.color === 'violet' ? 'bg-violet-600/10 border-violet-600/30 text-violet-600' :
                    'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  } border rounded-full text-xs font-bold uppercase tracking-wide`}>
                    {cert.issuer}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {cert.date}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100 text-center">
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${
                    cert.color === 'cyan' ? 'text-cyan-600' :
                    cert.color === 'violet' ? 'text-violet-600' :
                    'text-amber-500'
                  }`}>
                    <i className="fas fa-badge-check"></i>
                    Certified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-[5%] relative z-10 bg-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 left-1/2 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-[float_11s_ease-in-out_infinite]"></div>
        
        <div className="max-w-[1280px] mx-auto mb-14 text-center relative">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4 animate-[fadeInUp_0.6s_ease_backwards]">
            Get In Touch
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900 animate-[fadeInUp_0.8s_ease_0.2s_backwards]">
            Contact Me
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75] animate-[fadeInUp_0.8s_ease_0.4s_backwards]">
            Have a project in mind or just want to chat? Feel free to reach out through any of these channels.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {contactCards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-50 border-[1.5px] border-gray-200 rounded-[20px] p-10 text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-600/50 animate-[scaleIn_0.8s_ease_backwards]"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-600 to-violet-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                <div className="w-16 h-16 mx-auto mb-6 bg-cyan-600/10 border border-cyan-600/20 rounded-2xl flex items-center justify-center text-[2rem] transition-all duration-300 group-hover:bg-cyan-600/20 group-hover:scale-110">
                  <i className={card.icon + ' text-cyan-600'} />
                </div>
                <h3 className="text-[1.35rem] font-bold mb-3 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 text-[0.95rem] mb-6 leading-[1.6]">
                  {card.description}
                </p>
                {card.external ? (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-cyan-600/10 border border-cyan-600/30 rounded-[10px] text-cyan-600 no-underline font-semibold text-[0.9rem] transition-all duration-200 hover:bg-cyan-600/20 hover:border-cyan-600 hover:translate-x-1"
                  >
                    {card.linkText}
                    <span>→</span>
                  </a>
                ) : (
                  <a
                    href={card.link}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-cyan-600/10 border border-cyan-600/30 rounded-[10px] text-cyan-600 no-underline font-semibold text-[0.9rem] transition-all duration-200 hover:bg-cyan-600/20 hover:border-cyan-600 hover:translate-x-1"
                  >
                    {card.linkText}
                    <span>→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-[5%] border-t-[1.5px] border-gray-200 bg-white">
        <div className="max-w-[1280px] mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-[48px] h-[48px] bg-gradient-to-br from-cyan-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-cyan-600/20">
                  <span>OS</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Obaidullah Shaikh</span>
              </div>
              <p className="text-gray-600 leading-[1.8] mb-6 max-w-md">
                A passionate UI/UX designer and full-stack developer specializing in creating 
                beautiful, intelligent interfaces. Combining design expertise with modern web 
                technologies and AI to build exceptional digital experiences.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:obaidullahshaikh07@gmail.com"
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-xl text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
                  title="Email"
                >
                  <i className="fas fa-envelope" />
                </a>
                <a
                  href="https://www.instagram.com/ubaidxsk?igsh=dzM2cDJwNTZ1OHZi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-xl text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin" />
                </a>
                <a
                  href="https://github.com/obaid16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-xl text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
                  title="GitHub"
                >
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="text-gray-600 hover:text-cyan-600 transition-colors duration-200 no-underline font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-6">Get in Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <i className="fas fa-envelope text-cyan-600 mt-1"></i>
                  <a 
                    href="mailto:obaidullahshaikh07@gmail.com"
                    className="text-gray-600 hover:text-cyan-600 transition-colors duration-200 no-underline"
                  >
                    obaidullahshaikh07@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fab fa-github text-cyan-600 mt-1"></i>
                  <a 
                    href="https://github.com/obaid16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-cyan-600 transition-colors duration-200 no-underline"
                  >
                    github.com/obaid16
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fas fa-map-marker-alt text-cyan-600 mt-1"></i>
                  <span className="text-gray-600">Available for Remote Work</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-center md:text-left">
                © 2026 Obaidullah Shaikh. All rights reserved. Designed with{' '}
                <span className="text-cyan-600 font-bold">Figma</span> & built with{' '}
                <span className="text-cyan-600 font-bold">passion</span>.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors duration-200 no-underline font-medium">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors duration-200 no-underline font-medium">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(80px, -80px) rotate(120deg); }
          66% { transform: translate(-80px, 80px) rotate(240deg); }
        }
        
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatDecor {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0);
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateGlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;