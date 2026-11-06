import React, { useState } from 'react';
import { 
  Dna, 
  Activity, 
  GitCompare, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  FlaskConical, 
  FileSpreadsheet,
  Zap,
  Info
} from 'lucide-react';
import { CODIS_LOCI_LIST } from '../../data/mockData';

export default function DnaLabTab({ currentCase, onOpenNewDna, onOpenComparator }) {
  const dnaProfiles = currentCase.dnaProfiles || [];
  const [selectedProfileId, setSelectedProfileId] = useState(dnaProfiles[0]?.id || null);

  const activeProfile = dnaProfiles.find((p) => p.id === selectedProfileId) || dnaProfiles[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Dna className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Forensic DNA & STR Profiling Laboratory (CODIS Standard)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              {dnaProfiles.length} Profiles Sequenced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Replaces manual laboratory lab books with digital STR multiplex tracking & allele match verification.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenComparator}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/80 hover:border-cyan-500 transition-all cursor-pointer shadow-sm"
          >
            <GitCompare className="w-4 h-4 text-cyan-400" />
            <span>Compare STR Alleles</span>
          </button>

          <button
            onClick={onOpenNewDna}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add DNA Profile</span>
          </button>
        </div>
      </div>

      {dnaProfiles.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl">
          <FlaskConical className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-300 mb-1">No DNA Profiles Logged in Case</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            Upload or transcribe DNA quantification data and 16-24 STR loci from capillary electrophoresis to initiate profile matching.
          </p>
          <button
            onClick={onOpenNewDna}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
          >
            + Enter First DNA Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Selectors Side Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Profiles in this Case
            </h4>
            <div className="space-y-2">
              {dnaProfiles.map((p) => {
                const isSelected = p.id === (activeProfile?.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProfileId(p.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500/40'
                        : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono font-bold text-emerald-400">{p.id}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-300">
                        {p.donorType || 'Biological'}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-100 line-clamp-1 mb-1">
                      {p.sampleLabel}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span>Yield: {p.quantitation}</span>
                      <span className={p.codisEligible ? 'text-cyan-400' : 'text-slate-500'}>
                        {p.codisEligible ? 'CODIS Eligible' : 'Ref Sample'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scientific Guide Card */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Forensic STR Protocol</span>
              </div>
              <p>
                Profiles follow the expanded FBI CODIS 20 core loci standard. Heterozygotes show dual allele repeats; homozygotes show identical repeats.
              </p>
            </div>
          </div>

          {/* Detailed Profile View & Loci Matrix */}
          <div className="lg:col-span-3 space-y-5">
            {activeProfile && (
              <>
                {/* Profile Overview Card */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-100">
                          {activeProfile.sampleLabel}
                        </h4>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {activeProfile.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Classification: <span className="text-slate-200">{activeProfile.donorType}</span> • Amplification Method: <span className="font-mono text-cyan-300">{activeProfile.method}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950 text-emerald-400 border border-emerald-900/80">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{activeProfile.codisStatus}</span>
                      </span>
                    </div>
                  </div>

                  {/* Quantitative Lab Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">DNA Concentration</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">{activeProfile.quantitation}</span>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Degradation Index (DI)</span>
                      <span className="text-xs font-bold font-mono text-cyan-400">{activeProfile.degradationIndex}</span>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Internal PCR Control (IPC)</span>
                      <span className="text-xs font-bold font-mono text-indigo-400">{activeProfile.ipcCtValue}</span>
                    </div>
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Amelogenin (Sex Marker)</span>
                      <span className="text-xs font-bold font-mono text-amber-400">
                        {activeProfile.loci?.["AMEL"] || "X, Y"} {activeProfile.loci?.["AMEL"]?.includes("Y") ? " (Male)" : " (Female)"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Electropherogram Mock Visualizer */}
                <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span>Capillary Electrophoresis Peak Trace (Electropherogram Simulation)</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      Laser Excitation 505nm-650nm (RFU Scale 0 - 5000)
                    </span>
                  </div>

                  {/* Simulated Peak Graphics */}
                  <div className="h-20 w-full relative bg-slate-900/90 border border-slate-800 rounded-lg overflow-hidden flex items-end px-4 gap-2">
                    {/* SVG Peak Wave */}
                    <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 500 100">
                      <path
                        d="M 0 95 L 30 95 L 45 30 L 60 95 L 90 95 L 110 15 L 130 95 L 170 95 L 185 45 L 200 95 L 240 95 L 260 20 L 280 95 L 330 95 L 345 35 L 360 95 L 400 95 L 420 10 L 440 95 L 500 95"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                      />
                      <path
                        d="M 0 95 L 50 95 L 70 40 L 90 95 L 140 95 L 155 25 L 170 95 L 210 95 L 225 35 L 240 95 L 300 95 L 315 15 L 330 95 L 370 95 L 390 40 L 410 95 L 500 95"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        opacity="0.8"
                      />
                    </svg>
                    <div className="absolute top-2 left-3 flex gap-3 text-[10px] font-mono">
                      <span className="text-cyan-400 font-bold">● 6-FAM (Blue)</span>
                      <span className="text-emerald-400 font-bold">● VIC (Green)</span>
                      <span className="text-amber-400 font-bold">● NED (Yellow)</span>
                      <span className="text-rose-400 font-bold">● PET (Red)</span>
                    </div>
                  </div>
                </div>

                {/* 16-24 CODIS STR Loci Allele Matrix */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                        <span>Core STR Loci Repeat Numbers</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Short Tandem Repeat alleles stored for this evidentiary sample.
                      </p>
                    </div>

                    <button
                      onClick={onOpenComparator}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800 hover:bg-cyan-900/60 transition-colors"
                    >
                      Compare with Suspect
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2.5">
                    {CODIS_LOCI_LIST.map((locus) => {
                      const allele = activeProfile.loci?.[locus] || "Unamplified";
                      const isAmel = locus === "AMEL";

                      return (
                        <div
                          key={locus}
                          className="bg-slate-950/90 border border-slate-800 rounded-lg p-2.5 hover:border-slate-700 transition-colors"
                        >
                          <div className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                            <span>{locus}</span>
                            {isAmel && <span className="text-amber-400 text-[9px]">SEX</span>}
                          </div>
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className={`text-sm font-bold font-mono ${
                              allele === "Unamplified" ? "text-slate-600" : "text-emerald-400"
                            }`}>
                              {allele}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
