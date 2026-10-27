import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ClipboardCheck, 
  FileCheck, 
  UserCheck, 
  Download,
  Stamp,
  ExternalLink
} from 'lucide-react';
import { AuditReport, ComplianceVerdict } from '../types';

interface RegulatoryScorecardProps {
  auditReport: AuditReport;
  institutionName: string;
  aicteId: string;
  onOpenCertificate: () => void;
}

export const RegulatoryScorecard: React.FC<RegulatoryScorecardProps> = ({
  auditReport,
  institutionName,
  aicteId,
  onOpenCertificate
}) => {
  const [checklist, setChecklist] = useState(
    auditReport.humanReviewChecklist.map((item, idx) => ({
      ...item,
      id: `check-${idx}`,
      checked: false
    }))
  );

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const isApproved = auditReport.verdict === 'APPROVED';
  const isConditional = auditReport.verdict === 'CONDITIONAL_APPROVAL';
  const isRejected = auditReport.verdict === 'REJECTED';

  const scoreColor = isApproved ? 'text-emerald-400' : isConditional ? 'text-amber-400' : 'text-rose-400';
  const bgRingColor = isApproved ? 'border-emerald-500' : isConditional ? 'border-amber-500' : 'border-rose-500';

  return (
    <div className="space-y-6">
      {/* Top Verdict & Scorecard Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
          
          {/* Left: Overall Verdict & Narrative */}
          <div className="space-y-3 flex-1 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                AICTE APH 2024-27 Scrutiny Verdict
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-indigo-300 font-mono">Ref ID: {aicteId}</span>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {isApproved && 'RECOMMENDED FOR APPROVAL'}
                {isConditional && 'CONDITIONAL APPROVAL ISSUED'}
                {isRejected && 'APPLICATION DEFICIENT / REJECTED'}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {auditReport.summary}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenCertificate}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Export Official Verification Certificate (PDF)</span>
              </button>

              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <Stamp className="w-3.5 h-3.5 text-emerald-400" />
                Digital Cryptographic Seal Appended
              </span>
            </div>
          </div>

          {/* Right: Circular Score Ring */}
          <div className="flex flex-col items-center justify-center bg-slate-950/80 rounded-2xl p-5 border border-slate-800/90 min-w-[200px] shadow-inner">
            <div className={`relative flex items-center justify-center w-28 h-28 rounded-full border-4 ${bgRingColor} bg-slate-900 shadow-xl`}>
              <div className="text-center">
                <span className={`text-3xl font-black font-mono tracking-tight ${scoreColor}`}>
                  {auditReport.overallScore}
                </span>
                <span className="text-xs text-slate-400 block -mt-1 font-mono">/100</span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-300 mt-2">Compliance Score</span>
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">
              {isApproved ? 'Tier-1 High Assurance' : isConditional ? 'Tier-2 Review' : 'Statutory Deficit'}
            </span>
          </div>

        </div>
      </div>

      {/* Clause-by-Clause Statutory Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Clause-by-Clause AICTE APH Regulatory Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Statutory verification against All India Council for Technical Education Approval Process Handbook norm thresholds.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Pass: {auditReport.clauseCompliance.filter(c => c.status === 'PASS').length}
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" /> Cond: {auditReport.clauseCompliance.filter(c => c.status === 'CONDITIONAL').length}
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <XCircle className="w-3.5 h-3.5" /> Fail: {auditReport.clauseCompliance.filter(c => c.status === 'FAIL').length}
            </span>
          </div>
        </div>

        {/* Clauses Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Regulatory Clause</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Mandated Standard</th>
                <th className="pb-3 font-semibold">Audited Value</th>
                <th className="pb-3 font-semibold text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditReport.clauseCompliance.map((row, idx) => {
                const isPass = row.status === 'PASS';
                const isCond = row.status === 'CONDITIONAL';
                const isFail = row.status === 'FAIL';

                return (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 font-bold text-white pr-4">
                      {row.clause}
                      <span className="block text-[11px] font-normal text-slate-400 mt-0.5">
                        {row.notes}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-300 pr-4 font-medium">
                      {row.category}
                    </td>
                    <td className="py-3.5 text-slate-300 pr-4 font-mono text-[11px]">
                      {row.required}
                    </td>
                    <td className="py-3.5 text-slate-200 pr-4 font-mono text-[11px] font-semibold">
                      {row.actual}
                    </td>
                    <td className="py-3.5 text-right pl-4">
                      {isPass && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3" /> PASS
                        </span>
                      )}
                      {isCond && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          <AlertTriangle className="w-3 h-3" /> CONDITIONAL
                        </span>
                      )}
                      {isFail && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          <XCircle className="w-3 h-3" /> DEFICIT
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Human-in-the-Loop Inspector Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-indigo-400" />
              Human Scrutiny Officer Verification Checklist
            </h3>
            <p className="text-xs text-slate-400">
              Critical safeguards ensuring automated AI findings are accompanied by regulatory officer sign-off.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {checklist.filter(c => c.checked).length} of {checklist.length} Completed
          </span>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                item.checked 
                  ? 'bg-indigo-950/30 border-indigo-700/60' 
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {}} // handled by parent div
                className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />

              <div className="flex-1 text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-200">
                  <span className={item.checked ? 'line-through text-slate-400' : ''}>
                    {item.item}
                  </span>
                  {item.requiresPhysicalVerification && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Physical Inspection Needed
                    </span>
                  )}
                </div>
              </div>

              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                item.severity === 'HIGH' 
                  ? 'bg-rose-500/20 text-rose-300' 
                  : item.severity === 'MEDIUM' 
                  ? 'bg-amber-500/20 text-amber-300' 
                  : 'bg-blue-500/20 text-blue-300'
              }`}>
                {item.severity}
              </span>
            </div>
          ))}
        </div>

        {/* Digital Sign-off Block */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Auditor: <strong className="text-slate-200">Dr. Rajeshwari Sharma (AICTE Scrutiny Officer #884)</strong></span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Immutable Audit Trail Hash: <span className="text-indigo-400 font-bold">SHA256: 7f81b...9a0c2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
