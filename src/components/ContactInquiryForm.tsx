import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { Lead } from '../types';

interface ContactInquiryFormProps {
  onLeadAdded: () => void;
}

export default function ContactInquiryForm({ onLeadAdded }: ContactInquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !phoneNumber.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const newInquiry: Lead = {
          id: Date.now().toString(),
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: 'N/A',
          location: 'Lira General',
          serviceNeeded: 'General Contact Inquiry',
          message: message.trim(),
          status: 'New',
          createdAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        const existing = localStorage.getItem('driptech_leads');
        const leads: Lead[] = existing ? JSON.parse(existing) : [];
        leads.unshift(newInquiry);
        localStorage.setItem('driptech_leads', JSON.stringify(leads));

        setIsSubmitted(true);
        onLeadAdded();
      } catch (err) {
        console.error(err);
        setError('Could not submit inquiry. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <CheckCircle2 size={30} />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">Inquiry Submitted Successfully</h4>
          <p className="text-xs text-slate-500">Thank you! Our support desk in Lira City will call you shortly.</p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFullName('');
            setPhoneNumber('');
            setMessage('');
          }}
          className="text-xs font-bold text-blue-700 hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
          <Mail size={16} />
        </div>
        <div>
          <h4 className="font-display font-bold text-slate-900 text-sm">Send a General Inquiry</h4>
          <p className="text-[10px] text-slate-400">Ask us any general or product availability questions.</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      <div className="space-y-3">
        <div>
          <label htmlFor="contact-inquiry-name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
            Your Full Name
          </label>
          <input
            id="contact-inquiry-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Okello Patrick"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-xs focus:ring-1 focus:ring-blue-500 transition-all focus:outline-none text-slate-800"
          />
        </div>

        <div>
          <label htmlFor="contact-inquiry-phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
            Phone Number
          </label>
          <input
            id="contact-inquiry-phone"
            type="tel"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. +256 790 275 130"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-xs focus:ring-1 focus:ring-blue-500 transition-all focus:outline-none text-slate-800"
          />
        </div>

        <div>
          <label htmlFor="contact-inquiry-message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
            Inquiry Details
          </label>
          <textarea
            id="contact-inquiry-message"
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here (e.g., Do you supply UV-stable drip tubes individually?)..."
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-xs focus:ring-1 focus:ring-blue-500 transition-all focus:outline-none text-slate-800"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
      >
        <Send size={12} />
        <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
      </button>
    </form>
  );
}
