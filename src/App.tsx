import React, { useState, useEffect, useCallback } from 'react';
import { 
  InstitutionProfile, 
  AuditReport, 
  DocumentItem, 
  RegulatoryConfig, 
  DiscrepancyItem 
} from './types';
import { MOCK_DOSSIERS, DEFAULT_REGULATORY_CONFIG } from './data/mockDossiers';
import { auditDossierApi, checkServerHealth } from './services/api';

import { Header } from './components/Header';
import { DossierOverview } from './components/DossierOverview';
import { DiscrepancyMatrix } from './components/DiscrepancyMatrix';
import { RegulatoryScorecard } from './components/RegulatoryScorecard';
import { TamperAnalysisLab } from './components/TamperAnalysisLab';

import { DocumentViewerModal } from './components/DocumentViewerModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';
import { CertificateModal } from './components/CertificateModal';
import { HackathonGuideModal } from './components/HackathonGuideModal';
import { SettingsModal } from './components/SettingsModal';

import { ShieldCheck, Info, FileText } from 'lucide-react';

export default function App() {
  const [dossiers, setDossiers] = useState<InstitutionProfile[]>(MOCK_DOSSIERS);
  const [currentDossier, setCurrentDossier] = useState<InstitutionProfile>(MOCK_DOSSIERS[0]);
  const [activeTab, setActiveTab] = useState<'dossier' | 'discrepancies' | 'compliance' | 'tamper'>('dossier');
  
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [aiPowered, setAiPowered] = useState(false);

  // Modals state
  const [viewingDocument, setViewingDocument] = useState<DocumentItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [regulatoryConfig, setRegulatoryConfig] = useState<RegulatoryConfig>(DEFAULT_REGULATORY_CONFIG);

  // Initial audit runner
  const runAuditForDossier = useCallback(async (dossier: InstitutionProfile, config: RegulatoryConfig) => {
    setIsAuditing(true);
    try {
      const res = await auditDossierApi({
        institutionName: dossier.name,
        applicationType: dossier.applicationType,
        locationCategory: dossier.locationCategory,
        intakeRequested: dossier.totalIntakeRequested,
        documents: dossier.documents,
        customRules: config
      });

      if (res && res.audit) {
        setAuditReport(res.audit);
        setAiPowered(Boolean(res.aiPowered));
      }
    } catch (err) {
      console.error('Audit execution error:', err);
    } finally {
      setIsAuditing(false);
    }
  }, []);

  // Check health and run audit on mount & dossier switch
  useEffect(() => {
    checkServerHealth().then(h => {
      setAiPowered(h.hasApiKey);
    });
    runAuditForDossier(currentDossier, regulatoryConfig);
  }, [currentDossier, runAuditForDossier, regulatoryConfig]);

  const handleSelectDossier = (newDossier: InstitutionProfile) => {
    setCurrentDossier(newDossier);
    setActiveTab('dossier');
  };

  const handleManualRunAudit = () => {
    runAuditForDossier(currentDossier, regulatoryConfig);
  };

  const handleUpdateDiscrepancyStatus = (
    id: string, 
    status: 'CONFIRMED' | 'OVERRULED' | 'CLARIFICATION_REQUESTED',
    notes?: string
  ) => {
    if (!auditReport) return;

    setAuditReport(prev => {
      if (!prev) return null;
      const updatedDiscrepancies = prev.discrepancies.map(d => {
        if (d.id === id) {
          return {
            ...d,
            inspectorStatus: status,
            inspectorNotes: notes || d.inspectorNotes
          };
        }
        return d;
      });

      // Recalculate score if overruled
      const confirmedCritical = updatedDiscrepancies.filter(d => d.severity === 'CRITICAL' && d.inspectorStatus !== 'OVERRULED').length;
      let newScore = prev.overallScore;
      if (status === 'OVERRULED') {
        newScore = Math.min(100, prev.overallScore + 20);
      }

      return {
        ...prev,
        overallScore: newScore,
        verdict: newScore >= 85 ? 'APPROVED' : newScore >= 60 ? 'CONDITIONAL_APPROVAL' : 'REJECTED',
        discrepancies: updatedDiscrepancies
      };
    });
  };

  const handleAddCustomDocument = (newDoc: DocumentItem) => {
    const updatedDocs = [newDoc, ...currentDossier.documents];
    const updatedDossier = {
      ...currentDossier,
      documents: updatedDocs
    };

    // Update in state
    setCurrentDossier(updatedDossier);
    setDossiers(prev => prev.map(d => d.id === updatedDossier.id ? updatedDossier : d));

    // Re-run audit with new document included!
    runAuditForDossier(updatedDossier, regulatoryConfig);
  };

  const handleSaveConfig = (newConfig: RegulatoryConfig) => {
    setRegulatoryConfig(newConfig);
    runAuditForDossier(currentDossier, newConfig);
  };

  const discrepancies = auditReport?.discrepancies || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Header */}
      <Header
        currentDossier={currentDossier}
        allDossiers={dossiers}
        onSelectDossier={handleSelectDossier}
        onRunAudit={handleManualRunAudit}
        isAuditing={isAuditing}
        aiPowered={aiPowered}
        onOpenPitch={() => setIsPitchOpen(true)}
        onOpenCertificate={() => setIsCertOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        discrepancyCount={discrepancies.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Loading Spinner for Audit */}
        {isAuditing && (
          <div className="mb-6 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <div className="text-xs">
                <span className="font-bold text-white block">AI Regulatory Audit in Progress</span>
                <span className="text-slate-400">
                  Reconciling multi-document entities against AICTE Approval Process Handbook (APH 2024-27)...
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-indigo-300">gemini-3.8-flash</span>
          </div>
        )}

        {/* Tab 1: Institutional Dossier & Docs */}
        {activeTab === 'dossier' && (
          <DossierOverview
            dossier={currentDossier}
            onViewDocument={(doc) => setViewingDocument(doc)}
            onOpenUpload={() => setIsUploadOpen(true)}
            onNavigateToDiscrepancies={() => setActiveTab('discrepancies')}
            discrepancyCount={discrepancies.length}
          />
        )}

        {/* Tab 2: Cross-Document Discrepancy Matrix */}
        {activeTab === 'discrepancies' && (
          <DiscrepancyMatrix
            discrepancies={discrepancies}
            onUpdateDiscrepancyStatus={handleUpdateDiscrepancyStatus}
          />
        )}

        {/* Tab 3: APH Regulatory Scorecard */}
        {activeTab === 'compliance' && auditReport && (
          <RegulatoryScorecard
            auditReport={auditReport}
            institutionName={currentDossier.name}
            aicteId={currentDossier.aictePermanentId}
            onOpenCertificate={() => setIsCertOpen(true)}
          />
        )}

        {/* Tab 4: Tamper Analysis Lab */}
        {activeTab === 'tamper' && (
          <TamperAnalysisLab
            dossier={currentDossier}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-400">
              ComplyCheck AICTE • Problem Statement SIH26261
            </span>
            <span className="text-slate-700">|</span>
            <span>Approval Process Handbook (APH 2024-27)</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
              Digital India / e-Gov Initiative
            </span>
            <span>Ministry of Education, Govt. of India</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DocumentViewerModal
        document={viewingDocument}
        onClose={() => setViewingDocument(null)}
      />

      <UploadDocumentModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddDocument={handleAddCustomDocument}
      />

      {auditReport && (
        <CertificateModal
          isOpen={isCertOpen}
          onClose={() => setIsCertOpen(false)}
          dossier={currentDossier}
          auditReport={auditReport}
        />
      )}

      <HackathonGuideModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={regulatoryConfig}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
