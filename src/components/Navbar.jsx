import React, { useState } from 'react';
import { useCases } from '../context/CaseContext';
import { 
  Dna, 
  Shield, 
  FolderPlus, 
  BookOpen, 
  GitCompare, 
  Download, 
  Upload, 
  RotateCcw, 
  ChevronDown,
  UserCheck,
  Search,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenNewCase, onOpenComparator, onToggleNotebook, isNotebookOpen }) {
  const { currentOfficer, setCurrentOfficer, officers, exportDataToJson, importDataFromJson, resetToDefaultData, cases } = useCases();
  const [showOfficerMenu, setShowOfficerMenu] = useState(false);
  const [showDataMenu, setShowDataMenu] = useState(false);

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importDataFromJson(content);
        if (res.success) {
          alert(`Successfully imported ${res.count} cases!`);
        } else {
          alert(`Import failed: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    setShowDataMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-lg shadow-cyan-500/20 text-white">
            <Dna className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" title="System Online & Encrypted"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                FORENSICA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 rounded">
                PRO LIMS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight flex items-center gap-1">
              <span>CRIME SCENE & DNA EVIDENCE SYSTEM</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick STR DNA Matcher */}
          <button
            onClick={onOpenComparator}
            className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm"
            title="Compare DNA STR Profiles"
          >
            <GitCompare className="w-4 h-4 text-cyan-400" />
            <span>STR Allele Matcher</span>
          </button>

          {/* Field Notebook Drawer Trigger */}
          <button
            onClick={onToggleNotebook}
            className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isNotebookOpen 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="Digital Field Notebook (replaces manual paper notes)"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Field Notebook</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </button>

          {/* New Case Intake Button */}
          <button
            onClick={onOpenNewCase}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-600/30 hover:shadow-cyan-500/40 transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Case Intake</span>
          </button>

          {/* Officer Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowOfficerMenu(!showOfficerMenu);
                setShowDataMenu(false);
              }}
              className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-all text-left"
            >
              <img
                src={currentOfficer.avatar}
                alt={currentOfficer.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-500/50"
              />
              <div className="hidden lg:block">
                <div className="text-xs font-semibold text-slate-200 leading-tight">
                  {currentOfficer.name}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                  {currentOfficer.badgeNumber}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showOfficerMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
                <div className="px-2 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Active Forensic Officer
                </div>
                <div className="mt-1 space-y-1">
                  {officers.map((officer) => (
                    <button
                      key={officer.id}
                      onClick={() => {
                        setCurrentOfficer(officer);
                        setShowOfficerMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left text-xs transition-colors ${
                        currentOfficer.id === officer.id
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <img
                        src={officer.avatar}
                        alt={officer.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{officer.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{officer.role}</div>
                        <div className="text-[10px] font-mono text-cyan-400">{officer.badgeNumber}</div>
                      </div>
                      {currentOfficer.id === officer.id && (
                        <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Data Backup / Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDataMenu(!showDataMenu);
                setShowOfficerMenu(false);
              }}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/80 transition-colors"
              title="Data Backup & Reset Options"
            >
              <Download className="w-4 h-4" />
            </button>

            {showDataMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase">
                  Data Vault Options
                </div>
                <button
                  onClick={() => {
                    exportDataToJson();
                    setShowDataMenu(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-slate-300 text-left"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export Backup (.JSON)</span>
                </button>
                <label className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 text-slate-300 text-left cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Import Backup (.JSON)</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => {
                    if (window.confirm("Reset all forensic cases to default demo records?")) {
                      resetToDefaultData();
                      setShowDataMenu(false);
                    }
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-rose-950/40 text-rose-300 text-left border-t border-slate-800 mt-1"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                  <span>Reset to Sample Cases</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
