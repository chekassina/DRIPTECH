import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Mail, Phone, MapPin, ClipboardList, Send, CheckCircle2 } from 'lucide-react';
import { Lead } from '../types';

interface QuoteFormProps {
  selectedService: string;
  onLeadAdded: () => void;
}

export default function QuoteForm({ selectedService, onLeadAdded }: QuoteFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesOptions = [
    'Drip Irrigation Systems',
    'Sprinkler Irrigation',
    'Water Pump Installation',
    'Water Tank Installation',
    'Solar Water Pumping Systems',
    'Irrigation System Maintenance',
    'Water Supply Solutions',
    'Agricultural Consultancy',
    'Other Water/Energy Solutions',
  ];

  // Auto-fill service from parent selection if specified
  useEffect(() => {
    if (selectedService) {
      setServiceNeeded(selectedService);
    }
  }, [selectedService]);

  // Load water estimator prefill data on mount
  useEffect(() => {
    try {
      const prefill = localStorage.getItem('driptech_estimator_prefill');
      if (prefill) {
        setMessage(prefill);
        localStorage.removeItem('driptech_estimator_prefill');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?[0-9\s-]{9,15}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number (e.g. +256 790 275 130)';
    }
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!location.trim()) newErrors.location = 'Location (District/Town) is required';
    if (!serviceNeeded) newErrors.serviceNeeded = 'Please select a service';
    if (!message.trim()) newErrors.message = 'Please describe your farm size or water request';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate database post delays
    setTimeout(() => {
      const newLead: Lead = {
        id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        location: location.trim(),
        serviceNeeded,
        message: message.trim(),
        status: 'New',
        createdAt: new Date().toISOString(),
      };

      try {
        const stored = localStorage.getItem('driptech_leads');
        const leads: Lead[] = stored ? JSON.parse(stored) : [];
        leads.unshift(newLead);
        localStorage.setItem('driptech_leads', JSON.stringify(leads));
        
        // Notify parent to increment counter/refresh admin list
        onLeadAdded();
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Clear fields
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setLocation('');
        setServiceNeeded('');
        setMessage('');
        setErrors({});
      } catch (err) {
        console.error('LocalStorage write failed:', err);
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <section id="quote" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-600/10 rounded-full blur-3xl" />

          <div className="grid lg:grid-cols-12 gap-12 p-8 sm:p-12 md:p-16 relative z-10">
            {/* Left Column: Context Card */}
            <div className="lg:col-span-5 flex flex-col justify-between text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/35 text-blue-200 text-xs font-semibold mb-6">
                  <ClipboardList size={12} className="text-green-400" />
                  <span>Free, Instant Booking Proposals</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
                  Request a Free Quote
                </h2>
                <div className="h-1.5 w-16 bg-blue-500 rounded-full mb-6" />
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  Submit details of your project, and our engineering team will evaluate your technical needs. We will design a custom proposal and call you back within 24 hours.
                </p>
              </div>

              {/* Quick Checklist */}
              <div className="space-y-4 border-t border-slate-800 pt-8 mt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">No-Obligation Survey</h4>
                    <p className="text-xs text-slate-400">Get complete cost estimations free of charge.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Customized Design Map</h4>
                    <p className="text-xs text-slate-400">Tailored exactly for your crops, pump power, and water depth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-400 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Responsive Local Support</h4>
                    <p className="text-xs text-slate-400">Our technicians reside nearby in Lira for fast visits.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form Panel */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl text-slate-800">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-slate-900">
                      Quote Request Received!
                    </h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto">
                      Thank you for contacting Driptech Irrigation Ltd. We have saved your proposal. Our representative will contact you via phone or email shortly!
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Request Another Quote
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. John Okello"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                          errors.fullName 
                            ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Two columns: Phone & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Phone Input */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. +256 790 275 130"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                            errors.phoneNumber 
                              ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                              : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                      {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 leading-snug">{errors.phoneNumber}</p>}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. john@gmail.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                            errors.email 
                              ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                              : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1 leading-snug">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Two columns: Location & Service */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Location Input */}
                    <div>
                      <label htmlFor="location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Location
                      </label>
                      <div className="relative">
                        <input
                          id="location"
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Lira City / Kole District"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                            errors.location 
                              ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                              : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>

                    {/* Service Selection dropdown */}
                    <div>
                      <label htmlFor="serviceNeeded" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Service Needed
                      </label>
                      <select
                        id="serviceNeeded"
                        value={serviceNeeded}
                        onChange={(e) => setServiceNeeded(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-all focus:outline-none ${
                          errors.serviceNeeded 
                            ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        }`}
                      >
                        <option value="">-- Choose Irrigation Service --</option>
                        {servicesOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.serviceNeeded && <p className="text-red-500 text-xs mt-1">{errors.serviceNeeded}</p>}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Describe Your Project / Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. I have a 3-acre tomato farm. I would like to set up a gravity-fed drip irrigation system powered by a solar borehole pump..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.message 
                          ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                          : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-700 hover:bg-green-800 disabled:bg-slate-300 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-green-700/10 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Proposal...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Request a Free Quote</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
