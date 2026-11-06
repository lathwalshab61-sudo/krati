import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { 
  Package, 
  Barcode, 
  Plus, 
  ArrowRightLeft, 
  ShieldCheck, 
  MapPin, 
  ThermometerSnowflake, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Dna,
  FileCheck
} from 'lucide-react';

export default function EvidenceVaultTab({ currentCase, onOpenNewEvidence, onOpenTransferCustody }) {
  const [filterType, setFilterType] = useState('ALL');

  const evidenceList = currentCase.evidence || [];
  const chainOfCustody = currentCase.chainOfCustody || [];

  const filteredEvidence = evidenceList.filter((item) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'BIOLOGICAL') return item.type.toLowerCase().includes('bio') || item.type.toLowerCase().includes('dna');
    if (filterType === 'PHYSICAL') return !item.type.toLowerCase().includes('bio');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Evidence Actions & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Physical & Biological Evidence Vault
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800">
              {evidenceList.length} Items Bagged & Tagged
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict barcoded chain-of-custody compliance for court admissibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTransferCustody}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Transfer Custody</span>
          </button>

          <button
            onClick={onOpenNewEvidence}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Evidence</span>
          </button>
        </div>
      </div>

      {/* Evidence Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        {[
          { id: 'ALL', label: `All Evidence (${evidenceList.length})` },
          { id: 'BIOLOGICAL', label: 'Biological / DNA Swabs' },
          { id: 'PHYSICAL', label: 'Physical & Trace Weapons' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterType === tab.id
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Evidence Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl">
            <Package className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No evidence items logged under this filter</p>
            <button
              onClick={onOpenNewEvidence}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              + Log First Evidence Item
            </button>
          </div>
        ) : (
          filteredEvidence.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Barcode & ID Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-950 text-indigo-300 border border-indigo-900 flex items-center gap-1">
                    <Barcode className="w-3.5 h-3.5" />
                    <span>{item.barcode}</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.type}
                  </span>
                </div>

                {/* Evidence Name */}
                <h4 className="text-xs font-bold text-slate-100 mb-2 leading-snug">
                  {item.name}
                </h4>

                {/* Details */}
                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium">Found: {item.locationFound}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-cyan-300/90 font-mono text-[10px]">{item.storageCondition}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Collected: {new Date(item.collectionDate).toLocaleString()} by {item.collectedBy}</span>
                  </div>
                </div>

                {item.notes && (
                  <div className="mt-2.5 p-2 rounded bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300">
                    <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Examiner Observations:</span>
                    {item.notes}
                  </div>
                )}
              </div>

              {/* Status footer & DNA Link */}
              <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>{item.status}</span>
                </span>

                {item.dnaProfileId && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                    <Dna className="w-3 h-3" />
                    <span>STR Linked</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Official Legal Chain of Custody Ledger */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Legal Chain of Custody Audit Ledger
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Court Admissible Log (ISO/IEC 17025 Standard)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-semibold uppercase text-slate-400 bg-slate-950/50">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Evidence Item</th>
                <th className="py-2.5 px-3">Released By</th>
                <th className="py-2.5 px-3">Received By</th>
                <th className="py-2.5 px-3">Purpose & Activity</th>
                <th className="py-2.5 px-3 text-center">Tamper Seal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {chainOfCustody.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    No chain of custody transfers logged yet.
                  </td>
                </tr>
              ) : (
                chainOfCustody.map((coc, idx) => (
                  <tr key={coc.id || idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                      {new Date(coc.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-100">
                      {coc.evidenceName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                      {coc.releasedBy}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                      {coc.receivedBy}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {coc.purpose}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {coc.sealIntact ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          <CheckCircle className="w-3 h-3" />
                          <span>Intact</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Broken</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
