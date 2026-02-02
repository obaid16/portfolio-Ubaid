'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicked, setCursorClicked] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });

  // Custom cursor animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setCursorVisible(true);
    };

    const animateCursor = () => {
      setCursorPos(prev => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.15,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.15
      }));
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const animation = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animation);
    };
  }, []);

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
      const sections = ['home', 'projects', 'expertise', 'tools', 'contact'];
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
    { href: '#projects', label: 'Projects' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#tools', label: 'Tools' }
  ];

  const projects = [
    {
      title: 'Uber App Clone',
      description: 'A complete redesign of the Uber mobile app experience, focusing on improved navigation, cleaner interface, and enhanced user flow for booking rides.',
      category: 'UI Design',
      tags: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
      link: 'YOUR_UBER_PROJECT_LINK_HERE',
      image: '/images/uber-project.jpg'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Modern analytics dashboard with data visualization, real-time metrics, and intuitive controls. Designed for optimal data presentation and user interaction.',
      category: 'Dashboard Design',
      tags: ['Figma', 'Data Viz', 'Web Design', 'Charts'],
      link: 'YOUR_DASHBOARD_PROJECT_LINK_HERE',
      image: '/images/dashboard-project.jpg'
    },
    {
      title: 'Snapdeal Clone',
      description: 'Complete e-commerce redesign of Snapdeal with modern UI patterns, improved product discovery, streamlined checkout flow, and enhanced mobile shopping experience for better conversions.',
      category: 'UI Design',
      tags: ['Figma', 'E-commerce', 'Mobile First', 'User Flow'],
      link: 'YOUR_SNAPDEAL_PROJECT_LINK_HERE',
      image: '/images/snapdeal-project.jpg'
    }
  ];

  const skills = ['UI/UX Design', 'HTML & CSS', 'Tailwind CSS', 'JavaScript', 'React', 'Next.js', 'Node.js', 'AI & ML'];

  const learningPath = [
    { name: 'JavaScript ES6+', icon: 'fab fa-js', status: 'In Progress' },
    { name: 'React.js', icon: 'fab fa-react', status: 'In Progress' },
    { name: 'Next.js', icon: 'fas fa-code', status: 'In Progress' },
    { name: 'Node.js', icon: 'fab fa-node-js', status: 'In Progress' }
  ];

  const tools = [
    { name: 'Figma', icon: 'fab fa-figma', level: 'Expert' },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', level: 'Advanced' },
    { name: 'React', icon: 'fab fa-react', level: 'Learning' },
    { name: 'Next.js', icon: 'fas fa-code', level: 'Learning' },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 'Learning' }
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
      title: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      description: 'Message me on WhatsApp for quick responses and discussions.',
      link: 'https://wa.me/919892448770',
      linkText: 'Chat Now',
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

            <div className="flex flex-wrap gap-[0.85rem] mb-14 animate-[fadeInUp_0.8s_ease_0.8s_backwards]">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-6 py-3 bg-white border-[1.5px] border-gray-200 rounded-full text-[0.925rem] font-semibold text-gray-900 transition-all duration-200 cursor-default hover:-translate-y-1 hover:shadow-md hover:border-cyan-600/50 hover:bg-cyan-600/5"
                >
                  {skill}
                </span>
              ))}
            </div>

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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-[5%] relative z-10 bg-white">
        <div className="max-w-[1280px] mx-auto mb-14 text-center">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4">
            My Work
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75]">
            A showcase of my design work in Figma and development projects using modern web technologies.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <Link
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-[1.5px] border-gray-200 rounded-3xl overflow-hidden transition-all duration-[400ms] cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50 no-underline"
              >
                <div className="w-full h-[280px] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                    <span className="text-white font-bold text-lg bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/50">
                      View Project
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 px-[5%] relative z-10 bg-gray-50">
        <div className="max-w-[1280px] mx-auto mb-14 text-center">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4">
            What I Do
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900">
            My Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75]">
            Bridging design and technology to create intelligent, user-friendly experiences.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* UI/UX Design */}
            <div className="bg-white border-[1.5px] border-gray-200 rounded-3xl p-12 transition-all duration-[400ms] relative overflow-hidden group hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-violet-600 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
              <div className="w-[72px] h-[72px] bg-cyan-600/10 rounded-[18px] flex items-center justify-center mb-8 text-[2.5rem] border border-cyan-600/20">
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
            <div className="bg-white border-[1.5px] border-gray-200 rounded-3xl p-12 transition-all duration-[400ms] relative overflow-hidden group hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-600/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-violet-600 scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
              <div className="w-[72px] h-[72px] bg-violet-600/10 rounded-[18px] flex items-center justify-center mb-8 text-[2.5rem] border border-violet-600/20">
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
          <div className="max-w-[1280px] mt-10 bg-white border-[1.5px] border-gray-200 rounded-3xl p-12 shadow-sm">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-400 rounded-[14px] flex items-center justify-center text-[2rem] shadow-lg shadow-amber-500/20">
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
                  className="flex items-center gap-5 p-6 bg-gray-50 border-[1.5px] border-gray-200 rounded-2xl transition-all duration-300 hover:translate-x-2 hover:border-amber-500 hover:shadow-md hover:bg-amber-500/5"
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
      <section id="tools" className="py-20 px-[5%] relative z-10 bg-white">
        <div className="max-w-[1280px] mx-auto mb-14 text-center">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4">
            My Toolbox
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900">
            Tools & Technologies
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75]">
            The tools I use to design and build exceptional experiences.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto">
          <div className="bg-gray-50 rounded-[28px] p-14 border-[1.5px] border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 mt-12">
              {tools.map((tool, index) => (
                <div key={index} className="text-center transition-all duration-300">
                  <div className="w-[88px] h-[88px] mx-auto mb-6 bg-white border-[1.5px] border-gray-200 rounded-[20px] flex items-center justify-center text-5xl shadow-sm transition-all duration-300 hover:-translate-y-2.5 hover:shadow-xl hover:border-cyan-600/50 hover:bg-cyan-600/5">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-[5%] relative z-10 bg-gray-50">
        <div className="max-w-[1280px] mx-auto mb-14 text-center">
          <div className="inline-block text-4xl font-bold uppercase tracking-[2px] text-cyan-600 mb-4">
            Get In Touch
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.03em] mb-5 text-gray-900">
            Contact Me
          </h2>
          <p className="text-xl text-gray-600 max-w-[700px] mx-auto leading-[1.75]">
            Have a project in mind or just want to chat? Feel free to reach out through any of these channels.
          </p>
        </div>

        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {contactCards.map((card, index) => (
              <div
                key={index}
                className="bg-white border-[1.5px] border-gray-200 rounded-[20px] p-10 text-center transition-all duration-300 relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-600/50"
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
      <footer className="py-14 px-[5%] border-t-[1.5px] border-gray-200 bg-white">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center flex-wrap gap-8">
          <p className="text-gray-600 text-base">
            © 2026 Obaidullah Shaikh. Designed with{' '}
            <strong className="text-cyan-600 font-bold">Figma</strong> & passion.
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:obaidullahshaikh07@gmail.com"
              className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-full text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
              title="Email"
            >
              <i className="fas fa-envelope" />
            </a>
            <a
              href="https://www.instagram.com/ubaidxsk?igsh=dzM2cDJwNTZ1OHZi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-full text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://wa.me/919892448770"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-full text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
              title="WhatsApp"
            >
              <i className="fab fa-whatsapp" />
            </a>
            <a
              href="https://github.com/obaid16"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gray-100 border-[1.5px] border-gray-200 rounded-full text-gray-600 no-underline text-xl transition-all duration-200 shadow-sm hover:-translate-y-1 hover:border-cyan-600 hover:text-cyan-600 hover:shadow-md hover:bg-cyan-600/5"
              title="GitHub"
            >
              <i className="fab fa-github" />
            </a>
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

        @keyframes floatDecor {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;