import React, { useState } from 'react';
import { useCases } from '../context/CaseContext';
import { 
  X, 
  BookOpen, 
  Mic, 
  MicOff, 
  Plus, 
  Clock, 
  Sparkles, 
  Send, 
  FileCheck, 
  Tag, 
  Volume2,
  Trash2
} from 'lucide-react';

export default function FieldNotebookDrawer({ isOpen, onClose }) {
  const { cases, selectedCase, selectedCaseId, setSelectedCaseId, addFieldNote, currentOfficer } = useCases();

  const [targetCaseId, setTargetCaseId] = useState(selectedCaseId || cases[0]?.id || '');
  const [noteText, setNoteText] = useState('');
  const [category, setCategory] = useState('Scene Arrival');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  if (!isOpen) return null;

  const currentActiveCase = cases.find((c) => c.id === targetCaseId) || selectedCase;

  const handleStartVoice = () => {
    setIsRecording(true);
    setRecordSeconds(0);
    // Simulate speech-to-text dictation after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      const dictations = [
        "Exterior window frame displays pried toolmark striations. Collected wood shavings and red trace paint transfer into sterile glassine envelope.",
        "UV 365nm inspection of master bedroom carpet revealed 4 distinct latent footwear impression stains. Photographing with oblique lighting and forensic millimeter scale.",
        "Observed low velocity blood spatter cluster on north wall baseboard. Preliminary Hemastix positive. Swabbed into specimen envelope BIO-04.",
        "Body core temperature logged at 28.5°C via hepatic probe. Rigor mortis fully developed in upper extremities."
      ];
      const randomDictation = dictations[Math.floor(Math.random() * dictations.length)];
      setNoteText((prev) => (prev ? `${prev}\n[Voice Dictation]: ${randomDictation}` : `[Voice Dictation]: ${randomDictation}`));
    }, 3200);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addFieldNote(targetCaseId, {
      category,
      content: noteText.trim(),
      author: `${currentOfficer.name} (${currentOfficer.badgeNumber})`,
      timestamp: new Date().toISOString()
    });

    setNoteText('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Officer Digital Field Notebook
            </h3>
            <p className="text-[10px] text-slate-400">
              Instant Crime Scene Scratchpad & Voice Dictation
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Case Selector Dropdown */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/80">
        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          Active Case Target
        </label>
        <select
          value={targetCaseId}
          onChange={(e) => {
            setTargetCaseId(e.target.value);
            setSelectedCaseId(e.target.value);
          }}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-cyan-300 font-mono font-bold focus:border-cyan-400 focus:outline-none"
        >
          {cases.map((c) => (
            <option key={c.id} value={c.id}>
              [{c.id}] {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Voice Dictation Simulation Bar */}
      <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {isRecording ? (
            <span className="flex items-center gap-1.5 text-rose-400 font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>Recording Voice Dictation...</span>
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">
              Gloved Hands? Use Hands-Free Dictation:
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleStartVoice}
          disabled={isRecording}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            isRecording
              ? 'bg-rose-500 text-white'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
        </button>
      </div>

      {/* Note Composition Area */}
      <form onSubmit={handleSaveNote} className="p-4 border-b border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-300"
          >
            <option value="Scene Arrival">Scene Arrival & Perimeter</option>
            <option value="Biological Search">Biological Search / DNA</option>
            <option value="Footwear & Latent">Footwear & Latent Prints</option>
            <option value="Trace Recovery">Trace & Toolmark Striation</option>
            <option value="Environmental Note">Environmental & Weather</option>
          </select>

          <span className="text-[10px] text-slate-500 font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type or dictate crime scene observation..."
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!noteText.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Commit to Case Record</span>
          </button>
        </div>
      </form>

      {/* Existing Notes for Selected Case */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          <span>Logged Case Entries</span>
          <span className="font-mono text-amber-400">{currentActiveCase?.fieldNotes?.length || 0} Notes</span>
        </div>

        {(!currentActiveCase?.fieldNotes || currentActiveCase.fieldNotes.length === 0) ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No notebook entries for this case yet.
          </div>
        ) : (
          currentActiveCase.fieldNotes.map((n, idx) => (
            <div
              key={n.id || idx}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-900">
                  {n.category}
                </span>
                <span className="text-slate-500 font-mono">
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-slate-200 font-sans leading-relaxed text-[11px]">
                {n.content}
              </p>
              <div className="text-[10px] text-slate-500 font-mono text-right">
                {n.author}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
