# ComplyCheck AICTE (Problem Statement SIH26261)
## AI-Powered Application Validation, Document Authentication & Regulatory Compliance Verification

---

### 1. Executive Summary & Problem Context
* **Organization:** All India Council for Technical Education (AICTE), Ministry of Education, Government of India.
* **Problem Code:** SIH26261 | Category: Web + AI / e-Governance.
* **The Challenge:** Over 12,000 engineering, management, and technical institutions apply annually for Extension of Approval (EoA), Increase in Intake, or New Institution Setup. This generates 1.5+ million statutory documents (Land Titles, Municipal Master Plans, Fire Safety NOCs, Structural Stability Certificates, Faculty 7th CPC Rolls, and Bank Guarantees).
* **The Flaw in Current Systems:** Traditional manual scrutiny takes 3 to 4 weeks per college, incurs high operational costs, and is susceptible to human oversight or fraudulent manipulation:
  1. **Cross-Document Inconsistencies:** E.g., Land Title claims 7.5 Acres, but Municipal Approved Plan only certifies 5.2 Acres (2.3-Acre shortfall).
  2. **Ghost Faculty / Dual Employment:** The same professor's PAN/Aadhaar is submitted simultaneously by multiple institutes.
  3. **Lapsed Statutory Safety Clearances:** Expired Fire Safety NOCs or unauthorized additional floors constructed beyond approved fire permits.
* **The Solution:** **ComplyCheck AICTE** — an autonomous multi-document validation engine powered by Gemini 3.8 Flash, a declarative APH rule engine, optical tamper detection, and human-in-the-loop audit governance.

---

