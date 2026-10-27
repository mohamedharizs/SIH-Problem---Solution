import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Award, 
  Settings, 
  HelpCircle, 
  Sparkles, 
  RefreshCw,
  Building2,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { InstitutionProfile } from '../types';

interface HeaderProps {
  currentDossier: InstitutionProfile;
  allDossiers: InstitutionProfile[];
  onSelectDossier: (dossier: InstitutionProfile) => void;
  onRunAudit: () => void;
  isAuditing: boolean;
  aiPowered: boolean;
  onOpenPitch: () => void;
  onOpenCertificate: () => void;
  onOpenSettings: () => void;
  activeTab: 'dossier' | 'discrepancies' | 'compliance' | 'tamper';
  setActiveTab: (tab: 'dossier' | 'discrepancies' | 'compliance' | 'tamper') => void;
  discrepancyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentDossier,
  allDossiers,
  onSelectDossier,
  onRunAudit,
  isAuditing,
  aiPowered,
  onOpenPitch,
  onOpenCertificate,
  onOpenSettings,
  activeTab,
  setActiveTab,
  discrepancyCount
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      {/* Top Gov/AICTE Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-white/10 to-emerald-600 h-1 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-700 shadow-lg shadow-indigo-500/20 text-white font-bold text-lg ring-1 ring-white/20">
              <ShieldCheck className="w-6 h-6 text-indigo-100" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  ComplyCheck <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AICTE • SIH26261</span>
                </h1>
                {aiPowered ? (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    <Sparkles className="w-3 h-3 text-purple-400" /> Gemini 3.8 Flash Online
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Deterministic Engine
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>AI-Powered Application Validation & Document Authentication</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-mono">APH 2024-27</span>
              </p>
            </div>
          </div>

          {/* Dossier Selector & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Dossier Picker Dropdown */}
            <div className="relative group">
              <label className="text-[10px] uppercase font-semibold text-slate-400 block -mb-0.5 ml-1">Case Dossier:</label>
              <div className="relative flex items-center">
                <select
                  value={currentDossier.id}
                  onChange={(e) => {
                    const found = allDossiers.find(d => d.id === e.target.value);
                    if (found) onSelectDossier(found);
                  }}
                  className="appearance-none bg-slate-800/90 hover:bg-slate-800 text-slate-200 text-xs font-medium pl-3 pr-8 py-2 rounded-lg border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm min-w-[210px]"
                >
                  {allDossiers.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.id.includes('apex') ? '🔴 ' : d.id.includes('kaveri') ? '🟡 ' : '🟢 '}
                      {d.name.length > 28 ? d.name.substring(0, 26) + '...' : d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Re-Audit Button */}
            <button
              onClick={onRunAudit}
              disabled={isAuditing}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all shadow-sm ${
                isAuditing 
                  ? 'bg-indigo-700 cursor-wait' 
                  : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-indigo-500/25'
              }`}
              title="Trigger deep multi-document cross-audit using AI"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Dossier...' : 'Run AI Audit'}</span>
            </button>

            {/* Official Certificate Button */}
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition-colors"
              title="Generate printable/downloadable AICTE Verification Certificate"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">AICTE Certificate</span>
            </button>

            {/* Technical Breakdown / Pitch Button */}
            <button
              onClick={onOpenPitch}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 transition-colors"
              title="View SIH26261 Architecture, Pitch Deck & Judge Q&A"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Hackathon Pitch & Arch</span>
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              title="Regulatory Norms Configuration"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mt-3.5 border-t border-slate-800/80 pt-2.5 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('dossier')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'dossier'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>1. Institutional Dossier & Docs</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-800 text-slate-300 font-mono">
              {currentDossier.documents.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('discrepancies')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap relative ${
              activeTab === 'discrepancies'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>2. Cross-Doc Discrepancies</span>
            {discrepancyCount > 0 ? (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 font-mono font-bold animate-pulse">
                {discrepancyCount}
              </span>
            ) : (
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-mono">0</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. APH Regulatory Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('tamper')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeTab === 'tamper'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>4. Tamper & Anomaly Lab</span>
          </button>
        </div>
      </div>
    </header>
  );
};
