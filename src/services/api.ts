import { AuditReport, InstitutionProfile, RegulatoryConfig } from '../types';

export interface AuditRequestPayload {
  institutionName: string;
  applicationType: string;
  locationCategory: string;
  intakeRequested: number;
  documents: any[];
  customRules?: Partial<RegulatoryConfig>;
}

export async function checkServerHealth(): Promise<{ status: string; hasApiKey: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check non-ok');
    return await res.json();
  } catch (err) {
    return { status: 'offline-mode', hasApiKey: false };
  }
}

export async function auditDossierApi(payload: AuditRequestPayload): Promise<{ success: boolean; aiPowered: boolean; audit: AuditReport }> {
  const response = await fetch('/api/audit-dossier', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to audit dossier: ${errText}`);
  }

  return await response.json();
}

export async function analyzeCustomDocumentApi(data: {
  documentName: string;
  documentType: string;
  documentContent: string;
  imageBase64?: string;
}): Promise<any> {
  const response = await fetch('/api/analyze-custom-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to analyze document: ${errText}`);
  }

  return await response.json();
}
