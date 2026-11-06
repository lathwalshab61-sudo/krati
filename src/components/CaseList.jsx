import React, { useState, useMemo } from 'react';
import { useCases } from '../context/CaseContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Dna, 
  Package, 
  FileText, 
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';

export default function CaseList() {
  const { cases, selectedCaseId, setSelectedCaseId, currentOfficer } = useCases();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL'); // ALL, MY_CASES, BIOLOGICAL, CRITICAL, COURT_READY
  const [sortBy, setSortBy] = useState('DATE_DESC');

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        c.id.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.location?.address?.toLowerCase().includes(query) ||
        c.leadExaminer.toLowerCase().includes(query) ||
        c.evidence?.some(e => e.name.toLowerCase().includes(query) || e.barcode.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Filter matching
      if (activeFilter === 'MY_CASES') {
        return c.assignedOfficerId === currentOfficer.id || c.leadExaminer === currentOfficer.name;
      }
      if (activeFilter === 'BIOLOGICAL') {
        return (c.dnaProfiles?.length > 0) || (c.category?.toLowerCase().includes('dna') || c.category?.toLowerCase().includes('homicide'));
      }
      if (activeFilter === 'CRITICAL') {
        return c.priority === 'Critical';
      }
      if (activeFilter === 'COURT_READY') {
        return c.status === 'Court Ready';
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'DATE_DESC') {
        return new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime();
      }
      if (sortBy === 'DATE_ASC') {
        return new Date(a.incidentDate).getTime() - new Date(b.incidentDate).getTime();
      }
      if (sortBy === 'EVIDENCE_COUNT') {
        return (b.evidence?.length || 0) - (a.evidence?.length || 0);
      }
      return 0;
    });
  }, [cases, searchQuery, activeFilter, sortBy, currentOfficer]);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-950/80 text-rose-300 border border-rose-800">
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950/80 text-amber-300 border border-amber-800">
            High
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-950/80 text-blue-300 border border-blue-800">
            {priority || 'Standard'}
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Court Ready') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Court Ready</span>
        </span>
      );
    }
    if (status === 'Under Lab Analysis') {
      return (
        <span className="flex items-center gap-1 text-[11px] font-medium text-cyan-400">
          <Dna className="w-3.5 h-3.5 animate-pulse" />
          <span>Lab Analysis</span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400">
        <Clock className="w-3.5 h-3.5" />
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Search and Filter Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Case Directory</h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 text-slate-300">
              {filteredCases.length} of {cases.length}
            </span>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="DATE_DESC">Newest Date</option>
              <option value="DATE_ASC">Oldest Date</option>
              <option value="EVIDENCE_COUNT">Most Evidence</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Case #, DNA barcode, title, address..."
            className="w-full pl-9 pr-8 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-200"
            >
              ×
            </button>
          )}
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {[
            { id: 'ALL', label: 'All Cases' },
            { id: 'MY_CASES', label: 'My Casework' },
            { id: 'BIOLOGICAL', label: 'DNA / Biology' },
            { id: 'CRITICAL', label: 'Critical' },
            { id: 'COURT_READY', label: 'Court Ready' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case List Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-800/40">
        {filteredCases.length === 0 ? (
          <div className="text-center py-12 px-4">
            <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-400">No matching cases found</p>
            <p className="text-xs text-slate-600 mt-1">Try adjusting your search criteria or filter tags.</p>
          </div>
        ) : (
          filteredCases.map((c) => {
            const isSelected = c.id === selectedCaseId;
            const isAssignedToOfficer = c.assignedOfficerId === currentOfficer.id || c.leadExaminer === currentOfficer.name;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`group relative p-3.5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500/40'
                    : 'bg-slate-900/40 hover:bg-slate-800/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Row: Case ID, Category, Priority */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                      {c.id}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {c.category}
                    </span>
                  </div>
                  {getPriorityBadge(c.priority)}
                </div>

                {/* Title */}
                <h3 className="text-xs font-semibold text-slate-100 group-hover:text-cyan-100 line-clamp-1 mb-1">
                  {c.title}
                </h3>

                {/* Location & Date */}
                <div className="space-y-1 text-[11px] text-slate-400 mb-2.5">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{c.location?.address || 'Location pending'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{new Date(c.incidentDate).toLocaleDateString()} {new Date(c.incidentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Footer Counters & Status */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1" title="Physical Evidence Count">
                      <Package className="w-3 h-3 text-indigo-400" />
                      <span>{c.evidence?.length || 0}</span>
                    </span>
                    <span className="flex items-center gap-1" title="DNA STR Profiles">
                      <Dna className="w-3 h-3 text-emerald-400" />
                      <span>{c.dnaProfiles?.length || 0}</span>
                    </span>
                    <span className="flex items-center gap-1" title="Field Notes Logged">
                      <FileText className="w-3 h-3 text-amber-400" />
                      <span>{c.fieldNotes?.length || 0}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(c.status)}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  </div>
                </div>

                {/* Assigned indicator */}
                {isAssignedToOfficer && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 rounded-bl-sm" title="Assigned to you"></div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
