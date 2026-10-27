import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  ArrowRight, 
  FileText, 
  Scale, 
  Check, 
  X, 
  MessageSquare, 
  Filter,
  ShieldAlert,
  HelpCircle,
  Clock
} from 'lucide-react';
import { DiscrepancyItem, SeverityLevel } from '../types';

interface DiscrepancyMatrixProps {
  discrepancies: DiscrepancyItem[];
  onUpdateDiscrepancyStatus: (id: string, status: 'CONFIRMED' | 'OVERRULED' | 'CLARIFICATION_REQUESTED', notes?: string) => void;
}

export const DiscrepancyMatrix: React.FC<DiscrepancyMatrixProps> = ({
  discrepancies,
  onUpdateDiscrepancyStatus
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | SeverityLevel>('ALL');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const filtered = discrepancies.filter(d => {
    if (selectedFilter === 'ALL') return true;
    return d.severity === selectedFilter;
  });

  const criticalCount = discrepancies.filter(d => d.severity === 'CRITICAL').length;
  const warningCount = discrepancies.filter(d => d.severity === 'WARNING').length;
  const infoCount = discrepancies.filter(d => d.severity === 'INFO').length;

  const handleAction = (id: string, status: 'CONFIRMED' | 'OVERRULED' | 'CLARIFICATION_REQUESTED') => {
    onUpdateDiscrepancyStatus(id, status, noteText || undefined);
    setActiveNoteId(null);
    setNoteText('');
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-extrabold text-white">
                Cross-Document Conflict & Discrepancy Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Automated multi-way reconciliation across submitted statutory certificates. Uncovers contradictory plot dimensions, unapproved floors, expired clearances, and ghost faculty cadres.
            </p>
          </div>

          {/* Quick Counter Pills */}
          <div className="flex items-center gap-2">
            <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Critical Breaches</span>
              <span className="text-lg font-mono font-extrabold text-rose-200">{criticalCount}</span>
            </div>

            <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">Warnings</span>
              <span className="text-lg font-mono font-extrabold text-amber-200">{warningCount}</span>
            </div>

            <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl px-3.5 py-2 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">Observations</span>
              <span className="text-lg font-mono font-extrabold text-blue-200">{infoCount}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>

          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              selectedFilter === 'ALL'
                ? 'bg-slate-700 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All Conflicts ({discrepancies.length})
          </button>

          <button
            onClick={() => setSelectedFilter('CRITICAL')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              selectedFilter === 'CRITICAL'
                ? 'bg-rose-900/60 text-rose-200 border border-rose-700/80 font-semibold'
                : 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/30'
            }`}
          >
            <AlertOctagon className="w-3 h-3 text-rose-400" /> Critical ({criticalCount})
          </button>

          <button
            onClick={() => setSelectedFilter('WARNING')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              selectedFilter === 'WARNING'
                ? 'bg-amber-900/60 text-amber-200 border border-amber-700/80 font-semibold'
                : 'text-slate-400 hover:text-amber-300 hover:bg-amber-950/30'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-400" /> Warnings ({warningCount})
          </button>

          <button
            onClick={() => setSelectedFilter('INFO')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              selectedFilter === 'INFO'
                ? 'bg-blue-900/60 text-blue-200 border border-blue-700/80 font-semibold'
                : 'text-slate-400 hover:text-blue-300 hover:bg-blue-950/30'
            }`}
          >
            <Info className="w-3 h-3 text-blue-400" /> Observations ({infoCount})
          </button>
        </div>
      </div>

      {/* Discrepancy Cards List */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Cross-Document Inconsistencies Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            All submitted statutory documents (land records, architectural blueprints, fire clearances, and faculty rosters) are mutually coherent and conform to AICTE rules.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isCritical = item.severity === 'CRITICAL';
            const isWarning = item.severity === 'WARNING';

            const status = item.inspectorStatus || 'PENDING';

            return (
              <div
                key={item.id}
                className={`bg-slate-900/90 rounded-2xl border p-5 shadow-lg space-y-4 transition-all ${
                  isCritical 
                    ? 'border-rose-800/60 hover:border-rose-700/80' 
                    : isWarning 
                    ? 'border-amber-800/60 hover:border-amber-700/80' 
                    : 'border-blue-800/60'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isCritical 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                          : isWarning 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        {isCritical ? <AlertOctagon className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {item.severity} VIOLATION
                      </span>

                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.regulatoryClause}
                      </span>

                      <span className="text-xs text-slate-400 font-medium">
                        Target Field: <strong className="text-slate-200">{item.field}</strong>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white pt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Inspector Status Pill */}
                  <div>
                    {status === 'CONFIRMED' && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Discrepancy Confirmed
                      </span>
                    )}
                    {status === 'OVERRULED' && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Overruled by Inspector
                      </span>
                    )}
                    {status === 'CLARIFICATION_REQUESTED' && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Clarification Sought
                      </span>
                    )}
                    {status === 'PENDING' && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                        Awaiting Inspector Action
                      </span>
                    )}
                  </div>
                </div>

                {/* Conflict Comparison Box (The Crux: Document A vs Document B) */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="text-[11px] uppercase tracking-wider font-mono font-semibold text-slate-400 flex items-center gap-2">
                    <Scale className="w-3.5 h-3.5 text-indigo-400" />
                    Multi-Document Evidence Collision
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(item.foundValues).map(([docName, val], idx) => (
                      <div 
                        key={docName} 
                        className={`rounded-lg p-3 border ${
                          idx === 0 
                            ? 'bg-slate-900/90 border-slate-700' 
                            : 'bg-rose-950/20 border-rose-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 mb-1 truncate">
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{docName}</span>
                        </div>
                        <div className="font-mono text-sm font-bold text-white bg-slate-950/70 p-2 rounded border border-slate-800">
                          {val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Explanation & Regulatory Consequence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 block tracking-wider">
                      AI Audit Analysis & Statutory Risk
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                      Mandated Corrective Action
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {item.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* Inspector Human-in-the-Loop Controls */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction(item.id, 'CONFIRMED')}
                      className="px-3 py-1.5 rounded-lg font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-rose-400" />
                      <span>Confirm Violation</span>
                    </button>

                    <button
                      onClick={() => handleAction(item.id, 'OVERRULED')}
                      className="px-3 py-1.5 rounded-lg font-semibold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Overrule (Exemption Granted)</span>
                    </button>

                    <button
                      onClick={() => handleAction(item.id, 'CLARIFICATION_REQUESTED')}
                      className="px-3 py-1.5 rounded-lg font-semibold text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/60 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Seek College Clarification</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveNoteId(activeNoteId === item.id ? null : item.id)}
                    className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4 cursor-pointer"
                  >
                    {activeNoteId === item.id ? 'Cancel Inspector Note' : '+ Add Scrutiny Officer Note'}
                  </button>
                </div>

                {/* Optional Note Textarea */}
                {activeNoteId === item.id && (
                  <div className="mt-2 space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label className="text-[11px] font-medium text-slate-300">
                      Official Scrutiny Committee Justification Note:
                    </label>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="e.g., Physical scrutiny on 18 Oct confirmed mutation cert under process; granted 15 days cure period..."
                      rows={2}
                      className="w-full text-xs bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction(item.id, (item.inspectorStatus && item.inspectorStatus !== 'PENDING') ? item.inspectorStatus : 'CONFIRMED')}
                        className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs cursor-pointer"
                      >
                        Save Note & Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