### 2. End-to-End System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        INSTITUTION DOSSIER                             │
│   Land Deed  •  Master Plan  •  Fire NOC  •  Faculty Form 16  •  FDR   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Multi-file Ingestion
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              LAYER 1: FORENSIC INGESTION & OPTICAL INTEGRITY           │
│  • Digital Signature (X.509 PKCS#7 / eMudhra) Verification             │
│  • Error Level Analysis (ELA) & Font Kerning Inconsistency Detection   │
│  • PDF Creation / Modification Timestamp Audit                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Raw Text & Document Buffers
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│              LAYER 2: GEMINI 3.8 FLASH OCR & ENTITY EXTRACTION         │
│  • Structured JSON Mode with Strict Schema Enforcement                 │
│  • Extracts: Plot Area, Survey Numbers, Floor Heights, Fire Expiry,     │
│    Faculty SFR Ratio, Cadre Distribution (1:2:6), Issuing Authority    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Normalized Knowledge Graph
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│        LAYER 3: CROSS-DOCUMENT RECONCILIATION MATRIX (CORE SIH INNOVATION)│
│  • Relational Field Matching: Deed Area vs Sanctioned Site Plan        │
│  • Safety Match: Authorized Floors (G+1) vs Built Floors (G+4)         │
│  • Entity Identity Match: Trust Name spelling across certificates      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Detected Breaches & Collisions
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│          LAYER 4: AICTE APH 2024-2027 STATUTORY RULE ENGINE            │
│  • Clause 1.4: Land Area (Metro: 1.5 Ac, Urban: 2.5 Ac, Rural: 7.5 Ac) │
│  • Clause 2.2: Built-Up Space (4.5 sq.m instructional per student)     │
│  • Clause 3.1: Fire Safety NOC (Zero Tolerance on Expiration)          │
│  • Clause 4.1: Faculty Cadre Ratio (1:20 SFR & 1:2:6 Cadre)           │
│  • Clause 5.3: RPwD Act 2016 Barrier-Free Ramp & Tactile Access        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Audit Verdict & Confidence Score
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│        LAYER 5: HUMAN-IN-THE-LOOP SCRUTINY & VERIFICATION PORTAL       │
│  • Scrutiny Officer Overrule / Clarification Desk                      │
│  • Immutable Audit Trail (SHA-256 Hash)                                │
│  • 1-Click Signed AICTE Compliance Certificate (jsPDF + QR Code)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3. Structured Feature Matrix

| Feature | Description | Hackathon Demonstration Value |
| :--- | :--- | :--- |
| **Cross-Doc Collision Engine** | Compares extracted fields between two or more documents to find mismatches (e.g. Land Deed vs Building Plan). | High (Core differentiator from naive OCR projects). |
| **AICTE APH Rule Engine** | Automated clause-by-clause compliance grading (Pass/Deficit) against official Approval Process Handbook. | High (Shows direct domain grounding in AICTE regulations). |
| **Interactive Case Presets** | Three built-in scenarios: 1) Apex Institute (Violations), 2) Kaveri Institute (Conditional), 3) Delhi Institute (Clean). | High (Allows instant, zero-latency judging demonstrations). |
| **Ghost Faculty Scanner** | National registry cross-referencing detecting professors listed in multiple colleges concurrently. | High (Tackles one of India's biggest higher-ed scandals). |
| **Optical Tamper Simulator** | Interactive tool to inject font-kerning tampering or backdated stamps and observe real-time AI flags. | Very High (Judges love seeing live attack/detection loops). |
| **Human-in-the-Loop Controls** | Scrutiny officers can confirm violations, overrule with rationale notes, or issue 30-day cure notices. | High (Demonstrates regulatory realism & legal safeguards). |
| **Real-Time Gemini AI Scan** | Drag-and-drop custom upload to extract entities from user-provided documents on the fly. | High (Proves the system works on arbitrary un-cached files). |
| **PDF Certificate Generator** | Generates official, downloadable, styled AICTE verification certificates with QR & SHA-256 hashes. | Medium-High (Tangible deliverable output). |

---

### 4. 2-Minute Winning Hackathon Pitch Script

* **[0:00 - 0:25] Hook & Problem:**
  > "Respected Judges, every academic cycle, over 12,000 engineering and polytechnic colleges submit more than 1.5 million statutory documents to AICTE. Scrutinizing these manually takes over 3 weeks per dossier. Worse, manual scrutiny misses cross-document fraud—such as an applicant claiming 7.5 acres in their land title deed while their municipal blueprint only covers 5.2 acres, or submitting a Fire NOC that expired nine months ago."
* **[0:25 - 0:55] Solution & Core Tech:**
  > "We built **ComplyCheck AICTE**. Unlike existing tools that process one file at a time, ComplyCheck constructs a *Cross-Document Knowledge Graph*. Powered by Gemini 3.8 Flash, our engine extracts statutory entities from land titles, architectural plans, fire clearances, and payroll registers, automatically reconciling them against the official AICTE Approval Process Handbook 2024-2027."
* **[0:55 - 1:35] Live Demo Walkthrough:**
  > "Watch our live demo on Case A: In 5 seconds, ComplyCheck uncovers three critical violations:
  > 1. A 2.3-Acre land discrepancy between the registered sale deed and the municipal master plan.
  > 2. An expired Fire Safety NOC.
  > 3. A faculty shortage violating the mandatory 1:20 cadre ratio.
  > The human scrutiny officer can inspect the original document artifacts side-by-side, verify forensic signatures, apply human override notes, and generate an official cryptographically hashed AICTE verification certificate with one click."
* **[1:35 - 2:00] Business Impact & Conclusion:**
  > "ComplyCheck shrinks a 25-day manual scrutiny bottleneck into a 45-second pre-scrutiny audit, saving millions of administrative hours, safeguarding campus safety, and restoring absolute transparency to Indian higher education. Thank you!"

---

### 5. Judge Q&A Defense & Rebuttals

1. **"How do you handle degraded, photocopied, or handwritten Indian stamp papers?"**
   * *Answer:* "We utilize adaptive image preprocessing (deskewing, contrast enhancement) alongside multimodal Gemini 3.8 Flash. Rather than relying purely on character-level OCR, Gemini leverages surrounding legal syntax and preamble context to accurately reconstruct missing numbers and clauses."
2. **"What if AICTE updates its regulations next year?"**
   * *Answer:* "Our architecture decouples the regulatory rule engine from the extraction pipeline. Through our declarative Regulatory Configurator, administrators can change minimum land thresholds, faculty-to-student ratios, or safety rules dynamically without touching any codebase."
3. **"Can an AI hallucination lead to a college being unjustly denied approval?"**
   * *Answer:* "No. ComplyCheck is strictly *Human-in-the-Loop*. The AI acts as an evidentiary scrutiny advisor. Every flagged item cites exact clause numbers and side-by-side document evidence. The human scrutiny officer maintains final legal authority to overrule, confirm, or grant conditional cure periods."
4. **"How is privacy maintained for faculty salaries and biometric data?"**
   * *Answer:* "Sensitive tax and biometric identifiers (PAN, Aadhaar, bank accounts) are hashed using salted SHA-256 before cross-institutional deduplication, fully compliant with the Digital Personal Data Protection (DPDP) Act 2023."
