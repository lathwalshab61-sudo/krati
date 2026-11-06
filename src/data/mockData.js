// Initial Mock Data for FORENSICA - Forensic Case & Evidence Intelligence System

export const INITIAL_OFFICERS = [
  {
    id: "OFF-8402",
    name: "Dr. Elena Vance",
    role: "Senior Forensic Geneticist & CSI Lead",
    badgeNumber: "FX-4092",
    department: "DNA Analysis & Biological Evidence Unit",
    clearanceLevel: "Level 4 (Top Forensic Clearance)",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "OFF-5190",
    name: "Det. Marcus Holloway",
    role: "Lead Crime Scene Investigator",
    badgeNumber: "CSI-1048",
    department: "Forensic Field Operations",
    clearanceLevel: "Level 3 (Field & Evidence)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "OFF-7311",
    name: "Dr. Sarah Chen",
    role: "Forensic Toxicologist & Trace Examiner",
    badgeNumber: "TOX-9921",
    department: "Toxicology & Chemical Pathology",
    clearanceLevel: "Level 3 (Laboratory)",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=200",
  }
];

export const CODIS_LOCI_LIST = [
  "D3S1358", "TH01", "D21S11", "D18S51", "Penta E", 
  "D5S818", "D13S317", "D7S820", "D16S539", "CSF1PO", 
  "Penta D", "vWA", "D8S1179", "TPOX", "FGA", "AMEL"
];

