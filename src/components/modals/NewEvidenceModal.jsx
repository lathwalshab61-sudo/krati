import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { X, Package, Barcode, MapPin, ThermometerSnowflake, FileText } from 'lucide-react';

export default function NewEvidenceModal({ isOpen, onClose, caseId }) {
  const { addEvidence, currentOfficer } = useCases();

  const [formData, setFormData] = useState({
    name: '',
    type: 'Biological / DNA',
    locationFound: '',
    storageCondition: '-20°C DNA Cold Vault (Shelf B1)',
    packaging: 'Forensic sterile paper envelope with desiccant',
    notes: '',
    barcode: `BAR-${Math.floor(1000000 + Math.random() * 9000000)}`
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter evidence name or description");
      return;
    }

    addEvidence(caseId, {
      name: formData.name.trim(),
      type: formData.type,
      locationFound: formData.locationFound || 'Crime Scene Perimeter',
      storageCondition: formData.storageCondition,
      packaging: formData.packaging,
      notes: formData.notes,
      barcode: formData.barcode,
      status: formData.type.includes('DNA') ? 'Awaiting STR Extraction' : 'Logged & Secured',
      collectedBy: currentOfficer.name,
      collectionDate: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Log New Physical / Biological Evidence
              </h3>
              <p className="text-xs text-slate-400">
                Case ID: <span className="font-mono text-cyan-400">{caseId}</span> • Bagged, Tagged & Chain Initiated
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
          {/* Barcode & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-bold mb-1">
                Evidence Description / Item Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Blood Swab - Steering Wheel Rim"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:border-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 flex items-center gap-1">
                <Barcode className="w-3.5 h-3.5 text-indigo-400" />
                <span>Barcode Tag</span>
              </label>
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-indigo-300 font-mono font-bold"
              />
            </div>
          </div>

          {/* Type & Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Evidence Classification</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="Biological / DNA">Biological / DNA (Blood, Saliva, Touch)</option>
                <option value="Physical & Weapon">Physical Weapon (Firearm, Knife, Blunt)</option>
                <option value="Latent Fingerprint">Latent Fingerprint Lift</option>
                <option value="Trace / Fiber / Paint">Trace Evidence (Fiber, Paint, Soil)</option>
                <option value="Toxicology Specimen">Toxicology (Blood, Urine, Vitreous)</option>
                <option value="Digital Storage Media">Digital Device / Phone / Drive</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Storage Condition</label>
              <select
                value={formData.storageCondition}
                onChange={(e) => setFormData({ ...formData, storageCondition: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono text-[11px]"
              >
                <option value="-20°C DNA Cold Vault (Shelf B1)">-20°C DNA Cold Vault (Biological)</option>
                <option value="-80°C Ultra-Low Cryo Freezer">-80°C Ultra-Low Cryo (Bone/Tissue)</option>
                <option value="Desiccant Humidity-Controlled Cabinet">Desiccant Cabinet (Trace/Touch DNA)</option>
                <option value="Secure Trace Locker 08">Secure Trace Locker (Weapons/Physical)</option>
                <option value="Room Temp Secure Vault Box">Room Temp Secure Vault Box</option>
              </select>
            </div>
          </div>

          {/* Location Found */}
          <div>
            <label className="block text-slate-400 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Exact Location Found at Crime Scene</span>
            </label>
            <input
              type="text"
              value={formData.locationFound}
              onChange={(e) => setFormData({ ...formData, locationFound: e.target.value })}
              placeholder="e.g., Master bedroom north wall, 1.4m above floor, adjacent to light switch"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
            />
          </div>

          {/* Packaging */}
          <div>
            <label className="block text-slate-400 mb-1">
              Packaging & Tamper-Evident Seal
            </label>
            <input
              type="text"
              value={formData.packaging}
              onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
              placeholder="e.g., Breathable paper envelope with red integrity tape seal #9910"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200"
            />
          </div>

          {/* Examiner Notes */}
          <div>
            <label className="block text-slate-400 mb-1">
              Examiner Field Observations & Collection Notes
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Blood spatter elliptical angle ~35°, air dried for 40 min before envelope insertion."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 placeholder-slate-500"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono">
              Collected By: {currentOfficer.name}
            </span>
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
                className="px-5 py-2 rounded-lg font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Save Evidence & Initiate Chain
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
