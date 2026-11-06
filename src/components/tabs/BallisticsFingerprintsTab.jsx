import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { 
  Fingerprint, 
  Crosshair, 
  FlaskRound as Flask, 
  Plus, 
  CheckCircle2, 
  Percent, 
  Sparkles,
  ShieldCheck,
  Search
} from 'lucide-react';

export default function BallisticsFingerprintsTab({ currentCase }) {
  const { updateCase } = useCases();
  const [activeSubTab, setActiveSubTab] = useState('FINGERPRINTS'); // FINGERPRINTS, TOXICOLOGY, BALLISTICS

  const [showAddModal, setShowAddModal] = useState(false);
  const [newFp, setNewFp] = useState({
    patternType: 'Right Slant Loop',
    minutiaeCount: '15',
    ridgeDensity: '12 ridges / 5mm',
    afisScore: '96.4% AFIS Confidence',
    examinerVerdict: 'Positive AFIS Match'
  });

  const [newTox, setNewTox] = useState({
    substance: 'Cannabinoids (THC-COOH)',
    quantity: '45 ng/mL',
    matrix: 'Blood / Plasma',
    method: 'LC-MS/MS',
    status: 'Confirmed Positive'
  });

  const handleAddFingerprint = (e) => {
    e.preventDefault();
    const updatedFps = [
      ...(currentCase.fingerprints || []),
      {
        id: `FP-${Math.floor(100 + Math.random() * 900)}`,
        ...newFp,
        minutiaeCount: parseInt(newFp.minutiaeCount, 10) || 12
      }
    ];
    updateCase(currentCase.id, { fingerprints: updatedFps });
    setShowAddModal(false);
  };

  const handleAddToxicology = (e) => {
    e.preventDefault();
    const updatedTox = [
      ...(currentCase.toxicology || []),
      {
        id: `TOX-${Math.floor(100 + Math.random() * 900)}`,
        ...newTox
      }
    ];
    updateCase(currentCase.id, { toxicology: updatedTox });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('FINGERPRINTS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'FINGERPRINTS'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>Latent Prints & AFIS ({currentCase.fingerprints?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('TOXICOLOGY')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'TOXICOLOGY'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flask className="w-4 h-4" />
            <span>Toxicology & Chemistry ({currentCase.toxicology?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('BALLISTICS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'BALLISTICS'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crosshair className="w-4 h-4" />
            <span>Ballistics & Toolmarks</span>
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Latent Prints Section */}
      {activeSubTab === 'FINGERPRINTS' && (
        <div className="space-y-4">
          {(!currentCase.fingerprints || currentCase.fingerprints.length === 0) ? (
            <div className="text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl">
              <Fingerprint className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No latent prints logged for this case yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCase.fingerprints.map((fp) => (
                <div key={fp.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-lg bg-slate-950 border border-cyan-800/60 flex items-center justify-center shrink-0 text-cyan-400">
                    <Fingerprint className="w-10 h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-cyan-300">{fp.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {fp.afisScore}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{fp.patternType}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Minutiae Points Identified: <span className="font-mono text-cyan-400 font-bold">{fp.minutiaeCount} points</span> (Exceeds legal 12-point standard)
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1.5 p-1.5 rounded bg-slate-950/70 border border-slate-800">
                      {fp.examinerVerdict}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Toxicology Section */}
      {activeSubTab === 'TOXICOLOGY' && (
        <div className="space-y-4">
          {(!currentCase.toxicology || currentCase.toxicology.length === 0) ? (
            <div className="text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl">
              <Flask className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No toxicology assay reports logged</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400">
                    <th className="py-2 px-3">Analyte / Substance</th>
                    <th className="py-2 px-3">Concentration / Quantity</th>
                    <th className="py-2 px-3">Biological Matrix</th>
                    <th className="py-2 px-3">Testing Method</th>
                    <th className="py-2 px-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currentCase.toxicology.map((tox) => (
                    <tr key={tox.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-semibold text-slate-100">{tox.substance}</td>
                      <td className="py-2.5 px-3 font-mono text-rose-300 font-bold">{tox.quantity}</td>
                      <td className="py-2.5 px-3 text-slate-300">{tox.matrix}</td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">{tox.method}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                          {tox.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Ballistics Section */}
      {activeSubTab === 'BALLISTICS' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center py-12">
          <Crosshair className="w-10 h-10 text-amber-500/60 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-200">Ballistics & Toolmark Comparison Station</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Compare breech face markings, firing pin impressions, and lands & grooves striation matching with NIBIN database.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-900/60 text-amber-300 text-xs font-mono">
            <span>No firearms recovered in this active scene perimeter</span>
          </div>
        </div>
      )}

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">
              Add {activeSubTab === 'FINGERPRINTS' ? 'Latent Print AFIS Entry' : 'Toxicology Assay Result'}
            </h3>

            {activeSubTab === 'FINGERPRINTS' ? (
              <form onSubmit={handleAddFingerprint} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Friction Ridge Pattern</label>
                  <select
                    value={newFp.patternType}
                    onChange={(e) => setNewFp({ ...newFp, patternType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
                  >
                    <option value="Right Slant Loop">Right Slant Loop (Ulnar/Radial)</option>
                    <option value="Left Slant Loop">Left Slant Loop</option>
                    <option value="Plain Whorl">Plain Whorl</option>
                    <option value="Accidental Whorl">Accidental Whorl / Double Loop</option>
                    <option value="Tented Arch">Tented Arch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Minutiae Points Identified</label>
                  <input
                    type="number"
                    value={newFp.minutiaeCount}
                    onChange={(e) => setNewFp({ ...newFp, minutiaeCount: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">AFIS Match Score / Confidence</label>
                  <input
                    type="text"
                    value={newFp.afisScore}
                    onChange={(e) => setNewFp({ ...newFp, afisScore: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Examiner Verdict & Annotation</label>
                  <input
                    type="text"
                    value={newFp.examinerVerdict}
                    onChange={(e) => setNewFp({ ...newFp, examinerVerdict: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white"
                  >
                    Save Print Record
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddToxicology} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Analyte / Substance Name</label>
                  <input
                    type="text"
                    value={newTox.substance}
                    onChange={(e) => setNewTox({ ...newTox, substance: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Concentration / Quantity</label>
                  <input
                    type="text"
                    value={newTox.quantity}
                    onChange={(e) => setNewTox({ ...newTox, quantity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Biological Matrix</label>
                  <input
                    type="text"
                    value={newTox.matrix}
                    onChange={(e) => setNewTox({ ...newTox, matrix: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg font-bold bg-rose-600 hover:bg-rose-500 text-white"
                  >
                    Save Toxicology Record
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