export const INITIAL_CASES = [
  {
    id: "CR-2026-0941",
    title: "Cold Spring Harbor Marina Homicide",
    category: "Homicide",
    priority: "Critical",
    status: "Under Lab Analysis",
    incidentDate: "2026-10-24T21:45",
    firstResponseDate: "2026-10-24T22:18",
    location: {
      address: "Pier 14, Slip C-28, Cold Spring Harbor",
      type: "Outdoor Marine / Vessel",
      gps: "40.8712° N, 73.4549° W",
      weather: "Foggy, light mist, 11°C, 88% humidity",
    },
    leadExaminer: "Dr. Elena Vance",
    assignedOfficerId: "OFF-8402",
    investigatingAgency: "Metropolitan Major Crimes Bureau",
    synopsis: "Victim discovered aboard 42-foot pleasure craft with blunt force trauma to temporal bone. Primary crime scene secured with perimeter tape. Multiple blood spatters collected from salon floorboards and teak handrail. Broken glass bottle recovered with latent papillary ridge deposits.",
    fieldNotes: [
      {
        id: "FN-1",
        timestamp: "2026-10-24T22:30",
        author: "Dr. Elena Vance",
        category: "Scene Arrival",
        content: "Arrived on scene with Det. Holloway. Ambient temp 11°C. Scene integrity verified; perimeter guarded by Patrol Officers Ramirez & Wu. Footwear impressions photographed on slip planks before deck boarding.",
      },
      {
        id: "FN-2",
        timestamp: "2026-10-24T23:15",
        author: "Dr. Elena Vance",
        category: "Biological Search",
        content: "Applied alternate light source (ALS 450nm) in salon cabin. Detected prominent orange fluorescing pattern consistent with diluted biological fluid near galley sink. Sterile polyester swab sample BIO-0941-A collected.",
      },
      {
        id: "FN-3",
        timestamp: "2026-10-25T01:40",
        author: "Dr. Elena Vance",
        category: "Evidence Packaging",
        content: "All biological items placed in breathable forensic paper envelopes to prevent bacterial degradation. Tamper-evident evidence tape seals #09881 through #09886 applied. Transported in climate-controlled forensic vehicle cooler at 4°C.",
      }
    ],
    evidence: [
      {
        id: "EVD-0941-01",
        barcode: "BAR-8829104",
        name: "Blood Swab - Teak Galley Railing",
        type: "Biological / DNA",
        collectedBy: "Dr. Elena Vance",
        collectionDate: "2026-10-24T23:45",
        locationFound: "Salon port side handrail, 1.2m above deck",
        storageCondition: "-20°C DNA Cold Vault (Shelf B3)",
        packaging: "Forensic sterile paper envelope with desiccant",
        status: "Analyzed - Profile Generated",
        notes: "High yield blood spatter, low degradation expected.",
        dnaProfileId: "DNA-0941-01"
      },
      {
        id: "EVD-0941-02",
        barcode: "BAR-8829105",
        name: "Broken Amber Glass Bottle Neck",
        type: "Physical & Fingerprint",
        collectedBy: "Det. Marcus Holloway",
        collectionDate: "2026-10-25T00:15",
        locationFound: "Galley floor adjacent to victim's left hand",
        storageCondition: "Secure Trace Locker 14",
        packaging: "Padded rigid specimen box with immobilizer",
        status: "Latent Prints Lifted & Swabbed",
        notes: "Latent partial whorl print lifted; contact epithelial cells swabbed for STR typing.",
        dnaProfileId: "DNA-0941-02"
      },
      {
        id: "EVD-0941-03",
        barcode: "BAR-8829106",
        name: "Victim Fingernail Scrapings (Right Hand)",
        type: "Biological / Touch DNA",
        collectedBy: "Forensic Pathologist Dr. Reyes",
        collectionDate: "2026-10-25T09:30",
        locationFound: "Right hand digits II - V scrapings",
        storageCondition: "-80°C Ultra-Low Freezer",
        packaging: "Sterile microcentrifuge tube kit",
        status: "Mixture DNA Profile Detected",
        notes: "Major component matches victim; minor component male contributor detected.",
        dnaProfileId: "DNA-0941-03"
      }
    ],
    chainOfCustody: [
      {
        id: "COC-101",
        evidenceId: "EVD-0941-01",
        evidenceName: "Blood Swab - Teak Galley Railing",
        timestamp: "2026-10-25T02:30",
        releasedBy: "Dr. Elena Vance (FX-4092)",
        receivedBy: "Officer T. Jenkins (Evidence Locker Custodian)",
        purpose: "Transfer from crime scene to Forensic Biology intake vault",
        sealIntact: true,
      },
      {
        id: "COC-102",
        evidenceId: "EVD-0941-01",
        evidenceName: "Blood Swab - Teak Galley Railing",
        timestamp: "2026-10-25T08:15",
        releasedBy: "Officer T. Jenkins (Custodian)",
        receivedBy: "Dr. Elena Vance (DNA Lab Analyst)",
        purpose: "Sample aliquot extraction for PCR & STR multiplex capillary electrophoresis",
        sealIntact: true,
      },
      {
        id: "COC-103",
        evidenceId: "EVD-0941-02",
        evidenceName: "Broken Amber Glass Bottle Neck",
        timestamp: "2026-10-25T11:00",
        releasedBy: "Officer T. Jenkins",
        receivedBy: "Analyst K. Brandt (Latent Print Unit)",
        purpose: "Cyanoacrylate fuming chamber processing",
        sealIntact: true,
      }
    ],
    dnaProfiles: [
      {
        id: "DNA-0941-01",
        evidenceId: "EVD-0941-01",
        sampleLabel: "Unknown Suspect Male (Galley Blood)",
        donorType: "Unknown Suspect Contributor",
        quantitation: "1.42 ng/µL",
        degradationIndex: "1.08 (Pristine)",
        ipcCtValue: "27.4 (No PCR Inhibition)",
        codisEligible: true,
        codisStatus: "CODIS Hit Identified - Match Pending Review",
        method: "GlobalFiler 24-locus PCR Amplification / ABI 3500xl CE",
        loci: {
          "D3S1358": "15, 17",
          "TH01": "7, 9.3",
          "D21S11": "29, 31.2",
          "D18S51": "14, 16",
          "Penta E": "11, 14",
          "D5S818": "11, 12",
          "D13S317": "11, 13",
          "D7S820": "9, 11",
          "D16S539": "12, 13",
          "CSF1PO": "10, 12",
          "Penta D": "9, 12",
          "vWA": "16, 18",
          "D8S1179": "13, 14",
          "TPOX": "8, 11",
          "FGA": "21, 24",
          "AMEL": "X, Y"
        }
      },
      {
        id: "DNA-0941-02",
        evidenceId: "EVD-0941-02",
        sampleLabel: "Bottle Neck Touch Epithelial",
        donorType: "Epithelial Contact Swab",
        quantitation: "0.28 ng/µL",
        degradationIndex: "1.34 (Minor Degradation)",
        ipcCtValue: "28.1 (Normal)",
        codisEligible: true,
        codisStatus: "Consistent with Galley Blood Profile",
        method: "GlobalFiler 24-locus Low-Copy Amplification",
        loci: {
          "D3S1358": "15, 17",
          "TH01": "7, 9.3",
          "D21S11": "29, 31.2",
          "D18S51": "14, 16",
          "Penta E": "11, 14",
          "D5S818": "11, 12",
          "D13S317": "11, 13",
          "D7S820": "9, 11",
          "D16S539": "12, 13",
          "CSF1PO": "10, 12",
          "Penta D": "9, 12",
          "vWA": "16, 18",
          "D8S1179": "13, 14",
          "TPOX": "8, 11",
          "FGA": "21, 24",
          "AMEL": "X, Y"
        }
      },
      {
        id: "DNA-0941-REF-VIC",
        evidenceId: "EVD-REF-01",
        sampleLabel: "Victim Reference Blood (Julian Thorne)",
        donorType: "Victim Reference",
        quantitation: "2.10 ng/µL",
        degradationIndex: "1.01",
        ipcCtValue: "26.8",
        codisEligible: false,
        codisStatus: "Reference Sample (Elimination)",
        method: "Direct Buccal/Blood Reference Typing",
        loci: {
          "D3S1358": "14, 16",
          "TH01": "6, 8",
          "D21S11": "28, 30",
          "D18S51": "13, 15",
          "Penta E": "8, 12",
          "D5S818": "9, 13",
          "D13S317": "10, 12",
          "D7S820": "10, 12",
          "D16S539": "11, 14",
          "CSF1PO": "11, 11",
          "Penta D": "10, 13",
          "vWA": "14, 17",
          "D8S1179": "12, 15",
          "TPOX": "9, 11",
          "FGA": "20, 22",
          "AMEL": "X, Y"
        }
      },
      {
        id: "DNA-0941-SUS-01",
        evidenceId: "EVD-SUS-01",
        sampleLabel: "Suspect Reference Swab (Derrick Vance)",
        donorType: "Person of Interest / Suspect",
        quantitation: "1.88 ng/µL",
        degradationIndex: "1.04",
        ipcCtValue: "27.1",
        codisEligible: false,
        codisStatus: "Direct Match with Unknown Suspect Male",
        method: "Standard Buccal Reference Amplification",
        loci: {
          "D3S1358": "15, 17",
          "TH01": "7, 9.3",
          "D21S11": "29, 31.2",
          "D18S51": "14, 16",
          "Penta E": "11, 14",
          "D5S818": "11, 12",
          "D13S317": "11, 13",
          "D7S820": "9, 11",
          "D16S539": "12, 13",
          "CSF1PO": "10, 12",
          "Penta D": "9, 12",
          "vWA": "16, 18",
          "D8S1179": "13, 14",
          "TPOX": "8, 11",
          "FGA": "21, 24",
          "AMEL": "X, Y"
        }
      }
    ],
    fingerprints: [
      {
        id: "FP-101",
        evidenceId: "EVD-0941-02",
        patternType: "Right Slant Loop",
        minutiaeCount: 16,
        ridgeDensity: "14 ridges / 5mm",
        afisScore: "98.7% AFIS Confidence",
        examinerVerdict: "Positive Identification with AFIS Record #NY-991204"
      }
    ],
    ballistics: [],
    toxicology: [
      {
        id: "TOX-881",
        substance: "Ethanol (Blood Alcohol Concentration)",
        quantity: "0.14 g/dL",
        matrix: "Femoral Blood",
        method: "Headspace Gas Chromatography (GC-FID)",
        status: "Confirmed Positive"
      },
      {
        id: "TOX-882",
        substance: "Zolpidem (Sedative)",
        quantity: "110 ng/mL (Therapeutic level)",
        matrix: "Cardiac Blood",
        method: "LC-MS/MS Triple Quad",
        status: "Confirmed Positive"
      }
    ]
  },
  {
    id: "CR-2026-1182",
    title: "Apex Vault Commercial Burglary & Safe Crack",
    category: "Burglary & Safe Breach",
    priority: "High",
    status: "Active Investigation",
    incidentDate: "2026-10-31T03:15",
    firstResponseDate: "2026-10-31T04:02",
    location: {
      address: "884 Financial Way, 4th Floor Vault",
      type: "Commercial High-Security Facility",
      gps: "40.7128° N, 74.0060° W",
      weather: "Clear indoor climate controlled, 21°C, 45% humidity",
    },
    leadExaminer: "Dr. Elena Vance",
    assignedOfficerId: "OFF-8402",
    investigatingAgency: "Special Investigations Division",
    synopsis: "Forced entry through reinforced ventilation shaft. High-precision thermal lance used on safe door. Suspect cut hand on jagged air duct metal during egress, depositing blood drops on ceiling tile and carpet.",
    fieldNotes: [
      {
        id: "FN-11",
        timestamp: "2026-10-31T04:30",
        author: "Det. Marcus Holloway",
        category: "Point of Entry Inspection",
        content: "Ventilation louver removed from exterior roof exhaust. Steel mesh cut with hydraulic shears. Droplet blood spatter (passive drops, ~12mm diameter) identified on HVAC sheet metal.",
      },
      {
        id: "FN-12",
        timestamp: "2026-10-31T05:20",
        author: "Dr. Elena Vance",
        category: "Trace & Toolmark Documentation",
        content: "Extracted slag residue around vault lock mechanism for metallurgical spectrometry. Swabbed blood drop #2 from vent edge. Labeled as BIO-1182-01.",
      }
    ],
    evidence: [
      {
        id: "EVD-1182-01",
        barcode: "BAR-9901411",
        name: "Blood Swab - HVAC Duct Sharp Edge",
        type: "Biological / DNA",
        collectedBy: "Dr. Elena Vance",
        collectionDate: "2026-10-31T05:25",
        locationFound: "HVAC Return Register #3 interior flange",
        storageCondition: "-20°C DNA Cold Vault (Shelf A1)",
        packaging: "Sterile paper envelope with barcode tag",
        status: "Extracted - Awaiting STR Run",
        notes: "Fresh blood dried overnight. 15µL equivalent sample.",
        dnaProfileId: "DNA-1182-01"
      },
      {
        id: "EVD-1182-02",
        barcode: "BAR-9901412",
        name: "Thermal Lance Fuel Nozzle Tip Fragment",
        type: "Toolmark & Metallurgy",
        collectedBy: "Det. Marcus Holloway",
        collectionDate: "2026-10-31T06:10",
        locationFound: "Vault floor 30cm from hinge pin",
        storageCondition: "Secure Trace Locker 08",
        packaging: "Rigid plastic specimen box",
        status: "Spectrometry Pending",
        notes: "Exotic copper-tungsten alloy residue.",
        dnaProfileId: null
      }
    ],
    chainOfCustody: [
      {
        id: "COC-201",
        evidenceId: "EVD-1182-01",
        evidenceName: "Blood Swab - HVAC Duct Sharp Edge",
        timestamp: "2026-10-31T07:30",
        releasedBy: "Dr. Elena Vance",
        receivedBy: "Officer T. Jenkins",
        purpose: "Initial intake logging into forensic evidence depository",
        sealIntact: true,
      }
    ],
    dnaProfiles: [
      {
        id: "DNA-1182-01",
        evidenceId: "EVD-1182-01",
        sampleLabel: "Perpetrator HVAC Bloodstain",
        donorType: "Unknown Suspect Male",
        quantitation: "0.95 ng/µL",
        degradationIndex: "1.02",
        ipcCtValue: "27.0",
        codisEligible: true,
        codisStatus: "Entered into National DNA Database",
        method: "PowerPlex Fusion 6C System",
        loci: {
          "D3S1358": "16, 17",
          "TH01": "9, 9.3",
          "D21S11": "30, 31",
          "D18S51": "12, 17",
          "Penta E": "12, 15",
          "D5S818": "12, 13",
          "D13S317": "8, 12",
          "D7S820": "8, 10",
          "D16S539": "9, 11",
          "CSF1PO": "11, 12",
          "Penta D": "11, 14",
          "vWA": "17, 19",
          "D8S1179": "14, 15",
          "TPOX": "8, 8",
          "FGA": "22, 23",
          "AMEL": "X, Y"
        }
      }
    ],
    fingerprints: [],
    ballistics: [],
    toxicology: []
  },
  {
    id: "CR-2026-0429",
    title: "Blackwood Ridge Remains Identification",
    category: "Unidentified Remains",
    priority: "Medium",
    status: "Court Ready",
    incidentDate: "2026-08-14T14:00",
    firstResponseDate: "2026-08-14T15:20",
    location: {
      address: "Blackwood State Forest, Marker 44-B",
      type: "Forest / Dense Woodland",
      gps: "41.2198° N, 73.9102° W",
      weather: "Humid forest canopy, soil pH 5.4, 24°C",
    },
    leadExaminer: "Dr. Elena Vance",
    assignedOfficerId: "OFF-8402",
    investigatingAgency: "State Police Forensic Services",
    synopsis: "Skeletal remains recovered by conservation officers. Left femur fragment and molar #19 submitted to DNA lab for specialized bone demineralization, extraction and mitochondrial/STR typing.",
    fieldNotes: [
      {
        id: "FN-31",
        timestamp: "2026-08-14T16:00",
        author: "Dr. Elena Vance",
        category: "Recovery & Demarcation",
        content: "Established 1-meter archaeological grid. Soil sieved through 1/4 inch hardware cloth. Recovered mandibular element with intact restorations.",
      }
    ],
    evidence: [
      {
        id: "EVD-0429-01",
        barcode: "BAR-7719203",
        name: "Left Femur Compact Bone Core",
        type: "Biological / Skeletal DNA",
        collectedBy: "Dr. Elena Vance",
        collectionDate: "2026-08-14T17:30",
        locationFound: "Grid quadrant C-4, depth 15cm",
        storageCondition: "-80°C Cryogenic Deep Vault",
        packaging: "Sterile moisture-sealed Teflon canister",
        status: "Full STR Profile Extracted",
        notes: "Liquid nitrogen cryogenic grinding employed. Exceptional yield.",
        dnaProfileId: "DNA-0429-01"
      }
    ],
    chainOfCustody: [
      {
        id: "COC-301",
        evidenceId: "EVD-0429-01",
        evidenceName: "Left Femur Compact Bone Core",
        timestamp: "2026-08-15T09:00",
        releasedBy: "Dr. Elena Vance",
        receivedBy: "Dr. Vance (Self/Bone Processing Cleanroom)",
        purpose: "Cleanroom bone surface sanding with aluminum oxide and UV decontamination",
        sealIntact: true,
      }
    ],
    dnaProfiles: [
      {
        id: "DNA-0429-01",
        evidenceId: "EVD-0429-01",
        sampleLabel: "Unknown Skeletal Remains #44B",
        donorType: "Unidentified Decedent",
        quantitation: "0.45 ng/µL",
        degradationIndex: "2.1 (Moderate degradation)",
        ipcCtValue: "28.9",
        codisEligible: true,
        codisStatus: "Familial Search Hit: 99.999% Kinship with Miller Missing Person Report #2024-99",
        method: "PrepFiler BTA DNA Extraction Kit / GlobalFiler",
        loci: {
          "D3S1358": "14, 15",
          "TH01": "7, 8",
          "D21S11": "28, 29",
          "D18S51": "15, 18",
          "Penta E": "10, 13",
          "D5S818": "10, 11",
          "D13S317": "11, 12",
          "D7S820": "10, 11",
          "D16S539": "11, 13",
          "CSF1PO": "10, 11",
          "Penta D": "12, 13",
          "vWA": "15, 17",
          "D8S1179": "13, 16",
          "TPOX": "8, 9",
          "FGA": "19, 21",
          "AMEL": "X, X"
        }
      }
    ],
    fingerprints: [],
    ballistics: [],
    toxicology: []
  }
];
