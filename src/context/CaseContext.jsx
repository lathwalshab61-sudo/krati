import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_CASES, INITIAL_OFFICERS } from '../data/mockData';

const CaseContext = createContext();

const STORAGE_CASES_KEY = 'forensica_cases_data_v1';
const STORAGE_OFFICER_KEY = 'forensica_active_officer_v1';

export function CaseProvider({ children }) {
  const [officers] = useState(INITIAL_OFFICERS);
  
  const [currentOfficer, setCurrentOfficerState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_OFFICER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading officer from localStorage", e);
    }
    return INITIAL_OFFICERS[0];
  });

  const [cases, setCases] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CASES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading cases from localStorage", e);
    }
    return INITIAL_CASES;
  });

  const [selectedCaseId, setSelectedCaseId] = useState(INITIAL_CASES[0]?.id || null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(cases));
    } catch (e) {
      console.error("Failed to save cases to localStorage", e);
    }
  }, [cases]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_OFFICER_KEY, JSON.stringify(currentOfficer));
    } catch (e) {
      console.error("Failed to save officer to localStorage", e);
    }
  }, [currentOfficer]);

  const setCurrentOfficer = (officer) => {
    setCurrentOfficerState(officer);
  };

  const addCase = (caseData) => {
    const newCase = {
      ...caseData,
      id: caseData.id || `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      evidence: caseData.evidence || [],
      chainOfCustody: caseData.chainOfCustody || [],
      dnaProfiles: caseData.dnaProfiles || [],
      fingerprints: caseData.fingerprints || [],
      ballistics: caseData.ballistics || [],
      toxicology: caseData.toxicology || [],
      fieldNotes: caseData.fieldNotes || [],
      assignedOfficerId: caseData.assignedOfficerId || currentOfficer.id,
      leadExaminer: caseData.leadExaminer || currentOfficer.name,
      status: caseData.status || "Active Investigation",
      priority: caseData.priority || "High"
    };

    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);
    return newCase;
  };

  const updateCase = (caseId, updates) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, ...updates } : c))
    );
  };

  const deleteCase = (caseId) => {
    setCases((prev) => prev.filter((c) => c.id !== caseId));
    if (selectedCaseId === caseId) {
      const remaining = cases.filter((c) => c.id !== caseId);
      setSelectedCaseId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const addEvidence = (caseId, evidenceItem) => {
    const newEvidence = {
      ...evidenceItem,
      id: evidenceItem.id || `EVD-${caseId.slice(-4)}-${String(Math.floor(10 + Math.random() * 90))}`,
      barcode: evidenceItem.barcode || `BAR-${Math.floor(1000000 + Math.random() * 9000000)}`,
      collectionDate: evidenceItem.collectionDate || new Date().toISOString().slice(0, 16),
      collectedBy: evidenceItem.collectedBy || currentOfficer.name
    };

    const initialCoC = {
      id: `COC-${Math.floor(100 + Math.random() * 900)}`,
      evidenceId: newEvidence.id,
      evidenceName: newEvidence.name,
      timestamp: new Date().toISOString().slice(0, 16),
      releasedBy: `${currentOfficer.name} (${currentOfficer.badgeNumber})`,
      receivedBy: "Forensic Evidence Depository / Central Intake",
      purpose: "Initial field recovery, bagging, barcoding and vault intake",
      sealIntact: true
    };

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            evidence: [newEvidence, ...(c.evidence || [])],
            chainOfCustody: [initialCoC, ...(c.chainOfCustody || [])]
          };
        }
        return c;
      })
    );

    return newEvidence;
  };

  const addDnaProfile = (caseId, dnaProfile) => {
    const newProfile = {
      ...dnaProfile,
      id: dnaProfile.id || `DNA-${caseId.slice(-4)}-${Math.floor(10 + Math.random() * 90)}`,
      quantitation: dnaProfile.quantitation || "1.0 ng/µL",
      degradationIndex: dnaProfile.degradationIndex || "1.0",
      ipcCtValue: dnaProfile.ipcCtValue || "27.0",
      method: dnaProfile.method || "GlobalFiler 24-locus PCR Amplification",
      codisStatus: dnaProfile.codisStatus || "Pending Database Cross-Check"
    };

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          // Also update the linked evidence status if applicable
          const updatedEvidence = (c.evidence || []).map((ev) => {
            if (ev.id === newProfile.evidenceId) {
              return { ...ev, status: "DNA Profile Generated", dnaProfileId: newProfile.id };
            }
            return ev;
          });

          return {
            ...c,
            evidence: updatedEvidence,
            dnaProfiles: [newProfile, ...(c.dnaProfiles || [])]
          };
        }
        return c;
      })
    );

    return newProfile;
  };

  const addChainOfCustodyRecord = (caseId, cocRecord) => {
    const newRecord = {
      ...cocRecord,
      id: `COC-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: cocRecord.timestamp || new Date().toISOString().slice(0, 16),
      sealIntact: cocRecord.sealIntact !== undefined ? cocRecord.sealIntact : true
    };

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            chainOfCustody: [newRecord, ...(c.chainOfCustody || [])]
          };
        }
        return c;
      })
    );
  };

  const addFieldNote = (caseId, note) => {
    const newNote = {
      ...note,
      id: `FN-${Date.now()}`,
      timestamp: note.timestamp || new Date().toISOString().slice(0, 16),
      author: note.author || currentOfficer.name
    };

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            fieldNotes: [newNote, ...(c.fieldNotes || [])]
          };
        }
        return c;
      })
    );
  };

  const exportDataToJson = () => {
    const dataStr = JSON.stringify({ cases, exportedAt: new Date().toISOString(), version: "1.0" }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `FORENSICA_CASES_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDataFromJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && Array.isArray(parsed.cases)) {
        setCases(parsed.cases);
        if (parsed.cases.length > 0) setSelectedCaseId(parsed.cases[0].id);
        return { success: true, count: parsed.cases.length };
      }
      return { success: false, error: "Invalid format: 'cases' array missing" };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const resetToDefaultData = () => {
    setCases(INITIAL_CASES);
    setSelectedCaseId(INITIAL_CASES[0]?.id || null);
    setCurrentOfficer(INITIAL_OFFICERS[0]);
    localStorage.removeItem(STORAGE_CASES_KEY);
    localStorage.removeItem(STORAGE_OFFICER_KEY);
  };

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0] || null;

  return (
    <CaseContext.Provider
      value={{
        cases,
        selectedCaseId,
        selectedCase,
        setSelectedCaseId,
        currentOfficer,
        setCurrentOfficer,
        officers,
        addCase,
        updateCase,
        deleteCase,
        addEvidence,
        addDnaProfile,
        addChainOfCustodyRecord,
        addFieldNote,
        exportDataToJson,
        importDataFromJson,
        resetToDefaultData
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export function useCases() {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error("useCases must be used within a CaseProvider");
  }
  return context;
}
