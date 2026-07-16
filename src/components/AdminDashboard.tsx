import { useState, useEffect, FormEvent } from 'react';
import { 
  Shield, Lock, Search, Filter, Trash2, Mail, Phone, MapPin, 
  Download, RefreshCw, X, CheckSquare, Clock, Users, ArrowUpRight 
} from 'lucide-react';
import { Lead } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshLeadsBadge: () => void;
}

export default function AdminDashboard({ onClose, onRefreshLeadsBadge }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Load leads from LocalStorage
  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('driptech_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        // Seed default/mock leads if empty so the dashboard has high-fidelity data to display!
        const defaultLeads: Lead[] = [
          {
            id: 'lead_1',
            fullName: 'Michael Okello',
            phoneNumber: '+256 790 275 130',
            email: 'michael.okello@gmail.com',
            location: 'Lira City',
            serviceNeeded: 'Drip Irrigation Systems',
            message: 'I would like a quotation for a 2-acre passion fruit farm drip setup. Please include costs of main lines and emitters.',
            status: 'New',
            createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
          },
          {
            id: 'lead_2',
            fullName: 'Auma Beatrice',
            phoneNumber: '+256 786 479 400',
            email: 'beatrice.a@yahoo.com',
            location: 'Kole District',
            serviceNeeded: 'Solar Water Pumping Systems',
            message: 'Looking to pump water from a shallow well to a raised water tank. Well depth is roughly 15 meters. Requesting solar solar pump specifications.',
            status: 'Contacted',
            createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
          },
          {
            id: 'lead_3',
            fullName: 'Kizito Denis',
            phoneNumber: '+256 752 984 310',
            email: 'denis.kizito@gmail.com',
            location: 'Oyam District',
            serviceNeeded: 'Water Tank Installation',
            message: 'Need a quote for two 10,000-litre water tanks mounted on a 6-meter steel platform for gravity irrigation.',
            status: 'In Progress',
            createdAt: new Date(Date.now() - 48 * 3600000).toISOString(),
          }
        ];
        localStorage.setItem('driptech_leads', JSON.stringify(defaultLeads));
        setLeads(defaultLeads);
      }
    } catch (e) {
      console.error('Error loading leads', e);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Default administrative passcode is driptech
    if (password === 'driptech' || password === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect administrative password. Try "driptech".');
    }
  };

  // Update Status of Lead
  const handleUpdateStatus = (id: string, newStatus: Lead['status']) => {
    const updated = leads.map(l => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('driptech_leads', JSON.stringify(updated));
    onRefreshLeadsBadge();
    
    // update current selected view if open
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  // Delete Lead
  const handleDeleteLead = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;
    
    const filtered = leads.filter(l => l.id !== id);
    setLeads(filtered);
    localStorage.setItem('driptech_leads', JSON.stringify(filtered));
    onRefreshLeadsBadge();
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }
  };

  // Export Leads as JSON File
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `driptech_leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter & Search Leads
  const filteredLeads = leads.filter(lead => {
    const matchSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.serviceNeeded.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Calculate Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const activeLeads = leads.filter(l => l.status === 'In Progress').length;
  const completedLeads = leads.filter(l => l.status === 'Contacted').length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      {/* Lightbox / Window wrapper */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-slate-100 flex flex-col">
        {/* Header bar */}
        <div className="bg-slate-950 text-white p-6 flex justify-between items-center border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-700 flex items-center justify-center text-white">
              <Shield size={22} />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg leading-tight">Driptech Leads Portal</h2>
              <p className="text-xs text-slate-400">Secure Lead Capture & Back-Office CRM</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Section */}
        {!isAuthenticated ? (
          /* Password Authentication Overlay */
          <div className="flex-grow flex flex-col items-center justify-center py-20 px-4">
            <div className="max-w-md w-full bg-slate-50 border border-slate-100 p-8 rounded-2xl shadow-sm text-center">
              <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-700 mx-auto flex items-center justify-center mb-4">
                <Lock size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Administrative Verification</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                This area contains private client contact logs and quote proposals. Please enter the master administrative password to unlock access.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Admin Password (try 'driptech')"
                    className="w-full px-4 py-3 border border-slate-200 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 rounded-xl text-center text-sm focus:outline-none"
                    autoFocus
                  />
                  {loginError && <p className="text-red-500 text-xs font-semibold mt-2">{loginError}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Verify Credentials
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
            {/* Left Frame: Leads Listing & Filters */}
            <div className={`w-full lg:w-7/12 border-r border-slate-100 flex flex-col bg-slate-50/50 overflow-hidden ${
              selectedLead ? 'hidden lg:flex' : 'flex'
            }`}>
              {/* Dashboard metrics header */}
              <div className="p-4 grid grid-cols-4 gap-3 bg-white border-b border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-1">Total</p>
                  <p className="text-lg font-bold text-slate-800 leading-none">{totalLeads}</p>
                </div>
                <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-center">
                  <p className="text-[10px] text-green-700 font-bold uppercase leading-none mb-1">New</p>
                  <p className="text-lg font-bold text-green-700 leading-none">{newLeads}</p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-center">
                  <p className="text-[10px] text-sky-600 font-bold uppercase leading-none mb-1">Active</p>
                  <p className="text-lg font-bold text-sky-700 leading-none">{activeLeads}</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-center">
                  <p className="text-[10px] text-purple-600 font-bold uppercase leading-none mb-1">Contacted</p>
                  <p className="text-lg font-bold text-purple-700 leading-none">{completedLeads}</p>
                </div>
              </div>

              {/* Controls bar */}
              <div className="p-4 bg-white border-b border-slate-100 flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-grow">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, location, service..."
                    className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-700 focus:outline-none"
                  />
                </div>

                {/* Filter & Export */}
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-200 bg-white rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors cursor-pointer font-semibold"
                    title="Export JSON"
                  >
                    <Download size={14} />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Leads List Grid */}
              <div className="flex-grow overflow-y-auto divide-y divide-slate-100">
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-20 px-4">
                    <p className="text-slate-400 text-sm font-semibold">No quote proposals match this filter.</p>
                    <p className="text-slate-300 text-xs mt-1">Try resetting search or filters.</p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 transition-all cursor-pointer text-left hover:bg-slate-50 flex justify-between items-start gap-4 ${
                        selectedLead?.id === lead.id ? 'bg-blue-50/40 border-l-4 border-blue-700' : 'bg-white'
                      }`}
                    >
                      <div className="space-y-1.5 flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-semibold text-sm text-slate-800 truncate">
                            {lead.fullName}
                          </h4>
                          {lead.status === 'New' && (
                            <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-800 text-[9px] font-bold uppercase animate-pulse">
                              New
                            </span>
                          )}
                          {lead.status === 'In Progress' && (
                            <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 text-[9px] font-bold uppercase">
                              Active
                            </span>
                          )}
                          {lead.status === 'Contacted' && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[9px] font-bold uppercase">
                              Contacted
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-green-700 font-semibold truncate">
                          {lead.serviceNeeded}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={10} />
                            {lead.location}
                          </span>
                          <span>|</span>
                          <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-slate-300 mt-1 flex-shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Frame: Selected Lead Detail Panel */}
            <div className={`w-full lg:w-5/12 bg-white flex flex-col justify-between overflow-y-auto p-6 border-t lg:border-t-0 border-slate-100 ${
              selectedLead ? 'flex' : 'hidden lg:flex'
            }`}>
              {selectedLead ? (
                <div className="space-y-6 text-left flex-grow flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Mobile Back Button */}
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="lg:hidden flex items-center gap-1.5 text-xs font-bold text-blue-700 pb-3 mb-2 border-b border-slate-100 hover:underline cursor-pointer"
                    >
                      ← Back to Leads List
                    </button>

                    {/* Header Details */}
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                        PROPOSAL ID: {selectedLead.id}
                      </span>
                      <h3 className="font-display font-bold text-xl text-slate-900 leading-tight">
                        {selectedLead.fullName}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Submitted: {new Date(selectedLead.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Status Select action bar */}
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status:</span>
                      <div className="flex gap-1.5">
                        {['New', 'In Progress', 'Contacted', 'Archived'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(selectedLead.id, status as any)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                              selectedLead.status === status
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Customer Contact details */}
                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Client Details</h4>
                      <div className="space-y-2.5">
                        <a 
                          href={`tel:${selectedLead.phoneNumber}`}
                          className="flex items-center gap-3 text-slate-700 hover:text-blue-700 text-xs font-medium transition-colors"
                        >
                          <Phone size={14} className="text-blue-700" />
                          <span>{selectedLead.phoneNumber}</span>
                        </a>
                        <a 
                          href={`mailto:${selectedLead.email}`}
                          className="flex items-center gap-3 text-slate-700 hover:text-blue-700 text-xs font-medium transition-colors"
                        >
                          <Mail size={14} className="text-sky-500" />
                          <span>{selectedLead.email}</span>
                        </a>
                        <div className="flex items-center gap-3 text-slate-700 text-xs font-medium">
                          <MapPin size={14} className="text-red-500" />
                          <span>{selectedLead.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Selected Service Card */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Service Requested</h4>
                      <p className="px-3.5 py-2.5 rounded-lg bg-green-50 text-green-800 text-xs font-bold border border-green-100">
                        {selectedLead.serviceNeeded}
                      </p>
                    </div>

                    {/* Customer Message text */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message & Description</h4>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed max-h-[160px] overflow-y-auto font-sans whitespace-pre-wrap">
                        {selectedLead.message}
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons footer */}
                  <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between gap-3">
                    <div className="flex gap-2">
                      <a
                        href={`tel:${selectedLead.phoneNumber}`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold rounded-xl transition-all"
                      >
                        <Phone size={13} />
                        <span>Call</span>
                      </a>
                      <a
                        href={`mailto:${selectedLead.email}?subject=Driptech Irrigation Quote Proposal&body=Hi ${selectedLead.fullName}, \n\nThank you for requesting a quote for ${selectedLead.serviceNeeded}.`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl transition-all"
                      >
                        <Mail size={13} />
                        <span>Email Proposal</span>
                      </a>
                    </div>
                    <button
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      className="flex items-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all text-xs font-semibold cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* No Lead Selected Prompt */
                <div className="flex-grow flex flex-col items-center justify-center text-center text-slate-400 py-20 px-4">
                  <Users size={32} className="text-slate-300 mb-3" />
                  <p className="text-sm font-semibold">Select a quote proposal on the left</p>
                  <p className="text-xs text-slate-300 mt-1">To view full client requirements and contact logs</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
