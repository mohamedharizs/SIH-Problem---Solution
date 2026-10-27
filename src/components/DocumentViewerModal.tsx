import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Fingerprint, 
  Download, 
  Building2, 
  Calendar,
  Layers,
  Stamp
} from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose
}) => {
  if (!document) return null;

  const isExpired = document.status === 'EXPIRED' || document.isExpired;
  const isFlagged = document.status === 'FLAGGED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {document.category}
                </span>
                {isExpired ? (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Expired Certificate
                  </span>
                ) : isFlagged ? (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Discrepancy Flagged
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Digitally Validated
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {document.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Simulated Official Government Document View */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Original Document Artifact Preview
              </span>

              {/* Styled Official Gov Paper Canvas */}
              <div className="bg-amber-50/95 text-slate-900 rounded-xl p-6 shadow-inner border border-amber-200/60 font-serif relative overflow-hidden min-h-[380px] select-none">
                {/* Simulated Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-center">
                  <div className="text-6xl font-black font-sans uppercase rotate-[-25deg]">
                    GOVERNMENT OF INDIA
                  </div>
                </div>

                {/* Gov Header on Document */}
                <div className="text-center border-b border-amber-900/30 pb-3 mb-4 space-y-0.5">
                  <div className="text-xs uppercase font-bold tracking-widest text-amber-950 font-sans">
                    सत्यमेव जयते
                  </div>
                  <div className="text-sm font-extrabold uppercase text-amber-950 tracking-wide">
                    {document.issuingAuthority}
                  </div>
                  <div className="text-[11px] text-amber-800 font-sans">
                    Statutory Registration & Regulatory Certification
                  </div>
                </div>

                {/* Certificate Number & Date */}
                <div className="flex justify-between text-xs text-amber-950 mb-4 font-sans font-medium border-b border-amber-200 pb-2">
                  <span>Certificate Ref: <strong className="font-mono">{document.id.toUpperCase()}</strong></span>
                  <span>Date: <strong>{document.issueDate}</strong></span>
                </div>

                {/* Document Main Snippet with Highlighted Box */}
                <div className="space-y-3 text-xs leading-relaxed text-amber-950">
                  <p className="italic">
                    &quot;{document.rawSnippet || 'This is to certify that upon verification of the premises, architectural drawings, and statutory compliances under the relevant regulatory acts, the aforementioned sanction is hereby granted.'}&quot;
                  </p>

                  {/* Highlighted Bounding Box Area */}
                  <div className="bg-amber-200/70 border-2 border-dashed border-amber-600 rounded-lg p-3 space-y-1 relative font-sans">
                    <span className="text-[10px] uppercase font-bold text-amber-900 block tracking-wider">
                      AI OCR Extracted Verification Zone
                    </span>
                    <div className="text-xs font-mono font-bold text-slate-950 space-y-0.5">
                      {Object.entries(document.extractedFields).slice(0, 3).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-amber-900">{k}:</span>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-900/80">
                    Issued under the authority of the competent officer. Any alteration or erasure renders this certificate null and void.
                  </p>
                </div>

                {/* Official Stamp & Sign */}
                <div className="mt-8 pt-4 border-t border-amber-900/20 flex items-center justify-between font-sans">
                  <div className="w-16 h-16 rounded-full border-2 border-indigo-900/40 flex items-center justify-center text-center p-1 text-[9px] uppercase font-bold text-indigo-950 rotate-[-12deg]">
                    Official Seal<br />Verified
                  </div>

                  <div className="text-right text-[11px] text-amber-950">
                    <div className="font-script text-lg text-indigo-950 font-bold italic">
                      DigiSign Verified
                    </div>
                    <div className="font-semibold">Competent Regulatory Authority</div>
                    <div className="text-[10px] text-amber-800 font-mono">Timestamp: {document.issueDate} 11:42 IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Extraction & Tamper Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-slate-400 flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
                Parsed Structured Entities
              </span>

              {/* Key-Value Breakdown */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2 text-xs">
                {Object.entries(document.extractedFields).map(([key, value]) => (
                  <div key={key} className="flex flex-col py-1.5 border-b border-slate-800/80 last:border-0">
                    <span className="text-slate-400 text-[11px] font-medium">{key}</span>
                    <span className="text-white font-mono font-bold text-xs mt-0.5">{value}</span>
                  </div>
                ))}
              </div>

              {/* Cryptographic & Forensic Analysis */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3 text-xs">
                <span className="text-[10px] uppercase font-bold text-indigo-400 block tracking-wider">
                  Cryptographic Trust Details
                </span>

                <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Authenticity Score:</span>
                    <span className="text-emerald-400 font-bold">{document.authenticityScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">File Payload:</span>
                    <span>{document.fileSize} (PDF/A Compliant)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Digital Seal:</span>
                    <span className="text-indigo-300">X.509 e-Mudhra Valid</span>
                  </div>
                </div>

                {document.tamperFlags && document.tamperFlags.length > 0 && (
                  <div className="bg-rose-950/40 border border-rose-800/60 rounded-lg p-2.5 text-xs text-rose-300 space-y-1">
                    <span className="font-bold text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Discrepancy Note:
                    </span>
                    <p className="text-[11px] leading-relaxed text-rose-200">
                      {document.tamperFlags[0]}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Document ID: {document.id}
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
