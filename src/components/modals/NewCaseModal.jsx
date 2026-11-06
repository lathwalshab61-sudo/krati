import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { X, FolderPlus, MapPin, Calendar, FileText, Shield, Thermometer } from 'lucide-react';

export default function NewCaseModal({ isOpen, onClose }) {
  const { addCase, currentOfficer } = useCases();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Homicide',
    priority: 'Critical',
    status: 'Active Investigation',
    incidentDate: new Date().toISOString().slice(0, 16),
    firstResponseDate: new Date().toISOString().slice(0, 16),
    address: '',
    sceneType: 'Indoor Residential',
    gps: '40.7128° N, 74.0060° W',
    weather: 'Clear, 20°C, 50% humidity',
    agency: 'Metropolitan Homicide & Forensic Bureau',
    synopsis: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a case title");
      return;
    }

    const year = new Date().getFullYear();
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const generatedCaseId = `CR-${year}-${randomId}`;

    addCase({
      id: generatedCaseId,
      title: formData.title.trim(),
      category: formData.category,
      priority: formData.priority,
      status: formData.status,
      incidentDate: formData.incidentDate,
      firstResponseDate: formData.firstResponseDate,
      location: {
        address: formData.address || 'Scene location pending',
        type: formData.sceneType,
        gps: formData.gps,
        weather: formData.weather
      },
      leadExaminer: currentOfficer.name,
      assignedOfficerId: currentOfficer.id,
      investigatingAgency: formData.agency,
      synopsis: formData.synopsis || 'Initial scene entry logged. Evidence recovery in progress.',
      fieldNotes: [
        {
          id: `FN-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author: `${currentOfficer.name} (${currentOfficer.badgeNumber})`,
          category: 'Scene Arrival',
          content: `Case intake initiated by ${currentOfficer.name}. Crime scene perimeter established and initial forensic triage underway.`
        }
      ]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Crime Scene Case Intake & Dossier Creation
              </h3>
              <p className="text-xs text-slate-400">
                Log new forensic investigation, scene parameters, and assign chain-of-custody vault.
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
          {/* Case Title */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Case Incident Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Waterfront Marina Pier 14 Homicide & Assault"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Category, Priority, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="Homicide">Homicide / Death Investigation</option>
                <option value="Burglary & Safe Breach">Burglary / Safe Breach</option>
                <option value="Unidentified Remains">Unidentified Skeletal Remains</option>
                <option value="Sexual Assault / Biology">Sexual Assault Kit / DNA</option>
                <option value="Armed Assault">Armed Assault / Ballistics</option>
                <option value="Narcotics & Toxicology">Toxicology / Chemical Overdose</option>
                <option value="Hit & Run / Trace">Hit & Run / Paint & Fiber</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Priority Level</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="Critical">Critical (Immediate Lab Run)</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Standard</option>
                <option value="Cold Case">Cold Case Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Investigation Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              >
                <option value="Active Investigation">Active Investigation</option>
                <option value="Under Lab Analysis">Under Lab Analysis</option>
                <option value="Court Ready">Court Ready (Certified)</option>
                <option value="Closed/Archived">Closed / Archived</option>
              </select>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Estimated Incident Date & Time</label>
              <input
                type="datetime-local"
                value={formData.incidentDate}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Forensic First Responder Arrival</label>
              <input
                type="datetime-local"
                value={formData.firstResponseDate}
                onChange={(e) => setFormData({ ...formData, firstResponseDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
          </div>

          {/* Location & Scene Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">Scene Physical Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., 402 Elmhurst Ave, Apt 3B"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Scene Classification</label>
              <input
                type="text"
                value={formData.sceneType}
                onChange={(e) => setFormData({ ...formData, sceneType: e.target.value })}
                placeholder="e.g., Indoor Residential / Alleyway / Vehicle"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              />
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">GPS Coordinates</label>
              <input
                type="text"
                value={formData.gps}
                onChange={(e) => setFormData({ ...formData, gps: e.target.value })}
                placeholder="e.g., 40.7128° N, 74.0060° W"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Weather & Temperature</label>
              <input
                type="text"
                value={formData.weather}
                onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                placeholder="e.g., Rain, 14°C, 90% humidity"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200"
              />
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">
              Crime Scene Synopsis & Initial Observations (Notebook Entry)
            </label>
            <textarea
              rows={3}
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              placeholder="Detail point of forced entry, biological spatter discovered, decedent condition, perimeter security..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-[11px] text-slate-500 font-mono">
              Lead Officer: {currentOfficer.name} ({currentOfficer.badgeNumber})
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
                className="px-5 py-2 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
              >
                Initialize Case File
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
