import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { X, ArrowRightLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TransferCustodyModal({ isOpen, onClose, caseId }) {
  const { selectedCase, addChainOfCustodyRecord, currentOfficer } = useCases();

  const evidenceList = selectedCase?.evidence || [];

  const [formData, setFormData] = useState({
    evidenceId: evidenceList[0]?.id || '',
    releasedBy: `${currentOfficer.name} (${currentOfficer.badgeNumber})`,
    receivedBy: 'Forensic Biology PCR Lab (Analyst K. Vance)',
    purpose: 'Sample aliquot extraction for STR capillary electrophoresis',
    sealIntact: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = evidenceList.find((e) => e.id === formData.evidenceId) || evidenceList[0];

    addChainOfCustodyRecord(caseId, {
      evidenceId: item?.id || 'EVD-UNKNOWN',
      evidenceName: item?.name || 'Evidence Specimen',
      releasedBy: formData.releasedBy,
      receivedBy: formData.receivedBy,
      purpose: formData.purpose,
      sealIntact: formData.sealIntact,
      timestamp: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Log Chain of Custody Transfer
              </h3>
              <p className="text-xs text-slate-400">
                Audit trail for evidentiary custody & court admissibility.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Select Evidence Item *
            </label>
            <select
              value={formData.evidenceId}
              onChange={(e) => setFormData({ ...formData, evidenceId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-mono"
            >
              {evidenceList.map((e) => (
                <option key={e.id} value={e.id}>
                  [{e.barcode}] {e.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Released By (Current Custodian)</label>
            <input
              type="text"
              required
              value={formData.releasedBy}
              onChange={(e) => setFormData({ ...formData, releasedBy: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Received By (New Custodian / Unit)</label>
            <input
              type="text"
              required
              value={formData.receivedBy}
              onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Purpose of Custody Transfer</label>
            <textarea
              rows={2}
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 placeholder-slate-500"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-slate-200">
              <input
                type="checkbox"
                checked={formData.sealIntact}
                onChange={(e) => setFormData({ ...formData, sealIntact: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span className="font-semibold text-xs">Tamper-Evident Evidence Seal is Intact and Verified</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg transition-all"
            >
              Sign & Record Custody
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
