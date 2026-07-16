import { useState } from 'react';
import { Calculator, ArrowRight, Droplet, Sun, Database } from 'lucide-react';

interface WaterEstimatorProps {
  onQuoteWithData: (service: string, message: string) => void;
}

export default function WaterEstimator({ onQuoteWithData }: WaterEstimatorProps) {
  const [crop, setCrop] = useState('citrus');
  const [acres, setAcres] = useState('1');

  const crops = [
    { id: 'citrus', label: 'Citrus (Oranges, Lemons, Mangoes)', waterPerAcreDay: 4500, system: 'Drip Irrigation', pumpPower: '1.5 HP Solar Pump', storage: '5,000L Raised Tank' },
    { id: 'vegetables', label: 'Vegetables (Tomatoes, Onions, Peppers)', waterPerAcreDay: 15000, system: 'Drip Irrigation', pumpPower: '3.0 HP Solar Pump', storage: '10,000L Raised Tank' },
    { id: 'watermelon', label: 'Watermelon & Melons', waterPerAcreDay: 12000, system: 'Drip Irrigation', pumpPower: '2.2 HP Solar Pump', storage: '10,000L Raised Tank' },
    { id: 'coffee', label: 'Coffee & Bananas', waterPerAcreDay: 13500, system: 'Drip Irrigation with Micro-Jets', pumpPower: '3.0 HP Solar Pump', storage: '10,000L Raised Tank' },
    { id: 'maize', label: 'Maize & Leafy Grains', waterPerAcreDay: 8000, system: 'Overhead Sprinkler System', pumpPower: '2.2 HP Solar Pump', storage: '5,000L Raised Tank' },
  ];

  const currentCrop = crops.find(c => c.id === crop) || crops[0];
  const scale = parseFloat(acres);
  const totalWater = Math.round(currentCrop.waterPerAcreDay * scale);
  const dripLines = Math.round(scale * (crop === 'vegetables' ? 16 : crop === 'maize' ? 0 : 8));

  const handleApplyEstimate = () => {
    const textService = currentCrop.system === 'Overhead Sprinkler System' ? 'Sprinkler Irrigation' : 'Drip Irrigation Systems';
    const textMsg = `Estimator design request: Crop is ${currentCrop.label}, Acreage is ${acres} Acres. Calculated daily water need is ${totalWater.toLocaleString()} Liters. System suggested: ${currentCrop.system} with ${currentCrop.pumpPower} and ${currentCrop.storage}.`;
    onQuoteWithData(textService, textMsg);
  };

  return (
    <div id="estimator" className="p-6 sm:p-8 bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden shadow-xl text-white">
      {/* Ambient background accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <Calculator size={22} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-tight">
              Interactive Irrigation Estimator
            </h3>
            <p className="text-xs text-slate-400">
              Calculate daily water need and get system size recommendations instantly.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 pt-2">
          {/* Left inputs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="estimator-crop" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Your Crop
              </label>
              <select
                id="estimator-crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              >
                {crops.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Total Farming Land
              </label>
              <div className="grid grid-cols-5 gap-2">
                {['0.5', '1', '2', '5', '10'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAcres(val)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      acres === val
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {val} {val === '0.5' ? 'Acre' : 'Ac'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right results */}
          <div className="p-5 bg-slate-950/60 border border-slate-850 rounded-2xl space-y-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850 pb-2">
              Calculated Engineering Guidelines
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block">Daily Water Need</span>
                <span className="text-sm font-bold text-blue-400 flex items-center gap-1.5 leading-none">
                  <Droplet size={14} />
                  {totalWater.toLocaleString()} Liters
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block">Suggested System</span>
                <span className="text-xs font-bold text-green-400 block leading-none">
                  {currentCrop.system}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block font-mono">Solar Pump Size</span>
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1 leading-none font-mono">
                  <Sun size={12} className="text-amber-500" />
                  {currentCrop.pumpPower}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block font-mono">Min. Tank Storage</span>
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1 leading-none font-mono">
                  <Database size={12} className="text-slate-400" />
                  {currentCrop.storage}
                </span>
              </div>
            </div>

            {dripLines > 0 && (
              <p className="text-[10px] text-slate-400 leading-normal border-t border-slate-850/50 pt-2.5">
                💡 For optimal flow & soil distribution, we recommend installing roughly <span className="text-blue-400 font-bold">{dripLines} rows</span> of high-efficiency drip tapes across this acreage.
              </p>
            )}
            {dripLines === 0 && (
              <p className="text-[10px] text-slate-400 leading-normal border-t border-slate-850/50 pt-2.5">
                💡 Overhead sprinkler nozzle lines will provide high-volume coverage matching crop spacing for optimal germination.
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleApplyEstimate}
          className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <span>Use This Design & Request Free Quote</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
