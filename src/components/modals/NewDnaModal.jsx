import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { X, Dna, Wand2, FlaskConical, CheckCircle2 } from 'lucide-react';
import { CODIS_LOCI_LIST } from '../../data/mockData';

export default function NewDnaModal({ isOpen, onClose, caseId }) {
  const { addDnaProfile, selectedCase } = useCases();

  const evidenceOptions = selectedCase?.evidence?.filter((e) => e.type.toLowerCase().includes('bio') || e.type.toLowerCase().includes('dna')) || [];

  const [formData, setFormData] = useState({
    sampleLabel: '',
    evidenceId: evidenceOptions[0]?.id || '',
    donorType: 'Unknown Suspect Male',
    quantitation: '1.25 ng/µL',
    degradationIndex: '1.05',
    ipcCtValue: '27.2',
    method: 'GlobalFiler 24-locus PCR Amplification / ABI 3500xl CE',
    codisEligible: true,
    codisStatus: 'CODIS Database Entry Ready',
  });

  const [loci, setLoci] = useState({
    "D3S1358": "15, 16",
    "TH01": "7, 9",
    "D21S11": "29, 30",
    "D18S51": "14, 17",
    "Penta E": "11, 13",
    "D5S818": "11, 12",
    "D13S317": "11, 12",
    "D7S820": "9, 10",
    "D16S539": "11, 13",
    "CSF1PO": "10, 11",
    "Penta D": "9, 11",
    "vWA": "16, 17",
    "D8S1179": "13, 15",
    "TPOX": "8, 10",
    "FGA": "21, 23",
    "AMEL": "X, Y"
  });

  if (!isOpen) return null;

  const handleLocusChange = (locus, value) => {
    setLoci((prev) => ({ ...prev, [locus]: value }));
  };

  const handleGenerateAlleles = () => {
    // Generate realistic STR alleles
    const realisticPresets = {
      "D3S1358": `${Math.floor(14 + Math.random() * 4)}, ${Math.floor(15 + Math.random() * 4)}`,
      "TH01": `${Math.floor(6 + Math.random() * 4)}, ${Math.random() > 0.5 ? '9.3' : '8'}`,
      "D21S11": `${Math.floor(28 + Math.random() * 4)}, ${Math.floor(29 + Math.random() * 4)}`,
      "D18S51": `${Math.floor(12 + Math.random() * 6)}, ${Math.floor(15 + Math.random() * 5)}`,
      "Penta E": `${Math.floor(8 + Math.random() * 7)}, ${Math.floor(11 + Math.random() * 5)}`,
      "D5S818": `${Math.floor(9 + Math.random() * 4)}, ${Math.floor(11 + Math.random() * 3)}`,
      "D13S317": `${Math.floor(8 + Math.random() * 5)}, ${Math.floor(11 + Math.random() * 4)}`,
      "D7S820": `${Math.floor(8 + Math.random() * 4)}, ${Math.floor(10 + Math.random() * 3)}`,
      "D16S539": `${Math.floor(9 + Math.random() * 5)}, ${Math.floor(11 + Math.random() * 4)}`,
      "CSF1PO": `${Math.floor(10 + Math.random() * 3)}, ${Math.floor(11 + Math.random() * 3)}`,
      "Penta D": `${Math.floor(9 + Math.random() * 5)}, ${Math.floor(12 + Math.random() * 4)}`,
      "vWA": `${Math.floor(14 + Math.random() * 6)}, ${Math.floor(16 + Math.random() * 5)}`,
      "D8S1179": `${Math.floor(12 + Math.random() * 5)}, ${Math.floor(13 + Math.random() * 4)}`,
      "TPOX": `${Math.floor(8 + Math.random() * 3)}, ${Math.floor(8 + Math.random() * 4)}`,
      "FGA": `${Math.floor(19 + Math.random() * 6)}, ${Math.floor(21 + Math.random() * 6)}`,
      "AMEL": Math.random() > 0.3 ? "X, Y" : "X, X"
    };
    setLoci(realisticPresets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.sampleLabel.trim()) {
      alert("Please enter a sample label");
      return;
    }

    addDnaProfile(caseId, {
      sampleLabel: formData.sampleLabel.trim(),
      evidenceId: formData.evidenceId || null,
      donorType: formData.donorType,
      quantitation: formData.quantitation,
      degradationIndex: formData.degradationIndex,
      ipcCtValue: formData.ipcCtValue,
      method: formData.method,
      codisEligible: formData.codisEligible,
      codisStatus: formData.codisStatus,
      loci
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Forensic STR DNA Multiplex Entry
              </h3>
              <p className="text-xs text-slate-400">
                Log capillary electrophoresis run data & 16 standard CODIS loci.
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
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Sample Label & Donor Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Sample / Specimen Label *
              </label>
              <input
                type="text"
                required
                value={formData.sampleLabel}
                onChange={(e) => setFormData({ ...formData, sampleLabel: e.target.value })}
                placeholder="e.g., Unknown Suspect (Front Door Latch Blood)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Contributor Classification</label>
              <select
                value={formData.donorType}
                onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200"
              >
                <option value="Unknown Suspect Male">Unknown Suspect Male</option>
                <option value="Unknown Suspect Female">Unknown Suspect Female</option>
                <option value="Person of Interest / Suspect Reference">Person of Interest / Suspect Reference</option>
                <option value="Victim Reference / Elimination">Victim Reference / Elimination</option>
                <option value="Unidentified Skeletal Remains">Unidentified Skeletal Remains</option>
                <option value="Biological Touch Mixture">Biological Touch Mixture</option>
              </select>
            </div>
          </div>

          {/* Linked Evidence & Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Linked Physical Evidence Item</label>
              <select
                value={formData.evidenceId}
                onChange={(e) => setFormData({ ...formData, evidenceId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="">-- No Direct Link (Direct Reference) --</option>
                {selectedCase?.evidence?.map((e) => (
                  <option key={e.id} value={e.id}>
                    [{e.barcode}] {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PCR Multiplex Kit / CE Method</label>
              <input
                type="text"
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Quantitation Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">
                Yield (ng/µL)
              </label>
              <input
                type="text"
                value={formData.quantitation}
                onChange={(e) => setFormData({ ...formData, quantitation: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-emerald-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">
                Degradation Index
              </label>
              <input
                type="text"
                value={formData.degradationIndex}
                onChange={(e) => setFormData({ ...formData, degradationIndex: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-cyan-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">
                IPC Ct Value
              </label>
              <input
                type="text"
                value={formData.ipcCtValue}
                onChange={(e) => setFormData({ ...formData, ipcCtValue: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-indigo-400 font-mono font-bold"
              />
            </div>
          </div>

          {/* 16 STR Loci Alleles Grid */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  CODIS Core STR Loci Alleles
                </h4>
                <p className="text-[10px] text-slate-500">
                  Enter repeat counts separated by comma (e.g., 14, 16 or 7, 9.3).
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateAlleles}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                title="Populate with authentic forensic repeat distribution"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Auto-Generate Realistic Alleles</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CODIS_LOCI_LIST.map((locus) => (
                <div key={locus} className="bg-slate-900 border border-slate-800 rounded-lg p-2">
                  <label className="block font-mono text-[10px] text-slate-400 font-bold mb-1">
                    {locus} {locus === "AMEL" && <span className="text-amber-400 text-[9px]">(Sex)</span>}
                  </label>
                  <input
                    type="text"
                    value={loci[locus] || ''}
                    onChange={(e) => handleLocusChange(locus, e.target.value)}
                    placeholder="e.g. 15, 17"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-1 text-xs font-mono font-bold text-emerald-400 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 shrink-0">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.codisEligible}
                onChange={(e) => setFormData({ ...formData, codisEligible: e.target.checked })}
                className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0"
              />
              <span className="text-xs">Certify for National DNA Index (CODIS) Upload</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                Save DNA Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
