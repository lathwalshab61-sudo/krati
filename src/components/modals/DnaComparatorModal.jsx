import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { X, GitCompare, CheckCircle2, AlertTriangle, XCircle, Sparkles, Dna, Info } from 'lucide-react';
import { CODIS_LOCI_LIST } from '../../data/mockData';

export default function DnaComparatorModal({ isOpen, onClose }) {
  const { cases, selectedCase } = useCases();

  // Gather all DNA profiles from all cases or current case
  const allProfiles = cases.flatMap((c) =>
    (c.dnaProfiles || []).map((p) => ({
      ...p,
      caseId: c.id,
      caseTitle: c.title
    }))
  );

  const [profileAId, setProfileAId] = useState(selectedCase?.dnaProfiles?.[0]?.id || allProfiles[0]?.id || '');
  const [profileBId, setProfileBId] = useState(
    selectedCase?.dnaProfiles?.[3]?.id || selectedCase?.dnaProfiles?.[1]?.id || allProfiles[1]?.id || ''
  );

  if (!isOpen) return null;

  const profileA = allProfiles.find((p) => p.id === profileAId);
  const profileB = allProfiles.find((p) => p.id === profileBId);

  // Compare loci
  let fullMatchCount = 0;
  let partialMatchCount = 0;
  let mismatchCount = 0;
  let evaluatedLoci = 0;

  const comparisonResults = CODIS_LOCI_LIST.map((locus) => {
    const aAlleles = profileA?.loci?.[locus]?.split(',').map((s) => s.trim()) || [];
    const bAlleles = profileB?.loci?.[locus]?.split(',').map((s) => s.trim()) || [];

    if (aAlleles.length === 0 || bAlleles.length === 0) {
      return { locus, status: 'NO_DATA', a: aAlleles.join(', ') || '-', b: bAlleles.join(', ') || '-' };
    }

    evaluatedLoci++;
    // Sort alleles
    const aSorted = [...aAlleles].sort().join(',');
    const bSorted = [...bAlleles].sort().join(',');

    if (aSorted === bSorted) {
      fullMatchCount++;
      return { locus, status: 'MATCH', a: aAlleles.join(', '), b: bAlleles.join(', ') };
    }

    // Check partial overlap
    const hasOverlap = aAlleles.some((al) => bAlleles.includes(al));
    if (hasOverlap) {
      partialMatchCount++;
      return { locus, status: 'PARTIAL', a: aAlleles.join(', '), b: bAlleles.join(', ') };
    }

    mismatchCount++;
    return { locus, status: 'MISMATCH', a: aAlleles.join(', '), b: bAlleles.join(', ') };
  });

  const isFullInclusion = evaluatedLoci > 0 && mismatchCount === 0 && fullMatchCount === evaluatedLoci;
  const isExcluded = mismatchCount > 2;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span>STR Allele Locus Comparator & Biostatistical Matcher</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  CODIS Protocol
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Compare crime scene evidence DNA against suspect / reference profiles with real-time locus pairing.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Profile Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specimen A */}
            <div className="bg-slate-950/80 border border-cyan-800/60 rounded-xl p-3.5 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Specimen A (Crime Scene Unknown)
              </label>
              <select
                value={profileAId}
                onChange={(e) => setProfileAId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 font-mono focus:border-cyan-400"
              >
                {allProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.caseId}] {p.sampleLabel} ({p.donorType})
                  </option>
                ))}
              </select>
              {profileA && (
                <div className="text-[11px] text-slate-400 flex justify-between pt-1 font-mono">
                  <span>Yield: {profileA.quantitation}</span>
                  <span className="text-slate-300">Method: {profileA.method?.slice(0, 20)}...</span>
                </div>
              )}
            </div>

            {/* Specimen B */}
            <div className="bg-slate-950/80 border border-indigo-800/60 rounded-xl p-3.5 space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Specimen B (Suspect Reference / Elimination)
              </label>
              <select
                value={profileBId}
                onChange={(e) => setProfileBId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 font-mono focus:border-indigo-400"
              >
                {allProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.caseId}] {p.sampleLabel} ({p.donorType})
                  </option>
                ))}
              </select>
              {profileB && (
                <div className="text-[11px] text-slate-400 flex justify-between pt-1 font-mono">
                  <span>Yield: {profileB.quantitation}</span>
                  <span className="text-slate-300">Method: {profileB.method?.slice(0, 20)}...</span>
                </div>
              )}
            </div>
          </div>

          {/* Biostatistical Match Outcome Banner */}
          <div className="rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950">
            <div className="flex items-center gap-3">
              {isFullInclusion ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : isExcluded ? (
                <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              )}

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Forensic Biostatistical Conclusion
                </div>
                <div className={`text-sm font-extrabold ${
                  isFullInclusion ? 'text-emerald-400' : isExcluded ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {isFullInclusion 
                    ? 'COMPLETE MATCH (16/16 Loci Concordance - 100% Inclusion)' 
                    : isExcluded 
                    ? `DEFINITIVE EXCLUSION (${mismatchCount} Non-concordant Loci)` 
                    : `PARTIAL INCLUSION / MIXTURE (${fullMatchCount} Exact, ${partialMatchCount} Shared)`}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {isFullInclusion 
                    ? 'Random Match Probability (RMP): < 1 in 4.8 × 10¹⁸ (Exceeds world population certitude)' 
                    : 'Allelic discordance demonstrates that Specimen B cannot be the contributor of Specimen A.'}
                </div>
              </div>
            </div>

            {/* Match Counter Badges */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {fullMatchCount} Match
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
                {partialMatchCount} Partial
              </span>
              <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
                {mismatchCount} Mismatch
              </span>
            </div>
          </div>

          {/* Loci Comparison Matrix Grid */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
            <div className="grid grid-cols-4 bg-slate-950 p-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <div>STR Locus</div>
              <div className="text-cyan-400">Specimen A Alleles</div>
              <div className="text-indigo-400">Specimen B Alleles</div>
              <div className="text-right">Match Verdict</div>
            </div>

            <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto">
              {comparisonResults.map((res) => {
                const isMatch = res.status === 'MATCH';
                const isPartial = res.status === 'PARTIAL';
                const isMismatch = res.status === 'MISMATCH';

                return (
                  <div
                    key={res.locus}
                    className={`grid grid-cols-4 p-2 text-xs items-center transition-colors ${
                      isMatch
                        ? 'bg-emerald-950/20'
                        : isMismatch
                        ? 'bg-rose-950/20'
                        : isPartial
                        ? 'bg-amber-950/20'
                        : ''
                    }`}
                  >
                    <div className="font-mono font-bold text-slate-200">
                      {res.locus}
                    </div>
                    <div className="font-mono text-cyan-300">
                      {res.a}
                    </div>
                    <div className="font-mono text-indigo-300">
                      {res.b}
                    </div>
                    <div className="text-right">
                      {isMatch && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>CONCORDANT</span>
                        </span>
                      )}
                      {isPartial && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                          <span>PARTIAL</span>
                        </span>
                      )}
                      {isMismatch && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                          <span>EXCLUDED</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-mono">
            Scientific Standard: FBI QAS Audit Document 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Comparator
          </button>
        </div>
      </div>
    </div>
  );
}
