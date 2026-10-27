import React from 'react';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck2, 
  Upload, 
  Eye, 
  ShieldAlert,
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import { InstitutionProfile, DocumentItem } from '../types';

interface DossierOverviewProps {
  dossier: InstitutionProfile;
  onViewDocument: (doc: DocumentItem) => void;
  onOpenUpload: () => void;
  onNavigateToDiscrepancies: () => void;
  discrepancyCount: number;
}

export const DossierOverview: React.FC<DossierOverviewProps> = ({
  dossier,
  onViewDocument,
  onOpenUpload,
  onNavigateToDiscrepancies,
  discrepancyCount
}) => {
  const verifiedCount = dossier.documents.filter(d => d.status === 'VERIFIED').length;
  const flaggedCount = dossier.documents.filter(d => d.status === 'FLAGGED' || d.status === 'EXPIRED').length;

  return (
    <div className="space-y-6">
      {/* Institution Master Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/80 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {dossier.applicationType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                AICTE ID: {dossier.aictePermanentId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
                App No: {dossier.applicationNumber}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {dossier.name}
            </h2>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-indigo-400" />
                <strong className="text-slate-300">Society/Trust:</strong> {dossier.societyTrustName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {dossier.district}, {dossier.state} ({dossier.locationCategory} Category)
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Est. {dossier.establishedYear}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Total Requested Intake: <strong className="text-emerald-300">{dossier.totalIntakeRequested} Seats</strong>
              </span>
            </div>
          </div>

          {/* Quick Status Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {discrepancyCount > 0 ? (
              <button
                onClick={onNavigateToDiscrepancies}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-rose-950/40 border border-rose-800/70 text-rose-200 hover:bg-rose-900/50 transition-all text-left shadow-lg group cursor-pointer"
              >
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Cross-Doc Attention Needed
                  </div>
                  <div className="text-sm font-extrabold text-rose-100">
                    {discrepancyCount} Critical Discrepancies
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="px-4 py-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200">
                <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Dossier Coherence
                </div>
                <div className="text-sm font-extrabold text-emerald-100">
                  All Records Reconciled
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Total Dossier Documents</span>
            <span className="text-xl font-bold text-white font-mono">{dossier.documents.length} Files</span>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Digitally Reconciled</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{verifiedCount} Validated</span>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Flagged / Deficient</span>
            <span className={`text-xl font-bold font-mono ${flaggedCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
              {flaggedCount} Document{flaggedCount !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Audit Session Status</span>
            <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Automated Pre-Scrutiny Active
            </span>
          </div>
        </div>
      </div>

      {/* Documents Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-indigo-400" />
            Statutory Document Repository
          </h3>
          <p className="text-xs text-slate-400">
            Extracted entities, issuing authority verification, and optical tamper assessment per AICTE norms.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-600/20 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload & Scan New Document</span>
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dossier.documents.map((doc) => {
          const isExpired = doc.status === 'EXPIRED' || doc.isExpired;
          const isFlagged = doc.status === 'FLAGGED';
          const isVerified = doc.status === 'VERIFIED';

          return (
            <div
              key={doc.id}
              className={`rounded-xl border p-4 bg-slate-900/70 hover:bg-slate-900 transition-all flex flex-col justify-between shadow-md group ${
                isExpired 
                  ? 'border-rose-900/70 hover:border-rose-700/80 shadow-rose-950/20' 
                  : isFlagged 
                  ? 'border-amber-900/60 hover:border-amber-700/80 shadow-amber-950/20' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Category & Status */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {doc.category}
                  </span>

                  {isExpired ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      <Clock className="w-3 h-3" /> EXPIRED
                    </span>
                  ) : isFlagged ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <AlertTriangle className="w-3 h-3" /> FLAGGED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>

                {/* Document Title */}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    Authority: {doc.issuingAuthority}
                  </p>
                </div>

                {/* Extracted Key-Value Chips */}
                <div className="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                    AI Extracted Regulatory Entities
                  </div>
                  {Object.entries(doc.extractedFields).slice(0, 3).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-slate-400 truncate">{key}:</span>
                      <span className="text-slate-200 font-mono font-medium truncate max-w-[160px] text-right">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tamper / Warning Alert if flagged */}
                {doc.tamperFlags && doc.tamperFlags.length > 0 && (
                  <div className="bg-rose-950/30 border border-rose-800/40 rounded-lg p-2 text-[11px] text-rose-300 space-y-1">
                    <div className="flex items-center gap-1 font-semibold text-rose-400">
                      <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>Regulatory Warning</span>
                    </div>
                    <p className="text-rose-200/90 text-[10px] leading-snug">
                      {doc.tamperFlags[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Trust Score: <strong className="text-slate-200 font-mono">{doc.authenticityScore}%</strong></span>
                </div>

                <button
                  onClick={() => onViewDocument(doc)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 py-1 px-2.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-800/50 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
