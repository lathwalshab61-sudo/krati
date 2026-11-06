import React, { useState } from 'react';
import { useCases } from '../../context/CaseContext';
import { 
  MapPin, 
  Thermometer, 
  CloudSun, 
  Clock, 
  ShieldCheck, 
  FileEdit, 
  Plus, 
  BookOpen, 
  Tag, 
  User,
  Compass,
  Building
} from 'lucide-react';

export default function CaseOverviewTab({ currentCase }) {
  const { addFieldNote, currentOfficer } = useCases();
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteCategory, setNoteCategory] = useState('Biological Search');
  const [noteContent, setNoteContent] = useState('');

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    addFieldNote(currentCase.id, {
      category: noteCategory,
      content: noteContent.trim(),
      author: `${currentOfficer.name} (${currentOfficer.badgeNumber})`,
      timestamp: new Date().toISOString()
    });

    setNoteContent('');
    setShowAddNote(false);
  };

  const quickPresets = [
    "Ambient crime scene temp logged. Secondary biological perimeter established.",
    "Alternate Light Source (ALS 450nm) inspection revealed latent fluid deposit.",
    "Tamper-evident seals checked and signed before refrigerated transport.",
    "Presumptive Kastle-Meyer blood test positive on surface contact swab."
  ];

  return (
    <div className="space-y-6">
      {/* Crime Scene Environmental & Logistical Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Scene Location & GPS</span>
          </div>
          <div className="text-sm font-semibold text-slate-100">{currentCase.location?.address || 'Not specified'}</div>
          <div className="text-xs font-mono text-cyan-400 mt-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>{currentCase.location?.gps || 'GPS: 40.7128° N, 74.0060° W'}</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Building className="w-4 h-4 text-indigo-400" />
            <span>Scene Structure & Type</span>
          </div>
          <div className="text-sm font-semibold text-slate-100">{currentCase.location?.type || 'Indoor'}</div>
          <div className="text-xs text-slate-400 mt-1">Agency: {currentCase.investigatingAgency || 'State Forensics'}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span>Environmental Conditions</span>
          </div>
          <div className="text-sm font-semibold text-slate-100">{currentCase.location?.weather || 'Atmosphere Stable'}</div>
          <div className="text-xs text-amber-400/80 mt-1">Critical for DNA/Fluid Preservation</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Response Timeline</span>
          </div>
          <div className="text-xs text-slate-300">
            <span className="text-slate-500">Incident: </span>
            {new Date(currentCase.incidentDate).toLocaleString()}
          </div>
          <div className="text-xs text-emerald-400 mt-1">
            <span className="text-slate-500">Arrival: </span>
            {currentCase.firstResponseDate ? new Date(currentCase.firstResponseDate).toLocaleString() : 'Logged upon arrival'}
          </div>
        </div>
      </div>

      {/* Case Synopsis / Initial Crime Scene Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
          <FileEdit className="w-4 h-4 text-cyan-400" />
          <span>Crime Scene Executive Synopsis & Investigative Context</span>
        </h3>
        <p className="text-sm leading-relaxed text-slate-300 bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 font-sans">
          {currentCase.synopsis || "No synopsis recorded for this incident yet. Use field notes below to log observations."}
        </p>
      </div>

      {/* Field Notebook (Digital Replacement for paper pocket notebooks) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Officer Digital Field Notebook
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-800">
                Paperless Protocol
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure, timestamped forensic log replacing manual paper notes. Evidentiary audit compliant.
            </p>
          </div>

          <button
            onClick={() => setShowAddNote(!showAddNote)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Field Observation</span>
          </button>
        </div>

        {/* Add Note Inline Form */}
        {showAddNote && (
          <form onSubmit={handleCreateNote} className="mb-6 p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Category:</span>
                <select
                  value={noteCategory}
                  onChange={(e) => setNoteCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Scene Arrival">Scene Arrival & Perimeter</option>
                  <option value="Biological Search">Biological Search / DNA Detection</option>
                  <option value="Latent Prints & Impressions">Latent Prints & Toolmarks</option>
                  <option value="Evidence Packaging">Evidence Packaging & Sealing</option>
                  <option value="Environmental Note">Environmental & Temperature</option>
                  <option value="Pathology Observation">Post-Mortem & Pathology</option>
                </select>
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                Examiner: {currentOfficer.name} ({currentOfficer.badgeNumber})
              </span>
            </div>

            <textarea
              rows={3}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Record forensic observation, ALS light wavelengths used, blood spatter geometry, contamination controls..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />

            {/* Quick preset buttons */}
            <div>
              <span className="text-[10px] text-slate-500 block mb-1">Quick Field Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setNoteContent((prev) => (prev ? `${prev} ${preset}` : preset))}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-left transition-colors"
                  >
                    + {preset.slice(0, 38)}...
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddNote(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                Save to Case Record
              </button>
            </div>
          </form>
        )}

        {/* Chronological Field Note Timeline */}
        <div className="space-y-3">
          {(!currentCase.fieldNotes || currentCase.fieldNotes.length === 0) ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No field notes logged yet. Click "Add Field Observation" to document scene notes.
            </div>
          ) : (
            currentCase.fieldNotes.map((note, index) => (
              <div
                key={note.id || index}
                className="relative pl-5 pb-3 border-l-2 border-amber-500/40 last:border-transparent group"
              >
                {/* Timeline node */}
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-slate-900 group-hover:bg-amber-300"></span>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/70 text-amber-300 border border-amber-800/80">
                        {note.category || 'Field Note'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        <span>{note.author}</span>
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(note.timestamp).toLocaleString()}</span>
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-200 font-sans">
                    {note.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
