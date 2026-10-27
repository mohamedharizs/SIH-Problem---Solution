import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldAlert, 
  Search, 
  Cpu, 
  FileSearch, 
  Binary, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Users,
  Layers,
  Zap
} from 'lucide-react';
import { InstitutionProfile } from '../types';

interface TamperAnalysisLabProps {
  dossier: InstitutionProfile;
}

export const TamperAnalysisLab: React.FC<TamperAnalysisLabProps> = ({ dossier }) => {
  const [selectedScanMode, setSelectedScanMode] = useState<'METADATA' | 'GHOST_FACULTY' | 'SIGNATURE' | 'SIMULATOR'>('METADATA');
  const [simulatedTamperActive, setSimulatedTamperActive] = useState(false);

  // Mock duplicate faculty scan results
  const ghostFacultyAlerts = [
    {
      name: 'Dr. Anand S. Kulkarni (Professor, Computer Engg)',
      panAadhaarHash: 'XXXX-XXXX-4912',
      conflictInstitutions: [
        { institute: dossier.name, role: 'Full-Time Regular Professor (Declared)', salaryDisbursed: 'Rs. 1,42,000/mo' },
        { institute: 'Vidya Vikas College of Engineering, Nashik', role: 'Full-Time Professor (Claimed in AICTE Portal 2026)', salaryDisbursed: 'Rs. 1,35,000/mo' }
      ],
      verdict: 'DUPLICATE DECLARATION (Ghost Faculty Flag)',
      severity: 'CRITICAL'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Forensic Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                <Binary className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-extrabold text-white">
                Forensic Document Authentication & Tamper Lab
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Cryptographic integrity checks, PDF metadata alteration traces, optical font inconsistency detectors, and centralized duplicate faculty identity audits.
            </p>
          </div>

          {/* Sub-modes */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedScanMode('METADATA')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedScanMode === 'METADATA' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Metadata & Font ELA
            </button>

            <button
              onClick={() => setSelectedScanMode('GHOST_FACULTY')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                selectedScanMode === 'GHOST_FACULTY' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Ghost Faculty Scanner
            </button>

            <button
              onClick={() => setSelectedScanMode('SIGNATURE')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedScanMode === 'SIGNATURE' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              DSC & Stamp Seals
            </button>

            <button
              onClick={() => setSelectedScanMode('SIMULATOR')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                selectedScanMode === 'SIMULATOR' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Tamper Simulator
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Metadata & Font ELA */}
      {selectedScanMode === 'METADATA' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Error Level Analysis (ELA)</span>
                <span className="text-emerald-400 font-mono">0.03 Delta</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[95%]" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Detects pixel compression variations indicating spliced figures or altered survey numbers.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Kerning & Typography Uniformity</span>
                <span className="text-emerald-400 font-mono">98.2%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98%]" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Checks for non-uniform font baselines or foreign font glyphs inserted into government certificates.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Creation vs Modify Timestamp</span>
                <span className="text-amber-400 font-mono">2 Warnings</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[84%]" />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Identifies PDFs created retroactively with backdated computer clocks.
              </p>
            </div>
          </div>

          {/* Dossier Document Integrity Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-purple-400" />
              Document Structural Integrity Breakdown
            </h3>

            <div className="space-y-2">
              {dossier.documents.map((doc) => (
                <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{doc.name}</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Authority: {doc.issuingAuthority} • Size: {doc.fileSize}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Authenticity Index</span>
                      <span className={`font-mono font-bold text-sm ${doc.authenticityScore > 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {doc.authenticityScore}%
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      doc.status === 'VERIFIED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : doc.status === 'EXPIRED'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Ghost Faculty Scanner */}
      {selectedScanMode === 'GHOST_FACULTY' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  All India Centralized Ghost Faculty & Dual-Appointment Cross-Check
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Cross-references declared faculty PAN/Aadhaar biometric hashes against 10,000+ AICTE approved technical colleges nationwide.
                </p>
              </div>

              <span className="text-xs font-mono px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                1 Conflict Detected
              </span>
            </div>

            {ghostFacultyAlerts.map((faculty, idx) => (
              <div key={idx} className="bg-rose-950/20 border border-rose-900/60 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-900/40 pb-2">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-rose-200 block">{faculty.name}</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      National Tax/Biometric Hash: <span className="text-rose-400">{faculty.panAadhaarHash}</span>
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 self-start sm:self-auto">
                    {faculty.verdict}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {faculty.conflictInstitutions.map((c, i) => (
                    <div key={i} className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Institution {i + 1} Declaration
                      </span>
                      <div className="font-semibold text-white">{c.institute}</div>
                      <div className="text-slate-300 text-[11px]">{c.role}</div>
                      <div className="text-emerald-400 font-mono text-[11px] font-medium">{c.salaryDisbursed}</div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-rose-300/90 leading-relaxed bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                  <strong>Regulatory Impact:</strong> Under AICTE APH 2024-27 Clause 4.2.1, full-time regular faculty cannot hold concurrent full-time positions elsewhere. This faculty headcount must be excluded from the SFR cadre calculation.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode 3: Signature & DSC */}
      {selectedScanMode === 'SIGNATURE' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-emerald-400" />
            Digital Signature Certificate (DSC) & Municipal Seal Registry
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Class-3 Digital Signature Validation</span>
              </div>
              <p className="text-slate-300">
                All submitted PDF documents are parsed for X.509 PKCS#7 digital signature containers.
              </p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div>Certifying Authority: (n)Code Solutions CA / eMudhra</div>
                <div>Algorithm: SHA256withRSA (2048 bit)</div>
                <div>OCSP / CRL Revocation Status: VALID & ACTIVE</div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Computer Vision Seal & Watermark Verifier</span>
              </div>
              <p className="text-slate-300">
                Matches official circular rubber seals of Sub-Registrars, Town Planning Authorities, and Fire Services against state geo-registered templates.
              </p>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div>State Emblem Watermark: Detected (True Resolution)</div>
                <div>Municipal Seal Template Match: 96.4% Correlation</div>
                <div>Tamper Artifact Score: 0.02 (Nominal)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: Tamper Simulator (Great for live Hackathon demonstrations!) */}
      {selectedScanMode === 'SIMULATOR' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Live Hackathon Tamper & Forgery Injection Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Demonstrate to the jury how ComplyCheck catches real-world document forgery techniques in real time.
              </p>
            </div>

            <button
              onClick={() => setSimulatedTamperActive(!simulatedTamperActive)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                simulatedTamperActive 
                  ? 'bg-rose-600 hover:bg-rose-500 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {simulatedTamperActive ? 'Disable Tamper Simulation' : 'Inject Simulated Forgery Attack'}
            </button>
          </div>

          {simulatedTamperActive ? (
            <div className="bg-rose-950/30 border border-rose-800/80 rounded-xl p-5 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
                <span>ACTIVE ATTACK SIMULATION: Spliced Plot Area in Land Sale Deed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Original Scanned Deed</span>
                  <div className="font-mono text-slate-300 font-bold text-sm mt-1">Total Plot Area: 2.10 Acres</div>
                  <span className="text-[10px] text-rose-400 block mt-1">Deficit: Fails 2.50 Acre Urban Norm</span>
                </div>

                <div className="bg-rose-950/60 p-3 rounded-lg border border-rose-800">
                  <span className="text-[10px] text-rose-400 uppercase block font-semibold">Forged Modification Injected</span>
                  <div className="font-mono text-rose-200 font-bold text-sm mt-1">Total Plot Area: 7.50 Acres (Modified via PDF Editor)</div>
                  <span className="text-[10px] text-amber-300 block mt-1">Detected via Optical Kerning & Compression Delta!</span>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-400">AICTE AI Engine Response:</span>
                <p className="text-slate-300">
                  Flagged within 0.4 seconds. Flag ID: <span className="text-rose-400 font-mono font-bold">TAMPER-SIM-09</span>. The font metric for the numeral &apos;7&apos; has a divergent baseline of 3.4 pixels, and the JPEG quantisation table differs from the surrounding legal preamble. Application frozen for Forensic Scrutiny.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 text-center text-xs text-slate-400 space-y-2">
              <p>Click the button above to simulate a live document tampering scenario during your hackathon presentation.</p>
              <p className="text-slate-500 font-mono text-[11px]">
                Features demonstrated: Optical Kerning Mismatch, Pixel Compression Artifacts, Cross-Registry Verification.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
