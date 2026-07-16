import { useEffect, useState } from 'react';
import { ArrowRight, Phone, MessageCircle, Calendar, Award, Shield, CheckCircle } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/lay1.jpg',
      title: 'Modern Irrigation Solutions',
      subtitle: 'Maximize Crop Yield, Minimize Water Waste',
    },
    {
      image: '/images/lay3.jpg',
      title: 'Smart Solar-Powered Systems',
      subtitle: 'Harness the Sun for Reliable Water Supply',
    },
    {
      image: '/images/lay5.jpg',
      title: 'Durable Water Infrastructure',
      subtitle: 'Premium Tanks & Expert Storage Installations',
    },
    {
      image: '/images/lay12.jpg',
      title: 'High-Efficiency Water Supply',
      subtitle: 'Robust Solar Deep Well Boreholes & Pumps',
    },
    {
      image: '/images/lay14.jpg',
      title: 'Precision Drip Systems',
      subtitle: 'Targeted Micro-irrigation for Fruit & Vegetable Orchards',
    },
    {
      image: '/images/lay21.jpg',
      title: 'High Capacity Reservoir Storage',
      subtitle: 'Raised Tank Towers Designed for Optimum Pressure',
    },
    {
      image: '/images/lay23.jpg',
      title: 'Large Scale Pivots & Sprinklers',
      subtitle: 'Reliable Overhead Systems for Maximum Acreage Coverage',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-12">
      {/* Background Slideshow */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
          }`}
        >
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-800/40 z-20" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback
              e.currentTarget.src = `https://picsum.photos/seed/driptechhero${index}/1920/1080`;
            }}
          />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 w-full h-full flex flex-col justify-center z-30">
        <div className="max-w-3xl text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-200 text-xs sm:text-sm font-semibold mb-6 animate-pulse">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Dependable Water & Energy Solutions in East Africa
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4">
            DRIPTECH IRRIGATION LTD
          </h1>

          <p className="font-display font-medium text-lg sm:text-xl md:text-2xl text-blue-400 mb-6 max-w-2xl">
            {slides[currentSlide].subtitle}
          </p>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
            Professional irrigation and water solutions for farms, homes, institutions, and commercial projects. Empowering Ugandan farmers with modern agricultural technology.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => onNavigate('quote')}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 group shadow-lg shadow-blue-700/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+256790275130"
              className="bg-green-700 hover:bg-green-800 text-white border border-green-800/20 px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-green-700/10"
            >
              <Phone size={18} className="text-white" />
              <span>Call Us Now</span>
            </a>
            <a
              href="https://wa.me/256790275130"
              target="_blank"
              rel="noreferrer noopener"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-[1.02] shadow-md shadow-green-950/20"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Quick Features Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mt-auto pt-6 border-t border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5">
              <Award size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Experienced Team</p>
              <p className="text-xs text-slate-400">Certified technicians</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 mt-0.5">
              <Shield size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Quality Equipment</p>
              <p className="text-xs text-slate-400">Durable materials</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 mt-0.5">
              <CheckCircle size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Modern Technology</p>
              <p className="text-xs text-slate-400">Water conserving systems</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mt-0.5">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Ongoing Support</p>
              <p className="text-xs text-slate-400">Reliable & fast service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
