import React from 'react';
import { X, Settings, RotateCcw, Check, Sliders } from 'lucide-react';
import { RegulatoryConfig } from '../types';
import { DEFAULT_REGULATORY_CONFIG } from '../data/mockDossiers';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RegulatoryConfig;
  onSaveConfig: (newConfig: RegulatoryConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [formData, setFormData] = React.useState<RegulatoryConfig>(config);

  if (!isOpen) return null;

  const handleReset = () => {
    setFormData(DEFAULT_REGULATORY_CONFIG);
  };

  const handleSave = () => {
    onSaveConfig(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                AICTE APH Regulatory Norms Configurator
              </h3>
              <p className="text-xs text-slate-400">
                Tweak statutory thresholds from AICTE Approval Process Handbook (APH 2024-27).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
              Land Norms (APH Chapter 1, Clause 1.4)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Metro Min (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.minLandMetroAcres}
                  onChange={(e) => setFormData({ ...formData, minLandMetroAcres: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Urban Min (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.minLandUrbanAcres}
                  onChange={(e) => setFormData({ ...formData, minLandUrbanAcres: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Rural Min (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.minLandRuralAcres}
                  onChange={(e) => setFormData({ ...formData, minLandRuralAcres: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
              Faculty Cadre & Ratio Norms (APH Appendix 7)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Mandated SFR (Student-to-Faculty)</label>
                <select
                  value={formData.mandatedSfrUg}
                  onChange={(e) => setFormData({ ...formData, mandatedSfrUg: parseInt(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value={20}>1:20 (Standard UG Engineering)</option>
                  <option value={15}>1:15 (Accreditation Tier-1 / NBA)</option>
                  <option value={12}>1:12 (PG Programs / M.Tech / MBA)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Mandated Cadre Ratio</label>
                <input
                  type="text"
                  value={formData.mandatedCadreRatio}
                  onChange={(e) => setFormData({ ...formData, mandatedCadreRatio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  placeholder="1:2:6"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
              Safety & Tamper Sensitivity
            </span>

            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.strictFireNocMandate}
                  onChange={(e) => setFormData({ ...formData, strictFireNocMandate: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-300">
                  Enforce Zero-Tolerance on Expired Fire NOC (Immediate Rejection under SC Order)
                </span>
              </label>

              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-semibold text-slate-300">Forensic Tamper Sensitivity</label>
                <select
                  value={formData.tamperSensitivity}
                  onChange={(e) => setFormData({ ...formData, tamperSensitivity: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value="Normal">Normal (Flag obvious date/kerning errors)</option>
                  <option value="High">High (Standard AICTE Scrutiny Committee)</option>
                  <option value="Strict">Strict (Forensic CBI/Vigilance Level)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Official APH 2024 Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Save & Apply Norms
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
