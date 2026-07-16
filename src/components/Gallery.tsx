import { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, Filter } from 'lucide-react';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'drip' | 'sprinkler' | 'solar' | 'tank'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    { id: '1', src: '/images/lay1.jpg', alt: 'Overhead Sprinkler System in Lira', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '2', src: '/images/lay2.jpg', alt: 'Precision Drip Emitter Irrigation', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '3', src: '/images/lay3.jpg', alt: 'Rotary Sprinkler Crop Watering', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '4', src: '/images/lay4.jpg', alt: 'Solar Water Pump Station', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '5', src: '/images/lay5.jpg', alt: 'Gravity-Fed Raised Water Tanks', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '6', src: '/images/lay6.jpg', alt: 'Drip Tape Layout on Row Crops', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '7', src: '/images/lay7.jpg', alt: 'High-Volume Agricultural Sprinkler', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '8', src: '/images/lay8.jpg', alt: 'Solar Panels For Borehole Pump', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '9', src: '/images/lay9.jpg', alt: 'Reinforced Concrete Tank Support', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '10', src: '/images/lay10.jpg', alt: 'Greenhouse Micro-Drip System', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '11', src: '/images/lay11.jpg', alt: 'Impact Sprinklers for Maize Crops', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '12', src: '/images/lay12.jpg', alt: 'High-Output Solar Submersible Pump', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '13', src: '/images/lay13.jpg', alt: 'Raised Tank Setup with Water Filters', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '14', src: '/images/lay14.jpg', alt: 'Orchard Drip Irrigation Hose Lines', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '15', src: '/images/lay15.jpg', alt: 'Overhead Mist Nozzles in Nursery', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '16', src: '/images/lay16.jpg', alt: 'Solar Pump Controller Panel Installation', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '17', src: '/images/lay17.jpg', alt: 'Twin Large Water Reservoir Installation', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '18', src: '/images/lay18.jpg', alt: 'Vegetable Crop Drip Tape Installation', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '19', src: '/images/lay19.jpg', alt: 'Portable Pipeline Sprinkler Sprays', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '20', src: '/images/lay20.jpg', alt: 'Solar Powered Drip System Controller', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '21', src: '/images/lay21.jpg', alt: 'High Capacity Storage Tank Tower', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '22', src: '/images/lay22.jpg', alt: 'Multi-row Tomato Drip Feed', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '23', src: '/images/lay23.jpg', alt: 'Pivot Sprinkler Span Field Setup', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '24', src: '/images/lay24.jpg', alt: 'Deep Well Solar Pump Unit', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '25', src: '/images/lay25.jpg', alt: 'Galvanized Steel Water Storage', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '26', src: '/images/lay26.jpg', alt: 'Flow Control Valve for Drip Manifolds', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '27', src: '/images/lay27.jpg', alt: 'End-Gun High-Pressure Sprinkler', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '28', src: '/images/lay28.jpg', alt: 'Array of Solar Modules on Ground Mount', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '29', src: '/images/lay29.jpg', alt: 'Polyethylene Tank with Outlet Pipes', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '30', src: '/images/lay30.jpg', alt: 'Commercial Crop Pressure-Compensating Drip Lines', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '31', src: '/images/lay31.jpg', alt: 'Micro-sprinklers in Citrus Orchard', category: 'sprinkler', categoryLabel: 'Sprinklers' },
    { id: '32', src: '/images/lay32.jpg', alt: 'Off-grid Solar Water Distribution Hub', category: 'solar', categoryLabel: 'Solar Pumps' },
    { id: '33', src: '/images/lay33.jpg', alt: 'Community Gravity Water Distribution Tank', category: 'tank', categoryLabel: 'Water Tanks' },
    { id: '34', src: '/images/lay34.jpg', alt: 'Specialized Sub-surface Irrigation Pipes', category: 'drip', categoryLabel: 'Drip Systems' },
    { id: '35', src: '/images/lay35.jpg', alt: 'Pasture Irrigation System Installation', category: 'sprinkler', categoryLabel: 'Sprinklers' },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (id: string) => {
    // Find absolute index of item in currently filtered list
    const index = filteredItems.findIndex(item => item.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <ImageIcon size={12} className="text-green-600" />
            <span>Proven Field Engineering</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Our Project Gallery
          </h2>
          <div className="h-1.5 w-16 bg-blue-700 rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            A visual overview of some of our completed projects. We deliver clean, professional pipe fittings, secure tank towers, and robust solar setups across Uganda.
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-2 mr-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <Filter size={14} className="text-blue-700" />
            <span>Filter:</span>
          </div>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'drip', label: 'Drip Systems' },
            { id: 'sprinkler', label: 'Sprinklers' },
            { id: 'solar', label: 'Solar Pumps' },
            { id: 'tank', label: 'Water Tanks' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id as any);
                setLightboxIndex(null); // Clear lightbox state just in case
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/10'
                  : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-150 hover:border-slate-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className="group relative rounded-xl overflow-hidden aspect-square sm:aspect-[4/3] bg-slate-100 border border-slate-200 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/seed/lay${item.id}/600/450`;
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="inline-block px-2 py-0.5 rounded bg-blue-700 text-white text-[9px] font-bold uppercase w-max mb-2">
                  {item.categoryLabel}
                </span>
                <p className="text-white font-medium text-xs sm:text-sm line-clamp-2">
                  {item.alt}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-slate-300 text-[10px] font-semibold">
                  <Eye size={12} className="text-green-400" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Counter of items */}
        <div className="text-center mt-8 text-slate-400 text-xs font-mono">
          Showing {filteredItems.length} of {galleryItems.length} project installations
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && currentLightboxItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white hover:text-emerald-400 bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer z-50"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Left Control */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-emerald-400 bg-white/5 hover:bg-white/15 p-3 rounded-full transition-all cursor-pointer z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Content Container */}
            <div className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center relative">
              <img
                src={currentLightboxItem.src}
                alt={currentLightboxItem.alt}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-slate-800 shadow-2xl"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/seed/lay${currentLightboxItem.id}/1200/900`;
                }}
              />

              {/* Details strip */}
              <div className="w-full text-center mt-4 px-6">
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wide mb-2">
                  {currentLightboxItem.categoryLabel}
                </span>
                <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg">
                  {currentLightboxItem.alt}
                </h4>
                <p className="text-slate-400 text-xs font-mono mt-1">
                  Image {lightboxIndex + 1} of {filteredItems.length} filtered
                </p>
              </div>
            </div>

            {/* Right Control */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-emerald-400 bg-white/5 hover:bg-white/15 p-3 rounded-full transition-all cursor-pointer z-50"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
