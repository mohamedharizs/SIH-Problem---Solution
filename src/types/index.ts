export type SeverityLevel = 'CRITICAL' | 'WARNING' | 'INFO';

export type ComplianceVerdict = 'APPROVED' | 'REJECTED' | 'CONDITIONAL_APPROVAL';

export type DocumentType = 
  | 'LAND_TITLE' 
  | 'BUILDING_PLAN' 
  | 'FIRE_SAFETY' 
  | 'STRUCTURAL_STABILITY' 
  | 'FACULTY_CADRE' 
  | 'AFFILIATION_NBA' 
  | 'BANK_GUARANTEE'
  | 'CUSTOM';

export interface DocumentItem {
  id: string;
  name: string;
  type: DocumentType;
  category: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  isExpired?: boolean;
  status: 'VERIFIED' | 'FLAGGED' | 'EXPIRED' | 'SUSPICIOUS';
  authenticityScore: number;
  fileSize: string;
  extractedFields: Record<string, string>;
  rawSnippet?: string;
  tamperFlags?: string[];
  docUrl?: string;
}

export interface DiscrepancyItem {
  id: string;
  severity: SeverityLevel;
  title: string;
  documentsInvolved: string[];
  field: string;
  foundValues: Record<string, string>;
  regulatoryClause: string;
  explanation: string;
  recommendedAction: string;
  inspectorStatus?: 'PENDING' | 'OVERRULED' | 'CONFIRMED' | 'CLARIFICATION_REQUESTED';
  inspectorNotes?: string;
}

export interface ClauseComplianceItem {
  clause: string;
  category: string;
  status: 'PASS' | 'FAIL' | 'CONDITIONAL';
  required: string;
  actual: string;
  notes: string;
}

export interface DocumentVerificationResult {
  docId: string;
  docName: string;
  status: 'VERIFIED' | 'FLAGGED' | 'EXPIRED' | 'SUSPICIOUS';
  authenticityScore: number;
  extractedKeyValues: Record<string, string>;
  flags: string[];
}

export interface HumanReviewItem {
  item: string;
  requiresPhysicalVerification: boolean;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  checked?: boolean;
}

export interface AuditReport {
  overallScore: number;
  verdict: ComplianceVerdict;
  summary: string;
  discrepancies: DiscrepancyItem[];
  clauseCompliance: ClauseComplianceItem[];
  documentVerificationResults: DocumentVerificationResult[];
  humanReviewChecklist: HumanReviewItem[];
}

export interface InstitutionProfile {
  id: string;
  name: string;
  aictePermanentId: string;
  applicationNumber: string;
  applicationType: 'Extension of Approval (EoA)' | 'Increase in Intake' | 'New Technical Institution' | 'Introduction of Supernumerary Seats';
  establishedYear: number;
  locationCategory: 'Metro' | 'Urban' | 'Rural';
  state: string;
  district: string;
  totalIntakeRequested: number;
  programType: 'Engineering & Technology (UG/PG)' | 'Management (MBA)' | 'Computer Applications (MCA)' | 'Pharmacy (B.Pharm)';
  societyTrustName: string;
  documents: DocumentItem[];
}

export interface RegulatoryConfig {
  minLandMetroAcres: number;
  minLandUrbanAcres: number;
  minLandRuralAcres: number;
  mandatedSfrUg: number;
  mandatedCadreRatio: string;
  builtUpPerStudentSqM: number;
  strictFireNocMandate: boolean;
  tamperSensitivity: 'Normal' | 'High' | 'Strict';
}
