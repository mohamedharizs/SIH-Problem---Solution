import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Terminal, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Target, 
  BookOpen, 
  Share2, 
  ChevronRight,
  ShieldCheck,
  FileCode2,
  Mic
} from 'lucide-react';

interface HackathonGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonGuideModal: React.FC<HackathonGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ARCHITECTURE' | 'FEATURES' | 'PITCH_SCRIPT' | 'JUDGE_QA'>('OVERVIEW');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SIH26261 Master Blueprint
                </span>
                <span className="text-xs text-slate-400">Hackathon Pitch & Technical Guide</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                ComplyCheck AICTE — Technical Breakdown & Judge Ready Deck
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

        {/* Tab Navigator */}
        <div className="flex items-center space-x-1 px-4 sm:px-6 pt-3 border-b border-slate-800/80 bg-slate-950/30 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'OVERVIEW'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Problem Context & ROI
          </button>
          <button
            onClick={() => setActiveTab('ARCHITECTURE')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'ARCHITECTURE'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. System Architecture
          </button>
          <button
            onClick={() => setActiveTab('FEATURES')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'FEATURES'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Structured Feature List
          </button>
          <button
            onClick={() => setActiveTab('PITCH_SCRIPT')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'PITCH_SCRIPT'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4. 2-Min Pitch Script
          </button>
          <button
            onClick={() => setActiveTab('JUDGE_QA')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'JUDGE_QA'
                ? 'border-indigo-500 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            5. Judge Q&A Defense
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono tracking-wider">
                  The Problem Statement
                </span>
                <h4 className="text-sm font-bold text-white">
                  SIH26261: AI-Powered Application Validation, Document Authentication and Regulatory Compliance Verification (AICTE)
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Every year, over 12,000 engineering, management, and technical colleges in India submit voluminous institutional dossiers for Extension of Approval (EoA) or new programs. AICTE scrutiny committees manually verify thousands of physical and digital records: land deeds, municipal floor plans, fire clearances, structural stability certificates, and faculty payrolls.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-rose-400 font-bold block text-sm">3-4 Weeks &rarr; 45 Sec</span>
                  <span className="text-[11px] text-slate-400 leading-snug block">
                    Reduces dossier scrutiny turnaround time from 25 days of manual inspection down to under 1 minute.
                  </span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block text-sm">Eliminates Cross-Doc Fraud</span>
                  <span className="text-[11px] text-slate-400 leading-snug block">
                    Catches subtle inconsistencies like 7.5 Acres in land deed vs 5.2 Acres in municipal master plan.
                  </span>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block text-sm">Prevents Ghost Faculty</span>
                  <span className="text-[11px] text-slate-400 leading-snug block">
                    Cross-references faculty tax IDs across thousands of institutions to eradicate fraudulent dual-employment.
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono tracking-wider">
                  Why This Wins Hackathons:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-300">
                  <li><strong>Real National Impact:</strong> Directly aligns with National Education Policy (NEP 2020) and AICTE Digital India governance.</li>
                  <li><strong>Not just generic OCR:</strong> Most teams just show basic Tesseract text extraction. ComplyCheck demonstrates <em>multi-document relational reconciliation</em>, which solves the actual regulatory bottleneck.</li>
                  <li><strong>Human-in-the-Loop Governance:</strong> Regulatory officers maintain full judicial oversight, preventing AI hallucination liability.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'ARCHITECTURE' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] leading-relaxed text-indigo-300 overflow-x-auto">
                <div className="text-white font-bold mb-2">Technical Data Pipeline:</div>
                <pre>{`[Institutional Dossier Upload: PDFs, JPEGs, Scans]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. INGESTION & DOCUMENT FORENSICS (Client/Server)           │
│    • PDF/A Structure Parser & Metadata Inspector            │
│    • Error Level Analysis (ELA) & Font Kerning Detector     │
│    • X.509 PKCS#7 Digital Signature & DSC Validator         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. REASONING & OCR EXTRACTION ENGINE                        │
│    • Gemini 3.8 Flash LLM with Strict Structured JSON Mode  │
│    • Entity Mapping: Land Area, Khasra/Survey, Issuing Dept,│
│      Valid Upto Dates, Faculty Headcount & Pay Scale        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. CROSS-DOCUMENT RECONCILIATION GRAPH (Core SIH Innovation)│
│    • Multi-way field comparison (Doc A vs Doc B vs Doc C)   │
│    • Discrepancy Matrix: Land vs Plan; Floor Count vs Fire; │
│      Intake vs Faculty SFR; Trust Name Variations           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. AICTE APH 2024-27 REGULATORY CLAUSE ENGINE              │
│    • Evaluates Clauses 1.4, 2.2, 3.1, 4.1, 5.3 against norms│
│    • Generates 0-100 Assurance Score & Verdict              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. HUMAN-IN-THE-LOOP SCRUTINY & AUDIT TRAIL                 │
│    • Inspector Overrule/Justification Log (Immutable SHA256)│
│    • Instant Signed AICTE Compliance Certificate (PDF/QR)   │
└─────────────────────────────────────────────────────────────┘`}</pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Tech Stack</span>
                  <div className="text-slate-400 space-y-0.5">
                    <div>• <strong>Frontend:</strong> React 19 + TypeScript + Tailwind CSS</div>
                    <div>• <strong>Backend:</strong> Node.js + Express Server Proxy</div>
                    <div>• <strong>AI Engine:</strong> @google/genai (Gemini 3.8 Flash)</div>
                    <div>• <strong>Export Engine:</strong> jsPDF + HTML Canvas rendering</div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Security & Compliance</span>
                  <div className="text-slate-400 space-y-0.5">
                    <div>• Zero UI API Key leakage (Server-side proxy)</div>
                    <div>• Cryptographic SHA-256 verification hash</div>
                    <div>• Deterministic fallback so live demos never fail</div>
                    <div>• Full offline / local execution capability</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FEATURES */}
          {activeTab === 'FEATURES' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white">Full Feature Matrix for SIH Hackathon:</h4>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">1. Multi-Document Cross-Verification Engine</strong>
                      <span className="text-slate-400">
                        Automatically links disparate certificates (Title Deed, Master Plan, Fire NOC, Faculty Roll) and identifies hidden discrepancies that single-document OCR miss.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">2. AICTE Approval Process Handbook (APH 2024-27) Rule Evaluator</strong>
                      <span className="text-slate-400">
                        Evaluates statutory clauses for Metro vs Urban vs Rural land requirements, student-faculty ratios (1:20), 1:2:6 cadre, barrier-free accessibility, and fire safety.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">3. Forensic Tamper & Anomaly Lab</strong>
                      <span className="text-slate-400">
                        Detects altered font baselines/kerning, manipulated plot figures, expired clearances, and ghost faculty listed across multiple technical institutions.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">4. Interactive Human-in-the-Loop Scrutiny Desk</strong>
                      <span className="text-slate-400">
                        Allows scrutiny officers to confirm violations, overrule with official justification notes, or issue instant show-cause clarification notices.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">5. Instant Cryptographically Signed PDF Verification Certificate</strong>
                      <span className="text-slate-400">
                        One-click PDF generation featuring AICTE emblem styling, QR verification hash, breakdown score, and formal Scrutiny Committee recommendation.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PITCH SCRIPT */}
          {activeTab === 'PITCH_SCRIPT' && (
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Mic className="w-4 h-4" />
                <span>2-Minute Hackathon Winning Pitch Script (Memorize This!)</span>
              </div>

              <div className="space-y-3 text-slate-300 leading-relaxed text-xs">
                <p>
                  <strong className="text-white">[0:00 - 0:25] THE HOOK:</strong><br />
                  &quot;Respected Judges, every year over 12,000 engineering and technical institutions apply to AICTE for approvals. Over 1.5 million statutory documents—land deeds, architectural drawings, fire clearances, and faculty registers—are scrutinized by hand. It takes 4 weeks, costs crores, and worst of all: manual scrutiny misses subtle cross-document fraud, like a college claiming 7.5 acres in a deed but only having 5.2 acres in the municipal plan, or deploying &apos;ghost faculty&apos; registered in two colleges at once.&quot;
                </p>

                <p>
                  <strong className="text-white">[0:25 - 0:55] THE SOLUTION:</strong><br />
                  &quot;We present <strong>ComplyCheck AICTE</strong>—an AI-powered regulatory compliance engine for SIH26261. Unlike standard OCR tools that look at one document in isolation, ComplyCheck builds a <em>Cross-Document Relational Graph</em>. Powered by Gemini 3.8 Flash, it ingests the entire institutional dossier, extracts structured entities, and cross-reconciles them directly against the official AICTE Approval Process Handbook (APH 2024-27).&quot;
                </p>

                <p>
                  <strong className="text-white">[0:55 - 1:35] THE LIVE DEMO WALKTHROUGH:</strong><br />
                  &quot;Let us show you Case A: Apex Institute of Technology. In 5 seconds, ComplyCheck catches three critical violations: First, a 2.3-Acre land mismatch between the Land Deed and Municipal Plan. Second, a Fire NOC expired 9 months ago. Third, a 1:24 faculty cadre deficit. The inspector can inspect the original scanned documents, confirm or overrule with an immutable justification note, and export an official cryptographically hashed AICTE verification certificate with one click.&quot;
                </p>

                <p>
                  <strong className="text-white">[1:35 - 2:00] THE IMPACT:</strong><br />
                  &quot;ComplyCheck transforms a 4-week manual backlog into a 45-second automated pre-scrutiny, saving millions of hours, preventing safety disasters, and ensuring complete statutory transparency for Indian higher education. Thank you!&quot;
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: JUDGE Q&A */}
          {activeTab === 'JUDGE_QA' && (
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h5 className="font-bold text-amber-300 text-xs">
                  Q1: &quot;How does your system handle poor quality, wrinkled, or low-resolution scanned stamp papers?&quot;
                </h5>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Answer:</strong> We use an adaptive preprocessing pipeline: contrast stretching, deskewing, and binarization before multimodal Gemini 3.8 Flash processing. Gemini&apos;s multimodal vision leverages contextual semantic reasoning, meaning even if a stamp paper has slight ink bleeding, surrounding legal phrases allow high-confidence entity reconstruction.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h5 className="font-bold text-amber-300 text-xs">
                  Q2: &quot;What if AICTE modifies the Approval Process Handbook rules next year? Do you have to rewrite code?&quot;
                </h5>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Answer:</strong> Not at all! ComplyCheck is built on a <em>declarative regulatory rule engine</em>. Our Settings Configurator allows administrators to adjust thresholds (such as 1:20 to 1:15 SFR or land minimums) without touching the codebase. The LLM prompt dynamically receives the active handbook ruleset as constraints.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h5 className="font-bold text-amber-300 text-xs">
                  Q3: &quot;Can the AI make a mistake and unfairly reject a college?&quot;
                </h5>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Answer:</strong> ComplyCheck is strictly <em>Human-in-the-Loop</em>. The AI never unilaterally rejects an institution—it generates an evidence-backed Scrutiny Advisory. The human Scrutiny Officer can overrule any finding, add rationale to the immutable audit trail, or request a 30-day clarification from the institution.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h5 className="font-bold text-amber-300 text-xs">
                  Q4: &quot;How does your Ghost Faculty detection work across institutions?&quot;
                </h5>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  <strong>Answer:</strong> We hash sensitive biometric and tax identifiers (PAN, Aadhaar, EPF account numbers) with salted SHA-256 to protect privacy under the DPDP Act 2023. This allows instantaneous cross-institution matching across the national central index without exposing unencrypted personal data.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Smart India Hackathon • Problem Statement SIH26261
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Ready to Pitch
          </button>
        </div>

      </div>
    </div>
  );
};
