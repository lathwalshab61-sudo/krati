import React, { useState } from 'react';
import { CaseProvider, useCases } from './context/CaseContext';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import CaseList from './components/CaseList';
import CaseDetail from './components/CaseDetail';

// Modals
import NewCaseModal from './components/modals/NewCaseModal';
import NewEvidenceModal from './components/modals/NewEvidenceModal';
import NewDnaModal from './components/modals/NewDnaModal';
import TransferCustodyModal from './components/modals/TransferCustodyModal';
import DnaComparatorModal from './components/modals/DnaComparatorModal';
import FieldNotebookDrawer from './components/FieldNotebookDrawer';

function ForensicaMain() {
  const { selectedCaseId } = useCases();

  // Modal States
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [isNewEvidenceOpen, setIsNewEvidenceOpen] = useState(false);
  const [isNewDnaOpen, setIsNewDnaOpen] = useState(false);
  const [isTransferCustodyOpen, setIsTransferCustodyOpen] = useState(false);
  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenNewCase={() => setIsNewCaseOpen(true)}
        onOpenComparator={() => setIsComparatorOpen(true)}
        onToggleNotebook={() => setIsNotebookOpen(!isNotebookOpen)}
        isNotebookOpen={isNotebookOpen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-0">
        {/* Top Operational Metrics */}
        <div className="no-print">
          <StatsBar />
        </div>

        {/* Master-Detail Case Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[720px] items-stretch">
          {/* Left Column: Directory / Search / Filters */}
          <div className="no-print lg:col-span-4 xl:col-span-4 flex flex-col min-h-0">
            <CaseList />
          </div>

          {/* Right Column: Case File / DNA Lab / Evidence Vault */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col min-h-0">
            <CaseDetail
              onOpenNewEvidence={() => setIsNewEvidenceOpen(true)}
              onOpenNewDna={() => setIsNewDnaOpen(true)}
              onOpenTransferCustody={() => setIsTransferCustodyOpen(true)}
              onOpenComparator={() => setIsComparatorOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Modals & Slide-over Drawers */}
      <NewCaseModal
        isOpen={isNewCaseOpen}
        onClose={() => setIsNewCaseOpen(false)}
      />

      <NewEvidenceModal
        isOpen={isNewEvidenceOpen}
        onClose={() => setIsNewEvidenceOpen(false)}
        caseId={selectedCaseId}
      />

      <NewDnaModal
        isOpen={isNewDnaOpen}
        onClose={() => setIsNewDnaOpen(false)}
        caseId={selectedCaseId}
      />

      <TransferCustodyModal
        isOpen={isTransferCustodyOpen}
        onClose={() => setIsTransferCustodyOpen(false)}
        caseId={selectedCaseId}
      />

      <DnaComparatorModal
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
      />

      <FieldNotebookDrawer
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CaseProvider>
      <ForensicaMain />
    </CaseProvider>
  );
}
