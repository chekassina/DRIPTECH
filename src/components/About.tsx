import { Leaf, Eye, Target, Sparkles, HeartHandshake } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Leaf size={12} className="text-green-600" />
            <span>Rooted in Sustainability</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Who We Are
          </h2>
          <div className="h-1.5 w-16 bg-blue-700 rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Driptech Irrigation Ltd is a professional irrigation company committed to delivering dependable water and energy solutions. We specialize in designing, supplying, installing, and maintaining modern irrigation systems that improve agricultural productivity while conserving precious resources.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Image with decoration */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-600 to-green-600 opacity-20 blur-lg transition-opacity group-hover:opacity-35" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
              <img
                src="/images/lay2.jpg"
                alt="Irrigation installation close-up"
                className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/driptechabout/600/800";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6">
                <p className="text-white font-semibold text-lg">Pristine Drip Systems</p>
                <p className="text-slate-300 text-xs">Installed in Lira, Uganda</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Vision, Goals */}
          <div className="lg:col-span-7 space-y-8">
            {/* Mission Box */}
            <div className="p-6 rounded-2xl bg-green-50/50 border border-green-100 hover:border-green-200 transition-colors flex gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-green-700 text-white flex items-center justify-center shadow-lg shadow-green-700/10">
                <Target size={24} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To provide reliable, affordable, and innovative irrigation solutions that help our clients achieve sustainable farming. We aim to uplift local agriculture through water-saving technology.
                </p>
              </div>
            </div>

            {/* Vision Box */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 hover:border-blue-200 transition-colors flex gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-700/10">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To be the leading irrigation and water services provider in the region, recognized for excellence, climate-resilient water systems, and boosting food security.
                </p>
              </div>
            </div>

            {/* Philosophy Note */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">Dependable water & Energy</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We integrate agricultural consultancy with technical installations. By analyzing soil types, crops, and solar opportunities, we deliver bespoke solutions tailored perfectly for your climate and budget.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Core Values */}
        <div className="pt-12 border-t border-slate-100">
          <h3 className="font-display font-bold text-xl text-slate-900 mb-8 text-center uppercase tracking-wide text-slate-500">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-5 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="mx-auto w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4">
                <HeartHandshake size={20} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Integrity & Trust</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Building transparent, reliable, long-term partnerships with our local farming community.
              </p>
            </div>

            <div className="text-center p-5 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="mx-auto w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Premium Quality</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Using only high-grade certified tubes, fittings, solar pumps, and water components.
              </p>
            </div>

            <div className="text-center p-5 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="mx-auto w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center mb-4">
                <Leaf size={20} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Eco-Friendliness</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Designing micro-irrigation systems that save water and running on zero-emission solar energy.
              </p>
            </div>

            <div className="text-center p-5 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="mx-auto w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Target size={20} />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Farmer First</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Affordable payment models, tailored agronomic guidance, and direct support for your success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
