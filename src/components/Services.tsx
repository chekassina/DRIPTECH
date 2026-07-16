import { Droplet, Sprout, Hammer, Database, Sun, Wrench, Waves, Award, Check } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const servicesList: Service[] = [
    {
      id: 'drip',
      title: 'Drip Irrigation Systems',
      description: 'Slow, precise delivery of water directly to the plant roots, minimizing evaporation and maximizing crop uniformity.',
      iconName: 'Droplet',
      benefits: ['Saves up to 70% water', 'Ideal for row crops & orchards', 'Reduces weed growth', 'Allows precise liquid fertigation'],
    },
    {
      id: 'sprinkler',
      title: 'Sprinkler Irrigation',
      description: 'Efficient overhead spray watering systems modeled after natural rainfall. Suitable for large fields, lawns, and leafy vegetables.',
      iconName: 'Sprout',
      benefits: ['High coverage area', 'Adjustable droplet size', 'Protects against frost', 'Durable, low-clog nozzles'],
    },
    {
      id: 'pump',
      title: 'Water Pump Installation',
      description: 'Design and sizing of submersible and centrifugal water pumps to ensure consistent water pressure and high flow rates.',
      iconName: 'Hammer',
      benefits: ['High pump efficiency', 'Automatic float switches', 'Built-in thermal protection', 'Low energy consumption'],
    },
    {
      id: 'tank',
      title: 'Water Tank Installation',
      description: 'Setup of large capacity plastic and steel water storage tanks on reinforced concrete structures or raised steel towers.',
      iconName: 'Database',
      benefits: ['Guarantees storage safety', 'Gravity-fed backup systems', 'UV-resistant materials', 'Integrated rain harvesting ready'],
    },
    {
      id: 'solar',
      title: 'Solar Water Pumping Systems',
      description: 'Eco-friendly water extraction using solar power. Low maintenance, high reliability, and zero utility bills.',
      iconName: 'Sun',
      benefits: ['Zero fuel or utility costs', 'Automatic daytime operation', 'Long lifespan (25+ years)', 'Excellent for remote farms'],
    },
    {
      id: 'maintenance',
      title: 'Irrigation System Maintenance',
      description: 'Preventive service, flush cycles, pipe leak sealing, sprinkler head replacements, and system tune-ups.',
      iconName: 'Wrench',
      benefits: ['Prevents nozzle clogging', 'Extends system lifecycle', 'Pressure optimization checks', 'Quick emergency response'],
    },
    {
      id: 'supply',
      title: 'Water Supply Solutions',
      description: 'Comprehensive water sourcing, distribution pipe layouts, and safe domestic/commercial plumbing services.',
      iconName: 'Waves',
      benefits: ['Reliable pipelines', 'Proper pressure regulation', 'Clean food-grade materials', 'Heavy-duty pipes (HDPE/PPR)'],
    },
    {
      id: 'consultancy',
      title: 'Agricultural Consultancy',
      description: 'Professional agronomic advice, crop-specific water requirements, soil health testing, and feasibility studies.',
      iconName: 'Award',
      benefits: ['Maximize return on investment', 'Custom soil/crop analysis', 'Sustainable farming advice', 'Cost budgeting & plans'],
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Droplet': return <Droplet className="w-6 h-6 text-blue-700" />;
      case 'Sprout': return <Sprout className="w-6 h-6 text-green-700" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-blue-800" />;
      case 'Database': return <Database className="w-6 h-6 text-blue-900" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-slate-700" />;
      case 'Waves': return <Waves className="w-6 h-6 text-blue-600" />;
      case 'Award': return <Award className="w-6 h-6 text-green-700" />;
      default: return <Droplet className="w-6 h-6 text-blue-700" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Droplet size={12} className="text-blue-600" />
            <span>Complete Engineering & Consultation</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Our Services
          </h2>
          <div className="h-1.5 w-16 bg-blue-700 rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            We provide comprehensive, end-to-end irrigation and water engineering solutions for smallholders, large farms, institutions, and residential projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 group-hover:bg-blue-50/70 transition-colors">
                {getIcon(service.iconName)}
              </div>

              {/* Card Title */}
              <h3 className="font-display font-semibold text-lg text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>

              {/* Card Description */}
              <p className="text-slate-500 text-sm mb-5 leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Service Benefits List */}
              <ul className="space-y-2 mb-6 border-t border-slate-50 pt-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <span className="text-green-600 mt-0.5 flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Call to Action for single service */}
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all cursor-pointer"
              >
                Request Quote For This
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
