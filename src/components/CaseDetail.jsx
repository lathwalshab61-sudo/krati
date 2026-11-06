import React, { useState } from 'react';
import { useCases } from '../context/CaseContext';
import { 
  Dna, 
  Package, 
  FileText, 
  Fingerprint, 
  FileCheck, 
  Trash2, 
  Printer, 
  Plus, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';

import CaseOverviewTab from './tabs/CaseOverviewTab';
import EvidenceVaultTab from './tabs/EvidenceVaultTab';
import DnaLabTab from './tabs/DnaLabTab';
import BallisticsFingerprintsTab from './tabs/BallisticsFingerprintsTab';
import CourtReportTab from './tabs/CourtReportTab';

export default function CaseDetail({ 
  onOpenNewEvidence, 
  onOpenNewDna, 
  onOpenTransferCustody, 
  onOpenComparator 
}) {
  const { selectedCase, updateCase, deleteCase } = useCases();
  const [activeTab, setActiveTab] = useState('OVERVIEW'); // OVERVIEW, EVIDENCE, DNA_LAB, FORENSICS, COURT_REPORT

  if (!selectedCase) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
        <div className="text-center">
          <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No Case Selected</h3>
          <p className="text-xs text-slate-500 mt-1">Select an active investigation from the directory or create a new case intake.</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateCase(selectedCase.id, { status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    updateCase(selectedCase.id, { priority: newPriority });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete case record ${selectedCase.id}?`)) {
      deleteCase(selectedCase.id);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-w-0">
      {/* Dossier Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/90 space-y-4">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-cyan-800 tracking-wider shadow-inner">
              {selectedCase.id}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
              {selectedCase.category}
            </span>

            {/* Priority Selector */}
            <select
              value={selectedCase.priority}
              onChange={(e) => handlePriorityChange(e.target.value)}
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                selectedCase.priority === 'Critical'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                  : selectedCase.priority === 'High'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                  : 'bg-blue-950/80 text-blue-300 border-blue-800'
              }`}
            >
              <option value="Critical">Priority: Critical</option>
              <option value="High">Priority: High</option>
              <option value="Medium">Priority: Medium</option>
              <option value="Cold Case">Priority: Cold Case</option>
            </select>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Status Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Status:</span>
              <select
                value={selectedCase.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="Active Investigation">Active Investigation</option>
                <option value="Under Lab Analysis">Under Lab Analysis</option>
                <option value="Court Ready">Court Ready</option>
                <option value="Closed/Archived">Closed / Archived</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab('COURT_REPORT')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
              title="Print Official Court Report"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800 transition-colors"
              title="Delete Case"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Case Title & Quick Overview Info */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            {selectedCase.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-slate-400 font-sans">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{selectedCase.location?.address}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Incident: {new Date(selectedCase.incidentDate).toLocaleString()}</span>
            </span>
            <span className="text-slate-300">
              Lead Examiner: <strong className="text-cyan-300 font-mono">{selectedCase.leadExaminer}</strong>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-800/80 pt-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'OVERVIEW', label: 'Scene & Field Notes', icon: FileText, count: selectedCase.fieldNotes?.length },
            { id: 'EVIDENCE', label: 'Evidence & Custody Vault', icon: Package, count: selectedCase.evidence?.length },
            { id: 'DNA_LAB', label: 'DNA & STR Laboratory', icon: Dna, count: selectedCase.dnaProfiles?.length },
            { id: 'FORENSICS', label: 'Prints & Toxicology', icon: Fingerprint, count: (selectedCase.fingerprints?.length || 0) + (selectedCase.toxicology?.length || 0) },
            { id: 'COURT_REPORT', label: 'Court Dossier (Printable)', icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents View */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'OVERVIEW' && (
          <CaseOverviewTab currentCase={selectedCase} />
        )}

        {activeTab === 'EVIDENCE' && (
          <EvidenceVaultTab
            currentCase={selectedCase}
            onOpenNewEvidence={onOpenNewEvidence}
            onOpenTransferCustody={onOpenTransferCustody}
          />
        )}

        {activeTab === 'DNA_LAB' && (
          <DnaLabTab
            currentCase={selectedCase}
            onOpenNewDna={onOpenNewDna}
            onOpenComparator={onOpenComparator}
          />
        )}

        {activeTab === 'FORENSICS' && (
          <BallisticsFingerprintsTab currentCase={selectedCase} />
        )}

        {activeTab === 'COURT_REPORT' && (
          <CourtReportTab currentCase={selectedCase} />
        )}
      </div>
    </div>
  );
}
