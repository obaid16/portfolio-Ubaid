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
  const [certificateModal, setCertificateModal] = useState(null);
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
      title: 'Gozoop Clone',
      description: 'A modern redesign of the Gozoop digital marketing agency website, featuring bold visuals, engaging animations, and a streamlined user experience that showcases creative services effectively.',
      category: 'Agency Website',
      tags: ['Figma', 'UI/UX', 'Web Design', 'Corporate'],
      image: '/gozoop.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/gozoop-clone'
    },
    {
      title: 'RedBus Clone',
      description: 'Complete redesign of India\'s leading bus booking platform with improved search functionality, intuitive seat selection interface, and seamless booking flow for enhanced user experience.',
      category: 'Travel & Booking',
      tags: ['Figma', 'UI/UX', 'Booking System', 'Mobile First'],
      image: '/red bus.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/redbus-clone'
    },
    {
      title: 'Uber App Clone',
      description: 'A complete redesign of the Uber mobile app experience, focusing on improved navigation, cleaner interface, and enhanced user flow for booking rides with real-time tracking.',
      category: 'Mobile App',
      tags: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
      image: '/uber.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/uber-app-clone'
    },
    {
      title: 'Raymond Clone',
      description: 'Elegant e-commerce redesign for Raymond luxury menswear brand, emphasizing premium aesthetics, sophisticated product showcases, and refined shopping experience.',
      category: 'E-commerce',
      tags: ['Figma', 'Luxury Brand', 'E-commerce', 'Fashion'],
      image: '/raymond.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/raymond-clone'
    },
    {
      title: 'Snapdeal Clone',
      description: 'Complete e-commerce redesign of Snapdeal with modern UI patterns, improved product discovery, streamlined checkout flow, and enhanced mobile shopping experience for better conversions.',
      category: 'E-commerce',
      tags: ['Figma', 'E-commerce', 'Mobile First', 'User Flow'],
      image: '/snapdeal.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/snapdeal-clone'
    },
    {
      title: 'Campus Website',
      description: 'Modern university campus website design featuring student-centric navigation, event management, academic resources, and vibrant layouts that reflect campus life and culture.',
      category: 'Educational Website',
      tags: ['Figma', 'Education', 'Web Design', 'Institutional'],
      image: '/campus.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/campus-website'
    },
    {
      title: 'Pharmaceutical Website',
      description: 'Professional pharmaceutical company website design with focus on product information, research showcase, compliance standards, and accessible healthcare solutions.',
      category: 'Healthcare Website',
      tags: ['Figma', 'Healthcare', 'Corporate', 'B2B'],
      image: '/pharmaceutical.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/pharmaceutical-website'
    },
    {
      title: 'Netflix Logo Animation',
      description: 'Creative motion design project featuring smooth, eye-catching Netflix logo animation with dynamic transitions, perfect timing, and engaging visual effects.',
      category: 'Motion Design',
      tags: ['Figma', 'Animation', 'Motion Graphics', 'Branding'],
      image: '/netflix.png',
      figmaUrl: 'https://www.figma.com/file/EXAMPLE/netflix-logo-animation'
    }
  ];

  const developmentProjects = [
    {
      title: 'Analytics Dashboard',
      description: 'A responsive analytics dashboard built with pure HTML, CSS, and Tailwind CSS featuring data visualization cards, responsive grid layouts, and modern UI components for displaying metrics.',
      category: 'Frontend Development',
      tags: ['HTML', 'CSS', 'Tailwind CSS', 'Responsive'],
      image: '/dashboard-dev.png',
      liveUrl: 'https://example-dashboard.vercel.app',
      repoUrl: 'https://github.com/obaid16/analytics-dashboard'
    },
    {
      title: 'YouTube Clone',
      description: 'A pixel-perfect YouTube clone interface built using HTML, CSS, and Tailwind CSS. Features responsive video grid, sidebar navigation, search functionality, and authentic YouTube styling.',
      category: 'Frontend Development',
      tags: ['HTML', 'CSS', 'Tailwind CSS', 'Clone Project'],
      image: '/youtube-clone.png',
      liveUrl: 'https://example-youtube-clone.vercel.app',
      repoUrl: 'https://github.com/obaid16/youtube-clone'
    }
  ];

  const openFigmaModal = (project) => {
    setModalData({ type: 'figma', url: project.figmaUrl, title: project.title });
    setModalTab('figma');
  };

  const learningPath = [
    { name: 'JavaScript ES6+', icon: 'fab fa-js', status: 'In Progress' },
    { name: 'React.js', icon: 'fab fa-react', status: 'In Progress' },
    { name: 'Next.js', icon: 'fas fa-code', status: 'In Progress' },
    { name: 'Node.js', icon: 'fab fa-node-js', status: 'In Progress' }
  ];

  const tools = [
    { name: 'Figma', icon: 'fab fa-figma', level: 'Expert', percentage: 95 },
    { name: 'HTML', icon: 'fab fa-html5', level: 'Advanced', percentage: 90 },
    { name: 'CSS', icon: 'fab fa-css3-alt', level: 'Advanced', percentage: 88 },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', level: 'Advanced', percentage: 85 },
    { name: 'JavaScript', icon: 'fab fa-js', level: 'Beginner', percentage: 40 },
    { name: 'React.js', icon: 'fab fa-react', level: 'Beginner', percentage: 40 },
    { name: 'Next.js', icon: 'fas fa-code', level: 'Intermediate', percentage: 70 },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 'Intermediate', percentage: 72 },
    { name: 'MongoDB', icon: 'fas fa-database', level: 'Beginner', percentage: 25 },
    { name: 'Git', icon: 'fab fa-git-alt', level: 'Beginner', percentage: 30 },
    { name: 'GitHub', icon: 'fab fa-github', level: 'Beginner', percentage: 35 },
    { name: 'WordPress', icon: 'fab fa-wordpress', level: 'Intermediate', percentage: 65 }
  ];

  const certifications = [
    {
      title: 'AI For All - AI Aware',
      issuer: 'Intel & Digital India',
      date: 'January 2026',
      icon: 'fas fa-brain',
      color: 'cyan',
      image: '/ai-aware-cert.png',
      badge: '/ai-aware-badge.png',
      description: 'Completed the AI Aware stage of Intel\'s AI For All program in partnership with Digital India and Central Board of Secondary Education. This certification demonstrates foundational understanding of Artificial Intelligence concepts and their real-world applications.',
      skills: ['AI Fundamentals', 'Machine Learning Basics', 'AI Ethics', 'Real-world AI Applications']
    },
    {
      title: 'AI For All - AI Appreciate',
      issuer: 'Intel & Digital India',
      date: 'January 2026',
      icon: 'fas fa-brain',
      color: 'violet',
      image: '/ai-appreciate-cert.png',
      badge: '/ai-appreciate-badge.png',
      description: 'Successfully completed the AI Appreciate stage of Intel\'s AI For All program. This advanced level certification showcases deeper understanding of AI technologies, their societal impact, and practical implementation strategies.',
      skills: ['Advanced AI Concepts', 'AI Impact Assessment', 'Problem Solving with AI', 'AI Implementation']
    },
    {
      title: 'Yuva AI For ALL - English',
      issuer: 'Intel & Digital India',
      date: 'January 21, 2026',
      icon: 'fas fa-graduation-cap',
      color: 'amber',
      image: '/yuva-ai-certificate.png',
      certificateId: 'ZmchD5eq8Y',
      description: 'Successfully completed the Yuva AI For ALL program in English, demonstrating comprehensive understanding of Artificial Intelligence concepts and applications tailored for youth empowerment and skill development.',
      skills: ['AI Literacy', 'Youth Leadership in AI', 'Practical AI Applications', 'Innovation Mindset']
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
      link: 'https://www.linkedin.com/in/obaid-shaikh-79716639a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
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
              <div className="inline-flex items-center gap-[0.6rem] px-5 py-[0.6rem] rounded-full text-sm font-semibold transition-all duration-300 bg-violet-600/10 border-[1.5px] border-violet-600/30 text-violet-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/20 hover:border-violet-600">
                <div className="w-5 h-5 bg-gradient-to-br from-violet-600 to-cyan-600 rounded flex items-center justify-center text-white text-[0.7rem] font-bold">
                  <i className="fas fa-brain" />
                </div>
                <span>AI/ML Student</span>
              </div>
              <div className="inline-flex items-center gap-[0.6rem] px-5 py-[0.6rem] rounded-full text-sm font-semibold transition-all duration-300 bg-cyan-600/10 border-[1.5px] border-cyan-600/30 text-cyan-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-600/20 hover:border-cyan-600">
                <div className="w-5 h-5 bg-gradient-to-br from-cyan-600 to-violet-600 rounded flex items-center justify-center text-white text-[0.7rem] font-bold">
                  <i className="fas fa-code" />
                </div>
                <span>Full-Stack Developer</span>
              </div>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.1] tracking-[-0.03em] mb-8 animate-[fadeInUp_0.8s_ease_0.4s_backwards] text-gray-900">
              Building{' '}
              <span className="bg-gradient-to-r from-violet-600 via-cyan-400 to-violet-600 bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradientMove_4s_ease_infinite]">
                intelligent
              </span>
              <br />
              systems with AI
            </h1>

            <p className="text-[clamp(1.05rem,2vw,1.25rem)] text-gray-600 mb-12 leading-[1.75] font-normal animate-[fadeInUp_0.8s_ease_0.6s_backwards]">
              I&apos;m an AI/ML student and full-stack developer passionate about creating intelligent 
              systems that solve real-world problems. I combine machine learning expertise with modern 
              web technologies to build innovative applications that make a difference.
            </p>

            <div className="flex gap-5 flex-wrap mb-8 animate-[fadeInUp_0.8s_ease_1s_backwards]">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="px-10 py-[1.1rem] no-underline rounded-xl font-bold text-base transition-all duration-200 inline-flex items-center gap-[0.6rem] cursor-pointer bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-600/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-600/40 justify-center w-full sm:w-auto"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-10 py-[1.1rem] no-underline rounded-xl font-bold text-base transition-all duration-200 inline-flex items-center gap-[0.6rem] cursor-pointer bg-white text-gray-900 border-[1.5px] border-gray-200 shadow-sm hover:border-violet-600/50 hover:-translate-y-1 hover:shadow-md hover:bg-violet-600/5 justify-center w-full sm:w-auto"
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

              {/* Stats - Now Clickable */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 animate-[fadeInUp_0.8s_ease_0.8s_backwards]">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="text-center group cursor-pointer no-underline transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl font-black text-cyan-600 mb-2 group-hover:scale-110 transition-transform duration-300">12+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Projects</div>
                </a>
                <a
                  href="#tools"
                  onClick={(e) => scrollToSection(e, '#tools')}
                  className="text-center group cursor-pointer no-underline transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl font-black text-violet-600 mb-2 group-hover:scale-110 transition-transform duration-300">12+</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Technologies</div>
                </a>
                <a
                  href="#certifications"
                  onClick={(e) => scrollToSection(e, '#certifications')}
                  className="text-center group cursor-pointer no-underline transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl font-black text-amber-500 mb-2 group-hover:scale-110 transition-transform duration-300">3</div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Certifications</div>
                </a>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-[fadeInUp_0.8s_ease_0.9s_backwards]">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="flex-1 py-4 px-8 bg-gradient-to-br from-cyan-600 to-violet-600 text-white rounded-xl font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-600/40 no-underline flex items-center justify-center gap-2 group"
                >
                  Let's Work Together
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-200"></i>
                </a>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="flex-1 py-4 px-8 bg-white border-[1.5px] border-gray-200 text-gray-900 rounded-xl font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-cyan-600/50 hover:bg-cyan-600/5 no-underline flex items-center justify-center gap-2"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 auto-rows-auto">
              {figmaProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white border-[1.5px] border-gray-200 rounded-3xl overflow-hidden transition-all duration-[400ms] hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 animate-[scaleIn_0.8s_ease_backwards] flex flex-col h-full"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div 
                    className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group cursor-pointer flex-shrink-0"
                    onClick={() => openFigmaModal(project)}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="object-cover transition-transform duration-400 group-hover:scale-110 group-hover:rotate-2"
                      priority={index < 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50 flex items-center gap-2 animate-[pulse_2s_ease-in-out_infinite]">
                        <i className="fas fa-external-link-alt"></i>
                        Open Figma
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 lg:p-9 flex flex-col flex-grow">
                    <span className="inline-block px-4 py-[0.4rem] bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border border-violet-600/30 rounded-full text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-600 uppercase tracking-wide mb-4 md:mb-5 w-fit">
                      <span className="text-violet-600">{project.category}</span>
                    </span>
                    <h3 className="text-lg md:text-xl lg:text-[1.65rem] font-extrabold mb-2 md:mb-3 lg:mb-4 tracking-[-0.02em] text-gray-900 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-[1.6] md:leading-[1.7] mb-5 md:mb-6 lg:mb-7 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-[0.6rem]">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 md:px-4 py-[0.35rem] md:py-[0.45rem] bg-gray-100 border border-gray-200 rounded-full text-[0.7rem] md:text-[0.825rem] font-semibold text-gray-700 transition-all duration-200 hover:border-violet-600 hover:text-violet-600 hover:bg-violet-600/5 whitespace-nowrap"
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

          {/* Development Projects - UPDATED TO OPEN IN NEW TAB */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3 animate-[fadeInUp_0.8s_ease_1.1s_backwards]">
              <div className="w-10 h-10 bg-violet-600/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-violet-600 text-xl" />
              </div>
              Development Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 auto-rows-auto">
              {developmentProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white border-[1.5px] border-gray-200 rounded-3xl overflow-hidden transition-all duration-[400ms] hover:-translate-y-3 hover:shadow-2xl hover:border-violet-600/50 animate-[scaleIn_0.8s_ease_backwards] flex flex-col h-full"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  {/* CHANGED: Now opens in new tab */}
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group cursor-pointer block flex-shrink-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover transition-transform duration-400 group-hover:scale-110 group-hover:rotate-2"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50 flex items-center gap-2 animate-[pulse_2s_ease-in-out_infinite]">
                        <i className="fas fa-external-link-alt"></i>
                        Open Project
                      </span>
                    </div>
                  </a>
                  <div className="p-6 md:p-7 lg:p-9 flex flex-col flex-grow">
                    <span className="inline-block px-4 py-[0.4rem] bg-gradient-to-r from-cyan-600/10 to-violet-600/10 border border-cyan-600/30 rounded-full text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-violet-600 uppercase tracking-wide mb-4 md:mb-5 w-fit">
                      <span className="text-cyan-600">{project.category}</span>
                    </span>
                    <h3 className="text-lg md:text-xl lg:text-[1.65rem] font-extrabold mb-2 md:mb-3 lg:mb-4 tracking-[-0.02em] text-gray-900 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-[1.6] md:leading-[1.7] mb-5 md:mb-6 lg:mb-7 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-[0.6rem]">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 md:px-4 py-[0.35rem] md:py-[0.45rem] bg-gray-100 border border-gray-200 rounded-full text-[0.7rem] md:text-[0.825rem] font-semibold text-gray-700 transition-all duration-200 hover:border-cyan-600 hover:text-cyan-600 hover:bg-cyan-600/5 whitespace-nowrap"
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

      {/* Modal for Figma embeds only */}
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

            <p className="text-white/70 text-sm text-center mt-4">Click outside to close</p>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {certificateModal && (
        <div
          className="fixed inset-0 bg-black/90 z-[10001] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease] overflow-y-auto"
          onClick={() => setCertificateModal(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-200 hover:scale-110 z-10"
            onClick={(e) => { e.stopPropagation(); setCertificateModal(null); }}
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="max-w-[95vw] max-h-[95vh] w-full md:w-[900px] relative bg-white rounded-2xl overflow-hidden my-8" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={`p-8 ${
              certificateModal.color === 'cyan' ? 'bg-gradient-to-r from-cyan-600 to-cyan-400' :
              certificateModal.color === 'violet' ? 'bg-gradient-to-r from-violet-600 to-violet-400' :
              'bg-gradient-to-r from-amber-500 to-amber-400'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl text-white">
                  <i className={certificateModal.icon} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">{certificateModal.title}</h2>
                  <p className="text-white/90 font-medium">{certificateModal.issuer} • {certificateModal.date}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[calc(95vh-200px)] overflow-y-auto">
              {/* Certificate Image */}
              {certificateModal.image && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Certificate</h3>
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={certificateModal.image}
                      alt={certificateModal.title + ' Certificate'}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {/* Badge Image */}
              {certificateModal.badge && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Badge</h3>
                  <div className="flex justify-center">
                    <div className="w-64 h-64 relative">
                      <Image
                        src={certificateModal.badge}
                        alt={certificateModal.title + ' Badge'}
                        width={256}
                        height={256}
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About this Certification</h3>
                <p className="text-gray-600 leading-relaxed">{certificateModal.description}</p>
              </div>

              {/* Skills */}
              {certificateModal.skills && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Skills Covered</h3>
                  <div className="flex flex-wrap gap-3">
                    {certificateModal.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                          certificateModal.color === 'cyan' ? 'bg-cyan-600/10 text-cyan-600 border border-cyan-600/30' :
                          certificateModal.color === 'violet' ? 'bg-violet-600/10 text-violet-600 border border-violet-600/30' :
                          'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Badge */}
              <div className={`p-6 rounded-xl ${
                certificateModal.color === 'cyan' ? 'bg-cyan-600/5 border-2 border-cyan-600/20' :
                certificateModal.color === 'violet' ? 'bg-violet-600/5 border-2 border-violet-600/20' :
                'bg-amber-500/5 border-2 border-amber-500/20'
              }`}>
                <div className="flex items-center gap-3">
                  <i className={`fas fa-badge-check text-3xl ${
                    certificateModal.color === 'cyan' ? 'text-cyan-600' :
                    certificateModal.color === 'violet' ? 'text-violet-600' :
                    'text-amber-500'
                  }`}></i>
                  <div>
                    <h4 className="font-bold text-gray-900">Verified Certification</h4>
                    <p className="text-sm text-gray-600">This certificate has been officially issued by {certificateModal.issuer}</p>
                    {certificateModal.certificateId && (
                      <p className="text-xs text-gray-500 mt-1 font-mono">Certificate ID: {certificateModal.certificateId}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of sections remain the same... */}
      {/* I'll include the remaining sections in the continuation */}
      
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
                  <div className="w-[88px] h-[88px] mx-auto mb-6 bg-white border-[1.5px] border-gray-200 rounded-[20px] flex items-center justify-center text-5xl shadow-sm transition-all duration-300 hover:-translate-y-2.5 hover:shadow-xl hover:border-cyan-600/50 hover:bg-cyan-600/5 hover:rotate-6 relative group">
                    <i className={tool.icon + ' text-cyan-600'} />
                    {/* Percentage Badge */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tool.percentage}%
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 mb-2 text-[1.05rem]">{tool.name}</div>
                  <div className="text-[0.9rem] text-gray-600 font-medium mb-3">{tool.level}</div>
                  {/* Progress Bar with Percentage */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500">Proficiency</span>
                      <span className="text-sm font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                        {tool.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ width: `${tool.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                onClick={() => setCertificateModal(cert)}
                className="bg-white border-[1.5px] border-gray-200 rounded-3xl p-8 transition-all duration-[400ms] relative overflow-hidden group hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 animate-[scaleIn_0.8s_ease_backwards] cursor-pointer"
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
                    <i className="fas fa-eye"></i>
                    Click to View
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
                  href="https://www.linkedin.com/in/obaid-shaikh-79716639a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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
                  <i className="fab fa-linkedin text-cyan-600 mt-1"></i>
                  <a 
                    href="https://www.linkedin.com/in/obaid-shaikh-79716639a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-cyan-600 transition-colors duration-200 no-underline"
                  >
                    linkedin.com/in/obaid-shaikh
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
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-gray-600 text-center">
                © 2026 Obaidullah Shaikh. All rights reserved.
              </p>
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;