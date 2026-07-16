import { useState, useEffect } from 'react';
import { Phone, Mail, Facebook, MapPin, Menu, X, MessageCircle, Shield } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
  hasNewLeads: boolean;
}

export default function Navbar({ onNavigate, activeSection, onOpenAdmin, hasNewLeads }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Our Services' },
    { id: 'why-choose-us', label: 'Why Choose Us' },
    { id: 'gallery', label: 'Project Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Contact Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-slate-300">
            <a href="tel:+256790275130" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <Phone size={13} className="text-green-500" />
              <span>+256 790 275 130</span>
            </a>
            <a href="tel:+256786479400" className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
              <Phone size={13} className="text-green-500" />
              <span>+256 786 479 400</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <a href="mailto:driptechlira@gmail.com" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Mail size={13} className="text-blue-400" />
              <span>driptechlira@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin size={13} className="text-red-400" />
              <span>Lira, Uganda</span>
            </span>
            <a 
              href="https://www.facebook.com/profile.php?id=100052877301441" 
              target="_blank" 
              rel="noreferrer noopener" 
              className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-1"
              aria-label="Facebook Page"
            >
              <Facebook size={14} />
              <span className="hidden lg:inline text-[10px] text-slate-400">Facebook Page</span>
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-300 hover:text-blue-400 text-[11px] font-medium bg-slate-800 px-2 py-0.5 rounded border border-slate-700 transition-colors relative"
            >
              <Shield size={12} />
              <span>Admin Portal</span>
              {hasNewLeads && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white py-4'
      } border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Brand Logo and Name */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white border border-slate-100 p-0.5 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <img 
                src="/images/logo.jpg" 
                alt="Driptech Irrigation Ltd" 
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback
                  e.currentTarget.src = "https://picsum.photos/seed/driptechlogo/100/100";
                }}
              />
            </div>
            <div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-blue-900 tracking-tight leading-none">
                  DRIPTECH
                </span>
                <span className="text-[9px] font-bold text-green-700 uppercase tracking-[0.2em] block mt-0.5 leading-none">
                  Irrigation Ltd
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 lg:gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'text-blue-700 bg-blue-50/80'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Quote Request CTA */}
            <button
              onClick={() => handleNavClick('quote')}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-md shadow-green-700/10 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Call Now
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors"
            >
              Quote
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-inner px-4 py-3 space-y-2 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors block ${
                  activeSection === item.id
                    ? 'text-blue-700 bg-blue-50 font-bold'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('quote')}
                className="w-full text-center bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
              >
                Request a Free Quote
              </button>
              <a
                href="https://wa.me/256790275130"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full text-center border border-green-200 text-green-700 bg-green-50/50 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:bg-green-50"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Live Chat</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
