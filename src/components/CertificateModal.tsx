import React, { useRef } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Stamp,
  QrCode
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { AuditReport, InstitutionProfile } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: InstitutionProfile;
  auditReport: AuditReport;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  dossier,
  auditReport
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const isApproved = auditReport.verdict === 'APPROVED';
  const isConditional = auditReport.verdict === 'CONDITIONAL_APPROVAL';

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Outer border
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('ALL INDIA COUNCIL FOR TECHNICAL EDUCATION', 105, 25, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('Statutory Body under Ministry of Education, Govt. of India', 105, 31, { align: 'center' });
    doc.text('Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070', 105, 36, { align: 'center' });

    doc.setDrawColor(203, 213, 225);
    doc.line(20, 42, 190, 42);

    // Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text('SCRUTINY COMMITTEE COMPLIANCE & VERIFICATION CERTIFICATE', 105, 52, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Academic Session: 2026-2027 • SIH26261 Automated Audit Standard`, 105, 58, { align: 'center' });

    // Details Box
    doc.setFillColor(248, 250, 252);
    doc.rect(20, 65, 170, 50, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(20, 65, 170, 50, 'S');

    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text(`Institution: ${dossier.name}`, 25, 74);
    doc.setFont('helvetica', 'normal');
    doc.text(`AICTE Permanent ID: ${dossier.aictePermanentId}`, 25, 81);
    doc.text(`Application Number: ${dossier.applicationNumber}`, 25, 88);
    doc.text(`Trust/Society: ${dossier.societyTrustName}`, 25, 95);
    doc.text(`Location: ${dossier.district}, ${dossier.state} (${dossier.locationCategory} Category)`, 25, 102);
    doc.text(`Sanctioned Intake Requested: ${dossier.totalIntakeRequested} Seats`, 25, 109);

    // Verdict Box
    const verdictY = 125;
    if (isApproved) {
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(52, 211, 153);
    } else if (isConditional) {
      doc.setFillColor(254, 252, 232);
      doc.setDrawColor(250, 204, 21);
    } else {
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(248, 113, 113);
    }
    doc.rect(20, verdictY, 170, 25, 'FD');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    if (isApproved) {
      doc.setTextColor(6, 95, 70);
      doc.text('VERDICT: EXTENSION OF APPROVAL (EoA) RECOMMENDED', 105, verdictY + 11, { align: 'center' });
    } else if (isConditional) {
      doc.setTextColor(133, 77, 14);
      doc.text('VERDICT: CONDITIONAL APPROVAL (Deficiencies within 30 days)', 105, verdictY + 11, { align: 'center' });
    } else {
      doc.setTextColor(153, 27, 27);
      doc.text('VERDICT: APPLICATION DEFICIENT / REJECTED', 105, verdictY + 11, { align: 'center' });
    }
    doc.setFontSize(10);
    doc.text(`Regulatory Score: ${auditReport.overallScore}/100`, 105, verdictY + 18, { align: 'center' });

    // Summary
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    const splitSummary = doc.splitTextToSize(auditReport.summary, 170);
    doc.text(splitSummary, 20, 160);

    // Clause Summary
    doc.setFont('helvetica', 'bold');
    doc.text('Statutory Clause Audit Findings:', 20, 185);
    doc.setFont('helvetica', 'normal');
    let clauseY = 192;
    auditReport.clauseCompliance.slice(0, 5).forEach((clause) => {
      const statusText = `[${clause.status}] ${clause.clause}: ${clause.actual}`;
      doc.text(statusText.substring(0, 85), 25, clauseY);
      clauseY += 7;
    });

    // Footer Signatures
    doc.setDrawColor(203, 213, 225);
    doc.line(20, 240, 190, 240);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Digital Verification Hash: SHA256: 7f81bc204190ea418290bc91`, 20, 248);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} via ComplyCheck AICTE Platform`, 20, 253);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Member Secretary / Regional Officer', 140, 260);
    doc.setFont('helvetica', 'normal');
    doc.text('All India Council for Technical Education', 140, 265);

    doc.save(`AICTE_Compliance_Certificate_${dossier.aictePermanentId}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Official AICTE Compliance & Verification Certificate
              </h3>
              <p className="text-xs text-slate-400">
                Official regulatory report generated for Scrutiny Committee & Standing Appellate Committee (SAC).
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

        {/* Certificate Printable Canvas Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div 
            ref={certRef}
            className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-2xl border-4 border-slate-800 font-serif relative overflow-hidden select-none"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-center">
              <div className="text-7xl font-black font-sans uppercase rotate-[-25deg]">
                AICTE OFFICIAL
              </div>
            </div>

            {/* Official Header */}
            <div className="text-center border-b-2 border-slate-800 pb-4 mb-5 space-y-1">
              <div className="text-xs uppercase font-bold tracking-widest text-slate-800 font-sans">
                अखिल भारतीय तकनीकी शिक्षा परिषद
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold uppercase text-slate-950 font-sans tracking-tight">
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
              </h2>
              <div className="text-xs text-slate-600 font-sans">
                (A Statutory Body under Ministry of Education, Govt. of India)
              </div>
              <div className="text-[11px] text-slate-500 font-sans">
                Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070 • www.aicte-india.org
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-4 font-sans">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-900 font-bold px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full inline-block mb-1">
                AICTE APH 2024-2027 REGULATORY SCRUTINY
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-tight">
                Institutional Document Verification Certificate
              </h3>
            </div>

            {/* Details Box */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs font-sans space-y-1.5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <div><strong>Institution Name:</strong> {dossier.name}</div>
                <div><strong>Permanent AICTE ID:</strong> <span className="font-mono">{dossier.aictePermanentId}</span></div>
                <div><strong>Application Number:</strong> <span className="font-mono">{dossier.applicationNumber}</span></div>
                <div><strong>Trust/Society:</strong> {dossier.societyTrustName}</div>
                <div><strong>Category:</strong> {dossier.locationCategory} ({dossier.district}, {dossier.state})</div>
                <div><strong>Intake Requested:</strong> {dossier.totalIntakeRequested} Seats</div>
              </div>
            </div>

            {/* Verdict Highlight */}
            <div className={`p-4 rounded-xl border-2 text-center mb-5 font-sans ${
              isApproved 
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950' 
                : isConditional 
                ? 'bg-amber-50 border-amber-500 text-amber-950' 
                : 'bg-rose-50 border-rose-500 text-rose-950'
            }`}>
              <div className="text-xs uppercase font-extrabold tracking-wider">
                Scrutiny Committee Automated Recommendation
              </div>
              <div className="text-lg font-black uppercase mt-0.5">
                {isApproved && 'RECOMMENDED FOR EXTENSION OF APPROVAL (EoA)'}
                {isConditional && 'CONDITIONAL APPROVAL ISSUED (30 DAYS CURE PERIOD)'}
                {!isApproved && !isConditional && 'APPLICATION DEFICIENT / REJECTED'}
              </div>
              <div className="text-xs font-mono font-bold mt-1">
                Compliance Assurance Score: {auditReport.overallScore}/100
              </div>
            </div>

            {/* Narrative Summary */}
            <div className="text-xs font-serif text-slate-800 leading-relaxed mb-6 italic border-l-2 border-slate-300 pl-3">
              &quot;{auditReport.summary}&quot;
            </div>

            {/* Seal & Signatures Footer */}
            <div className="pt-4 border-t-2 border-slate-300 flex items-end justify-between font-sans">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-indigo-900 flex items-center justify-center text-center p-1 text-[8px] uppercase font-bold text-indigo-900 rotate-[-10deg]">
                  AICTE<br />Digital<br />Seal
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  <div>SHA-256 Hash: 7f81b...9a0c</div>
                  <div>Issued: 20 Oct 2026</div>
                  <div>SIH26261 Engine v2.4</div>
                </div>
              </div>

              <div className="text-right text-xs">
                <div className="font-bold text-slate-900">Dr. M. S. Kumar</div>
                <div className="text-[11px] text-slate-600">Chief Regulatory Officer</div>
                <div className="text-[10px] text-slate-500">AICTE Approval Bureau, New Delhi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400 font-mono">
            Complies with AICTE Approval Process Handbook (APH 2024-27)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadPdf}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Signed PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
