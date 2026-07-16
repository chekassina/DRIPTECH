import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import WaterEstimator from './components/WaterEstimator';
import ContactInquiryForm from './components/ContactInquiryForm';
import { Lead, Testimonial } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Sprout, Star, Heart, ArrowUp, ArrowRight, Phone, Mail, Facebook, MessageCircle, Users, Clock, ShieldCheck, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [hasNewLeads, setHasNewLeads] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Ocen Patrick',
      role: 'Commercial Citrus Farmer',
      location: 'Kole District',
      rating: 5,
      content: 'Driptech installed a solar water pumping and drip system on my 5-acre orchard. My orange harvest has doubled, and my energy costs are now zero! Their technical support in Lira is top-notch.',
    },
    {
      id: '2',
      name: 'Adong Grace',
      role: 'Commercial Vegetable grower',
      location: 'Lira City Outer',
      rating: 5,
      content: 'I requested a sprinkler system for my vegetable beds. The installation was completed in just 2 days. The pricing was highly transparent and competitive, and the equipment is of superior quality.',
    },
    {
      id: '3',
      name: 'Dr. Okello Moses',
      role: 'Director of Agribusiness',
      location: 'Oyam District',
      rating: 5,
      content: 'Driptech Irrigation installed our 20,000L raised water tank tower and high-efficiency pipelines. Exceptional engineering standards, reliable designs, and climate-resilient setups.',
    },
  ];

  // Check if there are unread "New" leads
  const checkNewLeads = () => {
    try {
      const stored = localStorage.getItem('driptech_leads');
      if (stored) {
        const leads: Lead[] = JSON.parse(stored);
        const hasNew = leads.some((l) => l.status === 'New');
        setHasNewLeads(hasNew);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkNewLeads();

    // Scroll top button visibility listener
    const handleScrollVisibility = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    handleNavigate('quote');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col antialiased selection:bg-blue-700 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        hasNewLeads={hasNewLeads}
      />

      {/* Main Core Layout */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {/* Home Hero Screen */}
              <Hero onNavigate={handleNavigate} />

              {/* Quick Agronomic Welcome Block */}
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      <Droplet size={12} className="text-blue-600" />
                      <span>Uganda's Leading Agribusiness Partner</span>
                    </div>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                      Dependable Water & Solar Energy Engineering
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed">
                      We specialize in professional irrigation solutions designed specifically for Ugandan farmers. From advanced borehole pump setups and solar tracking systems to water reservoirs and highly precise drip tubes, we turn dry farmlands into resilient, high-yield zones.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => handleNavigate('services')}
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-blue-700/10 uppercase tracking-wider cursor-pointer"
                      >
                        Explore All Services
                      </button>
                      <button
                        onClick={() => handleNavigate('about')}
                        className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs px-6 py-3.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                      >
                        Learn Our Story
                      </button>
                    </div>
                  </div>
                  
                  {/* Photo & Stats Pairing Layout */}
                  <div className="lg:col-span-6 grid sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-200 group shadow-md">
                      <img
                        src="/images/lay10.jpg"
                        alt="High Yield Greenhouse Farming"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://picsum.photos/seed/dripwelcome/600/750';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Lira, Uganda</span>
                        <h4 className="text-white font-bold text-xs sm:text-sm">High-density orchard drip setup</h4>
                      </div>
                    </div>

                    <div className="sm:col-span-6 grid grid-cols-2 sm:grid-cols-1 gap-4">
                      {[
                        { value: '150+', label: 'Farming Projects' },
                        { value: '100%', label: 'Water Savings' },
                        { value: '5+', label: 'Districts Covered' },
                        { value: '24/7', label: 'Local Lira Support' }
                      ].map((stat, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100/80 text-center sm:text-left space-y-1 hover:border-blue-100 transition-colors">
                          <div className="text-xl sm:text-2xl font-display font-black text-blue-700">{stat.value}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Irrigation Estimator */}
              <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="text-center mb-10 space-y-2">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                      Estimate Your Farm's Irrigation Requirements
                    </h3>
                    <p className="text-sm text-slate-500 max-w-xl mx-auto">
                      Select your crops and acreage below to instantly find the recommended system size, water volumes, and required storage.
                    </p>
                  </div>
                  <WaterEstimator onQuoteWithData={(service, prefill) => {
                    setSelectedService(service);
                    // Provide a nice prefill message to the form
                    localStorage.setItem('driptech_estimator_prefill', prefill);
                    handleNavigate('quote');
                  }} />
                </div>
              </section>

              {/* Featured Services Preview */}
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-3">
                        <Sprout size={12} className="text-green-600" />
                        <span>Core Capabilities</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        Featured Engineering Services
                      </h3>
                    </div>
                    <button
                      onClick={() => handleNavigate('services')}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      <span>View all 8 services</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'Drip Irrigation Systems',
                        desc: 'Precise delivery of water directly to plant roots, minimizing waste. Best for citrus, coffee, and orchard row crops.',
                        benefits: 'Saves up to 70% water',
                        img: '/images/lay18.jpg',
                        fallbackId: 'drip'
                      },
                      {
                        title: 'Solar Water Pumping Systems',
                        desc: 'Zero-emission submersible pumps running 100% on daylight solar power. Never pay fuel or electricity bills again.',
                        benefits: 'Zero utility bills',
                        img: '/images/lay4.jpg',
                        fallbackId: 'solar'
                      },
                      {
                        title: 'Overhead Sprinklers',
                        desc: 'High-volume agricultural rain guns and impact sprinklers for vegetable nurseries, grains, and large seed beds.',
                        benefits: 'Wide acreage coverage',
                        img: '/images/lay1.jpg',
                        fallbackId: 'sprinkler'
                      }
                    ].map((item, i) => (
                      <div key={i} className="rounded-2xl border border-slate-150 overflow-hidden bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                        <div>
                          {/* Rich Card Image Header */}
                          <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.src = `https://picsum.photos/seed/driptechservice${item.fallbackId}/600/400`;
                              }}
                            />
                            <div className="absolute top-3 left-3">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-green-700 bg-white/95 backdrop-blur px-2 py-1 rounded shadow-sm">
                                {item.benefits}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h4 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                        
                        <div className="px-6 pb-6 pt-2">
                          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                            <span className="text-[10px] font-bold text-blue-700 font-mono">Premium Materials</span>
                            <button
                              onClick={() => handleSelectService(item.title)}
                              className="text-xs font-bold text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <span>Request Quote</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Recent Installation Showcase Grid */}
              <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                        <ImageIcon size={12} className="text-blue-600" />
                        <span>Live Deployments</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        Recent Field Installations
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
                        High-resolution pictures of our certified technicians implementing irrigation frameworks in Northern Uganda.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('gallery')}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      <span>Launch Full Gallery</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      {
                        title: 'Precision Drip Layout',
                        location: 'Lira District',
                        img: '/images/lay2.jpg',
                        fallbackSeed: 'drip1',
                        tag: 'Drip Systems'
                      },
                      {
                        title: 'Solar Submersible Station',
                        location: 'Apac District',
                        img: '/images/lay8.jpg',
                        fallbackSeed: 'solar2',
                        tag: 'Solar Pumping'
                      },
                      {
                        title: 'Raised Water Reservoir Tower',
                        location: 'Dokolo District',
                        img: '/images/lay5.jpg',
                        fallbackSeed: 'tank3',
                        tag: 'Storage Tanks'
                      },
                      {
                        title: 'High-Volume Overhead Rain Guns',
                        location: 'Kole District',
                        img: '/images/lay11.jpg',
                        fallbackSeed: 'sprinkler4',
                        tag: 'Overhead Rain'
                      },
                      {
                        title: 'Nursery Micro-Misting Sprinklers',
                        location: 'Oyam District',
                        img: '/images/lay15.jpg',
                        fallbackSeed: 'nursery5',
                        tag: 'Sprinklers'
                      },
                      {
                        title: 'Dual High-Capacity Reservoirs',
                        location: 'Amolatar District',
                        img: '/images/lay17.jpg',
                        fallbackSeed: 'tank6',
                        tag: 'Storage Tanks'
                      },
                      {
                        title: 'Commercial Vegetable Drip Lines',
                        location: 'Lira City',
                        img: '/images/lay18.jpg',
                        fallbackSeed: 'drip7',
                        tag: 'Drip Systems'
                      },
                      {
                        title: 'Solar Pump Distribution Hub',
                        location: 'Kwania District',
                        img: '/images/lay32.jpg',
                        fallbackSeed: 'solar8',
                        tag: 'Solar Pumping'
                      }
                    ].map((project, i) => (
                      <div
                        key={i}
                        onClick={() => handleNavigate('gallery')}
                        className="group relative rounded-2xl overflow-hidden aspect-square sm:aspect-[4/3] bg-slate-200 border border-slate-150 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300"
                      >
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.src = `https://picsum.photos/seed/driptechrecent${project.fallbackSeed}/600/450`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-blue-700 text-white text-[9px] font-bold uppercase w-max mb-1.5">
                            {project.tag}
                          </span>
                          <h4 className="text-white font-bold text-xs sm:text-sm leading-tight">
                            {project.title}
                          </h4>
                          <p className="text-[10px] text-slate-300 mt-0.5">
                            {project.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonials Slider */}
              <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
                    <Star size={12} className="fill-blue-400 text-blue-400" />
                    <span>Success Stories</span>
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-4 text-white">
                    Client Testimonials
                  </h2>
                  <div className="h-1.5 w-16 bg-blue-600 rounded-full mx-auto mb-12" />

                  <div className="min-h-[220px] flex flex-col justify-between">
                    <p className="text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-slate-200 max-w-3xl mx-auto">
                      "{testimonials[activeTestimonial].content}"
                    </p>

                    <div className="mt-8">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <h4 className="font-display font-bold text-base text-white">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {testimonials[activeTestimonial].role} —{' '}
                        <span className="text-blue-400 font-semibold">{testimonials[activeTestimonial].location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2.5 mt-8">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeTestimonial === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-700'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Call-to-Action Promo Segment */}
              <section className="py-20 bg-blue-700 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
                    Ready to transform your farm with custom water design?
                  </h3>
                  <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    Submit your irrigation details now, and our local team of certified technicians in Lira City will map a custom layout proposal completely free.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleNavigate('quote')}
                      className="px-8 py-3.5 bg-white text-blue-800 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-lg shadow-blue-900/10 transition-all uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Request Free Quote</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PageHeader
                breadcrumb="Home > About Us"
                title="About Driptech Irrigation Ltd"
                subtitle="We are Northern Uganda's certified water and solar engineering partner. Our focus is helping smallholders and commercial farms achieve climate-resilient water security."
              />
              <About />

              {/* Team Grid */}
              <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                      <Users size={12} className="text-blue-700" />
                      <span>Our Personnel</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                      Meet Our Engineering Team
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Our skilled technicians, agronomists, and installers reside locally in Lira City to guarantee fast, responsive support.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: 'Eng. Okello Joshua', role: 'Head of Water Engineering', detail: 'Certified irrigation layouts architect and solar pumps specialist with 8+ years experience.' },
                      { name: 'Apio Sarah', role: 'Agronomic Consultant', detail: 'Agronomist advising on soil composition, crop spacing, and fertilizer drip infusion layouts.' },
                      { name: 'Otim Raymond', role: 'Logistics & Installation Lead', detail: 'Coordinates plumbing, trench mapping, and water storage tower structural assembly.' },
                      { name: 'Alobo Fiona', role: 'Client Support Manager', detail: 'Handles scheduling, quick phone inquiries, and post-installation walkthrough training.' }
                    ].map((member, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all space-y-4 text-center">
                        <div className="mx-auto w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-display font-bold text-xl">
                          {member.name.split(' ').pop()?.[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{member.name}</h4>
                          <p className="text-[11px] text-green-700 font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-normal">{member.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Vertical timeline process */}
              <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="text-center mb-16 space-y-3">
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                      Our 4-Step Engineering Process
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                      We ensure absolute precision at every single step from the initial soil analysis up to final walkthrough training.
                    </p>
                  </div>

                  <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-100">
                    {[
                      { step: '01', title: 'Free Consult & Estimation', desc: 'We discuss your crops, acreage, location, and power options over the phone or at our Lira office to draft initial parameters.' },
                      { step: '02', title: 'On-Site Technical Survey', desc: 'Our technicians visit your farm to measure physical elevation, water depth, soil characteristics, and solar light coordinates.' },
                      { step: '03', title: 'Customized Layout Design', desc: 'We engineer a tailored hydraulic model matching required water pressure, suggesting ideal tank sizes, and listing exact fittings.' },
                      { step: '04', title: 'Professional Setup & Walkthrough', desc: 'We transport all premium tubes, connect controllers, construct raised tower stands, test flow uniformity, and train your workers.' }
                    ].map((item, idx) => (
                      <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:justify-between gap-6 sm:gap-12">
                        {/* Dot */}
                        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xs font-bold text-blue-700 z-10 shadow-sm">
                          {item.step}
                        </div>
                        
                        {/* Box Left */}
                        <div className={`w-full sm:w-[45%] pl-12 sm:pl-0 ${idx % 2 === 0 ? 'sm:text-right font-medium' : 'sm:order-2 font-medium'}`}>
                          <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg mb-1.5">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>

                        {/* Spacer Right */}
                        <div className="hidden sm:block w-[45%]" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PageHeader
                breadcrumb="Home > Our Services"
                title="Professional Irrigation & Water Solutions"
                subtitle="We offer end-to-end water engineering and agricultural consultancy across Uganda. Select any service below to request a tailored design plan."
              />
              <Services onSelectService={handleSelectService} />

              {/* Consultation Standards checklist */}
              <section className="py-16 bg-white border-t border-slate-150">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                    Need Custom Fabricated Tank Towers or Specialty Greenhouses?
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
                    Our technical workshop in Lira possesses complete tooling to fabricate heavy-duty structural steel raised stands (from 3m to 9m heights), construct automated crop misting systems, or build custom agricultural filters.
                  </p>
                  <div>
                    <button
                      onClick={() => handleNavigate('quote')}
                      className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Inquire for Custom Work</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'why-choose-us' && (
            <motion.div
              key="why-choose"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PageHeader
                breadcrumb="Home > Why Choose Us"
                title="Uganda's Trusted Water Experts"
                subtitle="Why do local smallholders, institutions, and commercial citrus orchards trust Driptech? Because we prioritize durable equipment, local support, and flexible budgets."
              />
              <WhyChooseUs />

              {/* Technical Certifications banner */}
              <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-4">
                  <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8 space-y-4">
                      <div className="h-10 w-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                        Our Rigid Structural and Engineering Benchmarks
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        To withstand Northern Uganda's intense heat and unpredictable dry spells, we source only certified products: UV-resistant polyethylene (PE) lines, brass sprinkler nozzles, food-safe storage reservoirs, and German-engineered solar controllers.
                      </p>
                    </div>

                    <div className="md:col-span-4 space-y-3 font-mono text-[11px] text-slate-500 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-green-700 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                        <span>ISO Certified Tubing</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                        <span>UV Stable LDPE Lines</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                        <span>Heavy Duty Galvanized Stands</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700 font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                        <span>German Solar Controllers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PageHeader
                breadcrumb="Home > Project Gallery"
                title="Our Field Installations Portfolio"
                subtitle="Explore real photos of our active micro-drip systems, overhead sprinklers, submersible solar-powered water pumps, and heavy water towers across Northern Uganda."
              />
              <Gallery />
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PageHeader
                breadcrumb="Home > Contact Us"
                title="Get In Touch with Our Lira Office"
                subtitle="Have a quick query or want to schedule an agronomic survey? Connect directly via phone, WhatsApp, or stop by our technical workshop."
              />
              <Contact />

              {/* Small General Inquiry Form */}
              <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-xl mx-auto px-4">
                  <div className="bg-white rounded-2xl border border-slate-150 p-6 sm:p-8 shadow-sm">
                    <ContactInquiryForm onLeadAdded={checkNewLeads} />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'quote' && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <PageHeader
                breadcrumb="Home > Booking Proposal"
                title="Request a Free Irrigation Proposal"
                subtitle="Submit your farming dimensions, crop varieties, and location. Our technical engineering division will compile a custom hydraulic map layout and budget estimate within 24 hours."
              />
              <QuoteForm selectedService={selectedService} onLeadAdded={checkNewLeads} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Block */}
      <footer className="bg-slate-950 text-white border-t border-slate-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white border border-slate-700 p-0.5 flex items-center justify-center overflow-hidden shadow-sm">
                <img 
                  src="/images/logo.jpg" 
                  alt="Driptech Irrigation Ltd" 
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/driptechlogo/100/100";
                  }}
                />
              </div>
              <span className="font-display font-black text-lg text-white tracking-tight leading-none">
                DRIPTECH <span className="text-green-500">Irrigation Ltd</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design, supply, install, and maintain high-efficiency micro-irrigation systems, overhead sprinklers, water storage tanks, and solar water pumps across Uganda. Boost agriculture with dependable water and energy.
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <span className="flex items-center gap-1 text-slate-300">
                <Heart size={12} className="text-red-500 fill-red-500" />
                Made with passion for Ugandan farmers
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 border-b border-slate-900 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'why-choose-us', label: 'Why Choose Us' },
                { id: 'gallery', label: 'Project Gallery' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigate(link.id)}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left font-semibold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 border-b border-slate-900 pb-2">
              Contact Details
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-slate-500 mt-0.5"><Phone size={13} /></span>
                <div>
                  <p className="leading-tight">+256 790 275 130</p>
                  <p className="leading-tight mt-1">+256 786 479 400</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-slate-500"><Mail size={13} /></span>
                <a href="mailto:driptechlira@gmail.com" className="hover:text-blue-400 transition-colors">
                  driptechlira@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-slate-500 mt-0.5"><Facebook size={13} /></span>
                <a 
                  href="https://www.facebook.com/profile.php?id=100052877301441" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="hover:text-blue-400 transition-colors"
                >
                  Driptech Irrigation Ltd Facebook Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower row copyrights */}
        <div className="bg-slate-950/80 border-t border-slate-900 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[11px] text-center sm:text-left">
            <p>© {new Date().getFullYear()} Driptech Irrigation Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Dependable Water & Energy Solutions</span>
              <span>•</span>
              <button 
                onClick={() => setIsAdminOpen(true)} 
                className="hover:text-white transition-colors cursor-pointer text-[10px] font-mono uppercase bg-slate-900 px-1.5 py-0.5 rounded"
              >
                Access Backend CRM
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Leads Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onRefreshLeadsBadge={checkNewLeads}
        />
      )}

      {/* Floating Scroll Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 shadow-xl shadow-blue-900/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

interface PageHeaderProps {
  breadcrumb: string;
  title: string;
  subtitle: string;
}

function PageHeader({ breadcrumb, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-slate-900 text-white pt-28 pb-14 sm:pt-36 sm:pb-16 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-3">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
          {breadcrumb}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal pt-1">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
