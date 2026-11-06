import React from 'react';
import { useCases } from '../context/CaseContext';
import { ShieldAlert, Dna, PackageCheck, FileBadge2, AlertTriangle, Layers } from 'lucide-react';

export default function StatsBar() {
  const { cases, currentOfficer } = useCases();

  const totalCases = cases.length;
  const myCases = cases.filter(c => c.assignedOfficerId === currentOfficer.id || c.leadExaminer === currentOfficer.name).length;
  
  const totalDna = cases.reduce((acc, c) => acc + (c.dnaProfiles?.length || 0), 0);
  const totalEvidence = cases.reduce((acc, c) => acc + (c.evidence?.length || 0), 0);
  const courtReady = cases.filter(c => c.status === "Court Ready" || c.status === "Closed/Archived").length;
  const criticalCases = cases.filter(c => c.priority === "Critical").length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* Total Cases */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider">Active Casework</span>
          <Layers className="w-4 h-4 text-sky-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-100 font-mono">{totalCases}</span>
          <span className="text-[10px] text-slate-400">Total Cases</span>
        </div>
      </div>

      {/* My Cases */}
      <div className="bg-slate-900/80 border border-cyan-900/40 rounded-xl p-3 shadow-sm hover:border-cyan-700/60 transition-colors">
        <div className="flex items-center justify-between text-cyan-400 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider">Assigned to Me</span>
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-cyan-300 font-mono">{myCases}</span>
          <span className="text-[10px] text-cyan-500/80">Officer Cases</span>
        </div>
      </div>

      {/* DNA Profiles */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider">DNA STR Profiles</span>
          <Dna className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400 font-mono">{totalDna}</span>
          <span className="text-[10px] text-slate-400">CODIS Loci Sets</span>
        </div>
      </div>

      {/* Evidence Items */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider">Evidence Items</span>
          <PackageCheck className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-indigo-300 font-mono">{totalEvidence}</span>
          <span className="text-[10px] text-slate-400">In Secure Vault</span>
        </div>
      </div>

      {/* Critical Priority */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider">Priority Red</span>
          <AlertTriangle className="w-4 h-4 text-rose-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-400 font-mono">{criticalCases}</span>
          <span className="text-[10px] text-rose-500/70">Urgent Lab Run</span>
        </div>
      </div>

      {/* Court Ready */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 shadow-sm hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-wider">Court Ready</span>
          <FileBadge2 className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-300 font-mono">{courtReady}</span>
          <span className="text-[10px] text-amber-500/80">Dossiers Cert.</span>
        </div>
      </div>
    </div>
  );
}
