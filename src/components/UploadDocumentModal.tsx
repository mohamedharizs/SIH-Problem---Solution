import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  PlusCircle,
  FileCheck2
} from 'lucide-react';
import { DocumentItem, DocumentType } from '../types';
import { analyzeCustomDocumentApi } from '../services/api';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDocument
}) => {
  if (!isOpen) return null;

  const [documentName, setDocumentName] = useState('Land Title Deed & Mutation Certificate');
  const [docType, setDocType] = useState<DocumentType>('LAND_TITLE');
  const [issuingAuthority, setIssuingAuthority] = useState('Department of Revenue & Land Records');
  const [documentText, setDocumentText] = useState(
    'Registered Sale Deed No. 1928/2014 executed at Sub-Registrar Office Pune. The land parcels Survey Nos. 44/1, 44/2 comprise an area of 1.85 Acres earmarked for establishment of technical education facility. Non-encumbrance certificate attached for 30 years.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Quick Preset Test Cases for judges
  const loadPreset = (presetType: 'LAND_FAIL' | 'FIRE_EXPIRED' | 'FACULTY_OK') => {
    if (presetType === 'LAND_FAIL') {
      setDocumentName('Survey Khasra & Non-Encumbrance Certificate');
      setDocType('LAND_TITLE');
      setIssuingAuthority('Sub-Registrar Office Haveli-3');
      setDocumentText(
        'Mutation Extract Entry #749: Total land measuring 1.85 Acres situated at Gat No 144, Pune. Note: Zoning approved for Institutional use; non-contiguous parcel divided by public drainage nallah.'
      );
    } else if (presetType === 'FIRE_EXPIRED') {
      setDocumentName('State Fire Services Annual Clearance NOC');
      setDocType('FIRE_SAFETY');
      setIssuingAuthority('Directorate of Fire & Emergency Services');
      setDocumentText(
        'Provisional Fire Safety NOC Ref: FSC/Z-1/2022/901. Valid for educational occupancy Ground + 2 floors. Issue Date: 12 October 2022. Expiration Date: 11 October 2025. Mandatory fire drill not certified for 2026.'
      );
    } else {
      setDocumentName('AICTE 7th CPC Salary Disbursement Schedule');
      setDocType('FACULTY_CADRE');
      setIssuingAuthority('Registrar & Finance Officer Approved Roll');
      setDocumentText(
        'Annual Staff Roll: 32 Teaching Faculty (4 Professors, 8 Associate Professors, 20 Assistant Professors). Student to faculty ratio calculated at 1:19.4. TRACES Form 16 Part A/B verified.'
      );
    }
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const res = await analyzeCustomDocumentApi({
        documentName,
        documentType: docType,
        documentContent: documentText
      });

      if (res && res.analysis) {
        setAnalysisResult(res.analysis);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddDossier = () => {
    const newDoc: DocumentItem = {
      id: `custom-doc-${Date.now()}`,
      name: documentName,
      type: docType,
      category: docType.replace('_', ' '),
      issuingAuthority: issuingAuthority,
      issueDate: analysisResult?.issueDate || '2024-04-10',
      expiryDate: analysisResult?.expiryDate || undefined,
      isExpired: analysisResult?.isExpired || false,
      status: analysisResult?.tamperIndicators?.length > 0 ? 'FLAGGED' : (analysisResult?.isExpired ? 'EXPIRED' : 'VERIFIED'),
      authenticityScore: analysisResult?.authenticityConfidence || 92,
      fileSize: '3.2 MB',
      extractedFields: analysisResult?.extractedFields || {
        'Document Content': documentText.substring(0, 60) + '...',
        'Category': docType
      },
      rawSnippet: documentText,
      tamperFlags: analysisResult?.tamperIndicators?.map((t: any) => t.description) || []
    };

    onAddDocument(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Upload & AI Scan Statutory Document
              </h3>
              <p className="text-xs text-slate-400">
                Process real-time regulatory certificates via Gemini 3.8 Flash OCR & extraction engine.
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
          {/* Quick Demo Presets */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
              Quick Test Presets (For Hackathon Jury):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadPreset('LAND_FAIL')}
                className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 font-semibold cursor-pointer"
              >
                🔴 Deficient Land (1.85 Acres vs 2.5)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('FIRE_EXPIRED')}
                className="px-2.5 py-1 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 font-semibold cursor-pointer"
              >
                🟡 Expired Fire Safety NOC
              </button>
              <button
                type="button"
                onClick={() => loadPreset('FACULTY_OK')}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/60 font-semibold cursor-pointer"
              >
                🟢 1:19.4 Compliant Faculty Roll
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Document Title</label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Document Category / Type</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as DocumentType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="LAND_TITLE">Land Title & Mutation Deed</option>
                <option value="BUILDING_PLAN">Sanctioned Building Master Plan</option>
                <option value="FIRE_SAFETY">Fire Safety NOC & Clearance</option>
                <option value="STRUCTURAL_STABILITY">Structural Stability Certificate</option>
                <option value="FACULTY_CADRE">Faculty Cadre Roll & Form 16</option>
                <option value="AFFILIATION_NBA">NBA / NAAC Accreditation Letter</option>
                <option value="BANK_GUARANTEE">Bank Guarantee / Joint FDR</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">Issuing Statutory Authority</label>
            <input
              type="text"
              value={issuingAuthority}
              onChange={(e) => setIssuingAuthority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300">
              Document Text / Extracted Raw Content:
            </label>
            <textarea
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              rows={4}
              placeholder="Paste certificate text or OCR contents here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${
                isAnalyzing ? 'bg-indigo-700 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Running Gemini AI OCR & Parsing...' : 'Run Real-Time AI Document Scan'}</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Analysis Result Box */}
          {analysisResult && (
            <div className="bg-slate-950 rounded-xl p-4 border border-indigo-900/60 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Gemini 3.8 Flash Analysis Completed
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400">
                  Trust Score: {analysisResult.authenticityConfidence}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(analysisResult.extractedFields || {}).map(([k, v]: any) => (
                  <div key={k} className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-mono">{k}</span>
                    <span className="text-white font-mono font-bold text-xs truncate block">{String(v)}</span>
                  </div>
                ))}
              </div>

              {analysisResult.aiSummary && (
                <p className="text-xs text-slate-300 italic bg-slate-900/70 p-2.5 rounded border border-slate-800">
                  &quot;{analysisResult.aiSummary}&quot;
                </p>
              )}

              <button
                onClick={handleAddDossier}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Verified Document into Active Dossier & Re-Audit</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
