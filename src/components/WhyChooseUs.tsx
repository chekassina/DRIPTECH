import { Users, ShieldCheck, DollarSign, HeartHandshake, Clock, Cpu, Award, ThumbsUp } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      title: 'Experienced Professionals',
      description: 'Our team comprises certified water engineers and seasoned agronomists who design layouts matching your unique topography and soil requirements.',
      icon: <Users className="w-6 h-6 text-green-700" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Quality Equipment',
      description: 'We source only premium, UV-resistant drip tapes, high-efficiency solar pumps, and reinforced storage tanks from trusted global manufacturers.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Affordable Pricing',
      description: 'We strive to make modern irrigation accessible to all, providing customizable budgets, phased payment models, and cost-effective system designs.',
      icon: <DollarSign className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
    },
    {
      title: 'Reliable Customer Support',
      description: 'From pre-sale site surveying to late-night system queries, our support lines are open to guarantee your peace of mind and minimize downtime.',
      icon: <HeartHandshake className="w-6 h-6 text-red-600" />,
      bg: 'bg-red-50',
    },
    {
      title: 'Fast Installation',
      description: 'We respect your agricultural timelines. Our streamlined logistics ensure prompt equipment dispatch and swift, expert system construction.',
      icon: <Clock className="w-6 h-6 text-blue-700" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Modern Technology',
      description: 'Using flow-efficient pipes, pressure-compensating drippers, and smart sensors to prevent run-offs, save power, and conserve water.',
      icon: <Cpu className="w-6 h-6 text-green-700" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Customer Satisfaction Guaranteed',
      description: 'Every project comes with comprehensive system walkthroughs, basic training for your staff, and robust warranties on all installations.',
      icon: <Award className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50',
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Visual */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <ThumbsUp size={12} className="text-green-600" />
              <span>Uncompromised Quality</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Why Choose Driptech Irrigation Ltd?
            </h2>
            <div className="h-1.5 w-16 bg-blue-700 rounded-full" />
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We do not just sell equipment; we deliver customized engineering and agronomic solutions that build resilient, highly profitable farms. Our focus is on maximizing water efficiency and delivering clean solar energy setups.
            </p>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="text-3xl font-display font-bold text-blue-700">100%</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                Satisfaction Guarantee <br />on all major installations
              </div>
            </div>
          </div>

          {/* Right Column: Key Points Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex gap-4"
              >
                <div className={`flex-shrink-0 h-10 w-10 rounded-xl ${reason.bg} flex items-center justify-center`}>
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base text-slate-900 mb-1.5">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
