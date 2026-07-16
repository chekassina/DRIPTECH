import { Phone, Mail, Facebook, MessageCircle, MapPin, Clock, CalendarRange, Navigation } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
            <Phone size={12} className="text-blue-600" />
            <span>Connect With Our Team</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Contact Us
          </h2>
          <div className="h-1.5 w-16 bg-blue-700 rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-base sm:text-lg">
            Have questions about micro-drip setups, borehole installations, or solar power configurations? Reach out to us or visit our headquarters in Lira City.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Phone numbers card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-slate-900 text-base flex items-center gap-2 border-b border-slate-50 pb-3">
                <span className="p-1.5 rounded-lg bg-green-50 text-green-700"><Phone size={16} /></span>
                <span>Call or Text Us</span>
              </h3>
              <p className="text-xs text-slate-500">Our customer lines are open Monday to Saturday for inquiries.</p>
              <div className="space-y-3 pt-1">
                <a 
                  href="tel:+256790275130" 
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-800">+256 790 275 130</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase group-hover:translate-x-0.5 transition-transform">Call Now</span>
                </a>
                <a 
                  href="tel:+256786479400" 
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-100 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-800">+256 786 479 400</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase group-hover:translate-x-0.5 transition-transform">Call Now</span>
                </a>
              </div>
            </div>

            {/* Email & Facebook & WhatsApp Quick Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-display font-semibold text-slate-900 text-base flex items-center gap-2 border-b border-slate-50 pb-3">
                <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700"><Mail size={16} /></span>
                <span>Digital Channels</span>
              </h3>
              <div className="space-y-2">
                <a 
                  href="mailto:driptechlira@gmail.com" 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <Mail size={16} className="text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Email Support</p>
                    <p className="text-sm font-medium text-slate-700">driptechlira@gmail.com</p>
                  </div>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100052877301441" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <Facebook size={16} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-0.5">Facebook Page</p>
                    <p className="text-sm font-medium text-slate-700">Driptech Irrigation Ltd</p>
                  </div>
                </a>
                <a 
                  href="https://wa.me/256790275130" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors border border-green-100"
                >
                  <MessageCircle size={18} className="text-green-700 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-green-700 font-bold uppercase leading-none mb-0.5">WhatsApp Live</p>
                    <p className="text-sm font-bold text-green-800">Chat Instantly</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-lg bg-red-50 text-red-500 mt-0.5"><MapPin size={18} /></span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">Our Head Office</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Lira City, Northern Region, Uganda <br />
                    (Providing reliable solutions countrywide)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-slate-50 pt-3">
                <span className="p-2 rounded-lg bg-amber-50 text-amber-600 mt-0.5"><Clock size={18} /></span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-0.5">Business Hours</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Mon - Fri: 8:00 AM - 6:00 PM <br />
                    Saturday: 9:00 AM - 4:00 PM (Closed Sundays)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-white p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3 px-2">
              <div>
                <h3 className="font-display font-semibold text-slate-900 text-sm">Interactive Store Location</h3>
                <p className="text-[11px] text-slate-400">Locate our physical shop and store in Lira, Uganda</p>
              </div>
              <a 
                href="https://maps.google.com/?q=Lira,Uganda" 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Navigation size={12} />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Map Frame */}
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-full rounded-2xl overflow-hidden border border-slate-100 flex-grow">
              <iframe
                title="Driptech Irrigation Ltd - Lira Uganda Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.638706346914!2d32.898858548398434!3d2.2435777157849693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1779b0086208be1f%3A0xe54e6ff74fb8a614!2sLira!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
