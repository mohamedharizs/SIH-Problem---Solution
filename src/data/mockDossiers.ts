import { InstitutionProfile, RegulatoryConfig } from '../types';

export const DEFAULT_REGULATORY_CONFIG: RegulatoryConfig = {
  minLandMetroAcres: 1.5,
  minLandUrbanAcres: 2.5,
  minLandRuralAcres: 7.5,
  mandatedSfrUg: 20,
  mandatedCadreRatio: '1:2:6',
  builtUpPerStudentSqM: 4.5,
  strictFireNocMandate: true,
  tamperSensitivity: 'High'
};

export const MOCK_DOSSIERS: InstitutionProfile[] = [
  {
    id: 'apex-institute-pune',
    name: 'Apex Institute of Technology & Engineering',
    aictePermanentId: '1-932145601',
    applicationNumber: 'AICTE/WRO/2026-27/09421',
    applicationType: 'Increase in Intake',
    establishedYear: 2008,
    locationCategory: 'Urban',
    state: 'Maharashtra',
    district: 'Pune',
    totalIntakeRequested: 720,
    programType: 'Engineering & Technology (UG/PG)',
    societyTrustName: 'Apex Educational and Research Foundation Trust',
    documents: [
      {
        id: 'doc-apex-1',
        name: 'Land Title & Registered Sale Deed (Khasra/Survey 102/1A, 102/2)',
        type: 'LAND_TITLE',
        category: 'Land Ownership & Contiguity',
        issuingAuthority: 'Department of Revenue & Sub-Registrar Haveli-4, Pune',
        issueDate: '2007-06-12',
        fileSize: '4.8 MB',
        status: 'FLAGGED',
        authenticityScore: 89,
        extractedFields: {
          'Total Land Area (Acres)': '7.50 Acres',
          'Survey / Gat Numbers': '102/1A, 102/2, 103/B',
          'Ownership Status': 'Freehold in Name of Society',
          'Encumbrance Status': 'Nil Encumbrance Certificate No. 4410/07',
          'Zoning Category': 'Educational Institutional Zone'
        },
        rawSnippet: 'Registered Indenture of Conveyance executed between M/s Sun Realty Ltd and Apex Educational Foundation for 7.50 Acres of contiguous land situated at Village Wagholi, Taluka Haveli, Pune.',
        tamperFlags: ['Area discrepancy detected when compared with Municipal approved building site plan']
      },
      {
        id: 'doc-apex-2',
        name: 'Municipal Corporation Approved Master Site & Building Plan',
        type: 'BUILDING_PLAN',
        category: 'Civil Architecture & Built-up Area',
        issuingAuthority: 'Pune Municipal Corporation (PMC) Town Planning Dept',
        issueDate: '2019-11-20',
        fileSize: '8.2 MB',
        status: 'FLAGGED',
        authenticityScore: 78,
        extractedFields: {
          'Plot Area Approved (Acres)': '5.20 Acres',
          'Total Built-Up Area': '18,450 sq.m',
          'Instructional Area': '10,200 sq.m',
          'Approved Number of Floors': 'Ground + 4 Upper Floors (G+4)',
          'Sanction Order No.': 'PMC/TP/ZONE-4/2019/8812'
        },
        rawSnippet: 'Sanctioned master layout plan reflecting plot demarcations for 5.20 Acres with total covered built-up area of 18,450 sq.m for educational use.',
        tamperFlags: ['Plot boundary demarcates 5.20 Acres, contradicting 7.50 Acres claimed in Land Deed. Shortfall of 2.30 Acres.']
      },
      {
        id: 'doc-apex-3',
        name: 'Fire & Life Safety NOC & Fire Hydrant Compliance',
        type: 'FIRE_SAFETY',
        category: 'Statutory Safety Clearance',
        issuingAuthority: 'Maharashtra State Fire Services / Chief Fire Officer Pune',
        issueDate: '2023-01-15',
        expiryDate: '2026-01-14',
        isExpired: true,
        fileSize: '2.1 MB',
        status: 'EXPIRED',
        authenticityScore: 61,
        extractedFields: {
          'Certificate No.': 'PMC/FIRE/NOC/2023/1029',
          'Valid Upto': '2026-01-14',
          'Approved Floors': 'Ground + 1 Floor Only (G+1)',
          'Hydrant Pressure Recorded': '3.2 bar (Minimum required: 3.5 bar)',
          'Issuing Officer': 'Assistant Fire Station Officer, Zone B'
        },
        rawSnippet: 'Provisional Fire Safety Compliance certificate valid for 3 years expiring on 14th January 2026. Approved for G+1 building structure.',
        tamperFlags: ['NOC EXPIRED (Over 9 months overdue).', 'Approved for G+1 only, whereas Building Plan constructed G+4.']
      },
      {
        id: 'doc-apex-4',
        name: 'Faculty Cadre, Qualification & 7th CPC Disbursement Schedule',
        type: 'FACULTY_CADRE',
        category: 'Academic Faculty Norms',
        issuingAuthority: 'Finance Officer & Principal, Savitribai Phule Pune University Approved Staff Matrix',
        issueDate: '2026-08-10',
        fileSize: '3.6 MB',
        status: 'FLAGGED',
        authenticityScore: 74,
        extractedFields: {
          'Total Approved Faculty': '34 Faculty Members',
          'Required for 720 Intake': '48 Faculty Members (1:20 SFR)',
          'Cadre Ratio': '1:24.4 SFR (Cadre: 2 Prof, 7 Assoc Prof, 25 Asst Prof)',
          'Shortfall in Professor Cadre': '4 Professors & 5 Associate Professors missing',
          'Salary Payment Mode': 'Electronic Bank Transfer (Form 16 Attached)'
        },
        rawSnippet: 'Consolidated staff roll for Computer Engineering, AI/DS, and Electronics faculties indicating student-faculty deficit under AICTE APH Appendix 7.',
        tamperFlags: ['Faculty shortage violates mandatory 1:20 SFR for NBA/increase in intake.']
      },
      {
        id: 'doc-apex-5',
        name: 'Structural Stability & Occupancy Certificate',
        type: 'STRUCTURAL_STABILITY',
        category: 'Civil Infrastructure & Safety',
        issuingAuthority: 'Chartered Structural Engineer (Empanelled with PMC, Reg # STR/0481)',
        issueDate: '2022-04-18',
        fileSize: '1.9 MB',
        status: 'VERIFIED',
        authenticityScore: 92,
        extractedFields: {
          'Structural Integrity Index': 'Satisfactory for Seismic Zone III',
          'Designed Live Load': '4.0 kN/sq.m for classrooms and laboratories',
          'Certification Period': '10 Years (Valid till 2032)'
        },
        rawSnippet: 'Certified that the RCC framed structure is safe, stable, and designed in accordance with IS 456-2000 and IS 1893-2016 standards.'
      },
      {
        id: 'doc-apex-6',
        name: 'Joint Fixed Deposit Receipt (FDR) / Security Deposit',
        type: 'BANK_GUARANTEE',
        category: 'Statutory Financial Guarantee',
        issuingAuthority: 'State Bank of India, Commercial Branch, Pune',
        issueDate: '2024-05-10',
        expiryDate: '2034-05-09',
        fileSize: '1.2 MB',
        status: 'VERIFIED',
        authenticityScore: 96,
        extractedFields: {
          'FDR Account Number': 'SBI-FDR-9920148102',
          'Pledged To': 'Regional Officer, Western Regional Office (WRO), AICTE',
          'Principal Sum': 'INR 1,00,00,000 (Rupees One Crore Only)',
          'Maturity Date': '09 May 2034'
        },
        rawSnippet: 'Fixed deposit created in joint name of Chairman, Apex Educational Trust and Regional Officer, AICTE Mumbai for Rs. 1,00,00,000/-'
      }
    ]
  },
  {
    id: 'kaveri-institute-bengaluru',
    name: 'Kaveri Institute of Technology & Science',
    aictePermanentId: '1-482910332',
    applicationNumber: 'AICTE/SRO/2026-27/04118',
    applicationType: 'Extension of Approval (EoA)',
    establishedYear: 2012,
    locationCategory: 'Metro',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    totalIntakeRequested: 540,
    programType: 'Engineering & Technology (UG/PG)',
    societyTrustName: 'Kaveri Vidya Vardhaka Trust',
    documents: [
      {
        id: 'doc-kav-1',
        name: 'Land Registry & BBMP Katha Certificate',
        type: 'LAND_TITLE',
        category: 'Land Ownership & Contiguity',
        issuingAuthority: 'Bruhat Bengaluru Mahanagara Palike (BBMP) & Sub-Registrar Rajajinagar',
        issueDate: '2011-09-04',
        fileSize: '3.4 MB',
        status: 'FLAGGED',
        authenticityScore: 88,
        extractedFields: {
          'Total Land Area (Acres)': '3.10 Acres',
          'BBMP A-Katha Number': 'BBMP/A-KHA/2011/492',
          'Registered Entity Name': 'Kaveri Educational & Charitable Trust',
          'AICTE Metro Norm (Min)': '1.50 Acres (COMPLIANT: 3.10 > 1.50)',
          'Contiguity': 'Single unfragmented parcel'
        },
        rawSnippet: 'Certified BBMP A-Khata extract issued for Survey No 48/1, Whitefield Main Road, Bengaluru. Registered in name of Kaveri Educational & Charitable Trust.',
        tamperFlags: ['Entity Name Variation: "Kaveri Educational & Charitable Trust" on Deed vs "Kaveri Vidya Vardhaka Trust" in AICTE Portal.']
      },
      {
        id: 'doc-kav-2',
        name: 'BBMP Approved Master Architectural Plan',
        type: 'BUILDING_PLAN',
        category: 'Civil Architecture & Built-up Area',
        issuingAuthority: 'BBMP Town Planning Department, Bengaluru',
        issueDate: '2020-02-14',
        fileSize: '6.7 MB',
        status: 'VERIFIED',
        authenticityScore: 94,
        extractedFields: {
          'Plot Area Approved (Acres)': '3.10 Acres',
          'Total Built-Up Area': '16,200 sq.m',
          'Instructional Area': '9,800 sq.m',
          'Approved Number of Floors': 'Basement + Ground + 3 Floors (B+G+3)'
        },
        rawSnippet: 'Approved architectural plan under BBMP building bylaws 2003 with total floor space of 16,200 sq.m.'
      },
      {
        id: 'doc-kav-3',
        name: 'Karnataka Fire and Emergency Services Clearance Certificate',
        type: 'FIRE_SAFETY',
        category: 'Statutory Safety Clearance',
        issuingAuthority: 'Director General of Police & Director Fire Services, Karnataka',
        issueDate: '2024-11-18',
        expiryDate: '2027-11-17',
        isExpired: false,
        fileSize: '2.8 MB',
        status: 'VERIFIED',
        authenticityScore: 97,
        extractedFields: {
          'Certificate No.': 'KFES/BGLR/CC-2024/9144',
          'Valid Upto': '2027-11-17',
          'Approved Floors': 'B+G+3 Floors',
          'Underground Sump Capacity': '1,50,000 Litres Dedicated Fire Reserve',
          'Fire Evacuation Drills': 'Conducted semi-annually'
        },
        rawSnippet: 'Unconditional Fire Clearance Certificate for educational occupancy up to 15 meters building height.'
      },
      {
        id: 'doc-kav-4',
        name: 'Barrier-Free Environment & PwD Accessibility Audit',
        type: 'STRUCTURAL_STABILITY',
        category: 'Accessibility & RPwD Act Compliance',
        issuingAuthority: 'State Commission for Persons with Disabilities Empanelled Access Auditor',
        issueDate: '2026-03-22',
        fileSize: '1.7 MB',
        status: 'FLAGGED',
        authenticityScore: 82,
        extractedFields: {
          'Ramp Slope Compliance': 'Pending renovation (Current 1:8, mandated 1:12)',
          'Tactile Paving': 'Installed in central corridor only',
          'Braille Lift Buttons': 'Operational in Block A',
          'Accessible Restrooms': 'Available on Ground Floor only'
        },
        rawSnippet: 'Interim Accessibility Audit identifying required slope adjustments on main porch entrance ramp to achieve 1:12 slope.',
        tamperFlags: ['Minor deficiency: Main entrance ramp slope 1:8 does not meet APH Clause 5.3 (1:12). Undertaking required.']
      },
      {
        id: 'doc-kav-5',
        name: 'Faculty Roll & Visvesvaraya Technological University (VTU) Approval',
        type: 'FACULTY_CADRE',
        category: 'Academic Faculty Norms',
        issuingAuthority: 'Registrar, Visvesvaraya Technological University (VTU), Belagavi',
        issueDate: '2026-07-29',
        fileSize: '4.1 MB',
        status: 'VERIFIED',
        authenticityScore: 95,
        extractedFields: {
          'Total Regular Faculty': '29 Faculty Members',
          'Student-to-Faculty Ratio': '1:18.6 (Mandated 1:20 - Compliant)',
          'Cadre Ratio': '1:2:5.8 (Satisfactory)',
          'Ph.D Holders in Engineering': '14 Professors/Associate Professors'
        },
        rawSnippet: 'Approved faculty cadre list with EPF deduction numbers and bank disbursement acknowledgements.'
      }
    ]
  },
  {
    id: 'delhi-institute-dwarka',
    name: 'Delhi Institute of Advanced Science & Technology',
    aictePermanentId: '1-102948191',
    applicationNumber: 'AICTE/NWRO/2026-27/00812',
    applicationType: 'Extension of Approval (EoA)',
    establishedYear: 2004,
    locationCategory: 'Metro',
    state: 'Delhi',
    district: 'South West Delhi',
    totalIntakeRequested: 600,
    programType: 'Engineering & Technology (UG/PG)',
    societyTrustName: 'National Science & Education Society (Reg # S-1994/Delhi)',
    documents: [
      {
        id: 'doc-del-1',
        name: 'Delhi Development Authority (DDA) Perpetual Institutional Land Lease',
        type: 'LAND_TITLE',
        category: 'Land Ownership & Contiguity',
        issuingAuthority: 'Delhi Development Authority (DDA) Institutional Land Wing',
        issueDate: '2002-08-14',
        fileSize: '5.2 MB',
        status: 'VERIFIED',
        authenticityScore: 99,
        extractedFields: {
          'Total Land Area (Acres)': '4.80 Acres',
          'Lease Nature': '99 Years Perpetual Institutional Lease',
          'Allotment File No.': 'DDA/IL/DWK/SEC-19/2002/194',
          'AICTE Metro Requirement': 'Min 1.50 Acres (Compliant: 4.80 Acres)',
          'Contiguity & Title': 'Clean title, absolute non-encumbered possession'
        },
        rawSnippet: 'Perpetual lease indenture between President of India through DDA and National Science & Education Society for educational campus.'
      },
      {
        id: 'doc-del-2',
        name: 'MCD / DDA Approved Architectural Master Plan & Completion Certificate',
        type: 'BUILDING_PLAN',
        category: 'Civil Architecture & Built-up Area',
        issuingAuthority: 'Municipal Corporation of Delhi (MCD) Building HQ',
        issueDate: '2018-05-12',
        fileSize: '7.4 MB',
        status: 'VERIFIED',
        authenticityScore: 98,
        extractedFields: {
          'Plot Area Approved (Acres)': '4.80 Acres',
          'Total Built-Up Area': '24,600 sq.m',
          'Instructional Area': '14,200 sq.m',
          'Occupancy Certificate No.': 'MCD/OC/SW/2018/1429',
          'Green Building Rating': 'GRIHA 3-Star Certified'
        },
        rawSnippet: 'Full Building Completion Certificate and sanctioned architectural plans conforming to Unified Building Bye-laws for Delhi.'
      },
      {
        id: 'doc-del-3',
        name: 'Delhi Fire Service Statutory Fire Safety Certificate (FSC)',
        type: 'FIRE_SAFETY',
        category: 'Statutory Safety Clearance',
        issuingAuthority: 'Delhi Fire Service, Government of NCT of Delhi',
        issueDate: '2025-06-10',
        expiryDate: '2028-06-09',
        isExpired: false,
        fileSize: '2.5 MB',
        status: 'VERIFIED',
        authenticityScore: 99,
        extractedFields: {
          'FSC Letter No.': 'DFS/MS/School/2025/SZ/1104',
          'Valid Upto': '2028-06-09',
          'Dual Internal Staircases': 'Verified 2.0m width each',
          'Fire Water Tank Capacity': '2,00,000 Litres underground + 20,000 terrace',
          'Smoke Management System': 'Positive pressure staircase installed'
        },
        rawSnippet: 'Fire Safety Certificate issued under Rule 35 of the Delhi Fire Service Rules 2010. Valid for 3 years.'
      },
      {
        id: 'doc-del-4',
        name: 'NBA Accreditation & GGSIP University Affiliation Order',
        type: 'AFFILIATION_NBA',
        category: 'Statutory Accreditation & Affiliation',
        issuingAuthority: 'National Board of Accreditation (NBA) & GGSIP University New Delhi',
        issueDate: '2024-07-01',
        expiryDate: '2027-06-30',
        isExpired: false,
        fileSize: '3.1 MB',
        status: 'VERIFIED',
        authenticityScore: 98,
        extractedFields: {
          'NBA Tier-1 Accreditation': 'CSE, IT, ECE accredited for 3 years (Valid till 2027)',
          'Permanent University Affiliation': 'Guru Gobind Singh Indraprastha University (GGSIPU)',
          'NAAC Grade': 'A++ (Score: 3.68/4.00)'
        },
        rawSnippet: 'NBA accreditation granted under Washington Accord Tier-1 for undergraduate engineering programs.'
      },
      {
        id: 'doc-del-5',
        name: 'Faculty Cadre & Bio-metric Attendance Audit with Form 16',
        type: 'FACULTY_CADRE',
        category: 'Academic Faculty Norms',
        issuingAuthority: 'Dean Academic Affairs & Chartered Accountant Stat Audit',
        issueDate: '2026-09-01',
        fileSize: '4.6 MB',
        status: 'VERIFIED',
        authenticityScore: 97,
        extractedFields: {
          'Total Teaching Staff': '36 Full-time Regular Faculty',
          'Student-to-Faculty Ratio': '1:16.6 (Surpasses 1:20 norm)',
          'Cadre Ratio': '1:2.2:5.9 (Fully compliant with 1:2:6 mandate)',
          'Salary Scales': 'Strictly conforming to AICTE 7th Central Pay Commission'
        },
        rawSnippet: 'Faculty matrix verified with TRACES Form 16 Part A/B and monthly direct bank NEFT disbursements.'
      }
    ]
  }
];
